import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getFile, putFile } from "@/lib/github-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Item = {
  sideId: string;
  address: string;
  type: string;
  format: string;
  pricePerMonth: number | null;
  photo?: string;
};

type Payload = {
  items: Item[];
  dateFrom: string | null;
  dateTo: string | null;
  months: number;
  discountPct: number;
  pricePerMonthTotal: number;
  total: number;
  contact: { name: string; phone: string; email: string; comment: string };
};

const LEADS_PATH = "lib/cart-leads.json";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: Payload, leadId: string): string {
  const rows = data.items
    .map(
      (it) => `
        <tr>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;font-family:monospace">${escapeHtml(it.sideId)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee">${escapeHtml(it.address)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee">${escapeHtml(it.type)} ${escapeHtml(it.format)}</td>
          <td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right;white-space:nowrap">${
            it.pricePerMonth ? it.pricePerMonth.toLocaleString("ru-RU") + " ₽/мес" : "по запросу"
          }</td>
        </tr>`,
    )
    .join("");

  return `
    <h2 style="margin:0 0 8px">🎯 Подбор конструкций — ${escapeHtml(data.contact.name)}</h2>
    <p style="color:#666;margin:0 0 16px">Lead ID: <code>${leadId}</code></p>

    <h3 style="margin:16px 0 8px">Контакты</h3>
    <p style="margin:0">
      <strong>${escapeHtml(data.contact.name)}</strong><br>
      <a href="tel:${escapeHtml(data.contact.phone)}">${escapeHtml(data.contact.phone)}</a><br>
      ${data.contact.email ? `<a href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a>` : ""}
    </p>
    ${
      data.contact.comment
        ? `<p style="margin:8px 0;padding:8px 12px;background:#f6f5fa;border-left:3px solid #6F395D"><em>${escapeHtml(data.contact.comment)}</em></p>`
        : ""
    }

    <h3 style="margin:16px 0 8px">Период</h3>
    <p style="margin:0">
      ${data.dateFrom || "—"} → ${data.dateTo || "—"}
      ${data.months ? ` · ${data.months} мес` : ""}
      ${data.discountPct > 0 ? ` · скидка ${Math.round(data.discountPct * 100)}%` : ""}
    </p>

    <h3 style="margin:16px 0 8px">Подбор (${data.items.length})</h3>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      <thead>
        <tr style="background:#f6f5fa">
          <th style="padding:6px 10px;text-align:left">ID</th>
          <th style="padding:6px 10px;text-align:left">Адрес</th>
          <th style="padding:6px 10px;text-align:left">Тип</th>
          <th style="padding:6px 10px;text-align:right">Цена</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <p style="margin:16px 0;padding:12px 16px;background:#FFF7EE;border:1px solid #F57C28;border-radius:8px;font-size:16px">
      <strong>За месяц:</strong> ${data.pricePerMonthTotal.toLocaleString("ru-RU")} ₽<br>
      <strong>Итого за период:</strong> ${data.total.toLocaleString("ru-RU")} ₽
    </p>
    <p style="color:#999;font-size:12px">Без учёта печати макета и монтажа.</p>
  `;
}

function buildTelegramText(data: Payload, leadId: string): string {
  const itemLines = data.items
    .map(
      (it) =>
        `• \`${it.sideId}\` — ${it.address}\n  ${it.type} ${it.format} · ${
          it.pricePerMonth ? `${it.pricePerMonth.toLocaleString("ru-RU")} ₽/мес` : "по запросу"
        }`,
    )
    .join("\n");

  const lines = [
    `🎯 *Подбор конструкций* — ${data.contact.name}`,
    `Lead: \`${leadId}\``,
    "",
    `📞 ${data.contact.phone}`,
    data.contact.email ? `✉️ ${data.contact.email}` : null,
    data.contact.comment ? `💬 _${data.contact.comment}_` : null,
    "",
    `📅 ${data.dateFrom || "—"} → ${data.dateTo || "—"}` +
      (data.months ? ` (${data.months} мес)` : "") +
      (data.discountPct > 0 ? ` · −${Math.round(data.discountPct * 100)}%` : ""),
    "",
    `*Конструкции (${data.items.length}):*`,
    itemLines,
    "",
    `💰 За месяц: *${data.pricePerMonthTotal.toLocaleString("ru-RU")} ₽*`,
    `💰 Итого: *${data.total.toLocaleString("ru-RU")} ₽*`,
  ];
  return lines.filter(Boolean).join("\n");
}

async function sendEmail(payload: Payload, leadId: string): Promise<boolean> {
  if (!process.env.RESEND_API_KEY || !process.env.SALES_EMAIL) {
    console.warn("[cart/submit] Email skipped: RESEND_API_KEY or SALES_EMAIL missing");
    return false;
  }
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Зонд-Реклама <noreply@send.zondreklama.ru>",
      to: process.env.SALES_EMAIL,
      subject: `🎯 Подбор конструкций — ${payload.contact.name} (${payload.contact.phone})`,
      html: buildEmailHtml(payload, leadId),
      replyTo: payload.contact.email || undefined,
    });
    if (error) {
      console.error("[form] Resend error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[cart/submit] Email send failed:", err);
    return false;
  }
}

async function sendTelegram(payload: Payload, leadId: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[cart/submit] Telegram skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing");
    return false;
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildTelegramText(payload, leadId),
        parse_mode: "Markdown",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[cart/submit] Telegram non-OK:", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[cart/submit] Telegram send failed:", err);
    return false;
  }
}

async function appendLead(record: Record<string, unknown>): Promise<boolean> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("[cart/submit] Lead persistence skipped: GITHUB_TOKEN missing");
    return false;
  }
  try {
    const file = await getFile(LEADS_PATH);
    const leads: Record<string, unknown>[] = file ? JSON.parse(file.decoded) : [];
    leads.unshift(record);
    // ограничиваем лог, чтобы файл не пухнул бесконечно
    const trimmed = leads.slice(0, 500);
    await putFile(
      LEADS_PATH,
      JSON.stringify(trimmed, null, 2),
      `Cart lead: ${(record.contact as { name: string }).name}`,
      file?.sha,
    );
    return true;
  } catch (err) {
    console.error("[cart/submit] Persistence failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Payload;

    if (!payload?.contact?.name || !payload?.contact?.phone) {
      return NextResponse.json(
        { success: false, error: "Имя и телефон обязательны" },
        { status: 400 },
      );
    }
    if (!Array.isArray(payload.items) || payload.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Подбор пуст" },
        { status: 400 },
      );
    }

    const leadId = `cart-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const createdAt = new Date().toISOString();

    const lead = {
      id: leadId,
      createdAt,
      status: "new" as const,
      items: payload.items,
      dateFrom: payload.dateFrom,
      dateTo: payload.dateTo,
      months: payload.months,
      discountPct: payload.discountPct,
      pricePerMonthTotal: payload.pricePerMonthTotal,
      total: payload.total,
      contact: payload.contact,
    };

    // Параллельная отправка — все каналы не блокируют друг друга.
    const [emailOk, telegramOk, persistedOk] = await Promise.all([
      sendEmail(payload, leadId),
      sendTelegram(payload, leadId),
      appendLead(lead),
    ]);

    // Если ни один канал не сработал — это уже ошибка, пользователю показать.
    if (!emailOk && !telegramOk && !persistedOk) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Не удалось отправить заявку. Позвоните 8 (3822) 97-97-05 или напишите office@zondreklama.ru.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      leadId,
      channels: { email: emailOk, telegram: telegramOk, persisted: persistedOk },
    });
  } catch (err) {
    console.error("[cart/submit] Top-level error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
