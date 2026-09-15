"use client";

import { useEffect } from "react";

/**
 * Раскрывает нужный раздел каталога по якорю. Ссылки «Подробнее и цены ↓»
 * из карточек продукции ведут на #catalog-<id>; сам по себе браузер
 * проскроллит к свёрнутому <details>, но не откроет его — открываем здесь.
 * Без JS ничего не ломается: блок просто останется свёрнутым.
 */
export default function CatalogHashOpener() {
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id.startsWith("catalog-")) return;
      const el = document.getElementById(id);
      if (!(el instanceof HTMLDetailsElement)) return;
      if (!el.open) el.open = true;
      // Высота страницы изменилась после раскрытия — доскроллить к заголовку.
      requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  return null;
}
