/** Логика клиентского бота: приём обращения → ответ клиенту → пересылка менеджеру → напоминания. */

import { answerCallback, sendMessage, type CallbackBtn } from "./api";
import { addLead, closeLead, newId, openLeads } from "./store";

const PHONE = "+7 (3822) 97-97-05";

const CLIENT_WELCOME =
  "Здравствуйте! ZOND — наружная реклама, печать, дизайн и оформление в Томске.\n\n" +
  "Опишите вашу задачу или вопрос — передам менеджеру, он свяжется с вами в рабочее время (пн–пт, 9:00–18:00).\n\n" +
  "📞 " + PHONE;

const CLIENT_RECEIVED =
  "Спасибо за обращение! Передал его менеджеру — ответим в рабочее время.\n" +
  "Если срочно — звоните " + PHONE + ".";

function salesId(): number | undefined {
  const v = process.env.MAX_SALES_ID || process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}

function doneKb(id: string): CallbackBtn[][] {
  return [[{ text: "Ответил ✅", payload: `done:${id}` }]];
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
  const userId: number | undefined = msg.sender?.user_id;
  const chatType: string = msg.recipient?.chat_type ?? "dialog";
  const text: string = (msg.body?.text ?? "").trim();
  if (!userId || chatType !== "dialog" || !text) return;

  const name: string = msg.sender?.name ?? msg.sender?.first_name ?? `id ${userId}`;
  const id = newId();
  addLead({ id, userId, name, text, createdAt: Date.now(), firstReminded: false, lastReminderDay: null });

  await sendMessage({ userId, text: CLIENT_RECEIVED });

  const to = salesId();
  if (to) {
    const uname = msg.sender?.username ? ` (@${msg.sender.username})` : "";
    await sendMessage({
      userId: to,
      text: `🔔 Новое обращение клиента\nОт: ${name}${uname} · id ${userId}\n\n«${text}»`,
      keyboard: doneKb(id),
    });
  }
}

async function onCallback(u: AnyUpdate): Promise<void> {
  const cb = u.callback ?? {};
  const payload: string = cb.payload ?? "";
  const callbackId: string = cb.callback_id ?? "";

  if (payload.startsWith("done:")) {
    const lead = closeLead(payload.slice(5));
    await answerCallback(callbackId, {
      notification: lead ? "Закрыто ✅" : "Уже закрыто",
      newText: lead ? `✅ Обработано: ${lead.name}\n\n«${lead.text}»` : undefined,
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
      await sendMessage({
        userId: to,
        text: `⏰ Напоминание: обращение от ${lead.name} ещё не закрыто (${Math.floor(hoursOpen)} ч).\n\n«${lead.text}»`,
        keyboard: doneKb(lead.id),
      });
      sent++;
      await new Promise((r) => setTimeout(r, 300));
    }
  }
  return sent;
}
