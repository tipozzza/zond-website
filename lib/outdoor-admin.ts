import type { Side, SideStatus } from "@/lib/types";

/**
 * Общие хелперы для админ-модуля наружки. Источник правды по данным —
 * public/data/sides.json (его же читает публичный сайт: список, карта,
 * /outdoor/[id]). Фото лежат в public/images/constructions/ и подключаются
 * публично как /images/constructions/<photo_filename>.
 */

export const SIDES_REPO_PATH = "public/data/sides.json";
export const PHOTO_DIR_REPO = "public/images/constructions";
export const PHOTO_URL_PREFIX = "/images/constructions";

// Значения для выпадающих списков формы (тип берём из реальных данных).
export const SIDE_TYPES = ["Digital", "Щит", "Сити-формат", "Супер-сайт", "Тривижн"];
export const SIDE_STATUSES: SideStatus[] = ["free", "busy", "partial", "reserved"];

/**
 * Нормализация id для проверки уникальности и совместимости со ссылками
 * /outdoor/[id]: маршрут (app/outdoor/[id]/page.tsx) ищет сторону по
 * slug(id), сворачивая кириллические двойники А→A, В→B. Поэтому уникальность
 * проверяем и по сырому id, и по slug.
 */
export const slugId = (s: string) =>
  s.trim().toUpperCase().replace(/А/g, "A").replace(/В/g, "B");

export function blankStatus(): Side["status"] {
  return {
    jan: "free", feb: "free", mar: "free", apr: "free", may: "free", june: "free",
    july: "free", aug: "free", sep: "free", oct: "free", nov: "free", dec: "free",
  };
}

/**
 * Фабрика новой стороны со всеми обязательными полями Side. id = construction+side.
 * Партиал переопределяет дефолты. Не добавляем легаси-поля
 * (photo_url_original/map_url_original) — публичный сайт их не использует.
 */
export function makeSide(construction: string, side: string, partial: Partial<Side> = {}): Side {
  return {
    id: construction + side,
    construction,
    side,
    address: partial.address ?? "",
    type: partial.type ?? "Щит",
    format: partial.format ?? "",
    material: partial.material ?? "",
    direction: partial.direction ?? "",
    installCost: partial.installCost ?? null,
    priceFinal: partial.priceFinal ?? null,
    grp: partial.grp ?? null,
    lat: partial.lat ?? null,
    lng: partial.lng ?? null,
    illuminated: partial.illuminated ?? false,
    photo_filename: partial.photo_filename ?? null,
    status: partial.status ?? blankStatus(),
  };
}

export function isSideStatus(v: unknown): v is SideStatus {
  return v === "free" || v === "busy" || v === "partial" || v === "reserved";
}

/** Безопасное число из формы: "" / null → null, иначе Number или null при NaN. */
export function toNullableNumber(raw: unknown): number | null {
  if (raw == null || raw === "") return null;
  const n = typeof raw === "number" ? raw : Number(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}
