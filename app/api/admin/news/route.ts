import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile, getFileWithFallback } from "@/lib/github-api";
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

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const file = await getFileWithFallback(NEWS_PATH);
    const news: NewsRecord[] = file ? JSON.parse(file.decoded) : [];
    return NextResponse.json({ news, source: file?.source ?? "github" });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message, news: [] }, { status });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const newItem: NewsRecord = await req.json();
    if (!newItem.slug || !newItem.title || !newItem.date) {
      return NextResponse.json({ error: "Заполните slug, title, date" }, { status: 400 });
    }
    const file = await getFile(NEWS_PATH);
    const news: NewsRecord[] = file ? JSON.parse(file.decoded) : [];
    if (news.find((n) => n.slug === newItem.slug)) {
      return NextResponse.json(
        { error: "Новость с таким slug уже существует" },
        { status: 400 },
      );
    }
    newItem.gallery = Array.isArray(newItem.gallery) ? newItem.gallery : [];
    news.unshift(newItem);
    news.sort((a, b) => b.date.localeCompare(a.date));
    await writeNewsBoth(news, `Add news: ${newItem.title}`, file?.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
