/**
 * FSM-состояние онбординга в памяти процесса.
 *
 * App Platform запускает один постоянный Node-процесс (`next start`), поэтому
 * module-level Map переживает между запросами вебхука. При рестарте незавершённые
 * онбординги сбрасываются — пользователь просто начнёт заново через /start.
 * Финальные данные сотрудника хранятся не здесь, а в data/team.json (GitHub).
 */

import type { DraftData } from "./texts";

export type OnboardingStep = "consent" | "name" | "position" | "birthday" | "hired" | "confirm";

type Session = { step: OnboardingStep; data: DraftData; updated: number };

const sessions = new Map<number, Session>();

// Чистим заброшенные сессии (час без активности)
const TTL_MS = 60 * 60 * 1000;

export function getSession(userId: number): Session | undefined {
  const s = sessions.get(userId);
  if (s && Date.now() - s.updated > TTL_MS) {
    sessions.delete(userId);
    return undefined;
  }
  return s;
}

export function setStep(userId: number, step: OnboardingStep): void {
  const s = sessions.get(userId) ?? { step, data: {}, updated: Date.now() };
  s.step = step;
  s.updated = Date.now();
  sessions.set(userId, s);
}

export function updateData(userId: number, patch: DraftData): void {
  const s = sessions.get(userId) ?? { step: "consent" as OnboardingStep, data: {}, updated: Date.now() };
  s.data = { ...s.data, ...patch };
  s.updated = Date.now();
  sessions.set(userId, s);
}

export function clearSession(userId: number): void {
  sessions.delete(userId);
}
