"use client";

import { useState } from "react";

type Work = { src: string; title: string };

const WORKS: Work[] = [
  { src: "/images/led/work-01.jpg", title: "Оформление к Новому году" },
  { src: "/images/led/work-02.jpg", title: "Городское оформление" },
  { src: "/images/led/work-03.jpg", title: "Подсветка фасада" },
  { src: "/images/led/work-04.jpg", title: "Иллюминация коммерческого объекта" },
  { src: "/images/led/work-05.jpg", title: "Новогоднее оформление" },
  { src: "/images/led/work-06.jpg", title: "Световые фигуры на площади" },
  { src: "/images/led/work-07.jpg", title: "Праздничная иллюминация" },
  { src: "/images/led/work-08.jpg", title: "Подсветка территории" },
  { src: "/images/led/work-09.jpg", title: "Новогоднее оформление 2020" },
  { src: "/images/led/work-10.jpg", title: "Оформление к зиме" },
  { src: "/images/led/work-11.jpg", title: "Световое оформление" },
  { src: "/images/led/work-12.jpg", title: "Городские конструкции" },
  { src: "/images/led/work-13.jpg", title: "Брендированное оформление" },
  { src: "/images/led/work-14.jpg", title: "Иллюминация объекта" },
  { src: "/images/led/work-15.jpg", title: "Светящееся пространство" },
  { src: "/images/led/work-16.jpg", title: "Декор фасада" },
  { src: "/images/led/work-17.jpg", title: "Световой декор" },
  { src: "/images/led/work-18.jpg", title: "Иллюминация парка" },
  { src: "/images/led/work-19.jpg", title: "Архитектурное освещение" },
  { src: "/images/led/work-20.jpg", title: "Праздничная инсталляция" },
  { src: "/images/led/work-21.jpg", title: "Подсветка территории" },
  { src: "/images/led/work-22.jpg", title: "Праздничный декор" },
  { src: "/images/led/work-23.jpg", title: "Световая композиция" },
];

export default function LedWorks() {
  const [lightbox, setLightbox] = useState<Work | null>(null);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? WORKS : WORKS.slice(0, 12);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Наши работы</h2>
          <p className="text-slate-600">Реализованные проекты иллюминации</p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {visible.map((work, i) => (
            <button
              key={i}
              onClick={() => setLightbox(work)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-md hover:shadow-2xl transition-all"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-sm font-semibold">{work.title}</span>
              </div>
            </button>
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setShowAll(true)}
              className="bg-[#0B1E3F] hover:bg-[#1E3A5F] text-white px-8 py-4 rounded-xl font-bold transition"
            >
              Показать ещё {WORKS.length - 12}
            </button>
            <a
              href="https://lightovo.ru/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition"
            >
              Полное портфолио →
            </a>
          </div>
        )}

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#F4C430]"
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
              <div className="text-white text-center mt-4 text-xl font-bold">{lightbox.title}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
