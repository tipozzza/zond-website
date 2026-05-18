import Image from "next/image";
import {
  Printer,
  Image as ImageIcon,
  Zap,
  Circle,
  Tag,
  Layers,
  Scissors,
  Crop,
  FlipVertical,
  Sparkles,
  BookOpen,
  Calculator,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";

const BADGES = ["5 принтеров", "9+ материалов", "500 000 м²/год"];

const PRINT_TYPES: { icon: LucideIcon; title: string; description: string; items: string[] }[] = [
  {
    icon: Printer,
    title: "Широкоформатная сольвентная",
    description: "Баннеры для билбордов, фасадов, конструкций. Печать до 3.2 м шириной.",
    items: ["Баннер 280 / 340 / 440 / 510 г/м²", "Blue Back, постерная бумага", "Сетка mesh"],
  },
  {
    icon: ImageIcon,
    title: "Интерьерная эко-сольвентная",
    description: "Постеры, оформление витрин, выставочных стендов. Разрешение 1440 dpi.",
    items: ["Плёнка Orajet, плёнка Китай", "Холст, ткань, бумага", "Принтеры Mimaki и Mustang"],
  },
  {
    icon: Zap,
    title: "УФ-печать на жёстких материалах",
    description: "Печать прямо на ПВХ, оргстекле, АКП, стекле. Без предварительной плёнки.",
    items: ["Принтер Matan Barak", "Ширина 3.5 м", "До 353 м²/час"],
  },
];

const PRINTERS = [
  {
    name: "Flora LJ-3208P",
    type: "Сольвент",
    specs: ["Ширина 3.2 м", "600 dpi", "до 185 м²/час", "8 голов Spectra Polaris"],
  },
  {
    name: "Magellan C3208i",
    type: "Сольвент",
    specs: ["Ширина 3.2 м", "720 dpi", "до 260 м²/час", "Головы Konica Minolta KM512i"],
  },
  {
    name: "Matan Barak",
    type: "УФ-печать",
    specs: ["Ширина 3.5 м", "720 dpi", "до 353 м²/час", "Печать на жёстких материалах"],
  },
  {
    name: "Mimaki CJV30-160",
    type: "Эко-сольвент",
    specs: ["Ширина 1.6 м", "1440 dpi", "8–20 м²/час", "+ контурная резка 30 см/сек"],
  },
  {
    name: "Mustang MG 1601 DK",
    type: "Эко-сольвент",
    specs: ["Ширина 1.6 м", "1440 dpi", "до 15 м²/час", "Головы EPSON DX-5"],
  },
  {
    name: "Постпечатка",
    type: "Резка и ламинирование",
    specs: [
      "KEENCUT Javelin 3 м",
      "EXCELAM WIDE 1670RS",
      "Финиширование изделий",
      "Подготовка к монтажу",
    ],
  },
];

const MATERIALS = [
  { name: "Баннер ламинированный", density: "280 / 340 / 440 г/м²", width: "3.2 м", use: "Уличные баннеры до 6 мес" },
  { name: "Баннер литой (Европа)", density: "460–510 г/м²", width: "3.2 м", use: "Долгосрочные размещения 1–3 года" },
  { name: "Баннерная сетка mesh", density: "280 г/м²", width: "3.2 м", use: "Фасады, перетяги через дороги" },
  { name: "Плёнка Orajet", density: "—", width: "1.0–2.0 м", use: "Витрины, авто, интерьер" },
  { name: "Плёнка Китай", density: "—", width: "1.27 м", use: "Бюджетные тиражи" },
  { name: "Плёнка перфорированная", density: "—", width: "—", use: "Окна со сторонним обзором" },
  { name: "Плёнка светоотражающая", density: "—", width: "—", use: "Дорожные знаки, безопасность" },
  { name: "Бумага Blue Back", density: "115 г/м²", width: "1.25 м", use: "Интерьерные постеры" },
  { name: "Бумага постерная", density: "150 г/м²", width: "1.27 м", use: "Афиши, плакаты" },
  { name: "Холст декоративный", density: "—", width: "—", use: "Интерьерные работы, картины" },
];

const POST_PRINTING: { icon: LucideIcon; label: string }[] = [
  { icon: Circle, label: "Установка люверсов" },
  { icon: Tag, label: "Проклейка края" },
  { icon: Layers, label: "Ламинирование" },
  { icon: Scissors, label: "Контурная резка" },
  { icon: Crop, label: "Подрезка по формату" },
  { icon: FlipVertical, label: "Биговка и фальцовка" },
  { icon: Sparkles, label: "Тиснение фольгой" },
  { icon: BookOpen, label: "Скрепление пружиной" },
];

const MF_PRODUCTS = [
  "Визитки 90×50 мм",
  "Буклеты-евро (3 фальца)",
  "Буклеты-призма",
  "Открытки ЕВРО",
  "Конверты ЕВРО",
  "Календари карманные 70×100",
  "Календари-домики (призмы)",
  "Календари-перекидные A3",
  "Календари квартальные",
  "Плакаты A3",
  "Плакаты A2",
  "Плакаты A1",
  "Листовки A4/A5/A6",
  "Сувенирная продукция",
];

const ADVANTAGES = [
  { num: "5 лет", title: "Без выцветания", text: "Наши чернила держат цвет до 5 лет на улице." },
  { num: "1440 dpi", title: "Высокое разрешение", text: "От 300 до 1440 dpi — под любой формат." },
  { num: "10 мин", title: "Скорость печати", text: "Стандартный баннер 3×6 — менее 10 минут." },
  { num: "С 1995", title: "Опыт работы", text: "Первый полноцветный билборд в Томске." },
];

const FILE_REQUIREMENTS = [
  {
    title: "Широкоформатная (Flora, Magellan, Matan)",
    items: [
      "Формат: TIFF, PDF, PSD",
      "Цвет: CMYK (не RGB!)",
      "Разрешение: 100–150 dpi в реальном размере",
      "Шрифты: в кривые",
      "Вылеты: 50 мм с каждой стороны",
    ],
  },
  {
    title: "Интерьерная (Mimaki, Mustang)",
    items: [
      "Формат: TIFF, PDF, EPS",
      "Цвет: CMYK",
      "Разрешение: 150–300 dpi",
      "Шрифты: в кривые",
      "Вылеты: 5–10 мм",
    ],
  },
];

export default function PrintPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <Image
            src="/images/production.jpg"
            alt="Цех широкоформатной печати в Томске"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/75 via-amber-900/40 to-transparent" />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-24">
            <div className="max-w-2xl flex flex-col gap-6 text-white">
              <span className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#FFCC00] shadow-[0_0_12px_rgba(255,204,0,0.8)]" />
                Печать с 1995 года
              </span>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-lg">
                Широкоформатная и интерьерная печать в Томске
              </h1>

              <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed drop-shadow">
                500 000 м² полноцветной печати в год. От баннеров 6×3 до интерьерных постеров с разрешением 1440 dpi.
                Стандартный баннер 3×6 — менее 10 минут.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center bg-[#FFCC00] hover:bg-[#E6B800] text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
                >
                  Получить расчёт
                </a>
                {/* TODO: ссылка на PDF-прайс, пока ведёт на форму */}
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                >
                  Скачать прайс PDF
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-10">
            <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap gap-2 md:gap-4">
              {BADGES.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFCC00]/20 backdrop-blur text-xs md:text-sm font-medium text-white"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Что мы печатаем */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Что мы печатаем</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Три технологии печати закрывают любую задачу — от уличной рекламы до интерьерной графики.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {PRINT_TYPES.map(({ icon: Icon, title, description, items }) => (
                <article
                  key={title}
                  className="bg-white rounded-2xl border border-slate-200 hover:border-[#FFCC00] shadow-sm hover:shadow-lg transition-all p-8 flex flex-col"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#FFCC00]/15 flex items-center justify-center mb-5">
                    <Icon size={28} className="text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{title}</h3>
                  <p className="text-slate-600 mb-5 leading-relaxed">{description}</p>
                  <ul className="space-y-1.5 text-sm text-slate-700 mt-auto">
                    {items.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <span className="text-[#FFCC00] font-bold mt-0.5">•</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Оборудование */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              5 принтеров для любого формата и материала
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Плюс отдельная станция постпечатной обработки — режем, ламинируем, готовим к монтажу.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRINTERS.map((p) => (
                <article
                  key={p.name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFCC00]/15 flex items-center justify-center text-2xl">
                      🖨️
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">{p.name}</h3>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                        {p.type}
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    {p.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2">
                        <span className="text-[#FFCC00] font-bold mt-0.5">•</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Материалы */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              9 типов носителей в наличии
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Подбираем материал под срок размещения, бюджет и условия эксплуатации.
            </p>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Материал</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Плотность</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Ширина</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Применение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATERIALS.map((m) => (
                      <tr key={m.name} className="border-t border-slate-100 hover:bg-[#FFCC00]/5">
                        <td className="px-4 py-3 font-semibold text-slate-900">{m.name}</td>
                        <td className="px-4 py-3 text-slate-600">{m.density}</td>
                        <td className="px-4 py-3 text-slate-600">{m.width}</td>
                        <td className="px-4 py-3 text-slate-600">{m.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Постпечатка */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Готовое изделие — а не просто отпечаток
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              После печати — финиширование под задачу клиента.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {POST_PRINTING.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-center hover:border-[#FFCC00] transition-colors"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#FFCC00]/15 flex items-center justify-center mb-3">
                    <Icon size={22} className="text-amber-600" />
                  </div>
                  <div className="text-sm font-semibold text-slate-900 leading-tight">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор (заглушка) */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="bg-amber-50 rounded-3xl border-2 border-dashed border-[#FFCC00] p-10 md:p-14 text-center max-w-3xl mx-auto">
              <Calculator size={56} className="mx-auto text-amber-600 mb-5" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                Калькулятор стоимости
              </h2>
              <p className="text-base md:text-lg text-slate-700 mb-8">
                Калькулятор в разработке. Сейчас стоимость считает менеджер за 1–2 часа по вашему запросу — пришлёт расчёт с разбивкой по материалу и постпечатке.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center justify-center bg-[#FFCC00] hover:bg-[#E6B800] text-slate-900 font-bold px-8 py-4 rounded-xl transition-colors"
              >
                Запросить расчёт
              </a>
            </div>
          </div>
        </section>

        {/* МФ-продукция */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Малоформатная полиграфия
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Дизайн-центр Зонд-Реклама с 1995 года. От визитки до сложной архитектурной формы.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {MF_PRODUCTS.map((p) => (
                <div
                  key={p}
                  className="p-5 bg-white border border-slate-200 rounded-xl hover:bg-[#FFCC00]/10 hover:border-[#FFCC00] transition-colors text-center"
                >
                  <div className="text-sm font-semibold text-slate-900 leading-snug">{p}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Преимущества */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Почему стоит печатать у нас
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {ADVANTAGES.map((a) => (
                <div
                  key={a.title}
                  className="bg-white rounded-2xl border-2 border-[#FFCC00]/30 p-6 text-center"
                >
                  <div className="text-3xl md:text-4xl font-extrabold text-amber-600 mb-2 leading-none">
                    {a.num}
                  </div>
                  <div className="font-bold text-slate-900 mb-1 leading-tight">{a.title}</div>
                  <div className="text-sm text-slate-600 leading-relaxed">{a.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Требования к файлам */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Как подготовить макет
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Дизайн от макетов из интернета — это лотерея. Лучше сразу выполните требования.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {FILE_REQUIREMENTS.map((req) => (
                <div
                  key={req.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#FFCC00]/15 flex items-center justify-center">
                      <FileText size={20} className="text-amber-600" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight">{req.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {req.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-[#FFCC00] font-bold mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
