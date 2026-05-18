"use client";

import { useEffect, useState } from "react";

type Item = { src: string; title: string };

const ITEMS: Item[] = [
  { src: "/images/led/portfolio-01.jpg", title: "Иллюминация фасада" },
  { src: "/images/led/portfolio-02-main.jpg", title: "Новогоднее оформление" },
  { src: "/images/led/portfolio-03.jpg", title: "Оформление ёлки" },
  { src: "/images/led/portfolio-04.jpg", title: "LED-экран медиа-фасад" },
  { src: "/images/led/portfolio-05.jpg", title: "Светодиодные фигуры" },
  { src: "/images/led/portfolio-06.jpg", title: "Световая инсталляция" },
  { src: "/images/led/portfolio-07.jpg", title: "Декор торгового центра" },
  { src: "/images/led/portfolio-08.jpg", title: "Архитектурная подсветка" },
];

export default function LedPortfolio() {
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  const markFailed = (src: string) =>
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Иллюминация, экраны, новогоднее оформление — в Томске и других городах.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ITEMS.map((item) => {
            const isFailed = failedSrcs.has(item.src);
            return (
              <button
                key={item.src}
                onClick={() => !isFailed && setLightbox(item)}
                className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100"
              >
                {isFailed ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1E3F] to-[#0E1A2B] text-[#F4C430]">
                    <div className="text-4xl">✨</div>
                    <div className="text-xs font-semibold mt-2 opacity-70">Фото скоро</div>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    onError={() => markFailed(item.src)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 text-left">
                  <div className="text-white font-bold text-sm leading-tight">{item.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#F4C430] transition z-10"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-white text-center mt-4 text-xl font-bold">
                {lightbox.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
