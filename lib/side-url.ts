import type { Side } from "@/lib/types";

/**
 * Единый источник правды для URL детальной страницы стороны наружки.
 *
 * Канонический ref = {номер конструкции без ведущих нулей}{латинская буква}.
 * Под-индекс (28A1) сохраняется ТОЛЬКО если у панелей одной стороны
 * (группа construction × буква) РАЗНЫЕ photo_filename. Если фото одинаковые —
 * панели схлопываются в одну букву (/outdoor/28A), т.к. это одно и то же фото.
 *
 * Карта строится из массива сторон (id → canonical), потому что решение
 * «схлопывать или нет» зависит от всей группы, а не от одной строки.
 */
export const foldSide = (s: string) =>
  decodeURIComponent(s).trim().toUpperCase().replace(/А/g, "A").replace(/В/g, "B");

export function buildCanonicalMap(sides: Side[]): Map<string, string> {
  const groups = new Map<string, Side[]>();
  for (const s of sides) {
    const key = `${parseInt(s.construction, 10)}|${foldSide(s.side)[0] ?? ""}`;
    const arr = groups.get(key);
    if (arr) arr.push(s);
    else groups.set(key, [s]);
  }
  const map = new Map<string, string>();
  for (const [key, members] of groups) {
    const [num, letter] = key.split("|");
    const collapse = new Set(members.map((m) => m.photo_filename ?? "")).size === 1;
    for (const s of members) {
      map.set(s.id, collapse ? `${num}${letter}` : `${num}${foldSide(s.side)}`);
    }
  }
  return map;
}
