import type { Side } from "./types";

export const MONTH_LABELS: Record<string, string> = {
  may: "Май",
  june: "Июнь",
  july: "Июль",
  aug: "Август",
  sep: "Сентябрь",
  oct: "Октябрь",
  nov: "Ноябрь",
  dec: "Декабрь",
};

export const STATUS_LABELS: Record<string, string> = {
  free: "Свободно",
  busy: "Занято",
  partial: "Частично",
  reserved: "Резерв",
  self: "Самореклама",
};

export const STATUS_COLORS: Record<string, string> = {
  free: "#10b981",
  busy: "#ef4444",
  partial: "#f59e0b",
  reserved: "#3b82f6",
  self: "#8b5cf6",
};

export const TYPE_COLORS: Record<string, string> = {
  Digital: "#3D2E91",
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
