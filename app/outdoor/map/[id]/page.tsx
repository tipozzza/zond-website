import { redirect, permanentRedirect } from "next/navigation";
import sidesJson from "@/public/data/sides.json";
import type { Side } from "@/lib/types";
import { buildCanonicalMap, foldSide } from "@/lib/side-url";

/**
 * Легаси-ссылки из статусов 1С: /outdoor/map/<номер> (напр. /outdoor/map/007).
 * id — номер КОНСТРУКЦИИ (с ведущими нулями или без), не стороны. Находим
 * сторону A этой конструкции и делаем постоянный редирект (308) на её
 * каноническую детальную страницу /outdoor/{canonicalRef}.
 * Пример: /outdoor/map/007 → /outdoor/7A1.
 */
const SIDES = (Array.isArray(sidesJson) ? sidesJson : ((sidesJson as { sides?: Side[] }).sides ?? [])) as Side[];
const CANON = buildCanonicalMap(SIDES);
const canonicalRef = (s: Side) => CANON.get(s.id) ?? `${parseInt(s.construction, 10)}${foldSide(s.side)}`;

// Сторона A конструкции: первая по натуральному порядку среди сторон на «A».
function findConstructionSideA(raw: string): Side | undefined {
  const m = foldSide(raw).match(/^0*(\d+)/); // номер без ведущих нулей
  if (!m) return undefined;
  const num = parseInt(m[1], 10);
  const cands = SIDES.filter((s) => parseInt(s.construction, 10) === num);
  if (cands.length === 0) return undefined;
  const aSides = cands
    .filter((s) => foldSide(s.side).startsWith("A"))
    .sort((a, b) => a.side.localeCompare(b.side, "ru", { numeric: true }));
  return aSides[0] ?? cands[0];
}

export const dynamicParams = true;

export default async function OutdoorMapRedirect({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const side = findConstructionSideA(id);
  // Нет такой конструкции — мягко уводим на каталог, без 404-краша.
  if (!side) redirect("/outdoor");
  // Постоянный редирект (308) на детальную страницу стороны A.
  permanentRedirect(`/outdoor/${canonicalRef(side)}`);
}
