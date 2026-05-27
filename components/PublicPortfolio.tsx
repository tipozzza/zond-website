"use client";

import { useState } from "react";
import portfolioData from "@/data/portfolio.json";
import type { CategorySlug, PortfolioItem } from "@/lib/types/portfolio";

type Props = {
  category: CategorySlug;
  title?: string;
};

export default function PublicPortfolio({ category, title = "Наши работы" }: Props) {
  const [lightbox, setLightbox] = useState<PortfolioItem | null>(null);

  const cat = (portfolioData as Record<string, { items: PortfolioItem[] }>)[category];
  if (!cat || cat.items.length === 0) return null;

  // Сортировка работ (приоритет сверху вниз):
  //  1) completionYear DESC — свежие реализованные проекты выше;
  //  2) работы без указанного года — в конец списка;
  //  3) при равных годах — order ASC (порядок drag-and-drop из /admin/portfolio).
  const items = [...cat.items].sort((a, b) => {
    const ay = (a as { completionYear?: number | null }).completionYear ?? null;
    const by = (b as { completionYear?: number | null }).completionYear ?? null;
    if (ay !== by) {
      if (ay === null) return 1; // null → в конец
      if (by === null) return -1;
      return by - ay; // больший год первым
    }
    return (a.order ?? 0) - (b.order ?? 0);
  });

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
          <div className="w-16 h-1 bg-brand mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setLightbox(item)}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all text-left"
            >
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm line-clamp-2 mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">{item.description}</p>
                )}
              </div>
            </button>
          ))}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
              className="absolute top-4 right-4 text-white text-3xl hover:text-brand"
            >
              ✕
            </button>
            <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.image}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-white text-center mt-4">
                <div className="text-xl font-bold">{lightbox.title}</div>
                {lightbox.description && (
                  <div className="text-white/70 text-sm mt-1">{lightbox.description}</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
