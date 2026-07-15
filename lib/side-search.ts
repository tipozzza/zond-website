import type { Side } from "./types";

/**
 * Нормализация строки для поиска: нижний регистр, ё→е, схлопывание пробелов.
 */
export function normalizeSearch(value: string): string {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim();
}

export type ConstructionMatch = {
  construction: string;
  address: string;
  side: Side; // репрезентативная сторона конструкции (для координат/фокуса)
  score: number;
};

/**
 * Клиентский поиск конструкций по номеру и по адресу.
 *
 * Логика:
 *  - Один числовой токен («178», «7а1») трактуем как номер конструкции/стороны.
 *  - Иначе это адресный запрос: все слова запроса должны встречаться в адресе
 *    (в любом порядке), поэтому «комсомольский 49» находит «Комсомольский пр, 49».
 *
 * Результат сгруппирован по конструкции (одна конструкция — один пункт),
 * отсортирован по релевантности и номеру.
 */
export function findConstructionMatches(
  sides: Side[],
  query: string,
  limit = 6
): ConstructionMatch[] {
  const q = normalizeSearch(query);
  if (!q) return [];

  const tokens = q.split(" ").filter(Boolean);
  const isSingleNumber =
    tokens.length === 1 && /^\d+[а-я]?\d*$/i.test(tokens[0]);

  const byConstruction = new Map<string, ConstructionMatch>();

  for (const side of sides) {
    if (side.lat == null || side.lng == null) continue;

    const constr = normalizeSearch(side.construction);
    const id = normalizeSearch(side.id);
    const addr = normalizeSearch(side.address);

    let score = 0;
    if (isSingleNumber) {
      if (constr === q) score = 100;
      else if (id === q) score = 96;
      else if (constr.startsWith(q)) score = 60;
      else if (id.startsWith(q)) score = 55;
    } else {
      if (constr === q || id === q) score = 100;
      else if (tokens.every((t) => addr.includes(t))) score = 50;
      else if (addr.includes(q)) score = 45;
    }

    if (score <= 0) continue;

    const prev = byConstruction.get(side.construction);
    if (!prev || score > prev.score) {
      byConstruction.set(side.construction, {
        construction: side.construction,
        address: side.address,
        side,
        score,
      });
    }
  }

  return [...byConstruction.values()]
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.construction.localeCompare(b.construction, undefined, {
          numeric: true,
        })
    )
    .slice(0, limit);
}

/** Лучшее совпадение (репрезентативная сторона) либо null. */
export function findSideMatch(sides: Side[], query: string): Side | null {
  return findConstructionMatches(sides, query, 1)[0]?.side ?? null;
}
