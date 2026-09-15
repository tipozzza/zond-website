import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

// Поля приходят от посетителя — экранируем, чтобы в письмо не попал чужой HTML.
const esc = (v: unknown) =>
  String(v ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

export async function POST(req: Request) {
  try {
    const { name, phone, email, department, message, page } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Клиент создаём после проверки полей: без ключа конструктор бросает
    // исключение, и невалидный запрос получал бы 500 вместо честного 400.
    const resend = new Resend(process.env.RESEND_API_KEY!);

    // page приходит только из формы «Оставить заявку» (CTAForm) — с какой
    // страницы сайта пришёл клиент. Форма контактов это поле не шлёт.
    const pageLine = typeof page === "string" && page ? `<p><strong>Страница:</strong> ${esc(page)}</p>` : "";
    const heading = pageLine ? "Заявка с сайта zondreklama.ru" : "Сообщение с формы контактов на zondreklama.ru";

    const html = `
      <h2>${heading}</h2>
      <p><strong>От:</strong> ${esc(name)}</p>
      <p><strong>Телефон:</strong> ${esc(phone)}</p>
      <p><strong>Email:</strong> ${esc(email) || "—"}</p>
      <p><strong>Отдел / задача:</strong> ${esc(department) || "общий"}</p>
      ${pageLine}
      <hr/>
      <p><strong>Сообщение:</strong></p>
      <p>${esc(message).replace(/\n/g, "<br/>")}</p>
    `;

    const { error } = await resend.emails.send({
      from: "Зонд-Реклама <noreply@send.zondreklama.ru>",
      to: process.env.SALES_EMAIL!,
      subject: `${pageLine ? "Заявка с сайта" : "Контакт с сайта"}: ${name} → ${department || "общий"}`,
      html,
      replyTo: email || undefined,
    });
    if (error) {
      console.error("[form] Resend error:", error);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
