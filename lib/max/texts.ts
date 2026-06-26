/** Все тексты бота «Команда ZOND» — в одном месте для лёгкого редактирования. */

export const WELCOME =
  "Привет! Я бот команды ZOND 👋\n" +
  "Я слежу, чтобы команда не забывала про дни рождения друг друга и держала в курсе новостей. Давай знакомиться?";

export const CONSENT_ASK =
  "Перед началом — даёшь согласие, чтобы я сохранил твоё имя, должность и дату рождения " +
  "для поздравлений в группе «ZOND Команда»?\n\nСогласие можно отозвать в любой момент командой /удалить.";
export const CONSENT_BTN_YES = "Да, согласен";
export const CONSENT_BTN_NO = "Нет";
export const CONSENT_DECLINED = "Понял. Если передумаешь — напиши /start.";

export const ASK_NAME = "Как тебя зовут? (Имя Фамилия)";
export const ASK_POSITION = "Кем работаешь в ZOND? (например: менеджер по продажам / монтажник / дизайнер)";
export const ASK_BIRTHDAY =
  "Когда у тебя День Рождения? Формат ДД.ММ (например 15.07).\nМожно ДД.ММ.ГГГГ, если хочешь, чтобы знали возраст.";
export const ASK_HIRED = "С какого года работаешь в ZOND? Просто год (2018) или полная дата (12.03.2018).";

export const BAD_NAME = "Напиши, пожалуйста, имя и фамилию текстом — например: Иван Иванов.";
export const BAD_POSITION = "Напиши должность текстом — например: менеджер по продажам.";
export const BAD_BIRTHDAY = "Не понял дату. Формат ДД.ММ, например 09.05 (можно ДД.ММ.ГГГГ).";
export const BAD_HIRED = "Не понял. Напиши год (например 2018) или полную дату 12.03.2018.";

export const CONFIRM_BTN_YES = "Да";
export const CONFIRM_BTN_EDIT = "Изменить";

export const SAVED =
  "Готово! Теперь я буду поздравлять тебя с ДР и годовщиной в нашей группе.\n" +
  "Если захочешь что-то изменить — команда /профиль. Полный список команд: /help.";

export const DELETED = "Удалил твои данные. Больше не поздравляю. Если захочешь вернуться — /start.";
export const NOT_REGISTERED = "Я тебя ещё не записал. Напиши /start, чтобы познакомиться.";

export const HELP_EMPLOYEE =
  "Команды:\n" +
  "/start — начать или перезапустить знакомство\n" +
  "/профиль — показать мои данные\n" +
  "/удалить — удалить себя из базы (отзыв согласия)\n" +
  "/help — это сообщение";
export const HELP_ADMIN =
  "\n\nАдмин-команды:\n" +
  "/анонс <текст> — опубликовать анонс в группе\n" +
  "/добавить ФИО | должность | ДД.ММ — добавить сотрудника\n" +
  "/список — список зарегистрированных сотрудников\n" +
  "/убрать N — убрать сотрудника №N из /список\n" +
  "/добавить_праздник ДД.ММ <название> — добавить корп. праздник\n" +
  "/тест_др — тестовый прогон поздравлений (вам в личку)\n" +
  "/викторина — запустить вопрос викторины сейчас\n" +
  "/добавить_вопрос Вопрос | Вар1 | Вар2 | Вар3 | N | Пояснение\n" +
  "/chatid — ID текущего чата\n" +
  "/myid — ваш user_id";

export const ANNOUNCE_HEADER = "📢 Анонс от руководства";
export const ANNOUNCE_EMPTY = "После /анонс напишите текст. Пример:\n/анонс Завтра в 10:00 общая планёрка.";
export const ANNOUNCE_DONE = "Опубликовал в группе ✅";

export const ADMIN_ONLY = "Эта команда только для администратора.";
export const NO_GROUP_SET =
  "Группа для публикаций не настроена (MAX_GROUP_ID). Добавьте бота в группу и выполните в ней /chatid.";
export const GROUP_GREETING =
  "добро пожаловать в команду ZOND! 🎉 Чтобы освоиться — загляни в закреплённое сообщение вверху: там о группе и правилах общения.";

export type DraftData = {
  full_name?: string;
  position?: string;
  birth_day?: number;
  birth_month?: number;
  birth_year?: number | null;
  hired_year?: number;
  hired_full_date?: string | null;
  gender?: "male" | "female" | null;
};

function fmtBirthday(d: { birth_day?: number; birth_month?: number; birth_year?: number | null }): string {
  const bd = `${String(d.birth_day).padStart(2, "0")}.${String(d.birth_month).padStart(2, "0")}`;
  return d.birth_year ? `${bd}.${d.birth_year}` : bd;
}

export function confirmPreview(d: DraftData): string {
  const hired = d.hired_full_date || String(d.hired_year);
  return (
    "✅ Записал:\n" +
    `👤 ${d.full_name}\n` +
    `💼 ${d.position}\n` +
    `🎂 ${fmtBirthday(d)}\n` +
    `🏢 В ZOND с ${hired}\n\n` +
    "Всё верно?"
  );
}

export function profileCard(e: {
  full_name: string;
  position: string;
  birth_day: number;
  birth_month: number;
  birth_year: number | null;
  hired_year: number;
  hired_full_date: string | null;
}): string {
  const hired = e.hired_full_date || String(e.hired_year);
  return (
    "Твои данные:\n" +
    `👤 ${e.full_name}\n` +
    `💼 ${e.position}\n` +
    `🎂 ${fmtBirthday(e)}\n` +
    `🏢 В ZOND с ${hired}\n\n` +
    "Изменить — /start. Удалить — /удалить."
  );
}
