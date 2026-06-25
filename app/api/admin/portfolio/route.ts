import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFileWithFallback } from "@/lib/github-api";
import type { PortfolioData } from "@/lib/types/portfolio";

const PORTFOLIO_PATH = "data/portfolio.json";

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const file = await getFileWithFallback(PORTFOLIO_PATH);
    if (!file) return NextResponse.json({ error: "portfolio.json не найден" }, { status: 500 });
    const data: PortfolioData = JSON.parse(file.decoded);
    return NextResponse.json({ portfolio: data, source: file.source });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
