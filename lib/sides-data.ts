import type { Side } from "./types";

export const MONTH_LABELS: Record<string, string> = {
  jan: "Январь",
  feb: "Февраль",
  mar: "Март",
  apr: "Апрель",
  may: "Май",
  june: "Июнь",
  july: "Июль",
  aug: "Август",
  sep: "Сентябрь",
  oct: "Октябрь",
  nov: "Ноябрь",
  dec: "Декабрь",
};

export const MONTH_KEYS: Array<keyof Side["status"]> = [
  "jan", "feb", "mar", "apr", "may", "june",
  "july", "aug", "sep", "oct", "nov", "dec",
];

export function getCurrentMonthKey(): keyof Side["status"] {
  return MONTH_KEYS[new Date().getMonth()];
}

export const STATUS_LABELS: Record<string, string> = {
  free: "Свободно",
  busy: "Занято",
  partial: "Частично",
  reserved: "Резерв",
};

export const STATUS_COLORS: Record<string, string> = {
  free: "#10b981",
  busy: "#ef4444",
  partial: "#f59e0b",
  reserved: "#3b82f6",
};

export const TYPE_COLORS: Record<string, string> = {
  Digital: "#550082",
  "Щит": "#1e40af",
  "Тривижн": "#059669",
  "Сити-формат": "#d97706",
  "Супер-сайт": "#dc2626",
};

export async function fetchSides(): Promise<Side[]> {
  const res = await fetch("/data/sides.json");
  if (!res.ok) throw new Error("Failed to fetch sides");
  return res.json();
}
