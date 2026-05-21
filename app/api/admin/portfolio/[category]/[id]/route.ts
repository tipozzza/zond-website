import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getFile, putFile, deleteFile } from "@/lib/github-api";
import { isValidCategory, type PortfolioData } from "@/lib/types/portfolio";

const PORTFOLIO_PATH = "data/portfolio.json";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ category: string; id: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { category, id } = await params;
    if (!isValidCategory(category))
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });
    const { title, description } = await req.json();

    const file = await getFile(PORTFOLIO_PATH);
    if (!file) return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
    const data: PortfolioData = JSON.parse(file.decoded);
    const item = data[category].items.find((it) => it.id === id);
    if (!item) return NextResponse.json({ error: "Item не найден" }, { status: 404 });

    if (typeof title === "string") item.title = title.trim();
    if (typeof description === "string") item.description = description.trim();

    const newContent = JSON.stringify(data, null, 2);
    await putFile(PORTFOLIO_PATH, newContent, `Portfolio: edit ${category}/${id}`, file.sha);
    return NextResponse.json({ ok: true, item });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ category: string; id: string }> },
) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { category, id } = await params;
    if (!isValidCategory(category))
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });

    const file = await getFile(PORTFOLIO_PATH);
    if (!file) return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
    const data: PortfolioData = JSON.parse(file.decoded);
    const item = data[category].items.find((it) => it.id === id);
    if (!item) return NextResponse.json({ error: "Item не найден" }, { status: 404 });

    // 1. Try to delete the image file
    const imageRepoPath = item.image.startsWith("/")
      ? `public${item.image}`
      : `public/${item.image}`;
    try {
      const imageFile = await getFile(imageRepoPath);
      if (imageFile) {
        await deleteFile(
          imageRepoPath,
          `Portfolio: delete image for ${category}/${id}`,
          imageFile.sha,
        );
      }
    } catch (e) {
      // Image deletion is best-effort; continue with JSON update
      console.warn("Image delete failed:", e);
    }

    // 2. Remove from JSON
    data[category].items = data[category].items.filter((it) => it.id !== id);
    const newContent = JSON.stringify(data, null, 2);
    await putFile(PORTFOLIO_PATH, newContent, `Portfolio: delete ${category}/${id}`, file.sha);

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
