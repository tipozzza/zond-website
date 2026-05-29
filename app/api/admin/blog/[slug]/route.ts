import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile, putFile } from "@/lib/github-api";
import {
  computeReadingMinutes,
  isValidCategory,
  type BlogPost,
} from "@/lib/types/blog";

const BLOG_PATH = "lib/blog.json";

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { slug } = await params;
    const updated: Partial<BlogPost> = await req.json();
    if (updated.category && !isValidCategory(updated.category)) {
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });
    }
    const file = await getFile(BLOG_PATH);
    if (!file) return NextResponse.json({ error: "blog.json не найден" }, { status: 500 });
    const blog: BlogPost[] = JSON.parse(file.decoded);
    const idx = blog.findIndex((b) => b.slug === slug);
    if (idx === -1) return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    const merged: BlogPost = { ...blog[idx], ...updated, slug };
    merged.tags = Array.isArray(merged.tags) ? merged.tags : [];
    merged.readingMinutes = computeReadingMinutes(merged.content);
    blog[idx] = merged;
    blog.sort((a, b) => b.date.localeCompare(a.date));
    const newContent = JSON.stringify(blog, null, 2);
    await putFile(BLOG_PATH, newContent, `Update blog post: ${slug}`, file.sha);
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
    const file = await getFile(BLOG_PATH);
    if (!file) return NextResponse.json({ error: "blog.json не найден" }, { status: 500 });
    const blog: BlogPost[] = JSON.parse(file.decoded);
    const filtered = blog.filter((b) => b.slug !== slug);
    if (filtered.length === blog.length)
      return NextResponse.json({ error: "Статья не найдена" }, { status: 404 });
    const newContent = JSON.stringify(filtered, null, 2);
    await putFile(BLOG_PATH, newContent, `Delete blog post: ${slug}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
