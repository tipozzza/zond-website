/**
 * Викторина «Знай свой ZOND»: вопросы из data/quiz.json, состояние ответов — в памяти.
 * Публикуется в группу (MAX_GROUP_ID). Дёргается cron 2 раза в день.
 */

import { getFile, putFile } from "../github-api";
import { sendMessage, type CallbackBtn } from "./api";

const QUIZ_PATH = "data/quiz.json";

export type Question = { q: string; options: string[]; correct: number; explain: string };

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

// --- состояние в памяти (один процесс App Platform) ---
let pointer = 0;
let open: { question: Question; answers: Map<number, { name: string; opt: number }> } | null = null;

function letter(i: number): string {
  return ["А", "Б", "В", "Г", "Д"][i] ?? String(i + 1);
}

function quizKb(q: Question): CallbackBtn[][] {
  return q.options.map((opt, i) => [{ text: `${letter(i)}. ${opt}`, payload: `quiz:${i}` }]);
}

/** Разбор текущего вопроса: правильный ответ + пояснение + кто ответил верно. */
async function reveal(): Promise<void> {
  const gid = groupId();
  if (!open || !gid) return;
  const q = open.question;
  const right = [...open.answers.values()].filter((a) => a.opt === q.correct).map((a) => a.name);
  const total = open.answers.size;

  let text = `✅ Правильный ответ: ${letter(q.correct)}. ${q.options[q.correct]}\n\n${q.explain}`;
  if (total > 0) {
    text += `\n\nОтветили: ${total}, верно: ${right.length}`;
    if (right.length) text += ` — ${right.join(", ")} 👏`;
  }
  text += `\n\n🔎 Подробнее — на сайте zondreklama.ru`;
  await sendMessage({ chatId: gid, text });
  open = null;
}

/** Опубликовать следующий вопрос в группу. */
async function postNext(): Promise<boolean> {
  const gid = groupId();
  if (!gid) return false;
  const { questions } = await loadQuestions();
  if (!questions.length) return false;
  const q = questions[pointer % questions.length];
  pointer = (pointer + 1) % questions.length;
  open = { question: q, answers: new Map() };
  await sendMessage({
    chatId: gid,
    text: `🎯 Викторина «Знай свой ZOND»\n\n${q.q}\n\nЖми вариант — правильный ответ узнаешь при разборе. Подсказки есть на zondreklama.ru 😉`,
    keyboard: quizKb(q),
  });
  return true;
}

/** Дёргается cron 2 раза в день: сначала разбор прошлого вопроса, затем новый. */
export async function runQuiz(): Promise<void> {
  await reveal();
  await postNext();
}

/** Тап по варианту. Возвращает текст для всплывающего уведомления участнику. */
export function recordAnswer(userId: number, name: string, opt: number): string {
  if (!open) return "Этот вопрос уже закрыт 🙂";
  open.answers.set(userId, { name, opt });
  return "Ответ принят ✅ Узнаешь при разборе.";
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
