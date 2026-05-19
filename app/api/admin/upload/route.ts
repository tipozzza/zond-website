import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { putBinaryFile } from "@/lib/github-api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    if (file.size > 5 * 1024 * 1024)
      return NextResponse.json({ error: "Файл больше 5 МБ" }, { status: 400 });

    const rawSlug = (formData.get("slug") as string) || "untitled";
    const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const date = (formData.get("date") as string) || new Date().toISOString().slice(0, 10);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `news-${date}-${slug}.${ext}`;
    const path = `public/images/news/${filename}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    await putBinaryFile(path, base64, `Add news image: ${filename}`);

    return NextResponse.json({ ok: true, url: `/images/news/${filename}` });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
