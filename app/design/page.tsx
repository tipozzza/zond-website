import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import DesignCalculator from "@/components/DesignCalculator";
import DesignPortfolio from "@/components/DesignPortfolio";
import ImageWithFallback from "@/components/ImageWithFallback";

const CATEGORIES: { img: string; title: string; priceBadge: string; description: string }[] = [
  {
    img: "/images/design/category-design-polygraphy.jpg",
    title: "Дизайн полиграфии",
    priceBadge: "ОТ 200 ₽",
    description: "Визитки, буклеты, открытки, календари — 32 позиции прайса.",
  },
  {
    img: "/images/design/category-print.jpg",
    title: "Печать полиграфии",
    priceBadge: "ОТ 4 ₽/ШТ",
    description: "Визитки от 96 шт, листовки от 10 шт, открытки, буклеты, флаеры.",
  },
  {
    img: "/images/design/category-souvenir.jpg",
    title: "Сувенирная продукция",
    priceBadge: "ОТ 5 ₽/ШТ",
    description: "Тампонная печать на ручках, кружках, флешках, от 50 шт.",
  },
  {
    img: "/images/design/category-outdoor-design.jpg",
    title: "Дизайн наружки",
    priceBadge: "ОТ 250 ₽",
    description: "Таблички, вывески, баннеры, штендеры, световые короба.",
  },
  {
    img: "/images/design/category-logo.jpg",
    title: "Логотип",
    priceBadge: "ОТ 8 000 ₽",
    description: "Монохромный, цветной, комплекс с лого-буком.",
  },
  {
    img: "/images/design/category-brandbook.jpg",
    title: "Брендбук",
    priceBadge: "ОТ 20 000 ₽",
    description: "Индивидуальный / Оптимальный / Комплекс с офис- и интерьерным стилем.",
  },
];

const STEPS = [
  { num: 1, title: "Бриф", text: "Заполните калькулятор или позвоните — обсудим задачу." },
  { num: 2, title: "Концепция", text: "Готовим 2–3 варианта эскизов за 1–3 дня." },
  { num: 3, title: "Доработка", text: "Корректируем выбранный вариант до финального макета." },
  { num: 4, title: "Печать / производство", text: "Типичные сроки — от 1 до 7 дней." },
  { num: 5, title: "Сдача", text: "Передаём готовый тираж или печатные файлы." },
];

const EQUIPMENT: {
  image: string;
  type: string;
  name: string;
  specs: { label: string; value: string }[];
}[] = [
  {
    image: "/images/design/equipment-xerox-color550.jpg",
    type: "ФЛАГМАН МФ",
    name: "Xerox Color 550",
    specs: [
      { label: "Формат", value: "SRA3, A6–A3+" },
      { label: "Плотность", value: "64–300 г/м²" },
      { label: "Скорость", value: "50 стр/мин" },
      { label: "Разрешение", value: "до 2400 dpi" },
    ],
  },
  {
    image: "/images/design/equipment-oki-es9541.jpg",
    type: "БЕЛИЛО + ЛАК",
    name: "OKI ES9541",
    specs: [
      { label: "Формат", value: "A5–A3+" },
      { label: "Плотность", value: "до 360 г/м²" },
      { label: "Скорость", value: "25 стр/мин" },
      { label: "Цветность", value: "CMYK + белый + лак (уникально для Томска)" },
    ],
  },
  {
    image: "/images/design/equipment-hp-designjet.jpg",
    type: "ШИРОКОФОРМАТНАЯ ФОТО",
    name: "HP DesignJet Z5200",
    specs: [
      { label: "Формат", value: "до A0 (1118×1676 мм)" },
      { label: "Плотность", value: "до 500 г/м²" },
      { label: "Скорость", value: "10 м²/час" },
      { label: "Разрешение", value: "2400×1200 dpi, отпечатки до 200 лет" },
    ],
  },
  {
    image: "/images/design/equipment-zeon-cutter.jpg",
    type: "РЕЗКА И БИГОВКА",
    name: "ZEONCUT FB-6090",
    specs: [
      { label: "Тип", value: "планшетный плоттер" },
      { label: "Формат", value: "600×900 мм" },
      { label: "Давление", value: "до 1200 г" },
      { label: "Скорость", value: "до 600 мм/с" },
    ],
  },
  {
    image: "/images/design/equipment-zprinter-3d.jpg",
    type: "3D-ПЕЧАТЬ",
    name: "Z Corporation ZPrinter 450",
    specs: [
      { label: "Цветность", value: "полноцветная" },
      { label: "Объект", value: "203×254×203 мм" },
      { label: "Разрешение", value: "300×450 dpi" },
    ],
  },
];

export const metadata: Metadata = {
  title: "Дизайн и полиграфия в Томске — Зонд-Реклама",
  description:
    "Дизайн, полиграфия и сувенирная продукция в Томске. Логотипы от 8000 ₽, брендбук от 20000 ₽. Калькулятор.",
};

export default function DesignPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] bg-gradient-to-br from-indigo-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/design-portfolio.jpg"
              alt="Дизайн-портфолио Зонд-Реклама"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
            <div className="max-w-2xl text-white">
              <div className="inline-block bg-[#3949AB] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                ДИЗАЙН-ЦЕНТР С 1995 ГОДА
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                Дизайн, полиграфия и сувенирная продукция
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                От визитки до брендбука. Дипломы конкурса «Виктория». Делаем всё что можно
                напечатать — и считаем стоимость прямо здесь.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#calculator"
                  className="bg-[#3949AB] hover:bg-[#303F9F] text-white px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Рассчитать стоимость
                </a>
                <a
                  href="#portfolio"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Портфолио
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Что мы делаем */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Что мы делаем</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              6 направлений работы дизайн-центра — с реальными ценами от.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((c) => (
                <a
                  key={c.title}
                  href="#calculator"
                  className="group block rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#3949AB] hover:shadow-2xl hover:shadow-[#3949AB]/20 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#3949AB]">
                      {c.priceBadge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-slate-900 leading-tight">{c.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <DesignCalculator />

        {/* Портфолио */}
        <div id="portfolio">
          <DesignPortfolio />
        </div>

        {/* Этапы */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Как мы работаем</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              5 шагов от первого брифа до сдачи готового тиража.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
              {STEPS.map((s) => (
                <div
                  key={s.num}
                  className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col"
                >
                  <div className="w-10 h-10 rounded-full bg-[#3949AB] text-white flex items-center justify-center text-lg font-bold mb-3">
                    {s.num}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1.5 leading-tight">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Оборудование */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Оборудование</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Цифровая и широкоформатная печать — всё на нашей территории, без посредников.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {EQUIPMENT.map((e) => (
                <article
                  key={e.name}
                  className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl hover:border-[#3949AB] transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={e.image}
                      alt={e.name}
                      fallbackEmoji="🖨️"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs font-bold text-[#3949AB] uppercase tracking-wide mb-1">
                      {e.type}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{e.name}</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {e.specs.map((spec) => (
                        <li key={spec.label}>
                          <strong className="text-slate-800">{spec.label}:</strong> {spec.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CTAForm accentColor="#3949AB" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
