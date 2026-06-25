/**
 * Хранилище команды для бота MAX: сотрудники и корп. праздники.
 *
 * Данных у сайта нет в БД — храним JSON-файл data/team.json и коммитим его
 * в GitHub через lib/github-api (тот же механизм, что у портфолио/блога).
 * Это переживает эфемерный диск App Platform.
 */

import { getFile, putFile } from "../github-api";

const TEAM_PATH = "data/team.json";

export type Employee = {
  user_id: number;
  full_name: string;
  position: string;
  birth_day: number;
  birth_month: number;
  birth_year: number | null;
  hired_year: number;
  hired_full_date: string | null;
  gender: "male" | "female" | null;
  consent_date: string;
  created_at: string;
  active: boolean;
};

export type CustomHoliday = { day: number; month: number; title: string };

export type TeamStore = { employees: Employee[]; customHolidays: CustomHoliday[] };

const EMPTY: TeamStore = { employees: [], customHolidays: [] };

export async function loadStore(): Promise<{ store: TeamStore; sha?: string }> {
  try {
    const file = await getFile(TEAM_PATH);
    if (!file) return { store: { ...EMPTY } };
    const parsed = JSON.parse(file.decoded) as Partial<TeamStore>;
    return {
      store: {
        employees: parsed.employees ?? [],
        customHolidays: parsed.customHolidays ?? [],
      },
      sha: file.sha,
    };
  } catch (e) {
    console.warn("[max/team] loadStore error, возвращаю пустой стор", e);
    return { store: { ...EMPTY } };
  }
}

async function saveStore(store: TeamStore, sha: string | undefined, message: string): Promise<void> {
  await putFile(TEAM_PATH, JSON.stringify(store, null, 2) + "\n", message, sha);
}

export async function upsertEmployee(emp: Employee): Promise<void> {
  const { store, sha } = await loadStore();
  const idx = store.employees.findIndex((e) => e.user_id === emp.user_id);
  if (idx >= 0) store.employees[idx] = emp;
  else store.employees.push(emp);
  await saveStore(store, sha, `team: сохранён сотрудник ${emp.full_name}`);
}

export async function deleteEmployee(userId: number): Promise<boolean> {
  const { store, sha } = await loadStore();
  const before = store.employees.length;
  store.employees = store.employees.filter((e) => e.user_id !== userId);
  if (store.employees.length === before) return false;
  await saveStore(store, sha, `team: удалён сотрудник ${userId}`);
  return true;
}

export async function addCustomHoliday(day: number, month: number, title: string): Promise<void> {
  const { store, sha } = await loadStore();
  store.customHolidays = store.customHolidays.filter((h) => !(h.day === day && h.month === month));
  store.customHolidays.push({ day, month, title });
  await saveStore(store, sha, `team: добавлен праздник ${day}.${month} — ${title}`);
}

export async function setEmployeeActive(userId: number, active: boolean): Promise<Employee | null> {
  const { store, sha } = await loadStore();
  const emp = store.employees.find((e) => e.user_id === userId);
  if (!emp) return null;
  emp.active = active;
  await saveStore(store, sha, `team: ${active ? "активирован" : "деактивирован"} ${emp.full_name}`);
  return emp;
}

/**
 * Склейка дублей: когда сотрудник сам прошёл онбординг, деактивируем
 * импортированную запись (технический user_id < 0) с тем же ДР и совпадающим
 * словом в ФИО — чтобы не было двойного поздравления.
 */
export async function mergeImportedDuplicate(newEmp: Employee): Promise<string | null> {
  const { store, sha } = await loadStore();
  const tokens = newEmp.full_name.toLowerCase().split(/\s+/).filter(Boolean);
  let merged: string | null = null;
  for (const e of store.employees) {
    if (e.user_id < 0 && e.active && e.birth_day === newEmp.birth_day && e.birth_month === newEmp.birth_month) {
      const impTokens = e.full_name.toLowerCase().split(/\s+/).filter(Boolean);
      if (impTokens.some((t) => tokens.includes(t))) {
        e.active = false;
        merged = e.full_name;
      }
    }
  }
  if (merged) await saveStore(store, sha, `team: склейка дубля ${merged} -> ${newEmp.full_name}`);
  return merged;
}

export async function getEmployee(userId: number): Promise<Employee | null> {
  const { store } = await loadStore();
  return store.employees.find((e) => e.user_id === userId) ?? null;
}

// --- чистые помощники над массивом сотрудников ---

export function birthdaysOn(employees: Employee[], day: number, month: number): Employee[] {
  return employees.filter((e) => e.active && e.birth_day === day && e.birth_month === month);
}

export function anniversariesOn(employees: Employee[], today: Date): Array<{ emp: Employee; years: number }> {
  const res: Array<{ emp: Employee; years: number }> = [];
  for (const e of employees) {
    if (!e.active || !e.hired_full_date) continue;
    const d = new Date(e.hired_full_date + "T00:00:00");
    if (Number.isNaN(d.getTime())) continue;
    if (d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() < today.getFullYear()) {
      res.push({ emp: e, years: today.getFullYear() - d.getFullYear() });
    }
  }
  return res;
}
