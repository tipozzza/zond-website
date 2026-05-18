import Image from "next/image";
import { Award, Zap, Settings, Shield, Printer, Image as ImageIcon, Scissors, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import PrintCalculator from "@/components/PrintCalculator";
import PrintPortfolio from "@/components/PrintPortfolio";
import ImageWithFallback from "@/components/ImageWithFallback";

const ADVANTAGES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Award,
    title: "Качество",
    text: "Чернила не выцветают до 5 лет на улице. Разрешение до 1440 dpi для интерьера.",
  },
  {
    icon: Zap,
    title: "Скорость",
    text: "Стандартный баннер 3×6 — менее 10 минут на печать. Срочный заказ в день обращения.",
  },
  {
    icon: Settings,
    title: "Оборудование",
    text: "5 принтеров шириной до 3.2 м, контурная резка, ламинирование, постпечатка.",
  },
  {
    icon: Shield,
    title: "Безопасность",
    text: "Эко-сольвентные чернила для интерьера. Гарантия на печать и монтаж.",
  },
];

const PRINT_TYPES: {
  icon: LucideIcon;
  image: string;
  badge: string;
  title: string;
  description: string;
  items: string;
}[] = [
  {
    icon: Printer,
    image: "/images/print/type-solvent.jpg",
    badge: "ДО 3.2 М ШИРИНОЙ",
    title: "Широкоформатная сольвентная",
    description: "Баннеры для билбордов, фасадов, перетягов. Печать до 3.2 м шириной.",
    items: "Баннер 280/340/440/510 г, Blue Back, постерная, сетка mesh",
  },
  {
    icon: ImageIcon,
    image: "/images/print/type-interior.jpg",
    badge: "1440 DPI",
    title: "Интерьерная эко-сольвентная",
    description: "Постеры, оформление витрин, выставочных стендов. Разрешение до 1440 dpi.",
    items: "Плёнка ORAJET и Китай, холст, ткань, бумага. Принтеры Mimaki и Mustang.",
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
    image: "/images/print/printer-mimaki.jpg",
    name: "Mimaki CJV150-160",
    type: "ЭКО-СОЛЬВЕНТ",
    specs: [
      { label: "Ширина", value: "1.6 м" },
      { label: "Разрешение", value: "1440 dpi" },
      { label: "Скорость", value: "32 м²/час" },
      { label: "Особенности", value: "+ контурная резка 30 см/сек" },
    ],
  },
  {
    image: "/images/print/printer-mustang.jpg",
    name: "Mustang MG 1601 DK",
    type: "ЭКО-СОЛЬВЕНТ",
    specs: [
      { label: "Ширина", value: "1.6 м" },
      { label: "Разрешение", value: "1440 dpi" },
      { label: "Скорость", value: "до 15 м²/час" },
      { label: "Особенности", value: "головы EPSON DX-5" },
    ],
  },
  {
    image: "/images/print/cutter-keencut.jpg",
    name: "KEENCUT Javelin 3 м",
    type: "РЕЗАК",
    specs: [
      { label: "Тип", value: "лазерная технология" },
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
  { distance: "0.5–1 м", ppi: "90 ppi" },
  { distance: "1–2 м", ppi: "60 ppi" },
  { distance: "2–3 м", ppi: "45 ppi" },
  { distance: "3–5 м", ppi: "30 ppi" },
  { distance: "5 м и более", ppi: "25 ppi" },
];

const FILE_REQS = [
  "Цветовая модель: CMYK или Grayscale",
  "Шрифты переведены в кривые",
  "Растровая графика: TIFF, PSD (до 7.0)",
  "Векторная графика: AI (до v10), EPS, PDF. CDR нежелателен.",
  "Чёрный должен быть «глубокий»: C-50 M-40 Y-40 K-100",
  "Передача: до 1 МБ — на email; больше — через USB или FTP",
];

export default function PrintPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-amber-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/production.jpg"
              alt="Цех широкоформатной печати"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 relative z-10 py-20">
            <div className="max-w-2xl text-white">
              <div className="inline-block bg-[#FFCC00] text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                ПЕЧАТАЕМ В ТОМСКЕ С 1995 ГОДА
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                Широкоформатная и интерьерная печать
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                500 000 м² полноцветной печати в год. От баннеров 6×3 до интерьерных постеров
                с разрешением 1440 dpi.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#calculator"
                  className="bg-[#FFCC00] hover:bg-[#E6B800] text-slate-900 px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Рассчитать стоимость
                </a>
                <a
                  href="#equipment"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Наше оборудование
                </a>
              </div>
              <div className="flex gap-6 mt-12 text-sm">
                <div>
                  <strong className="block text-3xl text-[#FFCC00] leading-none">5</strong>
                  <span>принтеров</span>
                </div>
                <div>
                  <strong className="block text-3xl text-[#FFCC00] leading-none">9+</strong>
                  <span>материалов</span>
                </div>
                <div>
                  <strong className="block text-3xl text-[#FFCC00] leading-none">500 000</strong>
                  <span>м²/год</span>
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
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {ADVANTAGES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="text-center p-6 rounded-2xl bg-white border border-slate-200">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFCC00]/15 flex items-center justify-center mb-4">
                    <Icon size={26} className="text-amber-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <PrintCalculator />

        {/* Портфолио */}
        <PrintPortfolio />

        {/* Виды печати */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Виды печати</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Три направления закрывают любую задачу — от уличной рекламы до финального оформления изделия.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {PRINT_TYPES.map(({ icon: Icon, image, badge, title, description, items }) => (
                <article
                  key={title}
                  className="group rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#FFCC00] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col"
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

        {/* Оборудование */}
        <section id="equipment" className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Наше оборудование</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              4 печатные машины + станция постпечатной обработки (резак и ламинатор).
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
                    Чем дальше от носителя зритель — тем меньше нужно ppi.
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
                        <td className="px-4 py-3 font-semibold text-slate-900">{d.ppi}</td>
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

        <CTAForm accentColor="#FFCC00" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
