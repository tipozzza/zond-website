import type { Side } from "@/lib/types";

/**
 * Единый источник правды для URL детальной страницы стороны наружки.
 *
 * Канонический ref = {номер конструкции без ведущих нулей}{латинская буква A/B}
 * {под-индекс, если на этой (конструкция × буква) больше одной стороны}.
 *   - Тривижн/диджитл 28 (A1,A2,A3,B) → 28A1, 28A2, 28A3, 28B.
 *   - Простая 118 (одна A + одна B) → 118A, 118B.
 *   - Односторонняя → {номер}{буква}.
 * Под-индекс НЕ зависит от фото: A1/A2/A3 — это ОТДЕЛЬНЫЕ стороны (у каждой
 * свой адрес), их не объединяют. Карта строится из всей группы, т.к. наличие
 * под-индекса зависит от числа сторон на букву.
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
    const multi = members.length > 1;
    for (const s of members) {
      map.set(s.id, multi ? `${num}${foldSide(s.side)}` : `${num}${letter}`);
    }
  }
  return map;
}
