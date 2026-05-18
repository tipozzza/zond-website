import { NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const { name, phone, email, department, message } = await req.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const html = `
      <h2>Сообщение с формы контактов на zondreklama.ru</h2>
      <p><strong>От:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>
      <p><strong>Отдел:</strong> ${department || "общий"}</p>
      <hr/>
      <p><strong>Сообщение:</strong></p>
      <p>${message}</p>
    `;

    await resend.emails.send({
      from: "Zond Website <onboarding@resend.dev>",
      to: process.env.SALES_EMAIL!,
      subject: `Контакт с сайта: ${name} → ${department || "общий"}`,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
