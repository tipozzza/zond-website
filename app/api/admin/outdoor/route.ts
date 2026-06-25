import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import {
  friendlyGithubError,
  getFile,
  getFileWithFallback,
  putFile,
} from "@/lib/github-api";
import type { Side } from "@/lib/types";
import {
  SIDES_REPO_PATH,
  blankStatus,
  isSideStatus,
  makeSide,
  slugId,
  toNullableNumber,
} from "@/lib/outdoor-admin";

export const runtime = "nodejs";

const serialize = (sides: Side[]) => JSON.stringify(sides, null, 2);

export async function GET() {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const file = await getFileWithFallback(SIDES_REPO_PATH);
    const sides: Side[] = file ? JSON.parse(file.decoded) : [];
    return NextResponse.json({ sides, source: file?.source ?? "github" });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message, sides: [] }, { status });
  }
}

// Создание новой стороны (в т.ч. первой стороны новой конструкции).
export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const construction = String(body.construction ?? "").trim();
    const side = String(body.side ?? "").trim();
    if (!construction || !side)
      return NextResponse.json(
        { error: "Укажите номер конструкции и сторону" },
        { status: 400 },
      );

    const id = construction + side;
    const file = await getFile(SIDES_REPO_PATH);
    const sides: Side[] = file ? JSON.parse(file.decoded) : [];
    if (sides.some((s) => s.id === id || slugId(s.id) === slugId(id)))
      return NextResponse.json(
        { error: `Сторона ${id} уже существует` },
        { status: 400 },
      );

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);
    let status = blankStatus();
    if (body.status && typeof body.status === "object") {
      for (const [m, v] of Object.entries(body.status)) {
        if (m in status && isSideStatus(v)) (status as Record<string, unknown>)[m] = v;
      }
    }
    const newSide = makeSide(construction, side, {
      address: str(body.address),
      type: str(body.type) || undefined,
      format: str(body.format),
      material: str(body.material),
      direction: str(body.direction),
      illuminated: typeof body.illuminated === "boolean" ? body.illuminated : undefined,
      priceFinal: toNullableNumber(body.priceFinal),
      grp: toNullableNumber(body.grp),
      installCost: toNullableNumber(body.installCost),
      lat: toNullableNumber(body.lat),
      lng: toNullableNumber(body.lng),
      status,
    });
    sides.push(newSide);

    await putFile(SIDES_REPO_PATH, serialize(sides), `Outdoor: add side ${id}`, file?.sha);
    return NextResponse.json({ ok: true, side: newSide });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

// Удаление всей конструкции (всех её сторон) одним коммитом: ?construction=NNN
export async function DELETE(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const construction = new URL(req.url).searchParams.get("construction")?.trim();
    if (!construction)
      return NextResponse.json({ error: "Не указан номер конструкции" }, { status: 400 });

    const file = await getFile(SIDES_REPO_PATH);
    if (!file) return NextResponse.json({ error: "sides.json не найден" }, { status: 500 });
    const sides: Side[] = JSON.parse(file.decoded);
    const remaining = sides.filter((s) => s.construction !== construction);
    if (remaining.length === sides.length)
      return NextResponse.json({ error: "Конструкция не найдена" }, { status: 404 });

    await putFile(
      SIDES_REPO_PATH,
      serialize(remaining),
      `Outdoor: delete construction ${construction} (${sides.length - remaining.length} sides)`,
      file.sha,
    );
    return NextResponse.json({ ok: true, removed: sides.length - remaining.length });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
