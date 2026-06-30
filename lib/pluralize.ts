/**
 * Склонение «год / года / лет» по числу.
 * Учитывает исключение 11-14 (всегда «лет», даже если оканчиваются на 1/2/3/4).
 *
 * Примеры: 1 → год, 2-4 → года, 5-20 → лет, 21 → год, 22-24 → года,
 *          25-30 → лет, 31 → год, 34 → года, 35 → лет, ...
 */
export function pluralizeYears(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "лет";
  const last = n % 10;
  if (last === 1) return "год";
  if (last >= 2 && last <= 4) return "года";
  return "лет";
}

/** Склонение «сторона / стороны / сторон» по числу (726 → «сторон»). */
export function pluralizeSides(n: number): string {
  const lastTwo = n % 100;
  if (lastTwo >= 11 && lastTwo <= 14) return "сторон";
  const last = n % 10;
  if (last === 1) return "сторона";
  if (last >= 2 && last <= 4) return "стороны";
  return "сторон";
}
