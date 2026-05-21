import type { Metadata } from "next";
import Image from "next/image";
import { Monitor, Tv, ScrollText, Cross } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import LedCalculator from "@/components/LedCalculator";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceSchema from "@/components/ServiceSchema";
import FAQ from "@/components/FAQ";
import PublicPortfolio from "@/components/PublicPortfolio";
import IlluminationServices from "@/components/IlluminationServices";
import DesignFree from "@/components/DesignFree";
import LightovoProducts from "@/components/LightovoProducts";
import { HERO_BLURS } from "@/lib/hero-blurs";

const SCREEN_ICONS: Record<string, LucideIcon> = {
  outdoor: Monitor,
  indoor: Tv,
  "running-text": ScrollText,
  "pharmacy-cross": Cross,
};

const SCREEN_TYPES: {
  id: string;
  name: string;
  desc: string;
  pixelPitch?: string;
  applications: string[];
  minSize?: string;
  since?: number;
}[] = [
  {
    id: "outdoor",
    name: "Уличные LED-экраны (Outdoor)",
    desc: "Для медиа-фасадов, рекламных конструкций, фасадов зданий",
    pixelPitch: "P8 — P31.25 мм",
    applications: ["Цифровые билборды", "Медиа-фасады", "Информационные табло", "Здания администраций"],
    minSize: "1 м²",
  },
  {
    id: "indoor",
    name: "Интерьерные LED-экраны (Indoor)",
    desc: "Для торговых центров, конференц-залов, шоу-румов",
    pixelPitch: "P1 — P5 мм",
    applications: ["ТЦ и магазины", "Конференц-залы", "Корпоративные events", "Музеи и выставки"],
    minSize: "1 м²",
  },
  {
    id: "running-text",
    name: "Светодиодные бегущие строки",
    desc: "Информационные строки для магазинов, офисов. С 2011 года первые в Сибири",
    since: 2011,
    applications: ["Магазины", "Аптеки", "Информационные щиты", "Транспорт"],
  },
  {
    id: "pharmacy-cross",
    name: "Аптечные кресты",
    desc: "Для уличной и интерьерной установки. Авто-настройка цвета и яркости",
    applications: ["Аптеки", "Медцентры", "Лаборатории"],
  },
];

const HISTORY: { year: number; event: string }[] = [
  { year: 2007, event: "Первый светодиодный экран в Томске на пл. Новособорная" },
  { year: 2008, event: "Экран для ТДСК" },
  { year: 2011, event: "Первое производство бегущих строк в Сибирском регионе" },
  { year: 2014, event: "Экран в Северске" },
  { year: 2016, event: "Совместные закупки с LED Russia — единые цены по РФ" },
  { year: 2026, event: "Более 500 м² установленных экранов в Томске и Сибири" },
];

export const metadata: Metadata = {
  title: "Новогоднее оформление и иллюминация в Томске | Лайтово",
  description:
    "Подсветка фасадов, ёлок, деревьев. Световые фигуры, дюралайт, гирлянды оптом. Бесплатный дизайн-проект. Бренд Лайтово ГК Зонд-Реклама с 2021 года.",
  keywords: [
    "новогоднее оформление Томск",
    "подсветка фасадов",
    "иллюминация Томск",
    "гирлянды опт",
    "световые фигуры",
    "Лайтово",
  ],
};

export default function LedPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <ServiceSchema
        serviceType="Светодиодная иллюминация"
        name="Новогодняя иллюминация и LED-продукция"
        description="Гирлянды, 3D-фигуры, контурная подсветка фасадов. Бренд Лайтово, опт по России."
        lowPrice={350}
        priceRange="350-100 000 ₽"
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Светодиодная продукция", url: "/led" },
          ]}
        />

        {/* Hero — двойной бренд ZOND + LIGHTOVO */}
        <section className="relative min-h-[90vh] bg-[#0B1E3F] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/led/hero-led-tomsk.jpg"
              alt="Новогодняя иллюминация в Томске"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={HERO_BLURS.led}
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F]/85 via-[#0B1E3F]/50 to-[#0B1E3F]/10" />
          </div>

          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10 w-full min-h-[90vh] flex items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-8 mb-10">
                <Image
                  src="/logo-horizontal-white.png"
                  alt="ZOND"
                  width={150}
                  height={48}
                  className="h-12 w-auto opacity-70"
                />
                <div className="h-12 w-px bg-white/40" />
                <div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight sm:tracking-wide md:tracking-wider text-[#F4C430] leading-none">
                    LIGHTOVO
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/70 mt-1">
                    бренд ГК Зонд с 2021
                  </div>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
                Новогоднее оформление и иллюминация в Томске
              </h1>
              <p className="text-xl md:text-2xl text-white/85 mb-8 leading-relaxed">
                Новогоднее оформление городов, фасадов и ёлок. Производство LED-экранов с 2007 года.
                Бесплатный дизайн-проект.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#contact-form"
                  className="bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition shadow-xl"
                >
                  Получить дизайн-проект бесплатно
                </a>
                <a
                  href="#products"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Виды продукции →
                </a>
              </div>
              <p className="text-sm text-white/60 mt-6 mb-12">
                + Собственное производство LED-экранов с 2007 года — подробнее ниже на странице ↓
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-white">
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">500+</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">объектов в год по всей России</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">
                    {new Date().getFullYear() - 2008}
                  </div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">лет занимаемся гирляндами</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">1000+</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">товаров в каталоге</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">12 мес</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">гарантия</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 услуг иллюминации */}
        <IlluminationServices />

        {/* Дизайн бесплатно */}
        <DesignFree />

        {/* Виды продукции LIGHTOVO */}
        <div id="illumination" className="scroll-mt-24">
          <LightovoProducts />
        </div>

        {/* Наши работы */}

        {/* LED-экраны — секция Зонда (фиолетовая) */}
        <section id="screens" className="py-12 md:py-20 bg-white scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#7B1FA2]/10 text-[#7B1FA2] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Производство Зонд с 2007
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Собственное производство LED-экранов с 2007 года
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Первый светодиодный экран в Томске установлен нами на пл. Новособорная в 2007 году.
                С тех пор — более 500 м² экранов.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SCREEN_TYPES.map((t) => {
                const Icon = SCREEN_ICONS[t.id] ?? Monitor;
                return (
                  <article
                    key={t.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#7B1FA2] hover:shadow-lg transition-all p-6 flex flex-col"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#7B1FA2]/10 flex items-center justify-center mb-4">
                      <Icon size={26} className="text-[#7B1FA2]" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{t.name}</h3>
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">{t.desc}</p>
                    {t.pixelPitch && (
                      <div className="text-xs text-slate-500 mb-2">
                        <strong className="text-slate-700">Шаг пикселя:</strong> {t.pixelPitch}
                      </div>
                    )}
                    {t.minSize && (
                      <div className="text-xs text-slate-500 mb-3">
                        <strong className="text-slate-700">Мин. размер:</strong> {t.minSize}
                      </div>
                    )}
                    <ul className="text-xs text-slate-600 space-y-0.5 mt-auto pt-2 border-t border-slate-100">
                      {t.applications.map((a) => (
                        <li key={a} className="flex items-start gap-1.5">
                          <span className="text-[#7B1FA2]">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Калькулятор LED-экранов */}
        <LedCalculator />

        {/* Хроника */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Хроника LED в Сибири</h2>
              <p className="text-lg text-slate-600">
                От первого экрана 2007 года до 500+ м² в 2026 году.
              </p>
            </div>
            <div className="overflow-x-auto pb-6">
              <div className="relative inline-flex gap-0 min-w-full px-4">
                <div
                  aria-hidden="true"
                  className="absolute top-4 left-4 right-4 h-0.5 bg-slate-200"
                />
                {HISTORY.map((t) => (
                  <div key={t.year} className="relative flex-shrink-0 w-[200px] text-center">
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#7B1FA2] border-4 border-white shadow-md mx-auto" />
                    <div className="mt-3 text-2xl font-bold text-slate-900">{t.year}</div>
                    <div className="mt-2 text-sm text-slate-600 leading-relaxed px-2 break-words">
                      {t.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA на lightovo.ru */}
        <section className="py-16 bg-gradient-to-br from-[#0B1E3F] to-[#0E1A2B] text-white">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Нужен полный каталог?</h2>
            <p className="text-xl text-white/80 mb-2">
              1000+ позиций для оптовых клиентов и дилеров России
            </p>
            <p className="text-lg text-white/60 mb-8">
              Дилерская программа, личный кабинет, доставка по РФ
            </p>
            <a
              href="https://lightovo.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-10 py-5 rounded-xl font-bold text-lg transition shadow-2xl"
            >
              Открыть lightovo.ru
              <span className="text-2xl">→</span>
            </a>
          </div>
        </section>

        <FAQ
          title="Частые вопросы"
          items={[
            { question: "Сколько стоит подсветка фасада здания в Томске?", answer: "Стоимость зависит от метража и сложности: от 800 руб/м² для базовой контурной подсветки до 3000 руб/м² для архитектурной с динамикой. Бесплатно делаем дизайн-проект и точную смету по фото вашего объекта." },
            { question: "Какой срок службы светодиодных гирлянд Лайтово?", answer: "Заявленный срок службы LED — 50 000 часов (при норме работы 8-10 часов в сутки это около 15 лет). Даём гарантию 2 года на гирлянды и 1 год на монтажные работы." },
            { question: "Делаете ли вы монтаж и подключение, или только продажу гирлянд?", answer: "Работаем под ключ: проектирование, поставка оборудования, монтаж, подключение, ввод в эксплуатацию. Бригада с допуском по электробезопасности, работаем на высоте до 30 м." },
            { question: "С какого месяца лучше заказывать новогоднюю подсветку?", answer: "Оптимально — сентябрь-октябрь. К ноябрю загрузка цеха высокая, в декабре можем уже не успеть к 1 декабря. Договор с предоплатой в сентябре гарантирует монтаж до старта сезона." },
            { question: "Можно ли арендовать гирлянды на один сезон вместо покупки?", answer: "Да, у Лайтово есть программа сезонной аренды: монтаж в конце ноября, демонтаж в феврале. Подходит для торговых центров и муниципальных площадей. Запросите расчёт по тел. +7 (3822) 97-97-05." },
            { question: "Делаете ли вы световые фигуры на заказ (снеговик, олень, ёлка)?", answer: "Да, изготавливаем световые фигуры любых форм по эскизу заказчика. Высота от 1,5 до 8 метров. Каркас из металла + LED-обмотка. Срок изготовления 3-4 недели." },
            { question: "Работаете ли вы с управляющими компаниями и ТСЖ?", answer: "Да, выставляем счета на юр.лиц, работаем по 44-ФЗ и 223-ФЗ. Есть опыт оформления многоквартирных домов в Томске. Закрывающие документы предоставляем в полном объёме." },
          ]}
        />

        <PublicPortfolio category="led" />

        <CTAForm accentColor="#F4C430" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
