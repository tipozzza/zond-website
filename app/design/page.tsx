import Image from "next/image";
import { FileText, Printer, Gift, Megaphone, Palette, BookOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import DesignCalculator from "@/components/DesignCalculator";

const CATEGORIES: { icon: LucideIcon; title: string; startPrice: string; description: string }[] = [
  {
    icon: FileText,
    title: "Дизайн полиграфии",
    startPrice: "от 200 ₽",
    description: "Визитки, буклеты, открытки, календари — 32 позиции прайса.",
  },
  {
    icon: Printer,
    title: "Печать полиграфии",
    startPrice: "от 4 ₽/шт",
    description: "Визитки от 96 шт, листовки от 10 шт, открытки, буклеты, флаеры.",
  },
  {
    icon: Gift,
    title: "Сувенирная продукция",
    startPrice: "от 5 ₽/шт",
    description: "Тампонная печать на ручках, кружках, флешках. От 50 шт.",
  },
  {
    icon: Megaphone,
    title: "Дизайн наружки",
    startPrice: "от 250 ₽",
    description: "Таблички, вывески, баннеры, штендеры, световые короба.",
  },
  {
    icon: Palette,
    title: "Логотип",
    startPrice: "от 8 000 ₽",
    description: "Монохромный, цветной, комплекс с лого-буком. 3 концепции на выбор.",
  },
  {
    icon: BookOpen,
    title: "Брендбук",
    startPrice: "от 20 000 ₽",
    description: "Индивидуальный / Оптимальный / Комплекс с офис- и интерьерным стилем.",
  },
];

const PORTFOLIO = [
  "Логотип «Колибри»",
  "Брендбук «Сибирский институт»",
  "Каталог СибАгро",
  "Серия плакатов «Виктория»",
  "Полиграфия Газпром нефть",
  "Айдентика кофейни",
  "Календари «Лама»",
  "Этикетка «Томпиво»",
];

const STEPS = [
  { num: 1, title: "Бриф", text: "Заполните калькулятор или позвоните — обсудим задачу." },
  { num: 2, title: "Концепция", text: "Готовим 2–3 варианта эскизов за 1–3 дня." },
  { num: 3, title: "Доработка", text: "Корректируем выбранный вариант до финального макета." },
  { num: 4, title: "Печать / производство", text: "Типичные сроки — от 1 до 7 дней." },
  { num: 5, title: "Сдача", text: "Передаём готовый тираж или печатные файлы." },
];

const EQUIPMENT = [
  {
    name: "Xerox Color 550",
    desc: "Цифровая печать SRA3, до 2400 dpi, 50 стр/мин. Основная рабочая лошадка для полиграфии.",
  },
  {
    name: "OKI ES9541",
    desc: "Уникальный для Томска: печать CMYK + белым и лаком. Для эксклюзивной полиграфии.",
  },
  {
    name: "Duplo DP-63S",
    desc: "Цифровой ризограф для больших тиражей. Быстро и недорого — листовки, буклеты.",
  },
  {
    name: "HP DesignJet Z5200",
    desc: "Широкоформатная фотопечать до A0. Постеры, репродукции, выставочные материалы.",
  },
];

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map(({ icon: Icon, title, startPrice, description }) => (
                <article
                  key={title}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#3949AB] shadow-sm hover:shadow-lg transition-all p-6 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#3949AB]/10 flex items-center justify-center mb-5">
                    <Icon size={26} className="text-[#3949AB]" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{title}</h3>
                  <div className="text-[#3949AB] font-bold text-lg mb-3">{startPrice}</div>
                  <p className="text-slate-600 leading-relaxed flex-1 mb-4">{description}</p>
                  <a
                    href="#calculator"
                    className="text-[#3949AB] font-semibold text-sm self-start hover:underline"
                  >
                    Подробнее в калькуляторе →
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <DesignCalculator />

        {/* Портфолио */}
        <section id="portfolio" className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наши работы</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Реальные кейсы — от логотипа кофейни до брендбука университета. Фото загружаются.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PORTFOLIO.map((title) => (
                <article
                  key={title}
                  className="aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 border border-slate-200 overflow-hidden relative"
                >
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-sm">
                    Фото
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                    <div className="text-white font-semibold text-sm leading-tight">{title}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EQUIPMENT.map((e) => (
                <div
                  key={e.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#3949AB]/10 flex items-center justify-center mb-4 text-2xl">
                    🖨️
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 leading-tight">{e.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTAForm accentColor="#3949AB" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
