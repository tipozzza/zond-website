import { NextResponse } from "next/server";

import { handleUpdate } from "@/lib/max/logic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Приём событий бота MAX «Команда ZOND».
 * MAX шлёт сюда POST с обновлениями. Защищено секретом в заголовке
 * X-Max-Bot-Api-Secret (задаётся при подписке вебхука).
 */
export async function POST(req: Request): Promise<Response> {
  const secret = process.env.MAX_WEBHOOK_SECRET;
  if (secret) {
    const got = req.headers.get("x-max-bot-api-secret");
    if (got !== secret) return new NextResponse("forbidden", { status: 403 });
  }

  let update: unknown;
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  // диагностика: видим тип апдейта и payload callback в логах приложения
  try {
    const u = update as { update_type?: string; callback?: { payload?: string } };
    console.log("[max/webhook] update", u?.update_type, u?.callback?.payload ?? "");
  } catch {
    /* ignore */
  }

  try {
    await handleUpdate(update as Record<string, unknown>);
  } catch (e) {
    console.error("[max/webhook] handleUpdate failed", e);
  }
  // Всегда отвечаем 200, чтобы MAX не повторял доставку.
  return NextResponse.json({ ok: true });
}

export function GET(): Response {
  return NextResponse.json({ ok: true, service: "max-webhook" });
}
