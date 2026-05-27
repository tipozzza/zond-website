/**
 * Ссылка на MAX-мессенджер.
 *
 * Сейчас тестируем формат N1: Universal Link на профиль по номеру —
 * `https://max.ru/+79234009705`. Если MAX установлен и зарегистрирован
 * как обработчик домена max.ru — система откроет приложение; если нет —
 * откроется веб-страница профиля.
 *
 * Это Server Component (без onClick) — браузер просто делает GET по URL,
 * проверка iOS/Android Universal Link происходит на уровне OS.
 *
 * Номер MAX заведён в одном месте — менять тут.
 */

const MAX_PHONE = "79234009705";
const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_LINK = `https://max.ru/+${MAX_PHONE}`;

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
