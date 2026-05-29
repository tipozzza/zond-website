import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile, putFile } from "@/lib/github-api";

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

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const file = await getFile(NEWS_PATH);
  const news: NewsRecord[] = file ? JSON.parse(file.decoded) : [];
  return NextResponse.json({ news });
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
    news.unshift(newItem);
    news.sort((a, b) => b.date.localeCompare(a.date));
    const newContent = JSON.stringify(news, null, 2);
    await putFile(NEWS_PATH, newContent, `Add news: ${newItem.title}`, file?.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
