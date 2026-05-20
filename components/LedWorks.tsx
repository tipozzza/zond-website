"use client";

import { useState } from "react";

type Work = { src: string; title: string; desc: string };

const WORKS: Work[] = [
  { src: "/images/led/work-park.jpg", title: "Парк к Новому году", desc: "Иллюминация парковой зоны" },
  { src: "/images/led/work-mall.jpg", title: "ТЦ — интерьер", desc: "Новогоднее оформление атриума" },
  { src: "/images/led/work-house.jpg", title: "Частный дом", desc: "Подсветка фасада и двора" },
  { src: "/images/led/work-azs.jpg", title: "Брендирование АЗС", desc: "Светодиодное оформление сети" },
  { src: "/images/led/work-square-big.jpg", title: "Центральная площадь", desc: "Городское оформление" },
  { src: "/images/led/work-facade.jpg", title: "Архитектурная подсветка", desc: "Контурная RGB-подсветка офисного здания" },
];

export default function LedWorks() {
  const [lightbox, setLightbox] = useState<Work | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Наши работы</h2>
          <p className="text-slate-600">Реализованные проекты иллюминации в Томске и регионах</p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {WORKS.map((work, i) => (
            <button
              key={i}
              onClick={() => setLightbox(work)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.src}
                alt={work.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-left">
                <h3 className="text-white font-bold text-lg">{work.title}</h3>
                <p className="text-white/80 text-sm">{work.desc}</p>
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
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#F4C430] transition"
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
                <div className="text-white/70 text-sm">{lightbox.desc}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
