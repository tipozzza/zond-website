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
import { HERO_BLURS } from "@/lib/hero-blurs";

export const metadata: Metadata = {
  title: "Русификация вывесок в Томске — закон с 1 марта 2026 | ZOND",
  description:
    "Перевод, замена или новая вывеска под закон РФ от 1 марта 2026. Бесплатный замер по Томску, согласование с администрацией, гарантия 2 года. От 5 000 ₽.",
  keywords: [
    "русификация вывески",
    "замена англоязычной вывески",
    "русский язык на вывеске",
    "закон 2026 вывески",
    "перевод вывески Томск",
  ],
  alternates: { canonical: "/russifikaciya" },
  openGraph: {
    title: "Русификация вывесок в Томске — закон с 1 марта 2026",
    description:
      "Перевод, замена или новая вывеска под закон РФ от 1 марта 2026. Бесплатный замер по Томску, согласование с администрацией, гарантия 2 года.",
    url: "https://zond-website.vercel.app/russifikaciya",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Русификация вывесок в Томске",
          subtitle: "Закон с 1 марта 2026 — переведём, заменим или сделаем новую",
          category: "Под ключ",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Русификация вывесок в Томске — закон с 1 марта 2026",
    description:
      "Перевод, замена или новая вывеска под закон РФ. Бесплатный замер по Томску.",
    images: [
      buildOgUrl({
        title: "Русификация вывесок в Томске",
        subtitle: "Закон с 1 марта 2026 — переведём, заменим или сделаем новую",
        category: "Под ключ",
      }),
    ],
  },
};

const STATS = [
  { value: "500 000 ₽", label: "макс. штраф для юр.лиц", accent: "text-rose-500" },
  { value: "7 дней", label: "типовой срок под ключ", accent: "text-brand" },
  { value: `${new Date().getFullYear() - 1992} года`, label: "опыт ZOND", accent: "text-brand" },
  { value: "4", label: "варианта решения", accent: "text-brand" },
];

const SOLUTIONS = [
  {
    icon: "📝",
    title: "Перевод (наклейка/табличка)",
    price: "от 5 000 ₽",
    duration: "1-2 дня",
    description:
      "Аккуратная наклейка с русским переводом поверх английского. Самый бюджетный вариант, сохраняет ваш дизайн.",
  },
  {
    icon: "➕",
    title: "Дополнение существующей",
    price: "от 15 000 ₽",
    duration: "2-3 дня",
    description:
      "Добавим русский блок рядом или под существующей вывеской. Подходит для согласования по новому закону.",
  },
  {
    icon: "🔄",
    title: "Полная замена",
    price: "от 50 000 ₽",
    duration: "5-10 дней",
    description:
      "Изготовим новую вывеску с русским названием. Согласуем с администрацией под ключ.",
  },
  {
    icon: "✨",
    title: "Новый дизайн + замена",
    price: "от 100 000 ₽",
    duration: "14-21 день",
    description:
      "Полная переработка фирменного стиля + новая вывеска. Используем как повод обновить бренд.",
  },
];

const PROCESS = [
  { icon: "📞", title: "Заявка", desc: "звонок или форма, 5 минут" },
  { icon: "📐", title: "Бесплатный замер", desc: "выезд по Томску, 1 час" },
  { icon: "🎨", title: "Дизайн и согласование", desc: "макет с правками, 1-3 дня" },
  { icon: "🏭", title: "Производство", desc: "наш цех на пр. Фрунзе 109, 3-7 дней" },
  { icon: "🛠️", title: "Демонтаж + монтаж", desc: "за 1 рабочий день" },
];

const FALLBACK_PHOTO = "/images/blog/vyveski-soglasovanie.jpg";

const PORTFOLIO_RAW = [
  {
    before: "/images/blog/rusification-1-before.jpg",
    after: "/images/blog/rusification-1-after.jpg",
    caption: "Магазин одежды на пр. Ленина, май 2026",
  },
  {
    before: "/images/blog/rusification-2-before.jpg",
    after: "/images/blog/rusification-2-after.jpg",
    caption: "Кафе на ул. Красноармейской, апрель 2026",
  },
  {
    before: "/images/blog/rusification-3-before.jpg",
    after: "/images/blog/rusification-3-after.jpg",
    caption: "Салон красоты на пр. Фрунзе, март 2026",
  },
  {
    before: "/images/blog/rusification-4-before.jpg",
    after: "/images/blog/rusification-4-after.jpg",
    caption: "Автосервис на Иркутском тракте, май 2026",
  },
];

function resolvePhoto(publicPath: string): { src: string; missing: boolean } {
  const abs = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  const ok = existsSync(abs);
  return { src: ok ? publicPath : FALLBACK_PHOTO, missing: !ok };
}

const missingPhotos: string[] = [];
const PORTFOLIO = PORTFOLIO_RAW.map((p) => {
  const before = resolvePhoto(p.before);
  const after = resolvePhoto(p.after);
  if (before.missing) missingPhotos.push(p.before);
  if (after.missing) missingPhotos.push(p.after);
  return { before: before.src, after: after.src, caption: p.caption };
});

if (missingPhotos.length > 0) {
  console.warn(
    `[/russifikaciya] Missing portfolio photos (using fallback ${FALLBACK_PHOTO}):\n  - ` +
      missingPhotos.join("\n  - "),
  );
}

const FAQ_ITEMS = [
  {
    question: "Какие именно слова надо переводить?",
    answer:
      "Все коммерческие названия товаров, услуг, профессий на иностранных языках. Исключение — зарегистрированные бренды и торговые марки (Apple, Coca-Cola, IKEA сохраняем как есть).",
  },
  {
    question: "Можно ли просто наклеить русские слова поверх английских?",
    answer:
      "Да, для существующих вывесок это законно. Главное — текст читаемый, того же размера, не закрывает важные элементы. Делаем виниловые наклейки за 1-2 дня от 5 000 ₽.",
  },
  {
    question: "А если у меня бренд на английском (например NIKE, ZARA)?",
    answer:
      "Зарегистрированные международные бренды сохраняются. Но описательная часть («Магазин одежды», «Кафе», «Салон») должна быть на русском. Поможем определить что трогать, что не трогать.",
  },
  {
    question: "Нужно ли согласовывать новую вывеску?",
    answer:
      "Если меняется только текст (наклейка или дополнение) — не нужно. Если заменяете полностью или меняется размер/положение — да, согласование с Комитетом архитектуры. Помогаем с документами, срок 3-4 недели.",
  },
  {
    question: "Сколько времени осталось чтобы избежать штрафа?",
    answer:
      "Закон уже действует. Проверки администрации Томска начались в апреле. Чем раньше — тем спокойнее. Срочные работы выполняем за 1-3 дня.",
  },
  {
    question: "Что входит в «бесплатный замер»?",
    answer:
      "Выезд специалиста к вашему объекту, фотофиксация текущей вывески, замер размеров, оценка состояния. По итогам — 2-3 варианта решения с ценами в течение 1-2 дней.",
  },
  {
    question: "Работаете ли с бюджетными организациями (44-ФЗ / 223-ФЗ)?",
    answer:
      "Да. ООО «ФОРМАТ СИТИ» работает по 44-ФЗ и 223-ФЗ. Все закрывающие документы, ЭЦП, опыт участия в тендерах с 2010 года.",
  },
  {
    question: "Какая гарантия на работы?",
    answer:
      "На материалы и плёнки — 2 года. На монтаж — 1 год. Сервисный выезд по гарантии — бесплатно по Томску.",
  },
];

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Русификация вывесок в Томске",
  serviceType: "Замена и перевод вывесок под закон 53-ФЗ",
  areaServed: { "@type": "City", name: "Томск" },
  provider: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    url: "https://zond-website.vercel.app",
  },
  offers: {
    "@type": "AggregateOffer",
    lowPrice: "5000",
    priceCurrency: "RUB",
    offerCount: "4",
  },
};

export default function RussifikaciyaPage() {
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
            { name: "Русификация вывески", url: "/russifikaciya" },
          ]}
        />

        {/* HERO */}
        <section className="relative bg-slate-900 text-white overflow-hidden">
          <Image
            src="/images/blog/russifikaciya-hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLURS.russifikaciya}
            className="object-cover blur-[2px] md:blur-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 md:from-black/40 md:via-black/30 md:to-black/70" />
          <div className="relative container mx-auto px-4 max-w-5xl py-16 md:py-24">
            <div className="inline-flex items-center gap-2 bg-rose-500/95 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>🔔</span>
              Закон вступил в силу с 1 марта 2026
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Русификация вывесок в&nbsp;Томске под&nbsp;ключ
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Переведём, заменим или сделаем новую вывеску — с соблюдением закона
              и согласованием с администрацией Томска.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                🆓 Бесплатный замер
              </a>
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ☎ 8 (3822) 97-97-05
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ Выезд бесплатно</span>
              <span>✓ Замер за 1 час</span>
              <span>✓ Гарантия 2 года</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight ${s.accent}`}
                  >
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

        {/* ЧТО ИЗМЕНИЛОСЬ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Что изменилось с 1 марта 2026 года
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Кратко — что говорит закон, кого касается и какие штрафы.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-brand font-bold mb-3">
                  Закон
                </div>
                <h3 className="text-lg font-bold mb-2">ФЗ № 53-ФЗ от 28.02.2025</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Вывески, наружная реклама и названия товаров должны быть на государственном
                  языке — либо сопровождаться русским дополнением того же размера.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-brand font-bold mb-3">
                  Кого касается
                </div>
                <h3 className="text-lg font-bold mb-2">Юр.лица и ИП</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Все организации в Томске, у которых на фасадах, табло, ценниках встречаются
                  иностранные слова без русского аналога.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-rose-500 font-bold mb-3">
                  Штрафы
                </div>
                <h3 className="text-lg font-bold mb-2">До 500 000 ₽</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Должностные лица: 10-50К ₽.
                  <br />
                  Юр.лица: 50-500К ₽.
                  <br />
                  Статья 14.3 КоАП РФ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 РЕШЕНИЯ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              4 варианта решения
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              От наклейки за день до нового фирменного стиля — выбираем по бюджету
              и состоянию текущей вывески.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {SOLUTIONS.map((s) => (
                <div
                  key={s.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {s.description}
                  </p>
                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-brand">{s.price}</span>
                    <span className="text-slate-500">{s.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ПРОЦЕСС */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Как мы работаем
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Пять шагов от заявки до запуска новой вывески. Каждый — с фиксированным
              сроком.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

        {/* ПОРТФОЛИО ДО/ПОСЛЕ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              До и после: наши работы
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Примеры русификации вывесок в Томске — переводы, дополнения и полные замены.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PORTFOLIO.map((p) => (
                <article
                  key={p.caption}
                  className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white"
                >
                  <div className="grid grid-cols-2 relative">
                    <div className="relative aspect-[4/3] bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.before}
                        alt={`До: ${p.caption}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded">
                        ДО
                      </span>
                    </div>
                    <div className="relative aspect-[4/3] bg-slate-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.after}
                        alt={`После: ${p.caption}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">
                        ПОСЛЕ
                      </span>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-slate-700 font-medium">
                    {p.caption}
                  </div>
                </article>
              ))}
            </div>
            <p className="text-center text-xs text-slate-500 mt-6">
              Это AI-визуализации типовых работ. Реальные фото объектов клиентов
              публикуем только с письменного согласия.
            </p>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} />

        {/* БОЛЬШОЙ CTA ПЕРЕД ФОРМОЙ */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Не ждите проверки — оставьте заявку
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Замер бесплатно. Расчёт за 1-2 дня. Под ключ — за неделю.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                Получить бесплатный замер →
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
