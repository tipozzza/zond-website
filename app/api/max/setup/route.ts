import { NextResponse } from "next/server";

import { getMe, subscribeWebhook } from "@/lib/max/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Разовая настройка: подписывает бота на webhook и проверяет токен.
 * Вызвать один раз после деплоя:
 *   GET /api/max/setup?secret=MAX_CRON_SECRET
 *
 * URL вебхука берётся из origin запроса (или env SITE_URL).
 */
export async function GET(req: Request): Promise<Response> {
  const secret = (process.env.MAX_CRON_SECRET || "").trim();
  const got = (new URL(req.url).searchParams.get("secret") || "").trim();
  if (!secret || got !== secret) return new NextResponse("forbidden", { status: 403 });

  const webhookSecret = process.env.MAX_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ ok: false, error: "MAX_WEBHOOK_SECRET не задан" }, { status: 400 });
  }

  const origin = process.env.SITE_URL || new URL(req.url).origin;
  const webhookUrl = `${origin}/api/max/webhook`;

  try {
    const me = await getMe();
    const sub = await subscribeWebhook(webhookUrl, webhookSecret);
    return NextResponse.json({ ok: true, webhookUrl, me, subscription: sub });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
