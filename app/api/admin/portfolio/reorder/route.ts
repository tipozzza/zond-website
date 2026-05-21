import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { getFile, putFile } from "@/lib/github-api";
import { isValidCategory, type PortfolioData } from "@/lib/types/portfolio";

const PORTFOLIO_PATH = "data/portfolio.json";

export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { category, orderedIds } = (await req.json()) as {
      category: string;
      orderedIds: string[];
    };
    if (!isValidCategory(category))
      return NextResponse.json({ error: "Неизвестная категория" }, { status: 400 });
    if (!Array.isArray(orderedIds))
      return NextResponse.json({ error: "orderedIds должен быть массивом" }, { status: 400 });

    const file = await getFile(PORTFOLIO_PATH);
    if (!file) return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
    const data: PortfolioData = JSON.parse(file.decoded);

    const byId = new Map(data[category].items.map((it) => [it.id, it]));
    const reordered = orderedIds
      .map((id, idx) => {
        const it = byId.get(id);
        if (!it) return null;
        return { ...it, order: idx + 1 };
      })
      .filter((it): it is NonNullable<typeof it> => it !== null);

    // Append any items not in orderedIds (safety net)
    const reorderedIds = new Set(reordered.map((it) => it.id));
    const leftovers = data[category].items
      .filter((it) => !reorderedIds.has(it.id))
      .map((it, i) => ({ ...it, order: reordered.length + i + 1 }));

    data[category].items = [...reordered, ...leftovers];

    const newContent = JSON.stringify(data, null, 2);
    await putFile(PORTFOLIO_PATH, newContent, `Portfolio: reorder ${category}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
