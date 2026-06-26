import { NextResponse } from "next/server";

import { handleUpdate } from "@/lib/max-client/logic";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = (process.env.MAX_CLIENT_WEBHOOK_SECRET || "").trim();
  const got = (req.headers.get("X-Max-Bot-Api-Secret") || "").trim();
  if (secret && got !== secret) return new NextResponse("forbidden", { status: 403 });

  let update: Record<string, unknown> = {};
  try {
    update = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }
  await handleUpdate(update);
  return NextResponse.json({ ok: true });
}
