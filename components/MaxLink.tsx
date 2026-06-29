/**
 * Ссылка на MAX-мессенджер — ведёт в общий чат отдела продаж ZOND
 * (ссылка-приглашение `https://max.ru/join/...`). Клиент вступает в чат и пишет
 * напрямую — отвечают менеджеры. Без бота-посредника.
 * Если MAX установлен — система откроет приложение; если нет — веб-версию.
 *
 * Это Server Component (без onClick) — браузер просто делает GET по URL,
 * проверка iOS/Android Universal Link происходит на уровне OS.
 *
 * Ссылка MAX заведена в одном месте — менять тут.
 */

const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_LINK = "https://max.ru/join/fS8UraZMML08Ha7ANiUUTfTaf7j920yxcbmlY6iITN0";

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
