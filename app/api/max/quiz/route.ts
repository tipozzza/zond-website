import { NextResponse } from "next/server";

import { runQuiz } from "@/lib/max/quiz";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Викторина: разбор прошлого вопроса + публикация нового в группе.
 * Дёргается внешним cron 2 раза в день (10:00 и 15:00 Томск):
 *   GET /api/max/quiz?secret=MAX_CRON_SECRET
 */
async function run(req: Request): Promise<Response> {
  const secret = (process.env.MAX_CRON_SECRET || "").trim();
  const got = (new URL(req.url).searchParams.get("secret") || "").trim();
  if (!secret || got !== secret) return new NextResponse("forbidden", { status: 403 });
  try {
    await runQuiz();
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[max/quiz] error", e);
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}

export const GET = run;
export const POST = run;
