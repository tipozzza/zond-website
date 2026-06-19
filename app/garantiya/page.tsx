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
  title:
    "Гарантия на работы ZOND — 2 года материалы, 1 год электроника | Томск",
  description:
    "Гарантии ZOND на все услуги: 2 года на материалы, 1 год на электронику. Бесплатный сервисный выезд по Томску. Договор, гарантийный талон, акт. С 1992 года.",
  keywords: [
    "гарантия ZOND",
    "гарантия на вывески Томск",
    "гарантия рекламной конструкции",
    "сервис вывесок Томск",
    "гарантийный ремонт LED Лайтово",
  ],
  alternates: { canonical: "/garantiya" },
  openGraph: {
    title: "Гарантия на работы — ZOND",
    description:
      "2 года на материалы, 1 год на электронику. Бесплатный сервисный выезд по Томску. С 1992 года.",
    url: "https://zondreklama.ru/garantiya",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Гарантия на работы ZOND",
          subtitle: "2 года материалы, 1 год электроника",
          category: "Гарантия",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Гарантия на работы — ZOND",
    description: "2 года материалы, 1 год электроника. Сервис по Томску.",
    images: [
      buildOgUrl({
        title: "Гарантия на работы ZOND",
        subtitle: "2 года материалы, 1 год электроника",
        category: "Гарантия",
      }),
    ],
  },
};

const STATS = [
  { value: "2 года", label: "гарантия на материалы" },
  { value: "1 год", label: "на электронику" },
  { value: "24 ч", label: "выезд сервиса по Томску" },
  { value: "0 ₽", label: "стоимость гарантийного ремонта" },
];

const SERVICES = [
  {
    icon: "📺",
    name: "Наружная реклама",
    description:
      "Целостность конструкции и креплений. Замена постера при повреждении в сезон. Монтаж — 1 год. LED-экраны — гарантия на блоки.",
    term: "1 год",
  },
  {
    icon: "🖨️",
    name: "Широкоформатная печать",
    description:
      "Стойкость цвета не менее 12 месяцев на улице, 3 года в помещении. Постпечатная обработка (люверсы, проклейка). При браке — повторная печать бесплатно.",
    term: "1 год",
  },
  {
    icon: "🏗️",
    name: "Производство вывесок",
    description:
      "Материалы (акрил, металл, профиль) — 2 года. Электроника (драйверы, светодиоды) — 1 год. Монтаж — 1 год. Согласование с администрацией — сопровождение в гарантийный срок.",
    term: "2 года материалы / 1 год электроника",
  },
  {
    icon: "🎨",
    name: "Дизайн и полиграфия",
    description:
      "Передача исходников в любое время. Авторский надзор 6 месяцев. Доработки макета по согласованию. При браке полиграфии — повторная печать.",
    term: "6 месяцев",
  },
  {
    icon: "🏛️",
    name: "Выставочные стенды",
    description:
      "Целостность каркаса MAXIBIT/JUST — 2 года. Графика — 1 год. Монтаж/демонтаж на выставке. Инструкции и сервис в Томске бесплатно.",
    term: "2 года",
  },
  {
    icon: "💡",
    name: "LED-иллюминация Лайтово",
    description:
      "Гирлянды и контурная подсветка — 2 года. Расчётный срок службы LED — 50 000 часов. Сервисный выезд в сезон (с 1 ноября по 31 января) — 24 часа.",
    term: "2 года",
  },
];

const INCLUDED = [
  "Производственный брак материалов",
  "Выход из строя электроники (драйверы, контроллеры, светодиоды) в срок гарантии",
  "Отслоение, выгорание печати при нормальной эксплуатации",
  "Ослабление креплений, монтажных швов",
  "Несоответствие цвета согласованному макету",
];

const EXCLUDED = [
  "Механические повреждения (вандализм, удар, ДТП)",
  "Природные катастрофы (ураган, гроза, пожар)",
  "Неправильная эксплуатация (превышение нагрузки)",
  "Самостоятельный ремонт или модификация",
  "Износ материалов после окончания гарантийного срока",
  "Скрытые работы (электрика здания, не входящая в наш контур)",
];

const PROCESS = [
  { icon: "📞", title: "Заявка", desc: "звонок или форма, 5 минут" },
  { icon: "🚗", title: "Выезд по Томску", desc: "в течение 24 часов, БЕСПЛАТНО" },
  { icon: "🔍", title: "Диагностика", desc: "на месте, фиксируем актом" },
  { icon: "🛠️", title: "Ремонт / замена", desc: "по результату диагностики" },
  { icon: "📄", title: "Закрытие документами", desc: "акт устранения, подписи" },
];

const DOCUMENTS = [
  {
    icon: "📋",
    title: "Договор подряда",
    desc: "Со всеми гарантийными обязательствами по проекту.",
  },
  {
    icon: "🎫",
    title: "Гарантийный талон",
    desc: "Отдельный документ с серийным номером работ.",
  },
  {
    icon: "✅",
    title: "Акт выполненных работ",
    desc: "Точка отсчёта гарантийного срока.",
  },
  {
    icon: "📑",
    title: "Сертификаты на материалы",
    desc: "Предоставляем по запросу — для тендеров и согласований.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Что считается гарантийным случаем?",
    answer:
      "Любая неисправность, которая возникла не по вашей вине: брак материалов, отказ электроники, отслоение печати при нормальной эксплуатации. Гарантия покрывает производственные дефекты и неправильно сделанный монтаж.",
  },
  {
    question: "Сколько занимает сервисный выезд?",
    answer:
      "По Томску — выезжаем в течение 24 часов от обращения. Диагностика на месте за 30-60 минут. Если нужен ремонт сложнее замены детали — увозим конструкцию в цех, делаем за 3-5 дней.",
  },
  {
    question: "Можно ли вернуть деньги вместо ремонта?",
    answer:
      "По закону о защите прав потребителей — да, если ремонт невозможен или некачественен (3 раза не справились). В практике — почти всегда быстрее починить или заменить.",
  },
  {
    question: "Что если ваше юридическое лицо изменится за время гарантии?",
    answer:
      "Гарантийные обязательства привязаны к договору, а не к названию юрлица. Если ООО «ФОРМАТ СИТИ» реорганизуется — обязательства переходят к правопреемнику. За 17 лет работы ИНН не менялся.",
  },
  {
    question: "Действует ли гарантия после самостоятельного ремонта?",
    answer:
      "На отремонтированные элементы — нет (нарушение пломбы/целостности). На остальные части конструкции — продолжается. Чтобы не терять гарантию, при любых неисправностях лучше звонить нам — выезжаем бесплатно.",
  },
  {
    question: "Сервис за пределами Томска?",
    answer:
      "По Томской области — выезжаем платно (по тарифу транспортных компаний). По другим регионам — диагностика дистанционно по фото/видео, ремкомплект высылаем почтой. Сложные случаи — выезд по согласованию.",
  },
  {
    question: "LED 50 000 часов — это гарантия?",
    answer:
      "Это заявленный производителем расчётный срок службы (примерно 15-17 лет при работе 8-10 ч/сутки). Наша официальная гарантия — 2 года. Но в реальной эксплуатации светодиоды работают значительно дольше.",
  },
  {
    question: "Сертификаты на материалы можете предоставить?",
    answer:
      "Да, по запросу — на акрил, металлоконструкции, ПВХ, светодиоды и контроллеры. Особенно важно для согласований и тендеров.",
  },
];

const SERVICE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Гарантийное обслуживание ZOND",
  serviceType: "Гарантия на рекламные и производственные работы",
  areaServed: { "@type": "City", name: "Томск" },
  provider: {
    "@type": "Organization",
    name: "Зонд-Реклама",
    alternateName: "ZOND",
    legalName: "ООО «ФОРМАТ СИТИ»",
    url: "https://zondreklama.ru",
    taxID: "7017200748",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Гарантийные обязательства по направлениям",
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
      },
      warranty: {
        "@type": "WarrantyPromise",
        durationOfWarranty: s.term,
      },
    })),
  },
};

export default function GarantiyaPage() {
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
            { name: "Гарантия", url: "/garantiya" },
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
            <div className="inline-flex items-center gap-2 bg-emerald-500/95 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
              <span aria-hidden>🛡️</span>
              Гарантия по договору
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              Гарантия на&nbsp;все работы ZOND
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              2 года на материалы, 1 год на электронику. Бесплатный сервисный выезд по
              Томску с 1992 года.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📞 Звонок по гарантии
              </a>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                📝 Оставить вопрос
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ 34 года репутации</span>
              <span>✓ Своё производство</span>
              <span>✓ ООО «ФОРМАТ СИТИ»</span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-6xl py-10 md:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-amber-500">
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

        {/* СЕРВИСЫ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Что гарантируем по направлениям
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              По каждой из 6 услуг ZOND свои сроки и условия гарантии. Всё фиксируем
              в договоре.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s) => (
                <div
                  key={s.name}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl hover:-translate-y-1 transition flex flex-col"
                >
                  <div className="text-4xl mb-3">{s.icon}</div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{s.name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                    {s.description}
                  </p>
                  <div className="border-t border-slate-100 pt-4 text-sm">
                    <span className="text-xs uppercase tracking-wider text-slate-400">
                      Срок:
                    </span>{" "}
                    <span className="font-bold text-brand">{s.term}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ВХОДИТ / НЕ ВХОДИТ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Что входит и что не входит
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Чтобы не было недопониманий — заранее проговариваем границы.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-emerald-700 flex items-center gap-2">
                  <span>✅</span> Входит в гарантию
                </h3>
                <ul className="space-y-2 text-sm text-slate-800">
                  {INCLUDED.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-emerald-600 mt-0.5">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-rose-700 flex items-center gap-2">
                  <span>❌</span> Не входит в гарантию
                </h3>
                <ul className="space-y-2 text-sm text-slate-800">
                  {EXCLUDED.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="text-rose-600 mt-0.5">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ПРОЦЕСС */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Как работает сервис
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Пять шагов от звонка до закрывающих документов. Каждый — с фиксированным
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

        {/* ДОКУМЕНТЫ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Документы, которые вы получаете
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Все обязательства зафиксированы письменно — от договора до сертификатов
              на материалы.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {DOCUMENTS.map((d) => (
                <div
                  key={d.title}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
                >
                  <div className="text-4xl mb-3">{d.icon}</div>
                  <h3 className="font-bold mb-2">{d.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-slate-500 mt-8">
              ООО «ФОРМАТ СИТИ», ИНН 7017200748, ОГРН 1077017039660 — работаем
              официально с 2007 года.
            </p>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы по гарантии" />

        {/* БОЛЬШОЙ CTA */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Уже есть вопрос по гарантии?
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Звоните или приезжайте — разберём конкретный случай. Бесплатная
              консультация.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="tel:+73822979705"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📞 8 (3822) 97-97-05
              </a>
              <a
                href="https://t.me/zond_reklama"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ✈ Написать в Telegram
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
