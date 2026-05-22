import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import FAQ from "@/components/FAQ";
import CTAForm from "@/components/CTAForm";
import { buildOgUrl } from "@/lib/og";

const EXTERNAL_SITE_URL = "https://xn--80aaaat1dfbkhek0a.xn--p1ai/";
const EXTERNAL_SITE_LABEL = "паспортфасада.рф";

const FALLBACK_PHOTO = "/images/blog/vyveski-soglasovanie.jpg";

const missingPhotos: string[] = [];

function resolvePhoto(publicPath: string): string {
  const abs = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  if (existsSync(abs)) return publicPath;
  missingPhotos.push(publicPath);
  return FALLBACK_PHOTO;
}

const PHOTOS = {
  document: resolvePhoto("/images/blog/pasport-document.jpg"),
  gallery1: resolvePhoto("/images/blog/pasport-1-trc.jpg"),
  gallery2: resolvePhoto("/images/blog/pasport-2-cafe.jpg"),
  gallery3: resolvePhoto("/images/blog/pasport-3-office.jpg"),
  gallery4: resolvePhoto("/images/blog/pasport-4-store.jpg"),
  example: resolvePhoto("/images/blog/pasport-example.jpg"),
};

if (missingPhotos.length > 0) {
  console.warn(
    `[/pasport-fasada] Missing photos (using fallback ${FALLBACK_PHOTO}):\n  - ` +
      missingPhotos.join("\n  - "),
  );
}

const GALLERY = [
  { src: PHOTOS.gallery1, caption: "ТЦ в центре Томска" },
  { src: PHOTOS.gallery2, caption: "Кафе на пр. Ленина" },
  { src: PHOTOS.gallery3, caption: "Бизнес-центр на Фрунзе" },
  { src: PHOTOS.gallery4, caption: "Магазин в Кировском районе" },
];

export const metadata: Metadata = {
  title: "Паспорт фасада в Томске — согласование под ключ | ZOND",
  description:
    "Оформление паспорта фасада и согласование наружной рекламы в Комитете архитектуры Томска. 500+ согласованных объектов, 100% успешных согласований, 3-4 недели под ключ.",
  keywords: [
    "паспорт фасада Томск",
    "согласование вывески Томск",
    "паспорт рекламного места",
    "Постановление мэра 362",
    "Комитет архитектуры Томск",
  ],
  alternates: { canonical: "/pasport-fasada" },
  openGraph: {
    title: "Паспорт фасада в Томске под ключ",
    description:
      "Согласование наружной рекламы и фасадов в Комитете архитектуры Томска. 500+ объектов, 100% согласований, 3-4 недели.",
    url: "https://zond-website.vercel.app/pasport-fasada",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Паспорт фасада в Томске",
          subtitle: "500+ согласований, 3-4 недели под ключ",
          category: "Согласование",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Паспорт фасада в Томске под ключ",
    description: "500+ согласований, 3-4 недели, по Постановлению Мэра №362.",
    images: [
      buildOgUrl({
        title: "Паспорт фасада в Томске",
        subtitle: "500+ согласований, 3-4 недели под ключ",
        category: "Согласование",
      }),
    ],
  },
};

const STATS = [
  { value: "500+", label: "согласованных объектов в Томске" },
  { value: "3-4 нед", label: "типовой срок под ключ" },
  { value: "100%", label: "согласований без отказов" },
  { value: "16 лет", label: "опыт работы с администрацией" },
];

const WHEN_NEED = [
  {
    icon: "🆕",
    title: "Открытие магазина или кафе",
    desc: "Установка любой новой вывески, лайтбокса, объёмных букв или подвесной конструкции.",
  },
  {
    icon: "🔄",
    title: "Замена вывески",
    desc: "Меняете старую вывеску на существующем здании — нужен новый паспорт под новый макет.",
  },
  {
    icon: "🏗️",
    title: "Реконструкция фасада",
    desc: "Реконструкция, замена окон, дверных групп, входных козырьков — изменения внешнего вида.",
  },
  {
    icon: "📐",
    title: "Цвет или материалы",
    desc: "Перекрашивание фасада, замена облицовки, изменение фасадной отделки.",
  },
  {
    icon: "🛡️",
    title: "Предписание от администрации",
    desc: "Получили предписание Комитета архитектуры с требованием узаконить вывеску или фасад.",
  },
  {
    icon: "💼",
    title: "Подготовка к продаже/аренде",
    desc: "Покупатель или арендатор требует полный пакет документов на здание перед сделкой.",
  },
];

const PROCESS = [
  { icon: "📞", title: "Заявка", desc: "Звонок или форма. Бесплатная консультация по вашему объекту." },
  { icon: "📐", title: "Замеры и фотофиксация", desc: "Выезд специалиста по Томску — обмеры, фото, оценка состояния." },
  { icon: "🎨", title: "Эскиз и фотомонтаж", desc: "3D-визуализация: как будет выглядеть фасад после согласования." },
  { icon: "📑", title: "Сбор пакета документов", desc: "Технический проект, согласия собственника, заявление в Комитет архитектуры." },
  { icon: "🏛️", title: "Подача и сопровождение", desc: "Подача в Комитет, отработка замечаний — 3-4 недели по регламенту." },
  { icon: "✅", title: "Разрешение + закрытие", desc: "Получаем согласование, передаём вам оригиналы документов." },
];

const TARIFFS = [
  {
    icon: "💼",
    title: "Базовый",
    price: "от 25 000 ₽",
    desc: "Сбор пакета документов + подача в Комитет архитектуры. Без сопровождения замечаний.",
  },
  {
    icon: "🎯",
    title: "Стандартный",
    price: "от 40 000 ₽",
    desc: "Полный цикл: эскиз, фотомонтаж, документы, согласование с правками по замечаниям.",
    featured: true,
  },
  {
    icon: "🚀",
    title: "Премиум",
    price: "от 60 000 ₽",
    desc: "Ускоренное согласование, дополнительные правки макета бесплатно, приоритет в очереди.",
  },
  {
    icon: "🎁",
    title: "Под ключ + производство",
    price: "по запросу",
    desc: "Паспорт + изготовление вывески или конструкции в нашем цеху. Скидка 10% при пакете.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Что будет, если не оформлять паспорт фасада?",
    answer:
      "Штраф 20-100 000 ₽ для юр.лиц по статье 9.5.1 КоАП РФ. При повторном нарушении — до 200 000 ₽. Плюс обязательный демонтаж конструкции за счёт владельца. Документальная основа в Томске — Постановление Мэра №362 от 12.05.2008.",
  },
  {
    question: "Сколько занимает согласование?",
    answer:
      "По регламенту — до 30 рабочих дней. На практике 3-4 недели при правильно собранных документах. Если есть замечания комитета — добавляется ещё 1-2 недели на исправления.",
  },
  {
    question: "Какие документы нужны?",
    answer:
      "Заявление, эскиз с размерами, фотомонтаж на фасаде, технический проект конструкции (если сложная), согласие собственника здания (если арендуете), документы на участок/помещение. Полный пакет мы готовим сами — от вас только базовые сведения и доступ на объект.",
  },
  {
    question: "Можно ли согласовать паспорт самостоятельно?",
    answer:
      "Да, по закону можно. На практике без опыта 60-70% заявлений возвращают на доработку — теряется 1-3 месяца. У нас за 16 лет работы — 100% успешных согласований.",
  },
  {
    question: "Делаете ли согласование только эскиза, без изготовления вывески?",
    answer:
      "Да, базовый тариф — только документы и согласование. Изготовление вывески и монтаж — отдельные услуги ZOND. При заказе всего в комплексе — скидка 10%.",
  },
  {
    question: "Работаете ли с другими городами кроме Томска?",
    answer:
      "По согласованиям — только Томск (нужно знать местные регламенты и контакты в архитектурно-планировочном управлении). Изготовление и монтаж вывесок — по всей Томской области.",
  },
  {
    question: "Есть ли отличия для исторических зданий?",
    answer:
      "Да, в центре Томска и для зданий-памятников — отдельные требования (материалы, цвета, стилистика). Сопровождаем согласование с дополнительными инстанциями (Министерство культуры, КГИОП).",
  },
];

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Оформление паспорта фасада в Томске",
  serviceType: "Согласование наружной рекламы и фасадов",
  areaServed: { "@type": "City", name: "Томск" },
  provider: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    alternateName: "ZOND",
    url: "https://zond-website.vercel.app",
  },
  url: "https://zond-website.vercel.app/pasport-fasada",
  sameAs: [EXTERNAL_SITE_URL],
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "25000",
    priceCurrency: "RUB",
    offerCount: "4",
  },
};

export default function PasportFasadaPage() {
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
            { name: "Паспорт фасада", url: "/pasport-fasada" },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <Image
            src="/images/blog/vyveski-soglasovanie.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20 blur-[2px] md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:from-black/40 md:via-black/30 md:to-black/70" />
          <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>📋</span>
              Узаконим вывеску и фасад в Томске
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Паспорт фасада в&nbsp;Томске — оформление под&nbsp;ключ
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Согласование наружной рекламы и информационных конструкций с Комитетом
              архитектуры Томска. Берём все документы и переговоры на себя.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📞 Бесплатная консультация
              </a>
              <a
                href={EXTERNAL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ↗ Открыть {EXTERNAL_SITE_LABEL}
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ Опыт с 2008</span>
              <span>✓ 500+ согласований</span>
              <span>✓ 100% — без отказов</span>
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

        {/* ЧТО ТАКОЕ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Что такое паспорт фасада
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Кратко — что это юридически, кому нужен и что будет, если его нет.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-brand font-bold mb-3">
                  Юридически
                </div>
                <h3 className="text-lg font-bold mb-2">Документ согласования</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Описание внешнего вида здания и расположенных на нём вывесок и
                  конструкций. Согласовывается с архитектурно-планировочным управлением
                  Томска по{" "}
                  <strong>Постановлению Мэра №362 от 12.05.2008</strong>.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-brand font-bold mb-3">
                  Кому нужен
                </div>
                <h3 className="text-lg font-bold mb-2">Любой бизнес с фасадом</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Любая организация в Томске с вывеской на фасаде, рекламной
                  конструкцией, лайтбоксом или объёмными буквами. Также — при новой
                  установке или реконструкции существующих.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-rose-500 font-bold mb-3">
                  Без паспорта
                </div>
                <h3 className="text-lg font-bold mb-2">Штраф до 200 000 ₽</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  20-100 000 ₽ для юр.лиц по ст. 9.5.1 КоАП РФ. При повторе — до
                  200 000 ₽. Плюс обязательный демонтаж конструкции за счёт владельца.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ДЕКОРАТИВНЫЙ БЛОК — документ для администрации */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-xs uppercase tracking-wider text-brand font-bold mb-3">
                  Что вы получаете
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Документ для администрации Томска
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  Паспорт фасада — это юридически оформленный пакет с эскизами,
                  размерами и согласовательной печатью Комитета архитектуры.
                  С ним вашу вывеску или фасад нельзя демонтировать по предписанию.
                </p>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0" aria-hidden>📋</span>
                    <span>
                      <strong>Эскизы и фотомонтажи</strong> — точное изображение
                      вывески на фасаде с размерами
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0" aria-hidden>✅</span>
                    <span>
                      <strong>Согласовательная печать</strong> — официальный штамп
                      Комитета архитектуры и градостроительства
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl shrink-0" aria-hidden>🏛️</span>
                    <span>
                      <strong>Закрывающие документы</strong> — оригиналы заявлений,
                      решений, проект паспорта
                    </span>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS.document}
                  alt="Согласованный паспорт фасада — пример документа"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* КОГДА НУЖНО */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Когда нужно оформлять
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Шесть типичных ситуаций, когда без паспорта фасада не обойтись.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {WHEN_NEED.map((w) => (
                <div
                  key={w.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="text-4xl mb-3">{w.icon}</div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{w.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЦЕСС */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Этапы работы
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Шесть шагов от первого звонка до подписанного разрешения.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {PROCESS.map((step, i) => (
                <div
                  key={step.title}
                  className="bg-white rounded-2xl p-5 border border-slate-200 relative"
                >
                  <div className="absolute -top-3 -left-3 w-9 h-9 bg-brand text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {i + 1}
                  </div>
                  <div className="text-3xl mb-2">{step.icon}</div>
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-snug">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ГАЛЕРЕЯ ОБЪЕКТОВ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Примеры наших согласованных объектов
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Типовые задачи: торговые центры, кафе, бизнес-центры, магазины.
              По каждому объекту — полный пакет документов и разрешение
              Комитета архитектуры.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {GALLERY.map((g) => (
                <article
                  key={g.caption}
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={g.src}
                      alt={g.caption}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-sm font-medium text-slate-700">
                    {g.caption}
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
              AI-визуализации типовых задач. Реальные фото клиентских объектов
              публикуем только с письменного согласия.
            </p>
          </div>
        </section>

        {/* ТАРИФЫ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Стоимость
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Финальная сумма зависит от сложности объекта. Озвучиваем на бесплатной
              консультации после фото и краткого описания.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TARIFFS.map((t) => (
                <div
                  key={t.title}
                  className={`rounded-2xl p-6 border transition flex flex-col ${
                    t.featured
                      ? "bg-brand text-white border-brand shadow-xl scale-105"
                      : "bg-white border-slate-200 hover:border-brand hover:shadow-xl"
                  }`}
                >
                  <div className="text-4xl mb-3">{t.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{t.title}</h3>
                  <div
                    className={`text-2xl font-extrabold mb-3 ${
                      t.featured ? "text-accent-yellow" : "text-brand"
                    }`}
                  >
                    {t.price}
                  </div>
                  <p
                    className={`text-sm leading-relaxed flex-1 ${
                      t.featured ? "text-white/90" : "text-slate-600"
                    }`}
                  >
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* КАК ВЫГЛЯДИТ ГОТОВЫЙ ПАСПОРТ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Как выглядит готовый паспорт
            </h2>
            <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
              Финальный документ, который вы получаете на руки после согласования —
              можно сразу подшивать в учёт и использовать как защиту от предписаний.
            </p>
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-slate-100 mb-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PHOTOS.example}
                alt="Пример согласованного паспорта фасада"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-2xl mb-1" aria-hidden>📐</div>
                <p className="text-sm font-semibold text-slate-700">
                  ✓ Эскиз с размерами
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-2xl mb-1" aria-hidden>🏛️</div>
                <p className="text-sm font-semibold text-slate-700">
                  ✓ Согласовано печатью
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-2xl mb-1" aria-hidden>📑</div>
                <p className="text-sm font-semibold text-slate-700">
                  ✓ Закрывающие документы
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* КРОСС-ССЫЛКА НА ПРОФИЛЬНЫЙ САЙТ */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Подробная информация на профильном сайте
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              У нас есть отдельный сайт по паспортам фасадов: полный каталог услуг,
              кейсы реализованных проектов и контакты профильной команды.
            </p>
            <a
              href={EXTERNAL_SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
            >
              Перейти на {EXTERNAL_SITE_LABEL} →
            </a>
            <p className="mt-6 text-sm text-white/70">
              Это наш внутренний проект — как «Лайтово» для LED-иллюминации.
            </p>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы о согласовании" />

        {/* БОЛЬШОЙ CTA */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight text-slate-900">
              Готовы начать согласование?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Бесплатная консультация по объекту, расчёт стоимости и сроков —
              в течение рабочего дня.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-brand text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📅 Записаться на бесплатную консультацию
              </a>
              <a
                href={EXTERNAL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brand text-brand px-8 py-4 rounded-xl font-semibold text-base hover:bg-brand hover:text-white transition"
              >
                ↗ Открыть {EXTERNAL_SITE_LABEL}
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
