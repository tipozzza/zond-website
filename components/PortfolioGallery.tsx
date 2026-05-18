"use client";

import { useEffect, useState } from "react";

type Item = {
  src: string;
  category: string;
  title: string;
  client: string;
};

const ITEMS: Item[] = [
  { src: "/images/portfolio-production/portfolio-01-objemnye-bukvy.jpg", category: "letters", title: "Объёмные буквы", client: "Корпоративный заказ" },
  { src: "/images/portfolio-production/portfolio-02-svetovye-bukvy.jpg", category: "letters", title: "Световые буквы", client: "Розничный магазин" },
  { src: "/images/portfolio-production/portfolio-03-krishnaya-ustanovka.jpg", category: "roof", title: "Крышная установка", client: "БЦ в центре Томска" },
  { src: "/images/portfolio-production/portfolio-04-dns-oformlenie.jpg", category: "branding", title: "Внутреннее оформление", client: "DNS" },
  { src: "/images/portfolio-production/portfolio-05-ukazatel.jpeg", category: "navigation", title: "Указатель / навигация", client: "Городская инфраструктура" },
  { src: "/images/portfolio-production/portfolio-06-bukvy-universitet.jpg", category: "letters", title: "Объёмные буквы для университета", client: "ТУСУР" },
  { src: "/images/portfolio-production/portfolio-07-bukvy-knizhnyy.jpeg", category: "letters", title: "Объёмные буквы", client: "Книжный магазин" },
  { src: "/images/portfolio-production/portfolio-08-bukvy-kakadu.jpeg", category: "letters", title: "Объёмные буквы", client: "Клуб «Какаду»" },
  { src: "/images/portfolio-production/portfolio-09-stend.jpeg", category: "stand", title: "Информационный стенд", client: "Офисное здание" },
  { src: "/images/portfolio-production/portfolio-10-vyveska-kofeynya.jpeg", category: "lightbox", title: "Объёмная вывеска", client: "Кофейня" },
  { src: "/images/portfolio-production/portfolio-11-ostanovki.jpg", category: "infrastructure", title: "Остановочные комплексы", client: "Городская инфраструктура" },
  { src: "/images/portfolio-production/portfolio-12-azs-gazoyl.jpg", category: "branding", title: "Оформление АЗС", client: "ГазОйл" },
  { src: "/images/portfolio-production/portfolio-13-azs-gazoyl-2.jpg", category: "branding", title: "Оформление АЗС", client: "ГазОйл" },
  { src: "/images/portfolio-production/portfolio-14-shevchenko-ostanovka.jpg", category: "infrastructure", title: "Автобусная остановка", client: "ул. Шевченко" },
  { src: "/images/portfolio-production/portfolio-16-tablichka.jpeg", category: "tabletka", title: "Табличка", client: "Корпоративный заказ" },
  { src: "/images/portfolio-production/portfolio-17-tablichka-vtb.jpeg", category: "tabletka", title: "Таблички для банка", client: "ВТБ" },
  { src: "/images/portfolio-production/portfolio-20-vtb-bankomat.jpeg", category: "branding", title: "Брендирование банкомата", client: "ВТБ" },
  { src: "/images/portfolio-production/portfolio-25-objemnye-svetovye.jpeg", category: "letters", title: "Объёмные световые буквы", client: "Розничная сеть" },
  { src: "/images/portfolio-production/portfolio-32-dns-tomsk.jpeg", category: "letters", title: "Объёмные буквы DNS", client: "DNS Томск" },
  { src: "/images/portfolio-production/portfolio-33-misc.jpg", category: "other", title: "Производство", client: "Цех Зонд-Реклама" },
];

const CATEGORIES = [
  { id: "all", label: "Все работы" },
  { id: "letters", label: "Буквы" },
  { id: "lightbox", label: "Лайтбоксы и вывески" },
  { id: "roof", label: "Крышные установки" },
  { id: "branding", label: "Брендирование" },
  { id: "tabletka", label: "Таблички" },
  { id: "infrastructure", label: "Городская инфраструктура" },
];

export default function PortfolioGallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<Item | null>(null);

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

  return (
    <section id="works" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы уже сделали</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Работы дизайн-центра ZOND с 1992 года. Кликайте на любую — посмотрите в большом размере.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                filter === c.id
                  ? "bg-[#7CB342] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {filtered.map((item) => (
            <button
              key={item.src}
              onClick={() => setLightbox(item)}
              className="group relative w-full overflow-hidden rounded-2xl bg-slate-100 break-inside-avoid mb-4 block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-contain block group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                <div className="text-white font-bold leading-tight">{item.title}</div>
                <div className="text-white/80 text-xs mt-1">{item.client}</div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-slate-500 py-12">В этой категории пока пусто.</div>
        )}

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-[#7CB342] transition z-10"
              aria-label="Закрыть"
            >
              ✕
            </button>
            <div
              className="max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-white text-center mt-4">
                <div className="text-xl font-bold">{lightbox.title}</div>
                <div className="text-white/70 text-sm mt-1">{lightbox.client}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
