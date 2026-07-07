import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Map, Zap, Gift, History, Camera, Activity } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import OutdoorMapSection from "@/components/OutdoorMapSection";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceSchema from "@/components/ServiceSchema";
import FAQ from "@/components/FAQ";
import PublicPortfolio from "@/components/PublicPortfolio";
import { HERO_BLURS } from "@/lib/hero-blurs";
import { pluralizeYears } from "@/lib/pluralize";
import { SIDES_COUNT } from "@/lib/site-data";

const YEARS_ON_MARKET = new Date().getFullYear() - 1992;
const BADGES = [
  `${YEARS_ON_MARKET} ${pluralizeYears(YEARS_ON_MARKET)} на рынке`,
  `${SIDES_COUNT} сторон`,
  "348 цифровых",
];

const STATS = [
  { num: "1992", label: "год основания" },
  { num: "226", label: "конструкций" },
  { num: "348", label: "цифровых сторон" },
  { num: "27", label: "цифровых LED-экранов" },
];

const CONSTRUCTIONS: {
  img: string;
  alt: string;
  name: string;
  priceBadge: string;
  typeBadge: string;
  subtitle: string;
  description: string;
  isExclusive?: boolean;
}[] = [
  {
    img: "/images/outdoor-types/type-digital.jpg?v=3",
    alt: "Цифровой LED-экран Digital 3×6 в Томске — рекламное размещение, ZOND",
    name: "Digital 3×6",
    priceBadge: "ОТ 45 000 ₽/МЕС",
    typeBadge: "ЦИФРОВОЙ",
    subtitle: "Цифровой LED-экран",
    description:
      "5 секунд × 12 сюжетов в цикле — 1440 показов в сутки. 27 экранов в проходных местах Томска.",
  },
  {
    img: "/images/outdoor-types/type-billboard.jpg?v=3",
    alt: "Классический билборд 3×6 в Томске — статичная наружная реклама, ZOND",
    name: "Щит 3×6",
    priceBadge: "ОТ 29 000 ₽/МЕС",
    typeBadge: "СТАТИЧНЫЙ",
    subtitle: "Классический билборд",
    description:
      "Идеален для долгосрочных кампаний и брендирования. Самый распространённый формат наружной рекламы.",
  },
  {
    img: "/images/outdoor-types/type-trivision.jpg?v=3",
    alt: "Тривижн 3×6 — 3 стороны рекламы в Томске, ZOND",
    name: "Тривижн 3×6",
    priceBadge: "ОТ 35 000 ₽/МЕС",
    typeBadge: "ДИНАМИЧЕСКИЙ",
    subtitle: "3 рекламы на одной стороне",
    description:
      "Динамическая поверхность имеющая 3 стороны — 1 щит показывает 3 разных рекламы поочерёдно.",
  },
  {
    img: "/images/outdoor-types/type-digital-4x6.jpg?v=3",
    alt: "Цифровой LED 4×6 на Новособорной площади в Томске — крупный формат, ZOND",
    name: "Цифровой 4×6",
    priceBadge: "ОТ 60 000 ₽/МЕС",
    typeBadge: "ЭКСКЛЮЗИВ · ЕДИНСТВЕННЫЙ",
    subtitle: "Уникальный формат — Новособорная пл.",
    description:
      "Единственная цифровая LED-конструкция формата 4×6 в нашем парке. Расположена на Новособорной пл. в центре Томска. 12 рекламных позиций в ротации экрана, динамическая смена контента.",
    isExclusive: true,
  },
  {
    img: "/images/outdoor-types/digital-5x15.jpg?v=3",
    alt: "Цифровой суперсайт 5×15 на въезде в Томск — томский эксклюзив, ZOND",
    name: "Цифровой суперсайт 5×15",
    priceBadge: "ОТ 75 000 ₽/МЕС",
    typeBadge: "ЭКСКЛЮЗИВ · ДИНАМИЧЕСКИЙ ПРЕМИУМ",
    subtitle: "75 м² LED-экран на въезде в город",
    description:
      "5 секунд × 12 сюжетов в цикле — 1440 показов в сутки. Единственный в Томске.",
    isExclusive: true,
  },
  {
    img: "/images/outdoor-types/type-trivision-3x12.jpg?v=3",
    alt: "Тривижн 3×12 в центре Томска на ул. Ленина — динамическая реклама, ZOND",
    name: "Тривижн 3×12",
    priceBadge: "ОТ 50 000 ₽/МЕС",
    typeBadge: "ДИНАМИЧЕСКИЙ · 2 шт на ул. Ленина",
    subtitle: "Большой динамический формат",
    description:
      "Динамическая поверхность имеющая 3 стороны — 1 щит показывает 3 разных рекламы поочерёдно. Размер 3×12 м.",
  },
  {
    img: "/images/outdoor-types/type-supersite.jpg?v=3",
    alt: "Суперсайт 5×15 на трассе Томска — премиум-формат, ZOND",
    name: "Суперсайт 5×15",
    priceBadge: "ОТ 67 000 ₽/МЕС",
    typeBadge: "ПРЕМИУМ",
    subtitle: "Большой статичный формат",
    description:
      "75 м² печатной поверхности на трассах и въездах в город. Максимальный охват аудитории.",
  },
  {
    img: "/images/outdoor-types/type-city-format.jpg?v=3",
    alt: "Сити-формат в Томске — реклама на остановках, ZOND",
    name: "Сити-формат 1.2×1.8",
    priceBadge: "ОТ 9 000 ₽/МЕС",
    typeBadge: "ПЕШЕХОДНЫЙ",
    subtitle: "Пешеходный формат",
    description:
      "Размещение в остановочных комплексах, на пешеходных улицах. Реклама на уровне глаз.",
  },
];

const ADVANTAGES: { icon: LucideIcon; stat: string; title: string; text: string }[] = [
  {
    icon: Trophy,
    stat: "27",
    title: "Собственная digital-сеть в Томске",
    text: "27 цифровых LED-экранов в проходных местах города.",
  },
  {
    icon: Map,
    stat: String(SIDES_COUNT),
    title: `${SIDES_COUNT} сторон под управлением`,
    text: "Крупная сеть наружной рекламы в Томской области.",
  },
  {
    icon: Zap,
    stat: "3",
    title: "Размещение от 3 дней",
    text: "Свой цех печати и бригады монтажа — без посредников и долгих согласований.",
  },
  {
    icon: Gift,
    stat: "0₽",
    title: "Бесплатный подбор программы",
    text: "Менеджер составит план с учётом вашего бюджета, аудитории и целей.",
  },
  {
    icon: History,
    stat: "34",
    title: "года опыта",
    text: "Работаем в Томске с 1992 года. Знаем что работает в этом городе.",
  },
  {
    icon: Camera,
    stat: "100%",
    title: "Фотоотчёт после монтажа",
    text: "Документируем каждое размещение — вы видите свою рекламу на конструкции.",
  },
  {
    icon: Activity,
    stat: "24/7",
    title: "Видеомониторинг работы экранов",
    text: "Круглосуточный контроль работы всех цифровых LED-экранов — гарантия что ваша реклама в эфире.",
  },
];

const STEPS = [
  { num: 1, title: "Заявка", text: "Звоните 8 (3822) 97-97-05 или оставьте заявку онлайн" },
  { num: 2, title: "Подбор", text: "Менеджер подберёт программу под задачу за 1–2 дня" },
  { num: 3, title: "Согласование", text: "Утверждаем макет и подписываем договор" },
  { num: 4, title: "Размещение", text: "Печатаем, монтируем, присылаем фотоотчёт" },
];

export const metadata: Metadata = {
  title: `Наружная реклама в Томске: ${SIDES_COUNT} сторон, подбор онлайн | ZOND`,
  description: `Размещение наружной рекламы в Томске: ${SIDES_COUNT} сторон на 226 конструкциях, 348 цифровых LED. Соберите список по карте и отправьте менеджеру — бронирование онлайн под ключ.`,
  keywords: [
    "наружная реклама Томск",
    "билборды Томск",
    "цифровая реклама Томск",
    "размещение наружной рекламы",
    "баннер Томск",
    "подбор конструкций онлайн",
  ],
  openGraph: {
    images: [
      {
        url: `/api/og?title=${SIDES_COUNT} сторон наружной рекламы в Томске&subtitle=Билборды и цифровые LED-экраны&category=Наружная реклама`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function OutdoorPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <ServiceSchema
        serviceType="Наружная реклама"
        name="Размещение наружной рекламы в Томске"
        description={`${SIDES_COUNT} рекламных сторон на 226 конструкциях: билборды, LED-экраны, сити-форматы, суперсайты.`}
        lowPrice={9000}
        priceRange="9 000–75 000 ₽/мес"
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Наружная реклама", url: "/outdoor" },
          ]}
        />
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <Image
            src="/images/outdoor-mix.jpg"
            alt="Наружная реклама в Томске — билборды и LED"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={HERO_BLURS.outdoor}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent md:from-black/30" />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-24">
            <div className="max-w-xl flex flex-col gap-6 text-white">
              <span className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
                Наружная реклама
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-lg">
                Наружная реклама<br />в Томске
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow">
                {SIDES_COUNT} рекламных сторон на 226 конструкциях, 348 digital.
                Собственная сеть наружной рекламы в Томске с 1992 года.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#map"
                  className="inline-flex items-center justify-center bg-[#F57C28] hover:bg-[#E26A1F] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  Посмотреть карту
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  Подобрать программу
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-10">
            <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap gap-2 md:gap-4">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[#F57C28]/20 backdrop-blur text-xs md:text-sm font-medium text-white"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Сеть в цифрах */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Сеть в цифрах</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Крупная сеть наружной рекламы в Томской области.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                  <div className="text-5xl md:text-6xl font-bold text-[#F57C28] mb-2 leading-none">
                    {s.num}
                  </div>
                  <div className="text-sm text-slate-600 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Карта */}
        <div id="map" className="scroll-mt-24">
          <OutdoorMapSection />
        </div>

        {/* Типы конструкций */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Типы рекламных конструкций
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              5 форматов под любую задачу: от точечного локального охвата до массовых имиджевых кампаний.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONSTRUCTIONS.map((c) => (
                <article
                  key={c.name}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#F57C28] hover:shadow-2xl hover:shadow-[#F57C28]/20 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={c.img}
                      alt={c.alt}
                      fill
                      loading="lazy"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                        c.name.startsWith("Digital") || c.name.startsWith("Цифровой") ? "brightness-110 contrast-110" : ""
                      }`}
                    />
                    <div className="absolute top-3 left-3 right-3 z-10 flex justify-end items-start gap-2">
                      <div
                        className={`px-3 py-1 rounded-full font-bold leading-tight max-w-[60%] text-right whitespace-normal text-[10px] sm:text-xs ${
                          c.isExclusive
                            ? "bg-amber-400 text-slate-900 shadow-lg shadow-amber-400/50"
                            : "bg-[#F57C28] text-white"
                        }`}
                      >
                        {c.typeBadge}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1 leading-tight">
                      {c.name}
                    </h3>
                    <p className="text-sm text-[#F57C28] font-semibold mb-3">{c.subtitle}</p>
                    <p className="text-slate-600 leading-relaxed">{c.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Почему выбирают нас */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Почему выбирают нас</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Что реально получает клиент, размещая рекламу через нас.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVANTAGES.map(({ icon: Icon, stat, title, text }) => (
                <div
                  key={title}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#F57C28] hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#F57C28]/10 flex items-center justify-center group-hover:bg-[#F57C28] transition-colors flex-shrink-0">
                      <Icon
                        size={24}
                        className="text-[#F57C28] group-hover:text-white transition-colors"
                      />
                    </div>
                    <div className="text-3xl font-bold text-[#F57C28] leading-none mt-2">
                      {stat}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 leading-tight">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как заказать (stepper) */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Как заказать</h2>
            <p className="text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto">
              4 шага от первого звонка до фотоотчёта о готовом размещении.
            </p>

            <div className="relative">
              {/* Горизонтальная пунктирная линия на десктопе */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] border-t-2 border-dashed border-slate-300"
              />
              <div className="grid md:grid-cols-4 gap-y-10 gap-x-6 relative">
                {STEPS.map((s) => (
                  <div key={s.num} className="text-center px-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#F57C28] text-white flex items-center justify-center text-2xl font-bold mb-4 relative z-10 ring-8 ring-white shadow-lg">
                      {s.num}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-900">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FAQ
          title="Частые вопросы"
          items={[
            { question: "Сколько щитов и LED-экранов у ZOND в Томске?", answer: `226 рекламоносителей и ${SIDES_COUNT} сторон. Из них 348 цифровых (LED, тривижн, динамические сити-форматы). Полная карта с фильтрами и онлайн-бронированием — на этой странице.` },
            { question: "Какой минимальный срок аренды рекламного места?", answer: "1 месяц для статичных билбордов 6×3 и сити-форматов. Для LED-экранов и тривижн — 1 неделя (на акции, события, скидки). Можем сделать дневное размещение для крупных событий." },
            { question: "Что входит в стоимость размещения?", answer: "Аренда конструкции, печать и монтаж постера, демонтаж после окончания периода. Дизайн-макет — отдельно от 3 000 руб (или предоставляете готовый). Подсветка зависит от конкретной стороны: на карте и в карточке каждой стороны указано, освещена она или нет — показываем реальный статус. Подсветка не доплачивается, она либо есть, либо нет — это техническая характеристика конструкции." },
            { question: "Можно ли заменить макет в течение месяца?", answer: "Да, при долгосрочной аренде (3+ месяца) одна замена макета в месяц включена в стоимость. Дополнительные перепечатки — по себестоимости. Для LED-экранов смена контента — мгновенная и бесплатная." },
            { question: "Какие есть скидки на длительное размещение?", answer: "От 3 месяцев — 5%, от 6 месяцев — 10%, от 12 месяцев — 15-20%. Плюс сезонные акции (зима — самая выгодная цена). Для рекламных и медиа-агентств — отдельный прайс." },
            { question: "Делаете ли вы согласование рекламы с администрацией?", answer: "Полное сопровождение — паспорт рекламного места, согласование макета с архитектурно-планировочным управлением Томска, оформление договора. Это занимает 5-10 рабочих дней." },
          ]}
        />

        <PublicPortfolio category="outdoor" />

        <CTAForm accentColor="#F57C28" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
