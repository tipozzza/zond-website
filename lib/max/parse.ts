/** Парсеры пользовательского ввода и эвристика пола. Устойчивы к мусору. */

export function parseBirthday(text: string): { day: number; month: number; year: number | null } | null {
  if (!text) return null;
  const t = text.trim().replace(/[/\-\s]/g, ".");
  const m = t.match(/^(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?$/);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  let year: number | null = m[3] ? parseInt(m[3], 10) : null;
  if (year !== null && year < 100) year += year > 30 ? 1900 : 2000;
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const probe = new Date(year ?? 2000, month - 1, day);
  if (probe.getMonth() !== month - 1 || probe.getDate() !== day) return null;
  return { day, month, year };
}

export function parseHired(text: string): { year: number; fullDate: string | null } | null {
  if (!text) return null;
  const t = text.trim().replace(/[/\-\s]/g, ".");
  const full = t.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (full) {
    const day = parseInt(full[1], 10);
    const month = parseInt(full[2], 10);
    const year = parseInt(full[3], 10);
    const probe = new Date(year, month - 1, day);
    if (probe.getMonth() !== month - 1 || probe.getDate() !== day) return null;
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { year, fullDate: iso };
  }
  const onlyYear = t.match(/^(\d{4})$/);
  if (onlyYear) {
    const year = parseInt(onlyYear[1], 10);
    if (year >= 1990 && year <= new Date().getFullYear()) return { year, fullDate: null };
  }
  return null;
}

const MALE_EXCEPTIONS = new Set(["никита", "илья", "лука", "фома", "савва", "кузьма", "данила", "паша", "миша", "лёша", "женя"]);
const FEMALE_EXCEPTIONS = new Set(["любовь", "нинель", "адель"]);

export function guessGender(fullName: string): "male" | "female" | null {
  if (!fullName) return null;
  const tokens = fullName.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;
  for (const tok of tokens) {
    if (/(ович|евич|ьич|ич)$/.test(tok)) return "male";
    if (/(овна|евна|ична|вна)$/.test(tok)) return "female";
  }
  const first = tokens[0];
  if (MALE_EXCEPTIONS.has(first)) return "male";
  if (FEMALE_EXCEPTIONS.has(first)) return "female";
  if (/[ая]$/.test(first)) return "female";
  if (/[йнрмлвгдкстпбжо]$/.test(first)) return "male";
  return null;
}
