import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getFile, putFile } from "@/lib/github-api";

const NEWS_PATH = "lib/news.json";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
};

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug } = await params;
    const updated: Partial<NewsRecord> = await req.json();
    const file = await getFile(NEWS_PATH);
    if (!file) return NextResponse.json({ error: "news.json не найден" }, { status: 500 });
    const news: NewsRecord[] = JSON.parse(file.decoded);
    const idx = news.findIndex((n) => n.slug === slug);
    if (idx === -1) return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
    news[idx] = { ...news[idx], ...updated, slug };
    news.sort((a, b) => b.date.localeCompare(a.date));
    const newContent = JSON.stringify(news, null, 2);
    await putFile(NEWS_PATH, newContent, `Update news: ${slug}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug } = await params;
    const file = await getFile(NEWS_PATH);
    if (!file) return NextResponse.json({ error: "news.json не найден" }, { status: 500 });
    const news: NewsRecord[] = JSON.parse(file.decoded);
    const filtered = news.filter((n) => n.slug !== slug);
    if (filtered.length === news.length)
      return NextResponse.json({ error: "Новость не найдена" }, { status: 404 });
    const newContent = JSON.stringify(filtered, null, 2);
    await putFile(NEWS_PATH, newContent, `Delete news: ${slug}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
