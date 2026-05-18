"use client";

import { useEffect, useState } from "react";

type Item = { src: string; category: string; title: string };

const ITEMS: Item[] = [
  { src: "/images/design/portfolio/portfolio-01.png", category: "polygraphy", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-02.png", category: "polygraphy", title: "Каталог" },
  { src: "/images/design/portfolio/portfolio-03.png", category: "polygraphy", title: "Календарь" },
  { src: "/images/design/portfolio/portfolio-04.png", category: "polygraphy", title: "Открытки" },
  { src: "/images/design/portfolio/portfolio-05.png", category: "polygraphy", title: "Брошюры" },
  { src: "/images/design/portfolio/portfolio-06.png", category: "polygraphy", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-07.png", category: "polygraphy", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-08.png", category: "polygraphy", title: "Полиграфия" },
  { src: "/images/design/portfolio/portfolio-09.png", category: "polygraphy", title: "Полиграфия" },
  { src: "/images/design/portfolio/logos-01.png", category: "logos", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-02.png", category: "logos", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-03.png", category: "logos", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-04.png", category: "logos", title: "Логотипы" },
  { src: "/images/design/portfolio/logos-05.png", category: "logos", title: "Логотипы" },
];

const CATEGORIES = [
  { id: "all", label: "Все работы" },
  { id: "polygraphy", label: "Полиграфия" },
  { id: "logos", label: "Логотипы" },
];

export default function DesignPortfolio() {
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши работы</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Реальные кейсы — от логотипов кофейни до брендбука университета. Кликайте — посмотрите в большом размере.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === c.id
                  ? "bg-[#3949AB] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const isFailed = failedSrcs.has(item.src);
            return (
              <button
                key={item.src}
                onClick={() => !isFailed && setLightbox(item)}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100"
              >
                {isFailed ? (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-slate-400">
                    🖼️
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white font-bold leading-tight">{item.title}</div>
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
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#3949AB] transition z-10"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[90vh] object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
