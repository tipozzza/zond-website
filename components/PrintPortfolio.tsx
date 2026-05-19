"use client";

import { useEffect, useState } from "react";

type Item = {
  src: string;
  title: string;
  category: string;
  desc: string;
};

const ITEMS: Item[] = [
  {
    src: "/images/print/print-portfolio-01-eldorado.jpg",
    title: "Литой баннер «Эльдорадо»",
    category: "banner",
    desc: "Баннер 6×3 м, литой 460 гр",
  },
  {
    src: "/images/print/print-portfolio-02-banner.jpg",
    title: "Широкоформатная печать",
    category: "banner",
    desc: "Баннер для наружной рекламы",
  },
  {
    src: "/images/print/print-portfolio-03-interior.jpeg",
    title: "Интерьерная печать",
    category: "interior",
    desc: "Постер для интерьера",
  },
  {
    src: "/images/print/print-portfolio-04-banner.jpeg",
    title: "Печать на баннере",
    category: "banner",
    desc: "Полноцветная сольвентная",
  },
];

const CATEGORIES = [
  { id: "all", label: "Все работы" },
  { id: "banner", label: "Баннеры" },
  { id: "interior", label: "Интерьерная" },
];

export default function PrintPortfolio() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());

  const filtered = filter === "all" ? ITEMS : ITEMS.filter((i) => i.category === filter);

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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы уже напечатали</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Реальные работы за 33 года. Кликайте — посмотрите в большом размере.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === c.id
                  ? "bg-[#FFCC00] text-slate-900"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isFailed = failedSrcs.has(item.src);
            return (
              <button
                key={item.src}
                onClick={() => !isFailed && setLightbox(item)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
              >
                {isFailed ? (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-slate-400">
                    🖨️
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <div className="text-white font-bold leading-tight">{item.title}</div>
                  <div className="text-white/80 text-xs mt-1">{item.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-8">Нет работ в этой категории</div>
        )}

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#FFCC00] transition z-10"
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
