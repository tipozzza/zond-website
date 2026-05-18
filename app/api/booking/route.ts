import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { side, name, phone, email, months, notes } = body;

    if (!name || !phone || !side) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const monthsList = (months || []).join(", ");

    const html = `
      <h2>Новая заявка с сайта zondreklama.ru</h2>
      <p><strong>Клиент:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email || "—"}</p>
      <hr/>
      <h3>Сторона ${side.id}</h3>
      <p><strong>Адрес:</strong> ${side.address}</p>
      <p><strong>Тип:</strong> ${side.type} ${side.format}</p>
      <p><strong>Цена:</strong> ${side.priceFinal} ₽/мес</p>
      <p><strong>Желаемые месяцы:</strong> ${monthsList}</p>
      <hr/>
      <p><strong>Комментарий:</strong></p>
      <p>${notes || "—"}</p>
    `;

    await resend.emails.send({
      from: "Zond Website <onboarding@resend.dev>",
      to: process.env.SALES_EMAIL!,
      subject: `Бронь стороны ${side.id} — ${name}`,
      html,
      replyTo: email || undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Booking error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
