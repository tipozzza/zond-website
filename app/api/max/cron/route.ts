import { NextResponse } from "next/server";

import { runCongratulations } from "@/lib/max/logic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ежедневные поздравления (ДР/годовщины/праздники) в группу MAX.
 * Дёргается внешним планировщиком (cron-job.org) раз в день в 06:00 UTC = 09:00 Томск:
 *   GET /api/max/cron?secret=MAX_CRON_SECRET
 */
async function run(req: Request): Promise<Response> {
  const secret = process.env.MAX_CRON_SECRET;
  const got = new URL(req.url).searchParams.get("secret");
  if (!secret || got !== secret) return new NextResponse("forbidden", { status: 403 });

  try {
    const sent = await runCongratulations({});
    return NextResponse.json({ ok: true, sent });
  } catch (e) {
    console.error("[max/cron] error", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export const GET = run;
export const POST = run;
