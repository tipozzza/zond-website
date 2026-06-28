/**
 * Ссылка на MAX-мессенджер — ведёт в чат-бот «Центр заказов zondreklama»
 * (формат `https://max.ru/<имя_бота>`). Открывает лендинг бота с кнопкой
 * «Запустить бота»: клиент пишет обращение, бот пересылает его менеджеру.
 * Если MAX установлен — система откроет приложение; если нет — веб-версию.
 *
 * Это Server Component (без onClick) — браузер просто делает GET по URL,
 * проверка iOS/Android Universal Link происходит на уровне OS.
 *
 * Ссылка MAX заведена в одном месте — менять тут.
 */

const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_LINK = "https://max.ru/id7017200748_1_bot";

type Props = {
  className?: string;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function MaxLink({ className, title, ariaLabel, children }: Props) {
  return (
    <a
      href={MAX_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      title={title ?? `Написать в MAX (${MAX_TEL_DISPLAY})`}
      aria-label={ariaLabel ?? `Написать в MAX, номер ${MAX_TEL_DISPLAY}`}
    >
      {children}
    </a>
  );
}
