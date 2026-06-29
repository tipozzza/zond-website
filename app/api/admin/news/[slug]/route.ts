import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile } from "@/lib/github-api";
import { NEWS_LIB_PATH as NEWS_PATH, writeNewsBoth } from "@/lib/news-store";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
  gallery?: string[];
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
    await writeNewsBoth(news, `Update news: ${slug}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
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
    await writeNewsBoth(filtered, `Delete news: ${slug}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
