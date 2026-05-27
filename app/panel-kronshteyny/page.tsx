import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import CTAForm from "@/components/CTAForm";
import { buildOgUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Панель-кронштейны в Томске — двусторонние вывески от ZOND",
  description:
    "Изготовление и монтаж панель-кронштейнов в Томске: двусторонние вывески перпендикулярно фасаду. Лайтбоксы, акрил, ПВХ. Согласование с УГА, гарантия 2 года.",
  keywords: [
    "панель-кронштейн Томск",
    "двусторонняя вывеска",
    "выносная вывеска",
    "лайтбокс кронштейн",
    "перпендикулярная вывеска",
  ],
  alternates: { canonical: "/panel-kronshteyny" },
  openGraph: {
    title: "Панель-кронштейны в Томске",
    description:
      "Двусторонние выносные вывески перпендикулярно фасаду. Производство и монтаж под ключ.",
    url: "https://zond-website.vercel.app/panel-kronshteyny",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Панель-кронштейны в Томске",
          subtitle: "Двусторонние выносные вывески — производство и монтаж",
          category: "Производство",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Панель-кронштейны в Томске",
    description: "Двусторонние выносные вывески — производство и монтаж",
    images: [
      buildOgUrl({
        title: "Панель-кронштейны в Томске",
        subtitle: "Двусторонние выносные вывески — производство и монтаж",
        category: "Производство",
      }),
    ],
  },
};

const STATS = [
  { value: "2 стороны", label: "видимости из обеих частей улицы" },
  { value: "от 3 м", label: "стандартная высота установки" },
  { value: "3-4 нед", label: "включая согласование" },
  { value: "2 года", label: "гарантия на конструкцию" },
];

const TECH = [
  {
    icon: "🪟",
    title: "Лайтбоксы с подсветкой",
    desc: "Внутренняя LED-подсветка, акриловое лицо, алюминиевый профиль. Видны 24/7, премиум-сегмент.",
  },
  {
    icon: "🟦",
    title: "Плоские с печатью",
    desc: "ПВХ или композит с УФ-печатью. Без подсветки, бюджетный вариант для дневной видимости.",
  },
  {
    icon: "💡",
    title: "Световые буквы на каркасе",
    desc: "Объёмные буквы или логотип на каркасе-кронштейне. Индивидуальный дизайн под бренд.",
  },
  {
    icon: "🧱",
    title: "Металлокаркас",
    desc: "Несущий каркас из квадратной трубы или уголка. Расчёт нагрузок под высоту и вынос от стены.",
  },
];

const APPLICATIONS = [
  { icon: "🍽️", title: "Рестораны и кафе", desc: "Заметная вывеска для прохожих с двух сторон улицы." },
  { icon: "💊", title: "Аптеки", desc: "Универсальная видимость даже на узких улицах." },
  { icon: "🛍️", title: "Магазины", desc: "Привлечение внимания пешеходов с большого расстояния." },
  { icon: "🩺", title: "Медцентры", desc: "Чёткая навигация для клиентов и посетителей." },
];

const FAQ_ITEMS = [
  {
    question: "Нужно ли согласовывать панель-кронштейн с администрацией?",
    answer:
      "Да. Любая выносная конструкция на фасаде требует согласования с архитектурно-планировочным управлением Томска. Берём документы на себя — срок 3-4 недели. Подробнее на странице /pasport-fasada.",
  },
  {
    question: "Какая бывает подсветка?",
    answer:
      "Три варианта: 1) без подсветки (бюджет, видимость только днём), 2) внутренняя LED-подсветка (лайтбокс — светится 24/7), 3) контурная подсветка букв на каркасе. Подбираем под бренд и фасад.",
  },
  {
    question: "Какие размеры стандартные?",
    answer:
      "Ширина 60-120 см, высота 40-90 см. Глубина (вынос от стены) — 8-15 см. Нестандартные размеры — по проекту, считаются индивидуально с расчётом нагрузок.",
  },
  {
    question: "Как происходит монтаж?",
    answer:
      "Высверливаем закладные в фасаде, крепим каркас на анкеры. На исторических зданиях и в центре — согласовываем способ крепления отдельно. Для высоких этажей привлекаем промышленных альпинистов.",
  },
  {
    question: "Сколько стоит панель-кронштейн?",
    answer:
      "Цена индивидуальная — от 25 000 ₽ за плоский с печатью до 150 000+ ₽ за лайтбокс с подсветкой и согласованием. Точную смету даём после замера и эскиза.",
  },
];

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Изготовление панель-кронштейнов в Томске",
  serviceType: "Производство выносных двусторонних вывесок",
  areaServed: { "@type": "City", name: "Томск" },
  provider: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    alternateName: "ZOND",
    url: "https://zond-website.vercel.app",
  },
  url: "https://zond-website.vercel.app/panel-kronshteyny",
};

// TODO: фото панель-кронштейнов от Дмитрия. Сейчас используется fallback —
// общее производственное фото с pasport-fasada (vyveski-soglasovanie.jpg).
const HERO_PHOTO = "/images/blog/vyveski-soglasovanie.jpg";

export default function PanelKronshteynyPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_JSONLD) }}
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Услуги", url: "/#services" },
            { name: "Панель-кронштейны", url: "/panel-kronshteyny" },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <Image
            src={HERO_PHOTO}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 blur-[2px] md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:from-black/40 md:via-black/30 md:to-black/70" />
          <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>📐</span>Двусторонние выносные вывески
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Панель-кронштейны в&nbsp;Томске под&nbsp;ключ
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Двусторонние вывески, выступающие от фасада. Видны прохожим с двух сторон
              улицы. Производство, согласование, монтаж — за 3-4 недели.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📝 Оставить заявку
              </a>
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ☎ 8 (3822) 97-97-05
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ Согласование с УГА</span>
              <span>✓ Гарантия 2 года</span>
              <span>✓ Расчёт нагрузок</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-brand">
                    {s.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 mt-2 leading-snug">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ЧТО ЭТО */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Что такое панель-кронштейн
            </h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              Панель-кронштейн — это <strong>двусторонняя вывеска</strong>, которая
              крепится к фасаду <strong>перпендикулярно стене</strong>. Видна прохожим с
              двух сторон по улице, в отличие от обычной плоской вывески, которая
              читается только при прямом подходе.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              Применяется в местах с пешеходным трафиком, узких улицах, исторической
              застройке — везде, где важна видимость с расстояния и под углом.
            </p>
          </div>
        </section>

        {/* ТЕХНОЛОГИИ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Технологии и материалы
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Четыре основных варианта — выбираем под бренд, бюджет и архитектуру здания.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TECH.map((t) => (
                <div
                  key={t.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl transition"
                >
                  <div className="text-4xl mb-3">{t.icon}</div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{t.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРИМЕНЕНИЕ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Где применяются
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Везде, где важна видимость с расстояния и под углом.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {APPLICATIONS.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 text-center"
                >
                  <div className="text-4xl mb-3">{a.icon}</div>
                  <h3 className="font-bold mb-2">{a.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы о панель-кронштейнах" />

        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Готовы заказать панель-кронштейн?
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Бесплатный замер по Томску, расчёт за 1-2 дня, под ключ — за 3-4 недели.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📝 Оставить заявку
              </a>
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 text-white text-lg font-semibold hover:underline"
              >
                ☎ 8 (3822) 97-97-05
              </a>
            </div>
          </div>
        </section>

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
