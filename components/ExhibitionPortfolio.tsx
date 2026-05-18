"use client";

import { useEffect, useState } from "react";

type Item = { src: string; title: string; desc: string };

const ITEMS: Item[] = [
  {
    src: "/images/exhibition/portfolio/case-corporate-booth.jpg",
    title: "Корпоративный стенд",
    desc: "Премиум-сегмент для крупного бизнеса",
  },
  {
    src: "/images/exhibition/portfolio/case-oil-gas.jpg",
    title: "Нефтегазовая выставка",
    desc: "Индустриальные конференции и форумы",
  },
  {
    src: "/images/exhibition/portfolio/case-it-conference.jpg",
    title: "IT-конференция «Город IT»",
    desc: "Современные минималистичные решения",
  },
  {
    src: "/images/exhibition/portfolio/case-retail-popup.jpg",
    title: "Промо в торговом центре",
    desc: "POS-активации и pop-up зоны",
  },
  {
    src: "/images/exhibition/portfolio/case-mobile-event.jpg",
    title: "Мобильные стенды на event",
    desc: "Быстрая сборка под разовые события",
  },
  {
    src: "/images/exhibition/portfolio/case-large-exhibition.jpg",
    title: "Крупная экспозиция",
    desc: "100+ м² с зонами переговоров и продукции",
  },
];

export default function ExhibitionPortfolio() {
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

  const markFailed = (src: string) => {
    setFailedSrcs((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Дизайн, печать и монтаж экспозиций для крупных мероприятий.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ITEMS.map((item) => {
            const isFailed = failedSrcs.has(item.src);
            return (
              <button
                key={item.src}
                onClick={() => !isFailed && setLightbox(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {isFailed ? (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <div className="text-5xl">🏗️</div>
                    <div className="text-xs font-semibold mt-2">Фото скоро</div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-5 text-left">
                  <div className="text-white font-bold text-lg leading-tight">{item.title}</div>
                  <div className="text-white/80 text-xs mt-1 leading-snug">{item.desc}</div>
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
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#3FA3D9] transition z-10"
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
              <div className="text-white text-center mt-4">
                <div className="text-xl font-bold">{lightbox.title}</div>
                <div className="text-white/70 text-sm mt-1">{lightbox.desc}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
