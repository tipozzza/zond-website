/**
 * Двусторонний клиентский бот.
 * Клиент пишет → бот уведомляет менеджера. Менеджер жмёт «Ответить», пишет в чат с ботом →
 * текст уходит клиенту. «Закрыть» — отмечает обращение обработанным и гасит напоминания.
 */

import { Resend } from "resend";

import { answerCallback, sendMessage, type CallbackBtn } from "./api";
import { clearActive, closeLead, getActive, getLead, openLeads, setActive, upsertLead } from "./store";

const PHONE = "+7 (3822) 97-97-05";

const CLIENT_WELCOME =
  "Здравствуйте! ZOND — наружная реклама, печать, дизайн и оформление в Томске.\n\n" +
  "Опишите вашу задачу или вопрос — менеджер ответит вам прямо здесь, в рабочее время (пн–пт, 9:00–18:00).\n\n" +
  "📞 " + PHONE;

const CLIENT_RECEIVED =
  "Спасибо за обращение! Передал его менеджеру — он ответит вам здесь, в рабочее время.\n" +
  "Если срочно — звоните " + PHONE + ".";

const MANAGER_HELLO =
  "Бот заявок ZOND готов. Сюда падают обращения клиентов.\n" +
  "Чтобы ответить — нажмите «Ответить ✍️» под сообщением, затем просто напишите текст: он уйдёт клиенту.\n" +
  "«Закрыть ✅» — пометить обращение обработанным. /стоп — выйти из режима ответа.";

function salesId(): number | undefined {
  const v = process.env.MAX_SALES_ID || process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}

/** Владелец/админ — ему дублируем обращения для обзора (только просмотр, без кнопок). */
function adminId(): number | undefined {
  const v = process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Постоянный журнал: каждое обращение уходит письмом (Resend). Тихо пропускается, если не настроено. */
async function emailLead(name: string, username: string | null, text: string, isNew: boolean): Promise<void> {
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
      subject: `${isNew ? "Новое обращение" : "Сообщение"} в MAX: ${name}`,
      html:
        `<h2>${isNew ? "Новое обращение" : "Новое сообщение"} — MAX-бот «Центр заказов»</h2>` +
        `<p><b>От:</b> ${escHtml(name)}${uname}</p>` +
        `<p><b>Когда:</b> ${escHtml(when)} (Томск)</p>` +
        `<p><b>Сообщение:</b></p>` +
        `<blockquote style="border-left:3px solid #6F395D;padding-left:12px;color:#333">${escHtml(text)}</blockquote>`,
    });
  } catch (e) {
    console.warn("[max-client] emailLead error", e);
  }
}

function leadKb(clientId: number): CallbackBtn[][] {
  return [[
    { text: "Ответить ✍️", payload: `reply:${clientId}` },
    { text: "Закрыть ✅", payload: `done:${clientId}` },
  ]];
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
  if (userId === salesId()) {
    await sendMessage({ userId, text: MANAGER_HELLO });
    return;
  }
  await sendMessage({ userId, text: CLIENT_WELCOME });
}

async function onMessage(u: AnyUpdate): Promise<void> {
  const msg = u.message ?? {};
  const userId: number | undefined = msg.sender?.user_id;
  const chatType: string = msg.recipient?.chat_type ?? "dialog";
  const text: string = (msg.body?.text ?? "").trim();
  if (!userId || chatType !== "dialog" || !text) return;

  const sales = salesId();

  // ----- сообщение от МЕНЕДЖЕРА -----
  if (sales && userId === sales) {
    return await onManagerMessage(sales, text);
  }

  // ----- сообщение от КЛИЕНТА -----
  const name: string = msg.sender?.name ?? msg.sender?.first_name ?? `id ${userId}`;
  const username: string | null = msg.sender?.username ?? null;
  const { isNew } = upsertLead({ clientId: userId, name, username, text });

  await sendMessage({ userId, text: isNew ? CLIENT_RECEIVED : "Передал менеджеру 👌" });

  const uname = username ? ` (@${username})` : "";
  const head = isNew ? "🔔 Новое обращение клиента" : "↩️ Новое сообщение от клиента";

  // менеджеру — с кнопками «Ответить/Закрыть»
  if (sales) {
    await sendMessage({
      userId: sales,
      text: `${head}\nОт: ${name}${uname}\n\n«${text}»`,
      keyboard: leadKb(userId),
    });
  }

  // владельцу — копия для обзора, без кнопок (чтобы не вмешиваться в режим ответа менеджера)
  const admin = adminId();
  if (admin && admin !== sales) {
    await sendMessage({ userId: admin, text: `📋 ${head}\nОт: ${name}${uname}\n\n«${text}»` });
  }

  // постоянный журнал на почту
  await emailLead(name, username, text, isNew);
}

async function onManagerMessage(sales: number, text: string): Promise<void> {
  const low = text.toLowerCase();
  if (low === "/стоп" || low === "/stop") {
    clearActive(sales);
    await sendMessage({ userId: sales, text: "Вышел из режима ответа. Жмите «Ответить ✍️» под нужным обращением." });
    return;
  }

  const clientId = getActive(sales);
  if (!clientId) {
    await sendMessage({ userId: sales, text: "Сначала выберите клиента: нажмите «Ответить ✍️» под его сообщением." });
    return;
  }

  const lead = getLead(clientId);
  const ok = await sendMessage({ userId: clientId, text: `💬 Менеджер ZOND:\n${text}` });
  await sendMessage({
    userId: sales,
    text: ok
      ? `✅ Отправлено клиенту${lead ? " " + lead.name : ""}.`
      : "⚠️ Не удалось отправить — возможно, клиент закрыл чат с ботом.",
  });
}

async function onCallback(u: AnyUpdate): Promise<void> {
  const cb = u.callback ?? {};
  const payload: string = cb.payload ?? "";
  const callbackId: string = cb.callback_id ?? "";
  const sales = salesId();

  if (payload.startsWith("reply:")) {
    const clientId = Number(payload.slice(6));
    if (sales) setActive(sales, clientId);
    const lead = getLead(clientId);
    await answerCallback(callbackId, {
      notification: lead ? `Отвечаете ${lead.name}. Напишите сообщение — отправлю клиенту.` : "Напишите ответ — отправлю клиенту.",
    });
    return;
  }

  if (payload.startsWith("done:")) {
    const clientId = Number(payload.slice(5));
    const lead = closeLead(clientId);
    if (sales && getActive(sales) === clientId) clearActive(sales);
    await answerCallback(callbackId, {
      notification: lead ? "Закрыто ✅" : "Уже закрыто",
      newText: lead ? `✅ Обработано: ${lead.name}\n\n«${lead.lastText}»` : undefined,
    });
    return;
  }

  await answerCallback(callbackId);
}

// ------------------------------ напоминания ------------------------------

function tomskNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tomsk" }));
}
function tomskDay(): string {
  const d = tomskNow();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Дёргается внешним cron раз в час. Первый пинг через 4 часа, далее каждое утро (9:00 Томск). */
export async function runReminders(): Promise<number> {
  const to = salesId();
  if (!to) return 0;
  const now = Date.now();
  const day = tomskDay();
  const hour = tomskNow().getHours();
  let sent = 0;

  for (const lead of openLeads()) {
    const hoursOpen = (now - lead.createdAt) / 3_600_000;
    let remind = false;
    if (!lead.firstReminded && hoursOpen >= 4) {
      remind = true;
      lead.firstReminded = true;
    } else if (hour === 9 && lead.lastReminderDay !== day && hoursOpen >= 4) {
      remind = true;
    }
    if (remind) {
      lead.lastReminderDay = day;
      const uname = lead.username ? ` (@${lead.username})` : "";
      await sendMessage({
        userId: to,
        text: `⏰ Не закрыто: обращение от ${lead.name}${uname} (${Math.floor(hoursOpen)} ч).\n\n«${lead.lastText}»`,
        keyboard: leadKb(lead.clientId),
      });
      sent++;
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return sent;
}
