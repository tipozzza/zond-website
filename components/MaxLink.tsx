"use client";

import { useCallback } from "react";

/**
 * Умная ссылка на MAX-мессенджер с фоллбэком.
 *
 * Поведение:
 * - На мобильных (iOS/Android) пытаемся открыть приложение через deep-link
 *   `max://im?phone=...`. Если приложение не установлено, через 1.5 сек
 *   редирект на https://max.ru/ (web-версия / страница установки).
 * - На десктопе сразу открываем веб-версию max.ru в новой вкладке —
 *   deep-link на десктопе всё равно не работает.
 *
 * Номер заведён в одном месте — менять тут.
 */

const MAX_PHONE = "79234009705";
const MAX_TEL_DISPLAY = "+7 923 400-97-05";
const MAX_DEEPLINK = `max://im?phone=${MAX_PHONE}`;
const MAX_WEB_FALLBACK = "https://max.ru/";

type Props = {
  className?: string;
  title?: string;
  ariaLabel?: string;
  children: React.ReactNode;
};

export default function MaxLink({ className, title, ariaLabel, children }: Props) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

    if (isMobile) {
      // Попытка открыть приложение. Если оно установлено — система перехватит
      // navigation, и setTimeout не успеет выполниться (страница свернётся).
      // Если приложения нет — упадём на web-fallback через 1.5 сек.
      window.location.href = MAX_DEEPLINK;
      window.setTimeout(() => {
        window.location.href = MAX_WEB_FALLBACK;
      }, 1500);
    } else {
      // Десктоп — deep-link бесполезен. Сразу веб-версию в новой вкладке.
      window.open(MAX_WEB_FALLBACK, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <a
      href={MAX_DEEPLINK}
      onClick={handleClick}
      className={className}
      title={title ?? `Написать в MAX (${MAX_TEL_DISPLAY})`}
      aria-label={ariaLabel ?? `Написать в MAX, номер ${MAX_TEL_DISPLAY}`}
    >
      {children}
    </a>
  );
}
