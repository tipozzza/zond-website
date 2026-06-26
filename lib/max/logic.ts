/**
 * Логика бота «Команда ZOND»: онбординг (FSM), команды, приветствие, поздравления.
 * Не зависит от транспорта — вызывается из webhook-маршрута и cron-маршрута.
 */

import { answerCallback, sendMessage, type CallbackBtn } from "./api";
import * as T from "./texts";
import { anniversaryText, birthdayText, ddmm, HOLIDAYS, holidayMessage } from "./holidays";
import { guessGender, parseBirthday, parseHired } from "./parse";
import { clearSession, getSession, setStep, updateData } from "./state";
import {
  addCustomHoliday,
  anniversariesOn,
  birthdaysOn,
  deleteEmployee,
  getEmployee,
  loadStore,
  mergeImportedDuplicate,
  setEmployeeActive,
  upsertEmployee,
  type Employee,
} from "./team";
import { addQuestion, recordAnswer, runQuiz } from "./quiz";

const CONSENT_KB: CallbackBtn[][] = [
  [
    { text: T.CONSENT_BTN_YES, payload: "consent:yes" },
    { text: T.CONSENT_BTN_NO, payload: "consent:no" },
  ],
];
const CONFIRM_KB: CallbackBtn[][] = [
  [
    { text: T.CONFIRM_BTN_YES, payload: "confirm:yes" },
    { text: T.CONFIRM_BTN_EDIT, payload: "confirm:edit" },
  ],
];

function adminId(): number | undefined {
  const v = process.env.MAX_ADMIN_USER_ID;
  return v ? Number(v) : undefined;
}
function groupId(): number | undefined {
  const v = process.env.MAX_GROUP_ID;
  return v ? Number(v) : undefined;
}
function isAdmin(userId: number | undefined): boolean {
  const a = adminId();
  return a !== undefined && userId === a;
}
function commandArgs(text: string): string {
  const parts = text.trim().split(/\s+/);
  return parts.slice(1).join(" ").trim();
}

// ------------------------------ точка входа ------------------------------

type AnyUpdate = Record<string, any>;

export async function handleUpdate(update: AnyUpdate): Promise<void> {
  try {
    switch (update.update_type) {
      case "bot_started":
        return await onBotStarted(update);
      case "message_created":
        return await onMessage(update);
      case "message_callback":
        return await onCallback(update);
      case "user_added":
        return await onUserAdded(update);
      default:
        return;
    }
  } catch (e) {
    console.error("[max/logic] handleUpdate error", update.update_type, e);
  }
}

// ------------------------------ онбординг ------------------------------

async function startOnboarding(userId: number): Promise<void> {
  clearSession(userId);
  setStep(userId, "consent");
  await sendMessage({ userId, text: T.WELCOME });
  await sendMessage({ userId, text: T.CONSENT_ASK, keyboard: CONSENT_KB });
}

async function onBotStarted(u: AnyUpdate): Promise<void> {
  const userId = u.user?.user_id ?? u.chat_id;
  if (!userId) return;
  if (adminId() === undefined) console.warn("[max] MAX_ADMIN_USER_ID не задан. Кандидат:", userId);
  await startOnboarding(userId);
}

async function onMessage(u: AnyUpdate): Promise<void> {
  const msg = u.message ?? {};
  const userId: number | undefined = msg.sender?.user_id;
  const chatId: number | undefined = msg.recipient?.chat_id;
  const chatType: string = msg.recipient?.chat_type ?? "dialog";
  const isPrivate = chatType === "dialog";
  const text: string = (msg.body?.text ?? "").trim();
  if (!userId) return;

  if (text.startsWith("/")) {
    await handleCommand({ cmd: text, userId, chatId, isPrivate });
    return;
  }

  const session = getSession(userId);
  if (isPrivate && session) {
    await handleOnboardingStep(userId, session.step, text);
    return;
  }

  if (isPrivate) {
    const emp = await getEmployee(userId);
    await sendMessage({
      userId,
      text: emp ? T.HELP_EMPLOYEE : "Напиши /start, чтобы я тебя записал. /help — список команд.",
    });
  }
}

async function handleOnboardingStep(userId: number, step: string, text: string): Promise<void> {
  switch (step) {
    case "name": {
      if (text.length < 2 || !/[a-zа-яё]/i.test(text)) return void sendMessage({ userId, text: T.BAD_NAME });
      updateData(userId, { full_name: text, gender: guessGender(text) });
      setStep(userId, "position");
      return void sendMessage({ userId, text: T.ASK_POSITION });
    }
    case "position": {
      if (text.length < 2) return void sendMessage({ userId, text: T.BAD_POSITION });
      updateData(userId, { position: text });
      setStep(userId, "birthday");
      return void sendMessage({ userId, text: T.ASK_BIRTHDAY });
    }
    case "birthday": {
      const p = parseBirthday(text);
      if (!p) return void sendMessage({ userId, text: T.BAD_BIRTHDAY });
      updateData(userId, { birth_day: p.day, birth_month: p.month, birth_year: p.year });
      setStep(userId, "hired");
      return void sendMessage({ userId, text: T.ASK_HIRED });
    }
    case "hired": {
      const p = parseHired(text);
      if (!p) return void sendMessage({ userId, text: T.BAD_HIRED });
      updateData(userId, { hired_year: p.year, hired_full_date: p.fullDate });
      setStep(userId, "confirm");
      const s = getSession(userId);
      return void sendMessage({ userId, text: T.confirmPreview(s?.data ?? {}), keyboard: CONFIRM_KB });
    }
    case "consent":
      return void sendMessage({ userId, text: "Нажми кнопку выше 👆 — «Да, согласен» или «Нет».", keyboard: CONSENT_KB });
    case "confirm":
      return void sendMessage({ userId, text: "Нажми кнопку 👆 — «Да» или «Изменить».", keyboard: CONFIRM_KB });
  }
}

async function onCallback(u: AnyUpdate): Promise<void> {
  const cb = u.callback ?? {};
  const payload: string = cb.payload ?? "";
  const callbackId: string = cb.callback_id ?? "";
  const userId: number | undefined = cb.user?.user_id;
  if (!userId) return;

  if (payload.startsWith("quiz:")) {
    const opt = parseInt(payload.slice(5), 10);
    const name = cb.user?.name ?? cb.user?.first_name ?? "Участник";
    await answerCallback(callbackId, { notification: recordAnswer(userId, name, opt) });
    return;
  }

  if (payload === "consent:yes") {
    setStep(userId, "name");
    await answerCallback(callbackId, { notification: "Отлично, поехали!" });
    await sendMessage({ userId, text: T.ASK_NAME });
  } else if (payload === "consent:no") {
    clearSession(userId);
    await answerCallback(callbackId);
    await sendMessage({ userId, text: T.CONSENT_DECLINED });
  } else if (payload === "confirm:edit") {
    setStep(userId, "name");
    await answerCallback(callbackId, { notification: "Заполним заново" });
    await sendMessage({ userId, text: T.ASK_NAME });
  } else if (payload === "confirm:yes") {
    const session = getSession(userId);
    const d = session?.data ?? {};
    clearSession(userId);
    const ok = await saveEmployee(userId, d);
    if (ok) {
      await answerCallback(callbackId, { notification: "Сохранено ✅" });
      await sendMessage({ userId, text: T.SAVED });
      const a = adminId();
      if (a) await sendMessage({ userId: a, text: `🆕 Новый сотрудник: ${d.full_name} (${d.position}).` });
    } else {
      await answerCallback(callbackId, { notification: "Не удалось сохранить, попробуйте /start" });
    }
  } else {
    await answerCallback(callbackId);
  }
}

async function saveEmployee(userId: number, d: T.DraftData): Promise<boolean> {
  try {
    const emp: Employee = {
      user_id: userId,
      full_name: d.full_name!,
      position: d.position!,
      birth_day: d.birth_day!,
      birth_month: d.birth_month!,
      birth_year: d.birth_year ?? null,
      hired_year: d.hired_year!,
      hired_full_date: d.hired_full_date ?? null,
      gender: d.gender ?? null,
      consent_date: new Date().toISOString(),
      created_at: new Date().toISOString(),
      active: true,
    };
    await upsertEmployee(emp);
    await mergeImportedDuplicate(emp);
    return true;
  } catch (e) {
    console.error("[max/logic] saveEmployee error", e);
    return false;
  }
}

// ------------------------------ команды ------------------------------

async function handleCommand(args: { cmd: string; userId: number; chatId?: number; isPrivate: boolean }): Promise<void> {
  const { userId, chatId, isPrivate } = args;
  const token = args.cmd.trim().split(/\s+/)[0].toLowerCase().replace(/^\//, "").split("@")[0];
  const replyTo = chatId ?? userId;

  switch (token) {
    case "start":
    case "старт":
      if (isPrivate) await startOnboarding(userId);
      return;
    case "профиль":
    case "profile": {
      if (!isPrivate) return;
      const emp = await getEmployee(userId);
      return void sendMessage({ userId, text: emp ? T.profileCard(emp) : T.NOT_REGISTERED });
    }
    case "удалить":
    case "delete": {
      if (!isPrivate) return;
      clearSession(userId);
      const deleted = await deleteEmployee(userId);
      return void sendMessage({ userId, text: deleted ? T.DELETED : T.NOT_REGISTERED });
    }
    case "help":
    case "помощь": {
      let text = T.HELP_EMPLOYEE;
      if (isAdmin(userId)) text += T.HELP_ADMIN;
      return void sendMessage({ chatId: replyTo, text });
    }
    case "myid":
      return void sendMessage({ chatId: replyTo, text: `Ваш user_id: ${userId}` });
    case "chatid":
      return void sendMessage({
        chatId: replyTo,
        text: `ID этого чата: ${chatId}\nЕсли это группа «ZOND Команда» — впишите его в MAX_GROUP_ID.`,
      });
    case "анонс":
    case "announce":
      return void (await cmdAnnounce(userId, replyTo, args.cmd));
    case "список":
    case "list":
      return void (await cmdList(userId, replyTo));
    case "убрать":
    case "remove":
      return void (await cmdRemove(userId, replyTo, args.cmd));
    case "добавить":
    case "add":
      return void (await cmdAdd(userId, replyTo, args.cmd));
    case "добавить_праздник":
    case "addholiday":
      return void (await cmdAddHoliday(userId, replyTo, args.cmd));
    case "тест_др":
    case "test":
      return void (await cmdTest(userId, replyTo));
    case "викторина":
    case "quiz":
      if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
      await runQuiz();
      return void sendMessage({ chatId: replyTo, text: "Запустил викторину в группе ✅" });
    case "добавить_вопрос":
    case "addquestion":
      if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
      return void sendMessage({ chatId: replyTo, text: await addQuestion(commandArgs(args.cmd)) });
    default:
      return;
  }
}

async function cmdAnnounce(userId: number, replyTo: number, cmd: string): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const text = commandArgs(cmd);
  if (!text) return void sendMessage({ chatId: replyTo, text: T.ANNOUNCE_EMPTY });
  const gid = groupId();
  if (!gid) return void sendMessage({ chatId: replyTo, text: T.NO_GROUP_SET });
  await sendMessage({ chatId: gid, text: `${T.ANNOUNCE_HEADER}\n\n${text}` });
  await sendMessage({ chatId: replyTo, text: T.ANNOUNCE_DONE });
}

async function cmdList(userId: number, replyTo: number): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const { store } = await loadStore();
  const emps = store.employees.filter((e) => e.active);
  if (!emps.length) return void sendMessage({ chatId: replyTo, text: "В базе пока никого нет." });
  const lines = [`Зарегистрировано: ${emps.length}`, ""];
  emps.forEach((e, i) => lines.push(`${i + 1}. ${e.full_name} — ${e.position} (ДР ${ddmm(e.birth_day, e.birth_month)})`));
  await sendMessage({ chatId: replyTo, text: lines.join("\n") });
}

async function cmdAdd(userId: number, replyTo: number, cmd: string): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const parts = commandArgs(cmd).split("|").map((x) => x.trim());
  if (parts.length < 3 || !parts[0] || !parts[1] || !parts[2]) {
    return void sendMessage({
      chatId: replyTo,
      text: "Формат: /добавить ФИО | должность | ДД.ММ\nПример: /добавить Иванов Иван Иванович | дизайнер | 14.03\n(дату можно с годом: 14.03.1990)",
    });
  }
  const [fio, position, bday] = parts;
  const d = parseBirthday(bday);
  if (!d) return void sendMessage({ chatId: replyTo, text: "Не понял дату. Формат ДД.ММ или ДД.ММ.ГГГГ, например 14.03." });
  const patr = fio.toLowerCase().split(/\s+/)[2] ?? "";
  const gender: "male" | "female" | null = /(вна|чна)$/.test(patr) ? "female" : /вич$/.test(patr) ? "male" : null;
  const { store } = await loadStore();
  const newId = store.employees.reduce((m, e) => Math.min(m, e.user_id), 0) - 1;
  await upsertEmployee({
    user_id: newId,
    full_name: fio,
    position,
    birth_day: d.day,
    birth_month: d.month,
    birth_year: d.year ?? null,
    hired_year: 0,
    hired_full_date: null,
    gender,
    consent_date: new Date().toISOString(),
    created_at: new Date().toISOString(),
    active: true,
  });
  await sendMessage({ chatId: replyTo, text: `Добавил: ${fio} — ${position} (ДР ${ddmm(d.day, d.month)}).` });
}

async function cmdRemove(userId: number, replyTo: number, cmd: string): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const n = parseInt(commandArgs(cmd), 10);
  if (!n || n < 1) {
    return void sendMessage({ chatId: replyTo, text: "Формат: /убрать N — номер сотрудника из /список. Сначала вызови /список." });
  }
  const { store } = await loadStore();
  const emps = store.employees.filter((e) => e.active);
  if (n > emps.length) return void sendMessage({ chatId: replyTo, text: `В списке только ${emps.length} сотрудников.` });
  const target = emps[n - 1];
  await setEmployeeActive(target.user_id, false);
  await sendMessage({ chatId: replyTo, text: `Убрал из поздравлений: ${target.full_name}.` });
}

async function cmdAddHoliday(userId: number, replyTo: number, cmd: string): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const args = commandArgs(cmd);
  const sp = args.split(/\s+/);
  const date = parseBirthday(sp[0] ?? "");
  if (!date || sp.length < 2) {
    return void sendMessage({
      chatId: replyTo,
      text: "Формат: /добавить_праздник ДД.ММ Название\nПример: /добавить_праздник 12.04 День космонавтики",
    });
  }
  const title = sp.slice(1).join(" ");
  await addCustomHoliday(date.day, date.month, title);
  await sendMessage({ chatId: replyTo, text: `Добавил: ${ddmm(date.day, date.month)} — ${title}` });
}

async function cmdTest(userId: number, replyTo: number): Promise<void> {
  if (!isAdmin(userId)) return void sendMessage({ chatId: replyTo, text: T.ADMIN_ONLY });
  const count = await runCongratulations({ toUserId: userId });
  await sendMessage({
    chatId: replyTo,
    text: count ? `Тест: отправил тебе ${count} сообщений-превью.` : "На сегодня поводов нет (ДР/годовщин/праздников).",
  });
}

// ------------------------------ группа ------------------------------

async function onUserAdded(u: AnyUpdate): Promise<void> {
  const chatId: number | undefined = u.chat_id;
  const name: string = u.user?.first_name ?? "коллега";
  if (!chatId) return;
  await sendMessage({ chatId, text: `${name}, ${T.GROUP_GREETING}` });
}

// ------------------------------ поздравления ------------------------------

function tomskNow(): Date {
  // Дата по «настенным часам» Томска (UTC+7), чтобы корректно брать день/месяц.
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tomsk" }));
}

export function buildMessages(employees: Employee[], customHolidays: { day: number; month: number; title: string }[], today: Date): string[] {
  const out: string[] = [];
  for (const e of birthdaysOn(employees, today.getDate(), today.getMonth() + 1)) out.push(birthdayText(e));
  for (const { emp, years } of anniversariesOn(employees, today)) out.push(anniversaryText(emp, years));
  const h = HOLIDAYS[ddmm(today.getDate(), today.getMonth() + 1)];
  if (h) out.push(holidayMessage(h, employees));
  for (const ch of customHolidays.filter((c) => c.day === today.getDate() && c.month === today.getMonth() + 1)) {
    out.push(`📅 Сегодня — ${ch.title}.\nС праздником, команда ZOND!`);
  }
  return out;
}

export async function runCongratulations(opts: { toChatId?: number; toUserId?: number } = {}): Promise<number> {
  const today = tomskNow();
  const { store } = await loadStore();
  const messages = buildMessages(store.employees, store.customHolidays, today);

  let chatId = opts.toChatId;
  const userId = opts.toUserId;
  if (chatId === undefined && userId === undefined) chatId = groupId();
  if (chatId === undefined && userId === undefined) {
    console.warn("[max/logic] runCongratulations: некуда публиковать (MAX_GROUP_ID не задан)");
    return 0;
  }

  for (const m of messages) {
    await sendMessage({ chatId, userId, text: m });
    await new Promise((r) => setTimeout(r, 400)); // бережём лимит 30 req/sec
  }
  return messages.length;
}
