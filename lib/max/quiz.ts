/**
 * Викторина «Знай свой ZOND».
 * Вопросы — data/quiz.json, очки — data/quiz-scores.json, прогресс — data/quiz-state.json.
 *
 * Прогресс (какой вопрос сейчас открыт + какие уже задавали) хранится в файле, поэтому
 * пересборки приложения не сбрасывают викторину и не теряют активный вопрос —
 * нажатия на варианты продолжают засчитываться.
 * Каждый вопрос задаётся ровно один раз; когда пройдены все — викторина завершается.
 * Публикуется в группу (MAX_GROUP_ID). Дёргается внешним cron 2 раза в день.
 */

import { getFile, putFile } from "../github-api";
import { sendMessage, type CallbackBtn } from "./api";

const QUIZ_PATH = "data/quiz.json";
const SCORES_PATH = "data/quiz-scores.json";
const STATE_PATH = "data/quiz-state.json";

export type Question = { q: string; options: string[]; correct: number; explain: string };
type Scores = Record<string, { name: string; points: number }>;
type State = { currentQ: number | null; asked: number[] };

function groupId(): number | undefined {
  const v = process.env.MAX_GROUP_ID;
  return v ? Number(v) : undefined;
}

async function loadQuestions(): Promise<{ questions: Question[]; sha?: string }> {
  try {
    const file = await getFile(QUIZ_PATH);
    if (!file) return { questions: [] };
    return { questions: JSON.parse(file.decoded) as Question[], sha: file.sha };
  } catch (e) {
    console.warn("[max/quiz] loadQuestions error", e);
    return { questions: [] };
  }
}

async function loadScores(): Promise<{ scores: Scores; sha?: string }> {
  try {
    const file = await getFile(SCORES_PATH);
    if (!file) return { scores: {} };
    return { scores: JSON.parse(file.decoded) as Scores, sha: file.sha };
  } catch (e) {
    console.warn("[max/quiz] loadScores error", e);
    return { scores: {} };
  }
}

async function loadState(): Promise<{ state: State; sha?: string }> {
  try {
    const file = await getFile(STATE_PATH);
    if (!file) return { state: { currentQ: null, asked: [] } };
    const p = JSON.parse(file.decoded) as Partial<State>;
    return { state: { currentQ: p.currentQ ?? null, asked: Array.isArray(p.asked) ? p.asked : [] }, sha: file.sha };
  } catch (e) {
    console.warn("[max/quiz] loadState error", e);
    return { state: { currentQ: null, asked: [] } };
  }
}

async function saveState(state: State, sha?: string): Promise<void> {
  try {
    await putFile(STATE_PATH, JSON.stringify(state, null, 2) + "\n", "quiz: прогресс викторины", sha);
  } catch (e) {
    console.warn("[max/quiz] saveState error", e);
  }
}

async function addPoints(winners: Array<{ userId: number; name: string }>): Promise<void> {
  if (!winners.length) return;
  try {
    const { scores, sha } = await loadScores();
    for (const w of winners) {
      const cur = scores[w.userId] ?? { name: w.name, points: 0 };
      scores[w.userId] = { name: w.name, points: cur.points + 1 };
    }
    await putFile(SCORES_PATH, JSON.stringify(scores, null, 2) + "\n", "quiz: начислены очки", sha);
  } catch (e) {
    console.warn("[max/quiz] addPoints error", e);
  }
}

// --- активный вопрос: ответы держим в памяти, номер открытого вопроса — в файле состояния ---
let mem: { qIndex: number; answers: Map<number, { name: string; opt: number }> } | null = null;

/** Восстанавливает активный вопрос из файла состояния, если память пуста (после пересборки). */
async function ensureCurrent(): Promise<{ qIndex: number; answers: Map<number, { name: string; opt: number }> } | null> {
  if (mem) return mem;
  const { state } = await loadState();
  if (state.currentQ !== null) mem = { qIndex: state.currentQ, answers: new Map() };
  return mem;
}

function letter(i: number): string {
  return ["А", "Б", "В", "Г", "Д"][i] ?? String(i + 1);
}

function quizKb(q: Question): CallbackBtn[][] {
  return q.options.map((opt, i) => [{ text: `${letter(i)}. ${opt}`, kind: "message" }]);
}

/** Разбор вопроса: правильный ответ + пояснение + кто ответил верно + начисление очков. */
async function revealQuestion(q: Question, qIndex: number): Promise<void> {
  const gid = groupId();
  if (!gid) return;
  const m = await ensureCurrent();
  const answers = m && m.qIndex === qIndex ? m.answers : new Map<number, { name: string; opt: number }>();
  const rightEntries = [...answers.entries()].filter(([, a]) => a.opt === q.correct);
  const rightNames = rightEntries.map(([, a]) => a.name);
  const total = answers.size;

  await addPoints(rightEntries.map(([userId, a]) => ({ userId, name: a.name })));

  let text = `✅ Правильный ответ: ${letter(q.correct)}. ${q.options[q.correct]}\n\n${q.explain}`;
  if (total > 0) {
    text += `\n\nОтветили: ${total}, верно: ${rightNames.length}`;
    if (rightNames.length) text += ` — ${rightNames.join(", ")} 👏 (+1 балл)`;
  }
  text += `\n\n🔎 Подробнее — на сайте zondreklama.ru`;
  await sendMessage({ chatId: gid, text });
}

async function postQuestion(q: Question): Promise<void> {
  const gid = groupId();
  if (!gid) return;
  await sendMessage({
    chatId: gid,
    text: `🎯 Викторина «Знай свой ZOND»\n\n${q.q}\n\nЖми вариант — правильный ответ узнаешь при разборе. Подсказки есть на zondreklama.ru 😉`,
    keyboard: quizKb(q),
  });
}

function tomskNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tomsk" }));
}

/** Топ-10 знатоков в группу. */
export async function showLeaderboard(): Promise<void> {
  const gid = groupId();
  if (!gid) return;
  const { scores } = await loadScores();
  const top = Object.values(scores).sort((a, b) => b.points - a.points).slice(0, 10);
  if (!top.length) {
    await sendMessage({ chatId: gid, text: "🏆 Топ знатоков ZOND\n\nПока никто не набрал очков — впереди вся викторина! 🎯" });
    return;
  }
  const medals = ["🥇", "🥈", "🥉"];
  const lines = top.map((u, i) => `${medals[i] ?? `${i + 1}.`} ${u.name} — ${u.points}`);
  await sendMessage({
    chatId: gid,
    text: `🏆 Топ знатоков ZOND:\n\n${lines.join("\n")}\n\nОтвечай на вопросы викторины — догоняй лидеров! 😉`,
  });
}

/**
 * Дёргается cron 2 раза в день: разбор прошлого вопроса + новый невыданный.
 * Когда все вопросы пройдены — викторина завершается (заново не начинает).
 * По пятницам в 15:00 — ещё и рейтинг.
 */
export async function runQuiz(): Promise<void> {
  const gid = groupId();
  if (!gid) return;
  const { questions } = await loadQuestions();
  if (!questions.length) return;
  const { state, sha } = await loadState();
  const asked = [...state.asked];

  // 1) разбор текущего вопроса (если был открыт)
  if (state.currentQ !== null && state.currentQ >= 0 && state.currentQ < questions.length) {
    await revealQuestion(questions[state.currentQ], state.currentQ);
    if (!asked.includes(state.currentQ)) asked.push(state.currentQ);
  }

  // 2) следующий ещё не заданный вопрос
  const remaining = questions.map((_, i) => i).filter((i) => !asked.includes(i));
  if (remaining.length === 0) {
    mem = null;
    await saveState({ currentQ: null, asked }, sha);
    await sendMessage({
      chatId: gid,
      text: "🏁 Викторина «Знай свой ZOND» пройдена — все вопросы разобраны. Спасибо за участие!\nИтоги — по команде /рейтинг 🏆",
    });
    return;
  }

  const nextIdx = remaining[0];
  mem = { qIndex: nextIdx, answers: new Map() };
  await saveState({ currentQ: nextIdx, asked }, sha);
  await postQuestion(questions[nextIdx]);

  const now = tomskNow();
  if (now.getDay() === 5 && now.getHours() >= 15) await showLeaderboard();
}

/** Тап по варианту. Возвращает текст всплывающего уведомления участнику. */
export async function recordAnswer(userId: number, name: string, opt: number): Promise<string> {
  const m = await ensureCurrent();
  if (!m) return "Сейчас активного вопроса нет 🙂";
  m.answers.set(userId, { name, opt });
  return "Ответ принят ✅ Узнаешь при разборе.";
}

/** Ответ через кнопку-message: в группу приходит обычное сообщение с подписью варианта. */
export async function recordAnswerByText(userId: number, name: string, text: string): Promise<boolean> {
  const m = await ensureCurrent();
  if (!m) return false;
  const { questions } = await loadQuestions();
  const q = questions[m.qIndex];
  if (!q) return false;
  const t = text.trim();
  const idx = q.options.findIndex((opt, i) => `${letter(i)}. ${opt}` === t);
  if (idx < 0) return false;
  m.answers.set(userId, { name, opt: idx });
  return true;
}

/** Добавить вопрос (админ). Формат: Вопрос | Вар1 | Вар2 | Вар3 | НомерПравильного(1-3) | Пояснение */
export async function addQuestion(raw: string): Promise<string> {
  const p = raw.split("|").map((s) => s.trim());
  if (p.length < 5) {
    return "Формат: /добавить_вопрос Вопрос | Вариант1 | Вариант2 | Вариант3 | НомерПравильного(1-3) | Пояснение";
  }
  const correct = parseInt(p[4], 10) - 1;
  if (![0, 1, 2].includes(correct)) return "Номер правильного варианта должен быть 1, 2 или 3.";
  const newQ: Question = { q: p[0], options: [p[1], p[2], p[3]], correct, explain: p[5] ?? "" };
  const { questions, sha } = await loadQuestions();
  questions.push(newQ);
  await putFile(QUIZ_PATH, JSON.stringify(questions, null, 2) + "\n", "quiz: добавлен вопрос", sha);
  return `Добавил вопрос. Всего вопросов: ${questions.length}.`;
}
