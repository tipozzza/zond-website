"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "zond-cookie-consent";
const TTL_DAYS = 365;

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { ts } = JSON.parse(saved);
        const expired = Date.now() - ts > TTL_DAYS * 86400 * 1000;
        if (!expired) return;
      }
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    } catch {
      // localStorage недоступен — показываем баннер без TTL-проверки
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ts: Date.now(), version: "1" }),
      );
      window.dispatchEvent(new CustomEvent("cookie-consent-given"));
    } catch {
      // localStorage недоступен — просто скрываем баннер
    }
    setVisible(false);
  };

  if (!visible) return null;

  // Компактная плашка. Раньше большая карточка в правом нижнем углу
  // закрывала кнопки первого экрана главной («Посмотреть конструкции»).
  // Телефон/планшет — узкая полоса у нижнего края; с 1024 px — слева внизу,
  // где на первом экране только фон (текст и кнопки hero — справа),
  // и не пересекается с плавающими кнопками Telegram/MAX справа.
  return (
    <div
      role="region"
      aria-label="Уведомление о cookies"
      className="fixed z-50 inset-x-3 bottom-3 lg:inset-x-auto lg:left-6 lg:bottom-6 lg:max-w-[440px] bg-white border border-slate-200 shadow-2xl rounded-xl px-4 py-3 flex items-center gap-3"
    >
      <p className="flex-1 text-xs text-slate-600 leading-snug">
        Мы используем cookies для аналитики и улучшения сайта. Продолжая
        использовать сайт, вы соглашаетесь на их использование.{" "}
        <Link href="/privacy" className="underline hover:text-brand">
          Подробнее
        </Link>
      </p>
      <button
        onClick={accept}
        className="shrink-0 px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
      >
        Принимаю
      </button>
    </div>
  );
}
