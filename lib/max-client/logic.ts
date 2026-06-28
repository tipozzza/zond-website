/**
 * Клиентский бот «Центр заказов» — модель «общий чат менеджеров».
 * Клиент пишет → бот благодарит клиента и кидает обращение в группу менеджеров
 * (MAX_SALES_GROUP_ID) с кнопкой «Беру ✅». Кто первый нажал — заявка закрепляется за ним,
 * кнопка убирается. Менеджер связывается с клиентом напрямую (по @username или телефону).
 * Каждое обращение дублируется письмом (постоянный журнал).
 */

import { Resend } from "resend";

import { answerCallback, sendMessage, type CallbackBtn } from "./api";

const PHONE = "+7 (3822) 97-97-05";

const CLIENT_WELCOME =
  "Здравствуйте! ZOND — наружная реклама, печать, дизайн и оформление в Томске.\n\n" +
  "Опишите вашу задачу или вопрос и, если удобно, оставьте номер телефона — менеджер свяжется с вами в рабочее время (пн–пт, 9:00–18:00).\n\n" +
  "📞 " + PHONE;

const CLIENT_RECEIVED =
  "Спасибо за обращение в нашу компанию! В ближайшее время с Вами свяжется наш менеджер!";

function salesGroupId(): number | undefined {
  const v = process.env.MAX_SALES_GROUP_ID;
  return v ? Number(v) : undefined;
}

/** Владелец — запасной адресат, если группа менеджеров ещё не настроена. */
function adminId(): number | undefined {
  const v = process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}

function takeKb(): CallbackBtn[][] {
  return [[{ text: "Беру ✅", payload: "take" }]];
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Постоянный журнал: каждое обращение уходит письмом (Resend). Тихо пропускается, если не настроено. */
async function emailLead(name: string, username: string | null, text: string): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.SALES_EMAIL;
  if (!key || !to) return;
  try {
    const resend = new Resend(key);
    const when = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tomsk" });
    const uname = username ? ` (@${escHtml(username)})` : "";
    await resend.emails.send({
      from: "ZOND MAX-бот <onboarding@resend.dev>",
      to,
      subject: `Новое обращение в MAX: ${name}`,
      html:
        `<h2>Новое обращение — MAX-бот «Центр заказов»</h2>` +
        `<p><b>От:</b> ${escHtml(name)}${uname}</p>` +
        `<p><b>Когда:</b> ${escHtml(when)} (Томск)</p>` +
        `<p><b>Сообщение:</b></p>` +
        `<blockquote style="border-left:3px solid #6F395D;padding-left:12px;color:#333">${escHtml(text)}</blockquote>`,
    });
  } catch (e) {
    console.warn("[max-client] emailLead error", e);
  }
}

type AnyUpdate = Record<string, any>;

export async function handleUpdate(u: AnyUpdate): Promise<void> {
  try {
    switch (u.update_type) {
      case "bot_started":
        return await onStart(u);
      case "message_created":
        return await onMessage(u);
      case "message_callback":
        return await onCallback(u);
      default:
        return;
    }
  } catch (e) {
    console.error("[max-client] handleUpdate error", u.update_type, e);
  }
}

async function onStart(u: AnyUpdate): Promise<void> {
  const userId = u.user?.user_id ?? u.chat_id;
  if (!userId) return;
  await sendMessage({ userId, text: CLIENT_WELCOME });
}

async function onMessage(u: AnyUpdate): Promise<void> {
  const msg = u.message ?? {};
  const chatId: number | undefined = msg.recipient?.chat_id;
  const userId: number | undefined = msg.sender?.user_id;
  const chatType: string = msg.recipient?.chat_type ?? "dialog";
  const text: string = (msg.body?.text ?? "").trim();
  if (!text) return;

  // /chatid — узнать id чата (нужно для настройки группы менеджеров).
  // Отвечаем ТОЛЬКО в этот чат (один адресат — иначе MAX отклоняет запрос).
  if (text.toLowerCase().startsWith("/chatid")) {
    const target = chatId ?? userId;
    if (target !== undefined) await sendMessage({ chatId: target, text: `ID этого чата: ${target}` });
    return;
  }

  // в группах прочие сообщения не трогаем — это переписка менеджеров
  if (chatType !== "dialog" || !userId) return;

  // ----- обращение клиента -----
  const name: string = msg.sender?.name ?? msg.sender?.first_name ?? `id ${userId}`;
  const username: string | null = msg.sender?.username ?? null;

  await sendMessage({ userId, text: CLIENT_RECEIVED });

  const uname = username ? ` (@${username})` : "";
  const card = `🔔 Новое обращение\nОт: ${name}${uname} · id ${userId}\n\n«${text}»`;

  const gid = salesGroupId();
  if (gid) {
    await sendMessage({ chatId: gid, text: card, keyboard: takeKb() });
  } else {
    // группа менеджеров ещё не настроена — чтобы не потерять, шлём владельцу
    const admin = adminId();
    if (admin) await sendMessage({ userId: admin, text: `📋 ${card}` });
  }

  await emailLead(name, username, text);
}

async function onCallback(u: AnyUpdate): Promise<void> {
  const cb = u.callback ?? {};
  const payload: string = cb.payload ?? "";
  const callbackId: string = cb.callback_id ?? "";

  if (payload === "take") {
    const who: string = cb.user?.name ?? cb.user?.first_name ?? "менеджер";
    const orig: string = u.message?.body?.text ?? "Обращение";
    await answerCallback(callbackId, {
      notification: "Взяли в работу ✅",
      newText: `✅ В работе: ${who}\n\n${orig}`,
    });
    return;
  }

  await answerCallback(callbackId);
}

/** Оставлен для совместимости с почасовым cron. В модели «общий чат» напоминаний нет. */
export async function runReminders(): Promise<number> {
  return 0;
}
