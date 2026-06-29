/**
 * Клиентский бот «Центр заказов» — общий чат + диалог через бота.
 *
 * Клиент пишет боту → бот благодарит клиента и кидает заявку в группу менеджеров
 * (MAX_SALES_GROUP_ID) с кнопкой «Беру ✅». Менеджер нажал «Беру» → заявка
 * закрепляется за ним: дальше он пишет ответ в чат с ботом, бот пересылает текст
 * клиенту, а новые сообщения клиента приходят этому менеджеру. /стоп — завершить.
 *
 * Состояние (кто какого клиента ведёт) — в памяти процесса; при пересборке активные
 * диалоги сбрасываются. Надёжное решение — вынести данные в отдельное хранилище.
 */

import { Resend } from "resend";

import { answerCallback, sendMessage, type CallbackBtn } from "./api";

const PHONE = "+7 (3822) 97-97-05";
const BOT_LINK = "https://max.ru/id7017200748_1_bot";

const CLIENT_WELCOME =
  "Здравствуйте! ZOND — наружная реклама, печать, дизайн и оформление в Томске.\n\n" +
  "Опишите вашу задачу или вопрос — менеджер ответит вам прямо здесь, в рабочее время (пн–пт, 9:00–18:00).\n\n" +
  "📞 " + PHONE;

const CLIENT_RECEIVED =
  "Спасибо за обращение в нашу компанию! В ближайшее время с Вами свяжется наш менеджер!";

function salesGroupId(): number | undefined {
  const v = process.env.MAX_SALES_GROUP_ID;
  return v ? Number(v) : undefined;
}
function adminId(): number | undefined {
  const v = process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}

type Lead = {
  clientId: number;
  name: string;
  username: string | null;
  lastText: string;
  managerId: number | null;
  managerName: string | null;
};

const leads = new Map<number, Lead>(); // clientId -> заявка
const active = new Map<number, number>(); // managerId -> clientId (текущий диалог менеджера)

function takeKb(clientId: number): CallbackBtn[][] {
  return [[{ text: "Беру ✅", payload: `take:${clientId}` }]];
}

/** Преобразует входящие вложения (фото/видео/файл/стикер) в формат для пересылки. */
function forwardAttachments(atts: unknown): unknown[] {
  if (!Array.isArray(atts)) return [];
  const out: unknown[] = [];
  for (const a of atts as Array<{ type?: string; payload?: { token?: string; code?: string; url?: string } }>) {
    const t = a?.type;
    const p = a?.payload ?? {};
    if (!t || t === "inline_keyboard") continue;
    if (t === "sticker" && p.code) out.push({ type: "sticker", payload: { code: p.code } });
    else if (p.token) out.push({ type: t, payload: { token: p.token } });
    else if (p.url) out.push({ type: t, payload: { url: p.url } });
  }
  return out;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Постоянный журнал: каждое НОВОЕ обращение уходит письмом (Resend). Пропускается, если не настроено. */
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
  const media = forwardAttachments(msg.body?.attachments);
  if (!text && media.length === 0) return;

  // /chatid — узнать id чата (ответ только в этот чат)
  if (text.toLowerCase().startsWith("/chatid")) {
    const target = chatId ?? userId;
    if (target !== undefined) await sendMessage({ chatId: target, text: `ID этого чата: ${target}` });
    return;
  }

  if (chatType !== "dialog" || !userId) return;

  // /w (или /написать) <id> текст — владелец пишет клиенту напрямую по id.
  // Страховка: работает всегда, без кнопок и привязок (переживает пересборки).
  if (userId === adminId() && /^\/(w|написать)\s/i.test(text)) {
    const rest = text.replace(/^\/(w|написать)\s+/i, "");
    const m = rest.match(/^(-?\d+)\s+([\s\S]+)$/);
    if (!m) {
      await sendMessage({ userId, text: "Формат: /w <id_клиента> текст" });
      return;
    }
    const cid = Number(m[1]);
    const ok = await sendMessage({ userId: cid, text: `💬 Менеджер ZOND:\n${m[2]}`, media });
    const lead = leads.get(cid) ?? { clientId: cid, name: "клиент", username: null, lastText: "", managerId: null, managerName: null };
    lead.managerId = userId;
    lead.managerName = "владелец";
    leads.set(cid, lead);
    active.set(userId, cid);
    await sendMessage({
      userId,
      text: ok
        ? `✅ Отправлено клиенту ${cid}. Дальше просто пишите сюда — уйдёт ему. /стоп — завершить.`
        : "⚠️ Не удалось отправить — возможно, клиент не открывал бота.",
    });
    return;
  }

  // менеджер в активном диалоге — это его ответ клиенту
  if (active.has(userId)) {
    return await onManagerReply(userId, text, media);
  }

  // ----- сообщение клиента -----
  const name: string = msg.sender?.name ?? msg.sender?.first_name ?? `id ${userId}`;
  const username: string | null = msg.sender?.username ?? null;
  const existing = leads.get(userId);
  const shown = text || "(вложение)";

  // закреплённый клиент пишет повторно → его менеджеру (с вложением)
  if (existing && existing.managerId) {
    existing.lastText = shown;
    existing.name = name;
    existing.username = username;
    await sendMessage({ userId, text: "Передал менеджеру 👌" });
    await sendMessage({ userId: existing.managerId, text: `💬 Клиент ${name}:${text ? "\n" + text : ""}`, media });
    return;
  }

  // новое (или ещё не взятое) обращение
  leads.set(userId, {
    clientId: userId,
    name,
    username,
    lastText: shown,
    managerId: existing?.managerId ?? null,
    managerName: existing?.managerName ?? null,
  });
  await sendMessage({ userId, text: CLIENT_RECEIVED });

  const uname = username ? ` (@${username})` : "";
  const card = `🔔 Новое обращение\nОт: ${name}${uname}\n\n«${shown}»`;
  const gid = salesGroupId();
  if (gid) {
    await sendMessage({ chatId: gid, text: card, keyboard: takeKb(userId), media });
  } else {
    const admin = adminId();
    if (admin) await sendMessage({ userId: admin, text: `📋 ${card}`, media });
  }
  await emailLead(name, username, shown);
}

async function onManagerReply(managerId: number, text: string, media: unknown[] = []): Promise<void> {
  const low = text.toLowerCase();
  if (low === "/стоп" || low === "/stop") {
    active.delete(managerId);
    await sendMessage({ userId: managerId, text: "Диалог завершён. Новые заявки — в группе, жмите «Беру ✅»." });
    return;
  }
  const clientId = active.get(managerId)!;
  const lead = leads.get(clientId);
  const ok = await sendMessage({ userId: clientId, text: `💬 Менеджер ZOND:${text ? "\n" + text : ""}`, media });
  await sendMessage({
    userId: managerId,
    text: ok
      ? `✅ Отправлено клиенту${lead ? " " + lead.name : ""}.`
      : "⚠️ Не удалось отправить — возможно, клиент закрыл чат с ботом.",
  });
}

async function onCallback(u: AnyUpdate): Promise<void> {
  const cb = u.callback ?? {};
  const payload: string = cb.payload ?? "";
  const callbackId: string = cb.callback_id ?? "";

  if (payload.startsWith("take:")) {
    const clientId = Number(payload.slice(5));
    const managerId: number | undefined = cb.user?.user_id;
    const managerName: string = cb.user?.name ?? cb.user?.first_name ?? "менеджер";
    const orig: string = u.message?.body?.text ?? "Обращение";
    if (!managerId || !clientId) {
      await answerCallback(callbackId);
      return;
    }

    let lead = leads.get(clientId);
    if (!lead) {
      lead = { clientId, name: "клиент", username: null, lastText: "", managerId, managerName };
      leads.set(clientId, lead);
    }
    lead.managerId = managerId;
    lead.managerName = managerName;
    active.set(managerId, clientId);

    await answerCallback(callbackId, {
      notification: "Заявка ваша. Пишите ответ боту — отправлю клиенту.",
      newText: `✅ В работе: ${managerName}\n\n${orig}`,
    });

    const dm = await sendMessage({
      userId: managerId,
      text: `Вы взяли заявку от ${lead.name}. Напишите ответ здесь, в чате с ботом — я отправлю его клиенту. Команда /стоп — завершить.`,
    });
    if (!dm) {
      const gid = salesGroupId();
      if (gid) {
        await sendMessage({
          chatId: gid,
          text: `${managerName}, чтобы отвечать клиенту через бота — откройте бота ${BOT_LINK}, нажмите «Начать», затем просто напишите ответ боту.`,
        });
      }
    }
    return;
  }

  await answerCallback(callbackId);
}

/** Оставлен для совместимости с почасовым cron. Напоминаний в этой модели нет. */
export async function runReminders(): Promise<number> {
  return 0;
}
