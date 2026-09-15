import type { Metadata } from "next";
import Image from "next/image";
import { Monitor, Tv, ScrollText, Cross } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import RelatedArticles from "@/components/RelatedArticles";
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
import { CatalogWithPrices, Solutions, HowToOrder } from "@/components/lightovo/LightovoBlocks";
import { CATALOG_PDF } from "@/lib/lightovo-catalog";
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
  title: "Новогоднее оформление и иллюминация в Томске — каталог с ценами | Лайтово",
  description:
    "Гирлянды бахрома, занавес, нить, неон, дюралайт, метеориты, световые фигуры и ели — со склада в Томске, с ценами. Расчёт для коттеджа, кафе, ТЦ. Монтаж под ключ. Бренд Лайтово ГК Зонд-Реклама.",
  keywords: [
    "новогоднее оформление Томск",
    "подсветка фасадов",
    "иллюминация Томск",
    "гирлянды купить Томск",
    "гирлянда бахрома цена",
    "световые фигуры",
    "Лайтово",
  ],
  openGraph: {
    images: [
      {
        url: "/api/og?title=Новогоднее оформление и иллюминация&subtitle=Направление с 2008, бренд Лайтово с 2021&category=LED-иллюминация",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function LedPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <ServiceSchema
        serviceType="Светодиодная иллюминация"
        name="Новогодняя иллюминация и LED-продукция"
        description="Гирлянды бахрома, занавес, нить, неон, дюралайт, метеориты, световые фигуры и ели со склада в Томске. Комплект материалов или монтаж под ключ. Бренд Лайтово."
        lowPrice={600}
        priceRange="600-200 000 ₽"
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
                Гирлянды, световые фигуры и оформление ёлок. Комплект материалов или монтаж под ключ —
                в Томске, со своего склада. Бесплатный дизайн-проект.
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
                <a
                  href={CATALOG_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="PDF, 18 страниц, около 15 МБ"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Скачать каталог PDF
                </a>
              </div>
              <p className="text-sm text-white/60 mt-6 mb-12">
                + Собственное производство LED-экранов с 2007 года — подробнее ниже на странице ↓
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-white">
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">с 1992</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">собственное производство</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">с 2008</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">знаем о гирляндах всё</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none">свой склад</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">в Томске, всё в наличии</div>
                </div>
                <div className="min-w-0">
                  <div className="text-3xl sm:text-4xl font-bold text-[#F4C430] leading-none whitespace-nowrap">до −45 °C</div>
                  <div className="text-xs sm:text-sm text-white/70 mt-1">каучук и IP65+</div>
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

        {/* Каталог сезона 2026/2027 с ценами — девять разделов */}
        <CatalogWithPrices />

        {/* Готовые решения — четыре типовых объекта */}
        <Solutions />

        {/* LED-экраны — секция Зонда (фиолетовая) */}
        <section id="screens" className="py-12 md:py-20 bg-white scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#67008F]/10 text-[#67008F] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
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
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#67008F] hover:shadow-lg transition-all p-6 flex flex-col"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#67008F]/10 flex items-center justify-center mb-4">
                      <Icon size={26} className="text-[#67008F]" />
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
                          <span className="text-[#67008F]">•</span>
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
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#67008F] border-4 border-white shadow-md mx-auto" />
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

        {/* Как заказать — четыре шага и сезонный календарь */}
        <HowToOrder />

        <FAQ
          title="Частые вопросы"
          items={[
            {
              question: "Сколько стоит новогоднее оформление коттеджа?",
              answer:
                "Контур крыши бахромой для дома 10 × 8 м (36 м карниза) — от 22 536 ₽ за материалы в классе «под навес» и от 25 716 ₽ в универсальном IP44. Снежинка на фронтон — от 8 800 ₽, нить на ель во дворе — от 7 300 ₽. Монтаж считаем после замера.",
            },
            {
              question: "Сколько стоит оформить витрину или вход магазина?",
              answer:
                "Интерьерный занавес 3 × 3 м за стекло — 1 400 ₽ за штуку, на витрину 9 м нужно три. Уличный занавес IP44 3 × 3 м — 7 894 ₽. Контур входной группы неоном 8×16 — 360 ₽ за метр плюс блок питания. Ель 2,1 м с декором — от 22 900 ₽.",
            },
            {
              question: "Продаёте только материалы или делаете монтаж?",
              answer:
                "И то и другое. Можно забрать комплект со склада в Томске и повесить самим — дадим схему подключения. Можно заказать под ключ: замер, дизайн-проект, монтаж нашей бригадой, обслуживание зимой и демонтаж в январе–феврале.",
            },
            {
              question: "Какие гирлянды выдержат сибирскую зиму?",
              answer:
                "Для открытого фасада, деревьев и столбов — морозостойкие серии на каучуковом проводе с защитой IP65–IP67: −45 °C, снег, наледь, можно не снимать весной. Под навесом достаточно IP44, в помещении и за стеклом — IP20.",
            },
            {
              question: "Когда лучше заказывать?",
              answer:
                "Материалы продаём с сентября по ноябрь, монтируем в ноябре–декабре. Штучные позиции — снежинки, олени, ели — бронируйте в сентябре–октябре. В декабре бригады уже расписаны.",
            },
            {
              question: "Делаете ли световые фигуры на заказ?",
              answer:
                "Да: олени, снежинки, ёлки, арки, надписи и логотипы по эскизу на собственном производстве ZOND в Томске — каркас из проволоки, дюралайт, неон или гирлянда-нить. Срок от двух недель.",
            },
            {
              question: "Работаете ли с юрлицами, УК и ТСЖ?",
              answer:
                "Да, по договору с юрлицами и ИП, счета и закрывающие документы. Оформляем ТЦ, БЦ, кафе, дворы и многоквартирные дома.",
            },
          ]}
        />

        <PublicPortfolio category="led" />

        <RelatedArticles
          category="led"
          also={["production"]}
          title="Полезное об оформлении"
          className="bg-slate-50"
          relatedServices={[
            { href: "/production", label: "Изготовление вывесок" },
            { href: "/design", label: "Дизайн и логотип" },
          ]}
        />
        <CTAForm accentColor="#F4C430" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
