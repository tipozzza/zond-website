/**
 * Ссылка на MAX-мессенджер.
 *
 * Прямая ссылка на профиль (формат `https://max.ru/u/<id>`). Ссылка по номеру
 * телефона (`https://max.ru/+7…`) чат не открывала, поэтому используем
 * персональный профильный URL. Если MAX установлен и зарегистрирован как
 * обработчик домена max.ru — система откроет приложение; если нет — откроется
 * веб-страница профиля.
 *
 * Это Server Component (без onClick) — браузер просто делает GET по URL,
 * проверка iOS/Android Universal Link происходит на уровне OS.
 *
 * Ссылка MAX заведена в одном месте — менять тут.
 */

const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_LINK =
  "https://max.ru/u/f9LHodD0cOLpPZKaezQOnH4bvNYa-RRXQaz3r_eygqquQr0kWE5PyafLClI";

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
