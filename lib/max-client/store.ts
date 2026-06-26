/**
 * Хранилище обращений клиентов — в памяти процесса (App Platform = один Node-процесс).
 * Одна запись на КЛИЕНТА (ключ — его MAX id), а не на каждое сообщение.
 * НЕ коммитим в GitHub. Минус: при редеплое открытые обращения и режим ответа теряются.
 */

export type Lead = {
  clientId: number; // MAX id клиента
  name: string;
  username: string | null;
  lastText: string; // последнее сообщение клиента
  createdAt: number; // ms, время последнего обращения
  open: boolean;
  firstReminded: boolean;
  lastReminderDay: string | null; // YYYY-MM-DD по Томску
};

const leads = new Map<number, Lead>();
// какой клиент сейчас «активен» для менеджера: managerId -> clientId
const active = new Map<number, number>();

export function upsertLead(args: {
  clientId: number;
  name: string;
  username: string | null;
  text: string;
}): { lead: Lead; isNew: boolean } {
  const now = Date.now();
  const existing = leads.get(args.clientId);
  const isNew = !existing || !existing.open;
  const lead: Lead = {
    clientId: args.clientId,
    name: args.name,
    username: args.username,
    lastText: args.text,
    createdAt: now,
    open: true,
    firstReminded: false,
    lastReminderDay: existing ? existing.lastReminderDay : null,
  };
  leads.set(args.clientId, lead);
  if (leads.size > 2000) {
    const oldest = [...leads.values()].sort((a, b) => a.createdAt - b.createdAt)[0];
    if (oldest) leads.delete(oldest.clientId);
  }
  return { lead, isNew };
}

export function getLead(clientId: number): Lead | undefined {
  return leads.get(clientId);
}

export function closeLead(clientId: number): Lead | undefined {
  const l = leads.get(clientId);
  if (l) l.open = false;
  return l;
}

export function openLeads(): Lead[] {
  return [...leads.values()].filter((l) => l.open);
}

export function setActive(managerId: number, clientId: number): void {
  active.set(managerId, clientId);
}
export function getActive(managerId: number): number | undefined {
  return active.get(managerId);
}
export function clearActive(managerId: number): void {
  active.delete(managerId);
}
