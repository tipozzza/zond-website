import { NextResponse } from "next/server";

import { getMe, subscribeWebhook } from "@/lib/max-client/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function run(req: Request): Promise<Response> {
  const secret = (process.env.MAX_CLIENT_CRON_SECRET || "").trim();
  const got = (new URL(req.url).searchParams.get("secret") || "").trim();
  if (!secret || got !== secret) return new NextResponse("forbidden", { status: 403 });

  try {
    const me = await getMe();
    const origin = process.env.SITE_URL || "https://zondreklama.ru";
    const webhookUrl = `${origin}/api/max-client/webhook`;
    const subscription = await subscribeWebhook(webhookUrl, (process.env.MAX_CLIENT_WEBHOOK_SECRET || "").trim());
    return NextResponse.json({ ok: true, webhookUrl, me, subscription });
  } catch (e) {
    console.error("[max-client/setup] error", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export const GET = run;
export const POST = run;
