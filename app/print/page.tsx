import type { Metadata } from "next";
import Image from "next/image";
import { Award, Zap, History, Activity, Printer, Image as ImageIcon, Scissors, FileText, Flag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import RelatedArticles from "@/components/RelatedArticles";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import PrintCalculator from "@/components/PrintCalculator";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceSchema from "@/components/ServiceSchema";
import FAQ from "@/components/FAQ";
import PublicPortfolio from "@/components/PublicPortfolio";
import { HERO_BLURS } from "@/lib/hero-blurs";
import ImageWithFallback from "@/components/ImageWithFallback";

const ADVANTAGES: { icon: LucideIcon; stat: string; title: string; text: string }[] = [
  {
    icon: History,
    stat: "31",
    title: "год в Томске",
    text: "Первый полноцвет 3×6 в городе напечатан нами в 1995 году.",
  },
  {
    icon: Activity,
    stat: "50 000",
    title: "м² в год",
    text: "Парк оборудования печатает полноцветные широкоформатные изображения объёмом 50 000 квадратных метров ежегодно.",
  },
  {
    icon: Award,
    stat: "12 мес",
    title: "Без выцветания на улице",
    text: "Сольвентные чернила в сибирских условиях сохраняют цвет до 12 месяцев на открытом солнце.",
  },
  {
    icon: Zap,
    stat: "1440 dpi",
    title: "Максимальное разрешение",
    text: "Интерьерная печать с фото-качеством для постеров, выставок, оформления.",
  },
];

const PRINT_TYPES: {
  icon: LucideIcon;
  image: string;
  badge: string;
  title: string;
  description: string;
  items: string;
  anchor?: string;
}[] = [
  {
    icon: Printer,
    image: "/images/print/type-solvent.jpg",
    badge: "ДО 3.1 М · РУЛОН 3.2 М",
    title: "Широкоформатная сольвентная",
    description: "Баннеры для билбордов, фасадов, перетягов. Запечатываемое поле до 3,1 м, ширина рулона до 3,2 м.",
    items: "Баннер 280/340/440/510 г, Blue Back, постерная, баннерная сетка",
    anchor: "wide",
  },
  {
    icon: ImageIcon,
    image: "/images/print/type-interior.jpg",
    badge: "1440 DPI",
    title: "Интерьерная эко-сольвентная",
    description: "Постеры, оформление витрин, выставочных стендов. Разрешение до 1440 dpi.",
    items: "Плёнка ORAJET и Китай, холст, ткань, бумага. Принтер Arc Jet.",
    anchor: "interior",
  },
  {
    icon: Flag,
    image: "/images/print/type-textile.jpg",
    badge: "ПОЛОТНО ДО 2,2 М",
    title: "Печать на ткани",
    description: "Флаги, виндеры, настольные флажки, скатерти, шторы, тканевые баннеры. Сублимация: краска уходит внутрь волокна — не выцветает на улице и не смывается при стирке. Срок 2–3 дня.",
    items: "Флажная сетка, атлас, таффета, габардин, блэкаут. Принтер Audley D2200-4, пошив в своём цехе.",
    anchor: "textile",
  },
  {
    icon: Scissors,
    image: "/images/print/type-postprint.jpg",
    badge: "ОТ 20 ₽/М",
    title: "Постпечатная обработка",
    description: "Превращаем отпечаток в готовое изделие. Резка, проклейка, ламинирование, люверсы.",
    items: "Подрезка по периметру, проклейка края, установка люверсов, ламинирование 30–250 мкм.",
  },
];

// Цены — из КП «Флаги и текстиль», октябрь 2026.
const FLAG_FABRICS = ["Сетка", "Атлас", "Таффета"];
const FLAG_PRICES: { item: string; min: string; prices: string[] }[] = [
  { item: "Уличный флаг 70 × 105 см", min: "от 5 шт", prices: ["от 1 700 ₽", "от 1 810 ₽", "от 1 650 ₽"] },
  { item: "Флаг-виндер 50 × 150 см", min: "от 5 шт", prices: ["от 1 850 ₽", "—", "—"] },
  { item: "Настольный флажок 12 × 18 см", min: "от 10 шт", prices: ["от 380 ₽", "от 420 ₽", "от 360 ₽"] },
];

const EQUIPMENT: {
  image: string;
  name: string;
  type: string;
  specs: { label: string; value: string }[];
}[] = [
  {
    image: "/images/print/printer-magellan.jpg",
    name: "Magellan C3208i",
    type: "СОЛЬВЕНТ",
    specs: [
      { label: "Ширина", value: "3.2 м" },
      { label: "Разрешение", value: "до 720 dpi" },
      { label: "Скорость", value: "до 240 м²/час" },
      { label: "Материалы", value: "баннер, бумага, плёнка, сетка, холст" },
    ],
  },
  {
    image: "/images/print/printer-flora.jpg",
    name: "Flora LJ-3208P",
    type: "СОЛЬВЕНТ",
    specs: [
      { label: "Ширина", value: "3.2 м" },
      { label: "Разрешение", value: "до 600 dpi" },
      { label: "Скорость", value: "до 185 м²/час" },
      { label: "Материалы", value: "баннер, бумага, плёнка" },
    ],
  },
  {
    image: "/images/print/printer-arcjet.jpg",
    name: "Arc Jet",
    type: "ЭКО-СОЛЬВЕНТ",
    specs: [
      { label: "Ширина", value: "1.6 м" },
      { label: "Разрешение", value: "1440 dpi" },
      { label: "Скорость", value: "до 15 м²/час" },
      { label: "Особенности", value: "головы Epson i3200" },
    ],
  },
  {
    image: "/images/print/printer-audley-d2200.jpg",
    name: "Audley D2200-4",
    type: "ТЕКСТИЛЬ · СУБЛИМАЦИЯ",
    specs: [
      { label: "Ширина полотна", value: "до 2,2 м" },
      { label: "Ткани", value: "флажная сетка, атлас, таффета, габардин, блэкаут" },
      { label: "Применение", value: "флаги, виндеры, скатерти, шторы, тканевые баннеры" },
    ],
  },
  {
    image: "/images/print/cutter-keencut.jpg",
    name: "KEENCUT Javelin 3 м",
    type: "РЕЗАК",
    specs: [
      { label: "Ширина", value: "3 м" },
      { label: "Особенности", value: "ровные стыки для составных панелей" },
    ],
  },
  {
    image: "/images/print/laminator-excelam.jpg",
    name: "EXCELAM WIDE 1670RS",
    type: "ЛАМИНАТОР",
    specs: [
      { label: "Режим", value: "горячий и холодный" },
      { label: "Ширина", value: "до 1.6 м" },
      { label: "Плёнка", value: "30–250 мкм" },
    ],
  },
];

const DPI_DISTANCE = [
  { distance: "0.5–1 м", dpi: "90 dpi" },
  { distance: "1–2 м", dpi: "60 dpi" },
  { distance: "2–3 м", dpi: "45 dpi" },
  { distance: "3–5 м", dpi: "30 dpi" },
  { distance: "5 м и более", dpi: "25 dpi" },
];

const FILE_REQS = [
  "Цветовая модель: CMYK или Grayscale",
  "Шрифты переведены в кривые",
  "Растровая графика: TIFF, PSD (до 7.0)",
  "Векторная графика: AI (до v10), EPS, PDF, CDR (не старше v22).",
  "Чёрный должен быть «глубокий»: C-50 M-40 Y-40 K-100",
  "Передача: до 1 МБ — на email; больше — через USB или FTP",
];

export const metadata: Metadata = {
  title: "Широкоформатная печать в Томске — баннеры, плёнка, постеры | Зонд",
  description:
    "Широкоформатная печать в Томске: баннеры 6×3 за 10 минут, плёнка, винил, текстиль, постеры. Сольвент до 3,2 м, эко-сольвент 1440 dpi. Собственный цех, доставка по городу. 8 (3822) 97-97-05",
  keywords: [
    "широкоформатная печать Томск",
    "печать баннеров Томск",
    "печать плёнки Томск",
    "печать постеров",
    "сольвентная печать",
    "заказать баннер Томск",
  ],
  openGraph: {
    images: [
      {
        url: "/api/og?title=Широкоформатная печать и полиграфия&subtitle=Собственный цех в Томске, до 3,2 м&category=Печать",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function PrintPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <ServiceSchema
        serviceType="Широкоформатная печать"
        name="Широкоформатная и интерьерная печать в Томске"
        description="Печать баннеров до 3,2 м, плёнки, фотопанелей, плакатов. 50 000 м² в год."
        lowPrice={120}
        priceRange="120-2 000 ₽/м²"
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Широкоформатная печать", url: "/print" },
          ]}
        />
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden">
          {/* Фон */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/production.jpg"
              alt="Широкоформатная печать баннеров в Томске"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={HERO_BLURS.print}
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          </div>

          {/* Контент */}
          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10 w-full">
            <div className="max-w-2xl">
              <div className="inline-block bg-[#FFCC00] text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
                ПЕЧАТАЕМ В ТОМСКЕ С 1995 ГОДА
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white text-left tracking-tight leading-tight">
                Широкоформатная печать в Томске
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 text-left leading-relaxed">
                Свой цех, 50 000 м²/год. Баннеры, плёнка, винил, текстиль, постеры — до 3,2 м шириной. Доставка по городу.
              </p>
              <div className="flex gap-4 flex-wrap mb-12">
                <a
                  href="#calculator"
                  className="bg-[#FFCC00] hover:bg-[#E6B800] text-slate-900 px-8 py-4 rounded-xl text-base font-bold transition shadow-xl"
                >
                  Рассчитать стоимость
                </a>
                <a
                  href="#equipment"
                  className="bg-black/50 backdrop-blur border border-white/40 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-black/70 transition shadow-xl"
                >
                  Наше оборудование
                </a>
              </div>
              <div className="flex gap-8 text-left">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#FFCC00] leading-none">5</div>
                  <div className="text-sm text-white/80 mt-1">принтеров</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#FFCC00] leading-none">9+</div>
                  <div className="text-sm text-white/80 mt-1">материалов</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#FFCC00] leading-none">50 000</div>
                  <div className="text-sm text-white/80 mt-1">м²/год</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Почему стоит печатать у нас
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              4 опоры, на которых стоит производство в Зонд-Реклама.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {ADVANTAGES.map(({ icon: Icon, stat, title, text }) => (
                <div
                  key={title}
                  className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#FFCC00] hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#FFCC00]/20 flex items-center justify-center group-hover:bg-[#FFCC00] transition-colors flex-shrink-0">
                      <Icon size={24} className="text-slate-900" />
                    </div>
                    <div className="text-3xl font-bold text-slate-900 leading-none mt-2">
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

        {/* Калькулятор */}
        <PrintCalculator />

        {/* Портфолио */}

        {/* Виды печати */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Виды печати</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Четыре направления закрывают любую задачу — от уличной рекламы и флагов до финального оформления изделия.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRINT_TYPES.map(({ icon: Icon, image, badge, title, description, items, anchor }) => (
                <article
                  key={title}
                  id={anchor}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#FFCC00] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col scroll-mt-24"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <ImageWithFallback
                      src={image}
                      alt={title}
                      fallbackEmoji="🖨️"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-[#FFCC00] text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                      {badge}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-slate-900" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{title}</h3>
                    </div>
                    <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>
                    <p className="text-sm text-slate-500 mt-auto leading-relaxed">
                      <strong className="text-slate-700">Материалы:</strong> {items}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Флаги и текстиль: цены */}
        <section id="flagi" className="py-12 md:py-20 bg-white scroll-mt-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Флаги с логотипом — цены</h2>
            <p className="text-lg text-slate-600 text-center mb-10 max-w-2xl mx-auto">
              Печатаем на ткани полотном до 2,2 м и шьём в своём цехе в Томске. Цена за штуку с печатью,
              пошивом и люверсами или карманом под древко.
            </p>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
              <table className="w-full text-sm min-w-[560px]">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">Изделие</th>
                    {FLAG_FABRICS.map((f) => (
                      <th key={f} className="px-4 py-3 text-right font-semibold text-slate-700">{f}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FLAG_PRICES.map((row) => (
                    <tr key={row.item} className="border-t border-slate-100">
                      <td className="px-4 py-3 text-slate-800">
                        {row.item}
                        <span className="block text-xs text-slate-500">{row.min}</span>
                      </td>
                      {row.prices.map((p, i) => (
                        <td key={i} className="px-4 py-3 text-right font-semibold text-slate-900 whitespace-nowrap">{p}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4 mt-6 text-sm text-slate-600">
              <p><strong className="text-slate-800">Сетка</strong> — улица: ветер проходит сквозь полотно, рисунок виден с двух сторон.</p>
              <p><strong className="text-slate-800">Атлас</strong> — интерьер и подарки: плотный, с блеском, самые сочные цвета.</p>
              <p><strong className="text-slate-800">Таффета</strong> — праздники и большие тиражи: тонкая, матовая, самая доступная.</p>
            </div>
            <p className="max-w-4xl mx-auto text-xs text-slate-500 mt-6">
              Древко, флагшток, кронштейны и монтаж — отдельно. Скатерти, шторы, фотопанели и флаги нестандартного
              размера считаем по квадратному метру. Цены не являются офертой — точный расчёт по макету за час.
            </p>
          </div>
        </section>

        {/* Оборудование */}
        <section id="equipment" className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наше оборудование</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              4 печатные машины (2 сольвентных, интерьерный и текстильный) + станция постпечатной обработки (резак и ламинатор).
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {EQUIPMENT.map((e) => (
                <article
                  key={e.name}
                  className="bg-white rounded-2xl border border-slate-200 hover:shadow-xl hover:border-[#FFCC00] transition-all overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                    <ImageWithFallback
                      src={e.image}
                      alt={e.name}
                      fallbackEmoji="🖨️"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">
                      {e.type}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-tight">{e.name}</h3>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {e.specs.map((spec) => (
                        <li key={spec.label}>
                          <strong className="text-slate-800">{spec.label}:</strong> {spec.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Требования к файлам */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Требования к файлам
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Чтобы отпечаток был чётким — макет должен соответствовать формату вывода.
            </p>

            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Таблица dpi по дистанции */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 border-b border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900">
                    Разрешение по дистанции просмотра
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Чем дальше от носителя зритель — тем меньше нужно dpi.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Дистанция</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Разрешение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DPI_DISTANCE.map((d) => (
                      <tr key={d.distance} className="border-t border-slate-100">
                        <td className="px-4 py-3 text-slate-700">{d.distance}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">{d.dpi}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Общие требования */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/15 flex items-center justify-center">
                    <FileText size={20} className="text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">
                    Общие требования к макету
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {FILE_REQS.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="text-[#FFCC00] font-bold mt-0.5">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <FAQ
          title="Частые вопросы"
          items={[
            { question: "Какая максимальная ширина широкоформатной печати у ZOND?", answer: "Максимальная ширина запечатываемого поля 3100 мм, ширина рулона материала 3200 мм. Длина практически не ограничена (до 30 м в одном полотнище). Для баннеров больше 3 м делаем склейку из частей, также возможны нестандартные формы. Печатаем на сольвентных принтерах Magellan и Flora с разрешением до 720 dpi. Интерьерный принтер Arc Jet даёт до 1440 dpi на холсте, плёнке и бумаге." },
            { question: "Какой минимальный заказ для широкоформатной печати?", answer: "Минимального заказа нет — печатаем и 1 м² баннера. На большие объёмы (от 100 м²) действует скидка 10-20%. Срочную печать выполняем в день обращения." },
            { question: "На каких материалах вы печатаете?", answer: "Литой баннер 440-510 г/м², ламинированный 280-340 г/м², баннерная сетка, плёнка для машин и витрин, бумага, текстиль, холст для интерьерной печати. Полный список — в калькуляторе на странице." },
            { question: "Сколько занимает изготовление баннера в Томске?", answer: "Стандартный срок — 1-3 рабочих дня с момента согласования макета. Срочные заказы — в день обращения (с наценкой 30%). При сложной постпечатной обработке (люверсы, проклейка, ламинирование) — до 5 дней." },
            { question: "Печатаете флаги с логотипом?", answer: "Да, на своём текстильном принтере полотном до 2,2 м, пошив тоже у нас. Уличный флаг 70 × 105 см — от 1 650 ₽ за штуку при тираже от 5 шт, флаг-виндер 50 × 150 см — от 1 850 ₽, настольный флажок — от 360 ₽ при тираже от 10 шт. Срок 2–3 дня. Древко, флагшток и монтаж — отдельно." },
            { question: "Делаете ли вы дизайн или нужен готовый макет?", answer: "Можем работать и так, и так. Если макет готов в подходящем формате (PDF/TIFF/AI, 100 dpi, CMYK) — печатаем. Если нужна разработка — наш отдел дизайна сделает за 1-3 дня от 3 000 руб." },
            { question: "Доставляете ли по Томску и области?", answer: "Да, доставка по Томску бесплатно при заказе от 5 000 руб., по области — по тарифам транспортных компаний. Самовывоз с пр. Фрунзе 115 всегда бесплатно." },
          ]}
        />

        <PublicPortfolio category="print" />

        <RelatedArticles
          category="print"
          also={["outdoor"]}
          title="Полезное о печати и рекламе"
          className="bg-slate-50"
          relatedServices={[
            { href: "/outdoor", label: "Наружная реклама" },
            { href: "/production", label: "Изготовление вывесок" },
            { href: "/design", label: "Дизайн и макет" },
          ]}
        />
        <CTAForm accentColor="#FFCC00" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
