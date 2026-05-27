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
    title: "Иллюминация с 2008, бренд Лайтово с 2021",
    desc: "LED-иллюминация фасадов, ёлок и площадей с 2008 года. В 2021 выделили в отдельный бренд «Лайтово» — 500+ объектов в год.",
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
  {
    icon: "🏆",
    title: `${YEARS_ON_MARKET} года на рынке Томска`,
    desc: "Старейшее рекламное агентство города — работаем с 1992 года без перерывов и смены профиля.",
  },
  {
    icon: "📋",
    title: "44-ФЗ / 223-ФЗ",
    desc: "Опыт работы по госконтрактам и тендерам с 2010 года. Все закрывающие документы, ЭЦП, КС-2, КС-3.",
  },
];

type Milestone = { year: string; text: string; highlight?: boolean };
type Decade = { label: string; items: Milestone[] };

const TIMELINE: Decade[] = [
  {
    label: "1990-е",
    items: [
      { year: "1992", highlight: true, text: "Основание рекламной фирмы. Первая коммерческая сеть рекламных установок в Томске." },
      { year: "1993", text: "Рождение «Зонд-Реклама». Первый в Томске издательский комплекс на Apple Macintosh. Экспозиция СХК на выставке CEETEX (Лондон)." },
      { year: "1994", highlight: true, text: "Лицензия №1 на размещение наружной рекламы в Томске. Генеральный подрядчик мэрии. Оформление 50-летия Томской области." },
      { year: "1995", highlight: true, text: "Первое за Уралом оборудование полноцветной широкоформатной печати. Выставка Томской области в Харбине. Медаль «Сибирской ярмарки»." },
      { year: "1996", text: "Первая крупномасштабная политическая рекламная кампания в Томске — выборы Президента РФ. Экспозиция в Ганновере (Германия)." },
      { year: "1997", highlight: true, text: "Первый патент РФ на рекламную установку 3×6 м. Создание Томского отделения Союза дизайнеров России." },
      { year: "1998", text: "Монтаж первых систем «тривижн» в Сибири. Фирменный стиль холдинга «Юниверс» (Москва)." },
      { year: "1999", text: "Концепция архитектурно-художественного оформления Томска." },
    ],
  },
  {
    label: "2000-е",
    items: [
      { year: "2000", text: "Выход газеты «АукционЪ ONLINE» — первая в Томске интернет-версия периодического издания." },
      { year: "2001", text: "Рекламный комплекс в «Губернаторском квартале». Сертификат дилера «тривижн» («Фавор-Гарант», СПб)." },
      { year: "2002", text: "«Принт-центр» и креативный отдел. Кампания «Игра с Крюгером» для «Томского пива»." },
      { year: "2003", text: "Конкурс «Детский городок». Рекламный комплекс на пл. Транспортной. Принтер Teckwin (3,2 м) — первый в Томске." },
      { year: "2004", highlight: true, text: "Оформление Томска к 400-летию. Высшая российская награда в области дизайна — «Виктория». Журнал «ТОМСК magazine»." },
      { year: "2005", text: "Внедрение ERP Microsoft Navision. Появление Группы компаний «Зонд-Реклама»." },
      { year: "2006", highlight: true, text: "Сертификат дилера MAXIBIT W.W.AB (Швеция). Экспозиция на «Интурмаркет» (Москва). 1 место на конкурсе по наружной рекламе." },
      { year: "2007", highlight: true, text: "Первый в Томске светодиодный видеоэкран на пл. Новособорной. Открытие Аллеи трудовой славы строителей." },
      { year: "2008", highlight: true, text: "Запуск направления светодиодной иллюминации — будущая основа бренда «Лайтово» (выделен в 2021). Экспозиция для Департамента развития предпринимательства на «ИНТУРМАРКЕТ-2008»." },
      { year: "2009", text: "Внедрение 1С-8. Новый сольвентный принтер-каттер Mimaki CJV30-160." },
    ],
  },
  {
    label: "2010-е",
    items: [
      { year: "2010", text: "Оформление транспортного кольца на пр. Фрунзе. Издания «Город ONLINE» и «Здоровье ONLINE». Старт работы по госконтрактам." },
      { year: "2011", text: "Первый в Томске цветной 3D-плоттер Z Corporation ZPrinter 450. Оформление к форуму «Innovus-2011». УФ-принтер MATAN Barak 3 HS iQ." },
      { year: "2012", highlight: true, text: "20-летний юбилей. Топ-100 рекламных агентств России. Магазин светодиодной продукции. 20 новых тривижнов." },
      { year: "2013", text: "Ребрендинг компании. Суперсайты 5×15 м, новые для Томска. Новые сити-форматы в центре." },
      { year: "2014", text: "Участие в разработке схемы наружной рекламы Томска. Фестиваль «Томск — столица Российского дизайна»." },
      { year: "2015", text: "Расширение парка: Flora LJ-3208P, OKI ES9541, HP DesignJet Z5200. Расширение сети в Северск. Выставки в Шанхае и Москве." },
      { year: "2016", highlight: true, text: "Первые Digital billboards в центре города. Оформление ТПУ к 120-летию." },
      { year: "2017", text: "25-летний юбилей. Расширение сети цифровых билбордов до 10. Плоттер Mimaki CJV150. Первые конструкции в Асино." },
      { year: "2018", text: "Цифровых билбордов 14. Принтер Magellan. 17 остановочных комплексов для Томска." },
      { year: "2019", text: "Первый в Томске цифровой билборд 5×15 м. Indoor-пилоны в ТЦ. 19-метровый въездной знак для Томска." },
    ],
  },
  {
    label: "2020-е",
    items: [
      { year: "2020", text: "Запуск сервиса «гирлянды-томск.рф». Подготовка «Северного парка» к Новому году. Направление «Паспорт фасада»." },
      { year: "2021", highlight: true, text: "Формирование бренда «Лайтово» — выход на федеральный рынок. Светленский лицей, отделения «ВТБ», ребрендинг Межениновской птицефабрики." },
      { year: "2022", highlight: true, text: "30-летний юбилей ГК. Переоборудование сети под новый фирменный стиль. Оформление «ГОРОД IT». Ребрендинг ТПУ." },
      { year: "2023", text: "Цифровая сеть до 19 установок. Первый цифровой билборд в Северске. Брендирование «Левобережный life». Бортогибочный станок." },
      { year: "2024", highlight: true, text: "Замена видеоэкрана на главной площади на цифровой 6×4 м. Переоборудование сети 3×6: 1152×576 px. Новый интерьерный принтер. «Город IT» + «RoboCup»." },
      { year: "2025", highlight: true, text: "Ребрендинг 9 отделений «Сбера». Сквер атомщиков. 421-летие Томска. Стела в Парабели. Двусторонний цифровой 3×6 для ОЭЗ. 7 новых цифровых билбордов. «Город IT 2025». «Белозёрский»." },
      {
        year: String(new Date().getFullYear()),
        highlight: true,
        text: `Сегодня: ${YEARS_ON_MARKET} лет на рынке, 226 конструкций, 751 сторона, собственный цех на пр. Фрунзе 115, 50+ специалистов, новый сайт zondreklama.ru.`,
      },
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "📺", value: "226", label: "рекламных конструкций / 751 сторона в Томске" },
  { icon: "📡", value: "348", label: "цифровых LED-экранов и тривижн" },
  { icon: "🖨️", value: "50 000 м²", label: "печати в год — собственный цех" },
  { icon: "🤝", value: "1000+", label: "выполненных проектов" },
  { icon: "🇸🇪", value: "12 лет", label: "работаем с MAXIBIT (с 2006)" },
  { icon: "💡", value: "Первый", label: "LED-экран в Томске установлен нами (2007)" },
  { icon: "✨", value: "Лайтово", label: "лидер LED-иллюминации в Томской области" },
  { icon: "🏭", value: "800 м²", label: "собственный цех на пр. Фрунзе 115" },
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
      "Направление светодиодной иллюминации (фасады, ёлки, гирлянды) у нас с 2008 года. В 2021 году выделили его в отдельный бренд «Лайтово» — чтобы LED-направление было заметнее как самостоятельная услуга. Технически работает та же команда и тот же производственный цех.",
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
              <span>✓ Иллюминация с 2008</span>
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
              Восемь вещей, которые делают работу с ZOND предсказуемой и быстрой.
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
              История компании
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Каждый год с 1992-го — ключевые проекты, оборудование и награды. Жёлтым
              выделены поворотные вехи.
            </p>
            <div className="space-y-10">
              {TIMELINE.map((decade) => (
                <div key={decade.label}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-4 pl-2 border-l-4 border-brand">
                    {decade.label}
                  </h3>
                  <ol className="space-y-2">
                    {decade.items.map((item) => (
                      <li
                        key={item.year}
                        className={`flex gap-3 md:gap-4 rounded-lg px-3 py-2 transition ${
                          item.highlight ? "bg-accent-yellow/10" : "hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`shrink-0 font-bold tabular-nums text-base md:text-lg w-14 md:w-16 ${
                            item.highlight ? "text-brand" : "text-slate-500"
                          }`}
                        >
                          {item.year}
                        </span>
                        <span className="text-sm md:text-base text-slate-700 leading-relaxed">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 mt-10">
              {TIMELINE.reduce((sum, d) => sum + d.items.length, 0)} вех — данные сверены
              с zondreklama.ru
            </p>
          </div>
        </section>

        {/* ДОСТИЖЕНИЯ */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-brand/5 to-purple-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Достижения в цифрах
            </h2>
            <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
              Что значит «{YEARS_ON_MARKET} лет на рынке» — конкретные результаты на сегодня.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
              {ACHIEVEMENTS.map((a) => (
                <div
                  key={a.label}
                  className="bg-white rounded-2xl p-5 md:p-6 border border-brand/10 hover:shadow-lg hover:-translate-y-0.5 transition text-center"
                >
                  <div className="text-3xl md:text-4xl mb-3" aria-hidden>
                    {a.icon}
                  </div>
                  <div className="text-xl md:text-2xl font-extrabold text-brand mb-2 leading-tight">
                    {a.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-600 leading-snug">
                    {a.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ЧТО ДЕЛАЕМ САМИ, ЧТО ЗАКАЗЫВАЕМ */}
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">
              Что делаем сами, что заказываем
            </h2>
            <p className="text-center text-slate-600 mb-10 max-w-2xl mx-auto">
              Полный цикл от макета до металла на своём производстве — но честно про то,
              что отдаём на подряд проверенным партнёрам.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-emerald-700 flex items-center gap-2">
                  <span>✅</span> Делаем сами
                </h3>
                <ul className="space-y-2 text-sm text-slate-800">
                  <li className="flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>Дизайн и подготовка макетов</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>Гибка профиля (свой бортогиб для объёмных букв)</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>Сборка металлоконструкций и букв</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>Изготовление кронштейнов</span></li>
                  <li className="flex gap-2"><span className="text-emerald-600 mt-0.5">•</span><span>Большая часть монтажных работ</span></li>
                </ul>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-700 flex items-center gap-2">
                  <span>🤝</span> Заказываем у проверенных подрядчиков
                </h3>
                <ul className="space-y-2 text-sm text-slate-800">
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Лазерный раскрой металла, оргстекла</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Полимерная покраска</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>УФ-печать на листовых и рулонных материалах</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Офсетная полиграфия (через типографии)</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Расчёт нагрузок и проектная документация (лицензированные инжиниринговые компании)</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Сварочные работы на крупногабаритных конструкциях</span></li>
                  <li className="flex gap-2"><span className="text-slate-500 mt-0.5">•</span><span>Промышленный альпинизм на высотных монтажах</span></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-sm text-slate-600 mt-8 max-w-3xl mx-auto leading-relaxed">
              Такой подход позволяет гарантировать качество основных процессов и при этом
              не накладывать на клиента содержание инфраструктуры под все смежные операции.
            </p>
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
