import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";

type Item = {
  title: string;
  desc: string;
  image: string;
  imageAlt?: string;
  href: string;
  accent: string;
  cta?: string;
};

const FALLBACK_INTERIOR_PRINT = "/images/blog/shirokoformatnaya-pechat.jpg";

function resolvePhoto(preferredPath: string, fallback: string): string {
  const abs = path.join(process.cwd(), "public", preferredPath.replace(/^\//, ""));
  return existsSync(abs) ? preferredPath : fallback;
}

const items: Item[] = [
  {
    title: "Outdoor размещение",
    desc: "Цифровые экраны, билборды, сити-форматы, суперсайты, призматроны — 11 видов носителей.",
    image: "/images/outdoor-mix.jpg",
    href: "/outdoor",
    accent: "#F57C28",
    cta: "Разместить наружную рекламу",
  },
  {
    title: "Светодиодные экраны",
    desc: "Производство пилонов, LED-экранов, цифровых билбордов. С 2007 года.",
    image: "/images/outdoor-led-night.jpg",
    href: "/led#screens",
    accent: "#550082",
    cta: "Заказать LED-экран",
  },
  {
    title: "Производство рекламы",
    desc: "Вывески, таблички, стелы, МАФ, входные группы, штендеры, ресепшн.",
    image: "/images/production-workshop.jpg",
    href: "/production",
    accent: "#7CB342",
    cta: "Заказать вывеску в Томске",
  },
  {
    title: "Широкоформатная печать",
    desc: "Печать баннеров до 3,2 м и баннерной сетки. 50 000 м²/год.",
    image: "/images/production.jpg",
    href: "/print#wide",
    accent: "#FFCC00",
    cta: "Заказать печать в Томске",
  },
  {
    title: "Светодиодная иллюминация",
    desc: "Новогодняя иллюминация, световые фигуры, контурная подсветка фасадов. Бренд Лайтово.",
    image: "/images/led-illumination.jpg",
    href: "/led#illumination",
    accent: "#550082",
    cta: "Заказать новогоднее оформление",
  },
  {
    title: "Выставочные экспозиции",
    desc: "От портативного Pop-up за 1 800 ₽ до уникальной экспозиции 100+ м². Дилер MAXIBIT (Швеция) с 2006.",
    image: "/images/exhibition.jpg",
    href: "/exhibition",
    accent: "#3FA3D9",
    cta: "Заказать выставочный стенд",
  },
  {
    title: "Дизайн рекламы",
    desc: "Баннеры, фирменный стиль, вывески, упаковка, этикетки, 3D-модели и анимация роликов.",
    image: "/images/design/category-outdoor-design.jpg",
    href: "/design#advertising-design",
    accent: "#550082",
    cta: "Создать логотип",
  },
  {
    title: "Интерьерная печать",
    desc: "Наклейки, печать на холсте, фотопанели, трафареты — до 1440 dpi.",
    image: resolvePhoto("/images/cases/interior-print.jpg", FALLBACK_INTERIOR_PRINT),
    imageAlt: "Интерьерная печать на холсте и плёнке в Томске — ZOND",
    href: "/print#interior",
    accent: "#FFCC00",
    cta: "Заказать интерьерную печать",
  },
  {
    title: "Печать полиграфии",
    desc: "Визитки, листовки, каталоги, брошюры, плакаты, фирменные конверты.",
    image: "/images/design/category-design-polygraphy.jpg",
    href: "/design#polygraphy",
    accent: "#550082",
    cta: "Заказать полиграфию",
  },
  {
    title: "Брендированные сувениры",
    desc: "Кружки, ручки, флешки, ежедневники, одежда с вашим логотипом. От пробной партии до тиража 10 000+ штук.",
    image: "/images/design/category-souvenir.jpg",
    href: "/design#souvenirs",
    accent: "#550082",
    cta: "Заказать сувениры с логотипом",
  },
  {
    title: "Согласование рекламы",
    desc: "Берём на себя бумажную работу — паспорта фасада и конструкции, согласование с администрацией Томска под ключ.",
    image: "/images/approval.jpg",
    href: "/pasport-fasada",
    accent: "#7CB342",
    cta: "Подробнее о согласовании",
  },
  {
    title: "Комплексное оформление",
    desc: "Когда нужно всё сразу — от вывески и витрины до бейджа сотрудника. Единый стиль везде.",
    image: "/images/complex.jpg",
    href: "/design#complex",
    accent: "#550082",
    cta: "Обсудить комплексный проект",
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
                  alt={item.imageAlt ?? `${item.title} — Зонд-Реклама, Томск`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                  {item.cta ?? "Подробнее"}
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
