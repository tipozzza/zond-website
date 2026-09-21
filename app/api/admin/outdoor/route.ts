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
  MAX_BULK_SIDES,
  SIDES_REPO_PATH,
  blankStatus,
  isSideStatus,
  makeSide,
  sanitizePhotoFilename,
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

// Создание стороны. Принимает либо одну сторону (side), либо сразу набор
// (sides: ["А1","А2",…]) — у диджитал-конструкции 12 слотов, и создавать их
// по одному значило бы 12 коммитов и 12 пересборок сайта. Пакет уходит одним
// коммитом. photo_filename копируется из образца: все слоты одной
// конструкции показывают одно и то же фото, заново его грузить не нужно.
export async function POST(req: Request) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const construction = String(body.construction ?? "").trim();

    // Список сторон к созданию: sides[] (пакет) или одиночный side.
    const rawList: unknown[] = Array.isArray(body.sides)
      ? body.sides
      : body.side != null
        ? [body.side]
        : [];
    const requested: string[] = [];
    for (const v of rawList) {
      const label = String(v ?? "").trim();
      if (!label) continue;
      // Дубли внутри самого запроса игнорируем, сравнивая по тем же правилам,
      // что и уникальность id (кир. А/В ≡ лат. A/B).
      if (!requested.some((x) => slugId(x) === slugId(label))) requested.push(label);
    }

    if (!construction || requested.length === 0)
      return NextResponse.json(
        { error: "Укажите номер конструкции и сторону" },
        { status: 400 },
      );
    if (requested.length > MAX_BULK_SIDES)
      return NextResponse.json(
        { error: `За раз можно создать не больше ${MAX_BULK_SIDES} сторон` },
        { status: 400 },
      );

    const file = await getFile(SIDES_REPO_PATH);
    const sides: Side[] = file ? JSON.parse(file.decoded) : [];
    const taken = new Set(sides.map((s) => slugId(s.id)));

    const toCreate = requested.filter((label) => !taken.has(slugId(construction + label)));
    const skipped = requested.filter((label) => taken.has(slugId(construction + label)));

    if (toCreate.length === 0)
      return NextResponse.json(
        {
          error:
            skipped.length === 1
              ? `Сторона ${construction}${skipped[0]} уже существует`
              : `Все указанные стороны уже существуют: ${skipped.join(", ")}`,
        },
        { status: 400 },
      );

    const str = (v: unknown) => (typeof v === "string" ? v.trim() : undefined);
    let status = blankStatus();
    if (body.status && typeof body.status === "object") {
      for (const [m, v] of Object.entries(body.status)) {
        if (m in status && isSideStatus(v)) (status as Record<string, unknown>)[m] = v;
      }
    }
    const shared = {
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
      photo_filename: sanitizePhotoFilename(body.photo_filename),
    };

    const created: Side[] = toCreate.map((label) =>
      // Копия статусов на каждую сторону: общий объект нельзя — он один на всех
      // и правка одного слота меняла бы остальные.
      makeSide(construction, label, { ...shared, status: { ...status } }),
    );
    sides.push(...created);

    const message =
      created.length === 1
        ? `Outdoor: add side ${created[0].id}`
        : `Outdoor: add ${created.length} sides to construction ${construction}`;
    await putFile(SIDES_REPO_PATH, serialize(sides), message, file?.sha);
    return NextResponse.json({
      ok: true,
      side: created[0],
      created: created.map((s) => s.id),
      skipped: skipped.map((label) => construction + label),
    });
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
