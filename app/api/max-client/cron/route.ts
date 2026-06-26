import { NextResponse } from "next/server";

import { runReminders } from "@/lib/max-client/logic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Напоминания менеджеру о незакрытых обращениях.
 * Дёргается внешним cron РАЗ В ЧАС: GET /api/max-client/cron?secret=MAX_CLIENT_CRON_SECRET
 */
async function run(req: Request): Promise<Response> {
  const secret = (process.env.MAX_CLIENT_CRON_SECRET || "").trim();
  const got = (new URL(req.url).searchParams.get("secret") || "").trim();
  if (!secret || got !== secret) return new NextResponse("forbidden", { status: 403 });

  try {
    const sent = await runReminders();
    return NextResponse.json({ ok: true, sent });
  } catch (e) {
    console.error("[max-client/cron] error", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export const GET = run;
export const POST = run;
