/**
 * Ссылка на MAX-мессенджер — ведёт в профиль компании ZOND
 * (формат `https://max.ru/u/<id>`). Клиент пишет напрямую 1:1, без бота.
 * Группу как публичную кнопку MAX не поддерживает (по join-ссылке с улицы
 * в чат не пускает), поэтому используем профиль — он открывается надёжно.
 * Если MAX установлен — система откроет приложение; если нет — веб-версию.
 *
 * Это Server Component (без onClick) — браузер просто делает GET по URL,
 * проверка iOS/Android Universal Link происходит на уровне OS.
 *
 * Ссылка MAX заведена в одном месте — менять тут.
 */

const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_LINK = "https://max.ru/u/f9LHodD0cOLpPZKaezQOnH4bvNYa-RRXQaz3r_eygqquQr0kWE5PyafLClI";

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
