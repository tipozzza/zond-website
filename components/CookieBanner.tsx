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

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <div className="text-2xl" aria-hidden>
          🍪
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
            Cookies на сайте
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed">
            Мы используем cookies для аналитики и улучшения сайта. Продолжая использовать сайт, вы соглашаетесь на их использование.{" "}
            <Link href="/privacy" className="underline hover:text-brand">
              Подробнее в Политике конфиденциальности
            </Link>
            .
          </p>
          <div className="flex gap-2">
            <button
              onClick={accept}
              className="px-4 py-2 bg-brand text-white text-sm font-medium rounded-lg hover:opacity-90 transition"
            >
              Принимаю
            </button>
            <Link
              href="/privacy"
              className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition"
            >
              Подробнее
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
