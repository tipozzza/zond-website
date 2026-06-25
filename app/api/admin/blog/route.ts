import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile, getFileWithFallback, putFile } from "@/lib/github-api";
import {
  computeReadingMinutes,
  isValidCategory,
  type BlogPost,
} from "@/lib/types/blog";

const BLOG_PATH = "lib/blog.json";

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const file = await getFileWithFallback(BLOG_PATH);
    const blog: BlogPost[] = file ? JSON.parse(file.decoded) : [];
    return NextResponse.json({ blog, source: file?.source ?? "github" });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message, blog: [] }, { status });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const newItem: BlogPost = await req.json();
    if (
      !newItem.slug ||
      !newItem.title ||
      !newItem.date ||
      !newItem.metaDescription ||
      !newItem.content
    ) {
      return NextResponse.json(
        { error: "Заполните slug, title, date, metaDescription, content" },
        { status: 400 },
      );
    }
    if (!isValidCategory(newItem.category)) {
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });
    }
    newItem.tags = Array.isArray(newItem.tags) ? newItem.tags : [];
    newItem.readingMinutes = computeReadingMinutes(newItem.content);

    const file = await getFile(BLOG_PATH);
    const blog: BlogPost[] = file ? JSON.parse(file.decoded) : [];
    if (blog.find((b) => b.slug === newItem.slug)) {
      return NextResponse.json(
        { error: "Статья с таким slug уже существует" },
        { status: 400 },
      );
    }
    blog.unshift(newItem);
    blog.sort((a, b) => b.date.localeCompare(a.date));
    const newContent = JSON.stringify(blog, null, 2);
    await putFile(BLOG_PATH, newContent, `Add blog post: ${newItem.title}`, file?.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
