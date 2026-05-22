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

const YEARS_ON_MARKET = new Date().getFullYear() - 1992;

export const metadata: Metadata = {
  title: `О компании ZOND — ${YEARS_ON_MARKET} лет в Томске | История с 1992`,
  description: `ГК Зонд-Реклама в Томске. ${YEARS_ON_MARKET} лет работы, 50+ специалистов, 226 рекламных конструкций, собственный цех, дилерство MAXIBIT, бренд Лайтово.`,
  keywords: [
    "Зонд-Реклама",
    "рекламное агентство Томск",
    "история компании",
    "ГК Зонд",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "О компании ZOND",
    description: `${YEARS_ON_MARKET} лет на рынке рекламы Томска — с 1992. 226 конструкций, собственный цех, дилерство MAXIBIT, бренд Лайтово.`,
    url: "https://zond-website.vercel.app/about",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "О компании ZOND",
          subtitle: `${YEARS_ON_MARKET} года на рынке рекламы Томска — с 1992`,
          category: "О нас",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "О компании ZOND",
    description: `${YEARS_ON_MARKET} лет на рынке рекламы Томска — с 1992`,
    images: [
      buildOgUrl({
        title: "О компании ZOND",
        subtitle: `${YEARS_ON_MARKET} года на рынке рекламы Томска — с 1992`,
        category: "О нас",
      }),
    ],
  },
};

const STATS = [
  { value: `${YEARS_ON_MARKET}+`, label: "лет на рынке" },
  { value: "50+", label: "специалистов" },
  { value: "226", label: "конструкций в Томске" },
  { value: "50 000 м²", label: "печати в год" },
];

const DIFFERENTIATORS = [
  {
    icon: "🔁",
    title: "Полный цикл",
    desc: "Дизайн → производство → монтаж → демонтаж → хранение. Без посредников и третьих рук.",
  },
  {
    icon: "📜",
    title: "Согласования под ключ",
    desc: "Берём на себя Комитет архитектуры Томска: эскиз, фотомонтаж, технический проект, подача документов.",
  },
  {
    icon: "🛡️",
    title: "Гарантия 2 года",
    desc: "На все материалы, 1 год на электронику. Бесплатный сервисный выезд по Томску.",
  },
  {
    icon: "💡",
    title: "Бренд Лайтово с 2008",
    desc: "Отдельное направление LED-иллюминации фасадов, ёлок и площадей. 500+ объектов в год.",
  },
  {
    icon: "💰",
    title: "Прозрачный прайс",
    desc: "Калькуляторы и тарифы на сайте, фиксированные цены в договоре. Без «по запросу».",
  },
  {
    icon: "🤝",
    title: "Долгие клиенты",
    desc: "С большинством крупных клиентов работаем 10+ лет. Постоянное обслуживание и развитие.",
  },
];

const TIMELINE = [
  { year: "1992", title: "Основание", desc: "Создание рекламной фирмы. Первая коммерческая сеть рекламных установок в Томске." },
  { year: "2006", title: "MAXIBIT", desc: "Получили сертификат дилера MAXIBIT (Швеция) — премиум выставочное оборудование." },
  { year: "2007", title: "Первый LED в Томске", desc: "Установили первый цифровой светодиодный видеоэкран на пл. Новособорной." },
  { year: "2008", title: "Гирлянды и иллюминация", desc: "Запуск направления светодиодной продукции. Первые крупные новогодние проекты." },
  { year: "2016", title: "Digital-сеть", desc: "Установка первых цифровых билбордов в центре города — формирование сети." },
  { year: "2021", title: "Бренд Лайтово", desc: "Выделение LED-иллюминации в отдельный бренд. Выход на федеральный рынок." },
  {
    year: String(new Date().getFullYear()),
    title: "Сегодня",
    desc: `${YEARS_ON_MARKET} лет на рынке, 226 конструкций, собственный цех на пр. Фрунзе 115, 50+ специалистов.`,
  },
];

const TEAM = [
  { initials: "ЛА", name: "Любимов А.В.", role: "Исполнительный директор" },
  { initials: "АЕ", name: "Алешин Е.Н.", role: "Начальник департамента производства" },
  { initials: "ПИ", name: "Просников И.А.", role: "Начальник РЭС НР (рекламоносители)" },
  { initials: "РО", name: "Рабцевич О.М.", role: "Главный бухгалтер" },
];

const FAQ_ITEMS = [
  {
    question: "С какого года работает ZOND?",
    answer: `С 1992 года, юр.лицо — ООО «Формат Сити». ${YEARS_ON_MARKET} лет на рынке рекламы и производства в Томске.`,
  },
  {
    question: "Чем ZOND отличается от Лайтово?",
    answer:
      "«Лайтово» — наш бренд для светодиодной иллюминации (фасады, ёлки, гирлянды) с 2008 года. Технически работает та же команда и тот же производственный цех. Разделение нужно, чтобы LED-направление было заметнее как самостоятельная услуга.",
  },
  {
    question: "Можно ли посмотреть производство?",
    answer:
      "Да. Шоурум и производственный цех находятся на пр. Фрунзе 115. По предварительной записи покажем оборудование, материалы, готовые работы. Записаться можно по телефону или через форму.",
  },
  {
    question: "Работаете ли с физлицами?",
    answer:
      "Да, для частных вывесок, праздничного оформления, ивентов. Большая часть оборота — юр.лица, но физлица — тоже наши клиенты. Гарантия и качество одинаковые.",
  },
  {
    question: "Есть ли у вас другие офисы?",
    answer:
      "Нет, головной офис и производство — только в Томске. По Томской области — выездной монтаж. В другие регионы — дистанционно: проектирование, отгрузка, удалённый авторский надзор. По договорённости — выезд бригады.",
  },
  {
    question: "Кто руководит компанией?",
    answer:
      "Исполнительный директор — Любимов А.В. По всем вопросам обращайтесь через офис, телефон 8 (3822) 97-97-05 или форму на сайте — заявка попадает ответственному менеджеру в течение часа.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "О компании", url: "/about" },
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
              <span aria-hidden>🏆</span>
              На рынке с 1992
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              О&nbsp;компании ZOND
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] md:drop-shadow-lg">
              {YEARS_ON_MARKET} года создаём рекламу в&nbsp;Томске — от&nbsp;билбордов
              и&nbsp;вывесок до&nbsp;LED-иллюминации фасадов и&nbsp;выставочных стендов.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-7 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📅 Записаться на встречу
              </a>
              <a
                href="#timeline"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                ↓ Подробнее
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
              <span>✓ 50+ специалистов</span>
              <span>✓ Своё производство</span>
              <span>✓ Лайтово с 2008</span>
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

        {/* МИССИЯ */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="text-xs uppercase tracking-wider text-accent-yellow font-bold mb-4">
              Миссия
            </div>
            <blockquote className="text-2xl md:text-4xl font-extrabold leading-tight mb-4">
              «Создаём рекламу, которую видно. Под ключ — от&nbsp;идеи до&nbsp;монтажа.»
            </blockquote>
            <div className="text-sm text-white/70">— Команда ZOND</div>
          </div>
        </section>

        {/* ОТЛИЧИЯ */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Чем мы отличаемся
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Шесть вещей, которые делают работу с ZOND предсказуемой и быстрой.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {DIFFERENTIATORS.map((d) => (
                <div
                  key={d.title}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-brand hover:shadow-xl hover:-translate-y-1 transition"
                >
                  <div className="text-4xl mb-3">{d.icon}</div>
                  <h3 className="text-lg font-bold mb-2 leading-tight">{d.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ТАЙМЛАЙН */}
        <section id="timeline" className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Ключевые вехи
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Семь моментов, определивших, чем ZOND стал сегодня.
            </p>
            <ol className="relative">
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-brand to-purple-300" />
              {TIMELINE.map((t) => (
                <li key={t.year} className="relative pl-12 pb-8 last:pb-0">
                  <span className="absolute left-1.5 top-1.5 w-5 h-5 rounded-full bg-brand ring-4 ring-brand/20" />
                  <div className="text-xl font-bold text-brand mb-1">
                    {t.year} — {t.title}
                  </div>
                  <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {t.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* КОМАНДА */}
        <section className="py-16 md:py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Ключевые специалисты
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              По любым техническим, производственным или финансовым вопросам — обращайтесь
              напрямую к ответственному руководителю.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="bg-white rounded-2xl p-6 border border-slate-200 text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-brand to-purple-700 text-white flex items-center justify-center text-2xl font-extrabold">
                    {m.initials}
                  </div>
                  <h3 className="font-bold text-base mb-1">{m.name}</h3>
                  <p className="text-sm text-slate-600 leading-snug">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ДОКУМЕНТЫ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Документы компании
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Работаем официально с 2007 года, договоры по 44-ФЗ и 223-ФЗ, ЭЦП.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <LegalCard label="Юр. лицо">
                <strong className="block text-base">ООО «Формат Сити»</strong>
                <span className="block text-sm text-slate-500 mt-1">
                  Группа компаний «Зонд-Реклама»
                </span>
              </LegalCard>
              <LegalCard label="Реквизиты">
                <ul className="text-sm space-y-1">
                  <li>ИНН 7017200748</li>
                  <li>ОГРН 1077017039660</li>
                  <li>Год регистрации: 2007</li>
                </ul>
              </LegalCard>
              <LegalCard label="Юридический адрес" wide>
                <span className="text-base">
                  634021, г. Томск, пр. Фрунзе, 115
                </span>
              </LegalCard>
            </div>
          </div>
        </section>

        <FAQ items={FAQ_ITEMS} title="Частые вопросы о компании" />

        {/* CTA-блок */}
        <section className="bg-brand text-white py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Хотите познакомиться лично?
            </h2>
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto">
              Приходите в офис на пр. Фрунзе 115 — покажем производство, обсудим
              задачу. Бесплатно.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-accent-yellow text-slate-900 px-8 py-4 rounded-xl font-bold text-base shadow-xl hover:-translate-y-0.5 hover:brightness-95 transition"
              >
                📅 Записаться на встречу
              </a>
              <a
                href="https://yandex.ru/maps/?text=Томск,%20пр.%20Фрунзе,%20115"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 transition"
              >
                🗺 Маршрут
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

function LegalCard({
  label,
  children,
  wide,
}: {
  label: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={`p-6 rounded-2xl bg-slate-50 border border-slate-200 ${wide ? "sm:col-span-2" : ""}`}
    >
      <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        {label}
      </span>
      {children}
    </div>
  );
}
