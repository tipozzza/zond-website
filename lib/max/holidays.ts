/** Календарь праздников и шаблоны поздравлений. */

import type { Employee } from "./team";

export type Holiday = { title: string; audience: "all" | "male" | "female"; text: string };

/** Ключ — "ДД.ММ". */
export const HOLIDAYS: Record<string, Holiday> = {
  "01.01": { title: "Новый год", audience: "all", text: "🎄 С Новым годом, команда ZOND! Пусть наступающий год принесёт крутые проекты и хорошее настроение." },
  "23.02": { title: "День защитника Отечества", audience: "male", text: "🎖 С Днём защитника Отечества! Поздравляем мужскую часть команды ZOND — спасибо за надёжность и силу." },
  "08.03": { title: "Международный женский день", audience: "female", text: "🌷 С 8 Марта! Поздравляем прекрасных девушек команды ZOND — с вами теплее и ярче." },
  "09.05": { title: "День Победы", audience: "all", text: "🕯 С Днём Победы! Помним и гордимся. С праздником, команда ZOND." },
  "12.06": { title: "День России", audience: "all", text: "🇷🇺 С Днём России, команда ZOND!" },
  "23.10": { title: "День работников рекламы", audience: "all", text: "🎯 С Днём работников рекламы! Это наш профильный праздник — спасибо каждому в команде ZOND за идеи и работу." },
  "31.12": { title: "Подведение года", audience: "all", text: "✨ Год подходит к концу. Спасибо команде ZOND за работу — впереди ещё больше хорошего!" },
};

export function ddmm(day: number, month: number): string {
  return `${String(day).padStart(2, "0")}.${String(month).padStart(2, "0")}`;
}

export function holidayMessage(h: Holiday, employees: Employee[]): string {
  let text = h.text;
  if (h.audience === "male" || h.audience === "female") {
    const names = employees.filter((e) => e.active && e.gender === h.audience).map((e) => e.full_name);
    if (names.length) text += "\n\n" + names.join(", ") + " — с праздником!";
  }
  return text;
}

/** Набор шаблонов поздравления с ДР. Бот выбирает случайный, чтобы тексты не приедались. */
const BIRTHDAY_TEMPLATES: Array<(who: string) => string> = [
  (who) =>
    "🎂 Сегодня День Рождения! 🎉\n\n" +
    `${who} — поздравляем!\n\n` +
    "Желаем крутых проектов, благодарных клиентов и отличного настроения каждый день.\n\n" +
    "Команда ZOND ❤️",
  (who) =>
    "🎉 С Днём Рождения! 🎂\n\n" +
    `Сегодня свой день отмечает ${who}.\n\n` +
    "Пусть работа приносит удовольствие, а дома ждёт тепло. Здоровья, сил и поводов для радости!\n\n" +
    "Команда ZOND 🥳",
  (who) =>
    "🎂 Поздравляем с Днём Рождения!\n\n" +
    `${who}, спасибо, что ты с нами.\n\n` +
    "Желаем ярких идей, лёгких задач и людей, которые ценят. Пусть год будет щедрым на хорошее!\n\n" +
    "Команда ZOND ✨",
  (who) =>
    "🥳 У нас праздник — День Рождения!\n\n" +
    `Сегодня поздравляем ${who}.\n\n` +
    "Пусть будет больше отдыха, меньше суеты и всё складывается как надо. С Днём Рождения!\n\n" +
    "Команда ZOND 🎈",
  (who) =>
    `🎉 С Днём Рождения, ${who}!\n\n` +
    "Желаем энергии на любые задачи, надёжных коллег рядом и настроения на отлично. Ты делаешь ZOND сильнее — спасибо!\n\n" +
    "Команда ZOND ❤️",
  (who) =>
    "🎂 Сегодня особенный день!\n\n" +
    `День Рождения у ${who} 🎉\n\n` +
    "Пусть сбывается задуманное, а впереди ждут отличные проекты и приятные сюрпризы.\n\n" +
    "С праздником от всей команды ZOND!",
];

export function birthdayText(e: Employee): string {
  const who = e.position ? `${e.full_name}, ${e.position}` : e.full_name;
  const pick = BIRTHDAY_TEMPLATES[Math.floor(Math.random() * BIRTHDAY_TEMPLATES.length)];
  return pick(who);
}

function yearsWord(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 14) return "лет";
  const last = n % 10;
  if (last === 1) return "год";
  if (last >= 2 && last <= 4) return "года";
  return "лет";
}

export function anniversaryText(e: Employee, years: number): string {
  const w = yearsWord(years);
  return (
    `🎉 Сегодня ${e.full_name} работает в ZOND ровно ${years} ${w}!\n\n` +
    `${years} ${w} проектов, побед и опыта. Спасибо, что с нами!`
  );
}
