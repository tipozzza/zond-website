"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

type Item = {
  title: string;
  desc: string;
  image: string;
  href: string;
  accent: string;
};

const items: Item[] = [
  {
    title: "Outdoor размещение",
    desc: "Цифровые экраны, билборды, сити-форматы, суперсайты, призматроны — 11 видов носителей.",
    image: "/images/outdoor-mix.jpg",
    href: "/outdoor",
    accent: "#F57C28",
  },
  {
    title: "Светодиодные экраны",
    desc: "Производство пилонов, LED-экранов, цифровых билбордов. С 2007 года.",
    image: "/images/outdoor-led-night.jpg",
    href: "/led#screens",
    accent: "#7B1FA2",
  },
  {
    title: "Производство рекламы",
    desc: "Вывески, таблички, стелы, МАФ, входные группы, штендеры, ресепшн.",
    image: "/images/production-workshop.jpg",
    href: "/production",
    accent: "#7CB342",
  },
  {
    title: "Широкоформатная печать",
    desc: "Печать баннеров до 3,2 м и баннерной сетки. 50 000 м²/год.",
    image: "/images/production.jpg",
    href: "/print#wide",
    accent: "#FFCC00",
  },
  {
    title: "Светодиодная иллюминация",
    desc: "Новогодняя иллюминация, световые фигуры, контурная подсветка фасадов. Бренд Лайтово.",
    image: "/images/led-illumination.jpg",
    href: "/led#illumination",
    accent: "#7B1FA2",
  },
  {
    title: "Выставочные экспозиции",
    desc: "От портативного Pop-up за 1 800 ₽ до уникальной экспозиции 100+ м². Дилер MAXIBIT (Швеция) с 2006.",
    image: "/images/exhibition.jpg",
    href: "/exhibition",
    accent: "#3FA3D9",
  },
  {
    title: "Дизайн рекламы",
    desc: "Баннеры, фирстиль, вывески, упаковка, этикетки, 3D-модели и анимация роликов.",
    image: "/images/design/category-outdoor-design.jpg",
    href: "/design#advertising-design",
    accent: "#3949AB",
  },
  {
    title: "Интерьерная печать",
    desc: "Наклейки, печать на холсте, фотопанели, трафареты — до 1440 dpi.",
    image: "/images/design/category-print.jpg",
    href: "/print#interior",
    accent: "#FFCC00",
  },
  {
    title: "Печать полиграфии",
    desc: "Визитки, листовки, каталоги, брошюры, плакаты, фирменные конверты.",
    image: "/images/design/category-design-polygraphy.jpg",
    href: "/design#polygraphy",
    accent: "#3949AB",
  },
  {
    title: "Брендированные сувениры",
    desc: "Кружки, ручки, флешки, ежедневники, одежда с вашим логотипом. От пробной партии до тиража 10 000+ штук.",
    image: "/images/design/category-souvenir.jpg",
    href: "/design#souvenirs",
    accent: "#3949AB",
  },
  {
    title: "Согласование рекламы",
    desc: "Берём на себя бумажную работу — паспорта фасада и конструкции, согласование с администрацией Томска под ключ.",
    image: "/images/approval.jpg",
    href: "/production#approval",
    accent: "#7CB342",
  },
  {
    title: "Комплексное оформление",
    desc: "Когда нужно всё сразу — от вывески и витрины до бейджа сотрудника. Единый стиль везде.",
    image: "/images/complex.jpg",
    href: "/design#complex",
    accent: "#3949AB",
  },
];

export default function Cases() {
  return (
    <section id="cases" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Что мы делаем</h2>
          <p className="text-slate-600">
            12 услуг для бизнеса в Томске — от дизайна баннера до комплексного брендирования объекта.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-200 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col"
              style={{ "--accent": item.accent } as CSSProperties}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                <h3 className="absolute bottom-3 left-4 right-4 text-white font-bold text-lg drop-shadow-lg leading-tight">
                  {item.title}
                </h3>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-slate-600 leading-relaxed mb-3 flex-1">{item.desc}</p>
                <span
                  className="text-sm font-semibold flex items-center gap-1 mt-auto"
                  style={{ color: "var(--accent)" }}
                >
                  Подробнее
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
