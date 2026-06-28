/** Клиент MAX Bot API для КЛИЕНТСКОГО бота (отдельный токен MAX_CLIENT_BOT_TOKEN). */

const BASE = "https://platform-api2.max.ru";

function token(): string {
  const t = process.env.MAX_CLIENT_BOT_TOKEN;
  if (!t) throw new Error("MAX_CLIENT_BOT_TOKEN не задан в переменных окружения");
  return t;
}

function authHeaders(): Record<string, string> {
  return { "Content-Type": "application/json", Authorization: token() };
}

function url(path: string, params: Record<string, string | number | undefined> = {}): string {
  const u = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null) u.searchParams.set(k, String(v));
  }
  return u.toString();
}

export type CallbackBtn = { text: string; payload: string };

export function inlineKeyboard(rows: CallbackBtn[][]) {
  return {
    type: "inline_keyboard",
    payload: {
      buttons: rows.map((row) =>
        row.map((b) => ({ type: "callback", text: b.text, payload: b.payload, intent: "default" })),
      ),
    },
  };
}

type SendArgs = { chatId?: number; userId?: number; text: string; keyboard?: CallbackBtn[][] };

export async function sendMessage({ chatId, userId, text, keyboard }: SendArgs): Promise<boolean> {
  try {
    const attachments = keyboard ? [inlineKeyboard(keyboard)] : [];
    const res = await fetch(url("/messages", { chat_id: chatId, user_id: userId }), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ text, attachments }),
    });
    if (!res.ok) {
      console.warn("[max-client/api] sendMessage", res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[max-client/api] sendMessage error", e);
    return false;
  }
}

export async function answerCallback(
  callbackId: string,
  opts: { notification?: string; newText?: string } = {},
): Promise<boolean> {
  try {
    const body: Record<string, unknown> = {};
    if (opts.notification) body.notification = opts.notification;
    // attachments: [] — очищает клавиатуру (кнопку), чтобы заявку нельзя было взять повторно
    if (opts.newText) body.message = { text: opts.newText, attachments: [] };
    const res = await fetch(url("/answers", { callback_id: callbackId }), {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn("[max-client/api] answerCallback", res.status, await safeText(res));
      return false;
    }
    return true;
  } catch (e) {
    console.warn("[max-client/api] answerCallback error", e);
    return false;
  }
}

export async function subscribeWebhook(webhookUrl: string, secret: string): Promise<unknown> {
  const res = await fetch(url("/subscriptions"), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ url: webhookUrl, secret }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`subscribeWebhook ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

export async function getMe(): Promise<unknown> {
  const res = await fetch(url("/me"), { headers: { Authorization: token() }, cache: "no-store" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`getMe ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function safeText(res: Response): Promise<string> {
  try {
    return (await res.text()).slice(0, 300);
  } catch {
    return "";
  }
}
