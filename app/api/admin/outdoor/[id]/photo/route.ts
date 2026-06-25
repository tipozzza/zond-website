import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { verifySession } from "@/lib/auth";
import {
  ensureDirectory,
  friendlyGithubError,
  getFile,
  putBinaryFile,
  putFile,
} from "@/lib/github-api";
import type { Side } from "@/lib/types";
import { PHOTO_DIR_REPO, SIDES_REPO_PATH } from "@/lib/outdoor-admin";

export const runtime = "nodejs";

// Загрузка/замена фото конкретной стороны. Файл коммитим в
// public/images/constructions/, затем прописываем photo_filename в sides.json —
// тем самым фото меняется и в админке, и публично (тот же источник).
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await params;
    const targetId = decodeURIComponent(id);

    const form = await req.formData();
    const file = form.get("image") as File | null;
    if (!file) return NextResponse.json({ error: "Файл не передан" }, { status: 400 });
    if (!file.type.startsWith("image/"))
      return NextResponse.json({ error: "Нужен файл изображения" }, { status: 400 });
    if (file.size > 8 * 1024 * 1024)
      return NextResponse.json({ error: "Файл больше 8 МБ" }, { status: 400 });

    // Уникальное имя (UUID) — исключает коллизии и кэш старой картинки в браузере.
    const filename = `${randomUUID()}.jpg`;
    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    await ensureDirectory(PHOTO_DIR_REPO);
    await putBinaryFile(
      `${PHOTO_DIR_REPO}/${filename}`,
      base64,
      `Outdoor: photo ${filename} for ${targetId}`,
    );

    const sidesFile = await getFile(SIDES_REPO_PATH);
    if (!sidesFile) return NextResponse.json({ error: "sides.json не найден" }, { status: 500 });
    const sides: Side[] = JSON.parse(sidesFile.decoded);
    const side = sides.find((s) => s.id === targetId);
    if (!side) return NextResponse.json({ error: "Сторона не найдена" }, { status: 404 });

    side.photo_filename = filename;
    await putFile(
      SIDES_REPO_PATH,
      JSON.stringify(sides, null, 2),
      `Outdoor: set photo for ${targetId}`,
      sidesFile.sha,
    );

    return NextResponse.json({ ok: true, photo_filename: filename });
  } catch (err) {
    const { status, message } = friendlyGithubError(err);
    return NextResponse.json({ error: message }, { status });
  }
}
