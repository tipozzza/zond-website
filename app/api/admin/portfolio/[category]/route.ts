import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { verifySession } from "@/lib/auth";
import { getFile, putFile, putBinaryFile } from "@/lib/github-api";
import { isValidCategory, type PortfolioData, type PortfolioItem } from "@/lib/types/portfolio";

export const runtime = "nodejs";

const PORTFOLIO_PATH = "data/portfolio.json";

export async function GET(_req: Request, { params }: { params: Promise<{ category: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { category } = await params;
  if (!isValidCategory(category))
    return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });
  const file = await getFile(PORTFOLIO_PATH);
  if (!file) return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
  const data: PortfolioData = JSON.parse(file.decoded);
  return NextResponse.json({ category: data[category] });
}

export async function POST(req: Request, { params }: { params: Promise<{ category: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { category } = await params;
    if (!isValidCategory(category))
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });

    const form = await req.formData();
    const file = form.get("image") as File | null;
    const title = (form.get("title") as string) || "";
    const description = (form.get("description") as string) || "";

    if (!file) return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    if (file.size > 8 * 1024 * 1024)
      return NextResponse.json({ error: "Файл больше 8 МБ" }, { status: 400 });
    if (!title.trim())
      return NextResponse.json({ error: "Заголовок обязателен" }, { status: 400 });

    const id = randomUUID();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const filename = `${id}.${ext}`;
    const imagePath = `public/images/portfolio/${category}/${filename}`;
    const imageUrl = `/images/portfolio/${category}/${filename}`;

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    // 1. Commit the binary image first
    await putBinaryFile(imagePath, base64, `Portfolio: add image ${filename} to ${category}`);

    // 2. Update portfolio.json
    const portfolioFile = await getFile(PORTFOLIO_PATH);
    if (!portfolioFile)
      return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
    const data: PortfolioData = JSON.parse(portfolioFile.decoded);

    const existing = data[category].items;
    const maxOrder = existing.reduce((m, it) => Math.max(m, it.order ?? 0), 0);
    const item: PortfolioItem = {
      id,
      image: imageUrl,
      title: title.trim(),
      description: description.trim(),
      order: maxOrder + 1,
      createdAt: new Date().toISOString(),
    };
    data[category].items.push(item);

    const newContent = JSON.stringify(data, null, 2);
    await putFile(
      PORTFOLIO_PATH,
      newContent,
      `Portfolio: add "${item.title}" to ${category}`,
      portfolioFile.sha,
    );

    return NextResponse.json({ ok: true, item });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
