import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { friendlyGithubError, getFile, putFile } from "@/lib/github-api";
import type { Side } from "@/lib/types";
import {
  SIDES_REPO_PATH,
  isSideStatus,
  slugId,
  toNullableNumber,
} from "@/lib/outdoor-admin";

export const runtime = "nodejs";

const serialize = (sides: Side[]) => JSON.stringify(sides, null, 2);

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const targetId = decodeURIComponent(id);
    const body = await req.json();

    const file = await getFile(SIDES_REPO_PATH);
    if (!file) return NextResponse.json({ error: "sides.json не найден" }, { status: 500 });
    const sides: Side[] = JSON.parse(file.decoded);
    const idx = sides.findIndex((s) => s.id === targetId);
    if (idx < 0) return NextResponse.json({ error: "Сторона не найдена" }, { status: 404 });

    // Спред сохраняет легаси-поля (photo_url_original и пр.), которых нет в типе.
    const next: Side = { ...sides[idx] };

    const assignStr = (k: "address" | "type" | "format" | "material" | "direction") => {
      if (typeof body[k] === "string") next[k] = body[k].trim();
    };
    assignStr("address");
    assignStr("type");
    assignStr("format");
    assignStr("material");
    assignStr("direction");

    if (typeof body.illuminated === "boolean") next.illuminated = body.illuminated;

    const assignNum = (k: "priceFinal" | "grp" | "installCost" | "lat" | "lng") => {
      if (k in body) next[k] = toNullableNumber(body[k]);
    };
    assignNum("priceFinal");
    assignNum("grp");
    assignNum("installCost");
    assignNum("lat");
    assignNum("lng");

    if (body.status && typeof body.status === "object") {
      const status = { ...next.status };
      for (const [month, val] of Object.entries(body.status)) {
        if (month in status && isSideStatus(val)) {
          (status as Record<string, unknown>)[month] = val;
        }
      }
      next.status = status;
    }

    // Номер/сторона редактируемы. id пересобираем ТОЛЬКО при их изменении,
    // чтобы не трогать уже работающие ссылки /outdoor/[id] у остальных сторон.
    const newConstruction =
      typeof body.construction === "string" && body.construction.trim()
        ? body.construction.trim()
        : next.construction;
    const newSide =
      typeof body.side === "string" && body.side.trim() ? body.side.trim() : next.side;
    next.construction = newConstruction;
    next.side = newSide;
    if (newConstruction !== sides[idx].construction || newSide !== sides[idx].side) {
      const newId = newConstruction + newSide;
      if (sides.some((s, i) => i !== idx && (s.id === newId || slugId(s.id) === slugId(newId))))
        return NextResponse.json(
          { error: `Сторона ${newId} уже существует` },
          { status: 400 },
        );
      next.id = newId;
    }

    sides[idx] = next;
    await putFile(SIDES_REPO_PATH, serialize(sides), `Outdoor: edit side ${next.id}`, file.sha);
    return NextResponse.json({ ok: true, side: next });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const targetId = decodeURIComponent(id);

    const file = await getFile(SIDES_REPO_PATH);
    if (!file) return NextResponse.json({ error: "sides.json не найден" }, { status: 500 });
    const sides: Side[] = JSON.parse(file.decoded);
    const remaining = sides.filter((s) => s.id !== targetId);
    if (remaining.length === sides.length)
      return NextResponse.json({ error: "Сторона не найдена" }, { status: 404 });

    // Фото намеренно НЕ удаляем: легаси-файлы (007a_l_d.jpg) могут
    // переиспользоваться, удалять рискованно. Орфан-картинки безвредны.
    await putFile(SIDES_REPO_PATH, serialize(remaining), `Outdoor: delete side ${targetId}`, file.sha);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
