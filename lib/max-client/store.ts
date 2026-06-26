/**
 * Хранилище обращений клиентов — в памяти процесса (App Platform = один Node-процесс).
 * НЕ коммитим в GitHub, чтобы не плодить пересборки. Минус: при редеплое открытые
 * обращения теряются (менеджер уже получил пересылку, теряются только напоминания).
 */

export type Lead = {
  id: string;
  userId: number; // MAX id клиента
  name: string;
  text: string;
  createdAt: number; // ms
  firstReminded: boolean;
  lastReminderDay: string | null; // YYYY-MM-DD по Томску
};

const leads = new Map<string, Lead>();

export function addLead(l: Lead): void {
  leads.set(l.id, l);
  // не даём расти бесконечно
  if (leads.size > 1000) {
    const oldest = [...leads.values()].sort((a, b) => a.createdAt - b.createdAt)[0];
    if (oldest) leads.delete(oldest.id);
  }
}

export function closeLead(id: string): Lead | undefined {
  const l = leads.get(id);
  if (l) leads.delete(id);
  return l;
}

export function openLeads(): Lead[] {
  return [...leads.values()];
}

export function newId(): string {
  return `c-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}
