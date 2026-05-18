import Image from "next/image";
import {
  Building2,
  Trees,
  TreeDeciduous,
  Lightbulb,
  LampDesk,
  CalendarClock,
  Monitor,
  Tv,
  ScrollText,
  Cross,
  Award,
  Wrench,
  Globe2,
  Shield,
  Eye,
  CalendarRange,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import LedCalculator from "@/components/LedCalculator";
import LedIllumination from "@/components/LedIllumination";
import LedPortfolio from "@/components/LedPortfolio";
import ImageWithFallback from "@/components/ImageWithFallback";

const SOLUTION_ICONS: Record<string, LucideIcon> = {
  Building2,
  Trees,
  TreeDeciduous,
  Lightbulb,
  LampDesk,
  CalendarClock,
};

const SOLUTIONS = [
  { id: "facade", name: "Иллюминация фасадов", desc: "Магазины, ТЦ, кафе, рестораны, бизнес-центры", iconHint: "Building2" },
  { id: "trees", name: "Оформление деревьев", desc: "Парки, скверы, дворы, придомовые территории", iconHint: "Trees" },
  { id: "spruces", name: "Оформление ёлок к Новому году", desc: "От 3 до 15 метров. Городские и торговые ёлки", iconHint: "TreeDeciduous" },
  { id: "neon", name: "Контурная подсветка неоном", desc: "Динамичные контуры зданий, вывески, декор", iconHint: "Lightbulb" },
  { id: "architectural", name: "Архитектурная подсветка", desc: "Декоративные светильники, прожекторы. Работает круглый год", iconHint: "LampDesk" },
  { id: "rent", name: "Аренда гирлянд", desc: "На разовые мероприятия и события", iconHint: "CalendarClock" },
];

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
  { year: 2006, event: "Первый светодиодный экран в Томске на пл. Новособорная" },
  { year: 2008, event: "Экран для ТДСК" },
  { year: 2011, event: "Первое производство бегущих строк в Сибирском регионе" },
  { year: 2014, event: "Экран в Северске" },
  { year: 2016, event: "Совместные закупки с LED Russia — единые цены по РФ" },
  { year: 2026, event: "Более 500 м² установленных экранов в Томске и Сибири" },
];

const ADVANTAGE_ICONS = [Award, Wrench, Globe2, Shield, Eye, CalendarRange];

const ADVANTAGES: { title: string; desc: string }[] = [
  { title: "Более 14 лет опыта", desc: "Лайтово с 2008 года, ГК Зонд-Реклама — с 1992" },
  { title: "Собственное производство", desc: "Гирлянды, фигуры, экраны — всё своё. Без посредников" },
  { title: "Прямые контракты с заводами", desc: "WGO (Китай) для LED-модулей + китайские поставщики гирлянд" },
  { title: "Гарантия 12 месяцев", desc: "На всё оборудование. LED-экраны — 24 месяца" },
  { title: "Бесплатный дизайн по фото", desc: "Присылаете фото объекта — мы делаем визуализацию" },
  { title: "Аренда оборудования", desc: "Для разовых мероприятий — экономия для разовых событий" },
];

const PROCESS: { step: number; name: string; desc: string }[] = [
  { step: 1, name: "Заявка", desc: "Звоните или оставляете запрос с фото объекта" },
  { step: 2, name: "Дизайн (бесплатно)", desc: "Визуализация и расчёт стоимости" },
  { step: 3, name: "Согласование", desc: "Утверждение макета и договор" },
  { step: 4, name: "Производство", desc: "Сборка гирлянд / фигур / экранов" },
  { step: 5, name: "Монтаж под ключ", desc: "Электромонтаж, установка, тестирование" },
  { step: 6, name: "Демонтаж + хранение", desc: "После сезона снимаем и храним на складе" },
];

export default function LedPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] bg-[#0B1E3F] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/led/led-night.jpg"
              alt="Новогоднее оформление"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B1E3F]/95 via-[#0E1A2B]/85 to-[#0B1E3F]/70" />
          </div>

          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10 w-full min-h-[90vh] flex items-center">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg">
                  <Image
                    src="/logo-horizontal-purple.png"
                    alt="ZOND"
                    width={120}
                    height={32}
                    className="h-8 w-auto"
                  />
                </div>
                <span className="text-2xl text-[#F4C430] font-light">+</span>
                <div className="bg-white/95 backdrop-blur px-4 py-2 rounded-lg">
                  <ImageWithFallback
                    src="/images/led/lightovo-logo-white.png"
                    alt="LIGHTOVO"
                    className="h-8 w-auto"
                    fallbackNode={
                      <div className="font-black text-xl text-[#0B1E3F] tracking-widest">
                        LIGHTOVO
                      </div>
                    }
                  />
                </div>
              </div>

              <div className="inline-block bg-[#F4C430] text-[#0B1E3F] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                ЛАЙТОВО — БРЕНД ГК ЗОНД С 2008
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
                Светодиодная продукция и новогодняя иллюминация
              </h1>
              <p className="text-xl md:text-2xl text-white/85 mb-8 leading-relaxed">
                От гирлянды на коттедже до медиа-фасада торгового центра. Иллюминация под ключ
                + собственное производство LED-экранов с 2006 года.
              </p>
              <div className="flex gap-4 flex-wrap mb-12">
                <a
                  href="#calculator"
                  className="bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition shadow-xl"
                >
                  Получить дизайн бесплатно
                </a>
                <a
                  href="https://lightovo.ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition"
                >
                  Каталог на lightovo.ru →
                </a>
              </div>
              <div className="flex gap-8 flex-wrap text-white">
                <div>
                  <div className="text-4xl font-bold text-[#F4C430] leading-none">500+</div>
                  <div className="text-sm text-white/70 mt-1">объектов в год</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F4C430] leading-none">14+</div>
                  <div className="text-sm text-white/70 mt-1">лет на рынке</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F4C430] leading-none">500 м²</div>
                  <div className="text-sm text-white/70 mt-1">LED-экранов</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#F4C430] leading-none">12 мес</div>
                  <div className="text-sm text-white/70 mt-1">гарантия</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Что мы делаем — 6 решений */}
        <section className="py-12 md:py-20 bg-[#0B1E3F]">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Иллюминация под ключ — 6 решений
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                От проекта до демонтажа. Бесплатный дизайн по фото объекта.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SOLUTIONS.map((s) => {
                const Icon = SOLUTION_ICONS[s.iconHint] ?? Lightbulb;
                return (
                  <div
                    key={s.id}
                    className="group bg-[#0E1A2B] rounded-2xl border border-[#1E3661] hover:border-[#F4C430] p-6 transition-all hover:shadow-xl hover:shadow-[#F4C430]/10"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#F4C430]/15 group-hover:bg-[#F4C430] flex items-center justify-center mb-5 transition-colors">
                      <Icon
                        size={26}
                        className="text-[#F4C430] group-hover:text-[#0B1E3F] transition-colors"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight">{s.name}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <LedCalculator />

        {/* Иллюминация (Лайтово) */}
        <LedIllumination />

        {/* LED-экраны — секция Зонда (фиолетовая) */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-[#7B1FA2]/10 text-[#7B1FA2] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Производство Зонд с 2006
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Собственное производство LED-экранов с 2006 года
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Первый светодиодный экран в Томске установлен нами на пл. Новособорная в 2006 году.
                С тех пор — более 500 м² экранов.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {SCREEN_TYPES.map((t) => {
                const Icon = SCREEN_ICONS[t.id] ?? Monitor;
                return (
                  <article
                    key={t.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-[#7B1FA2] hover:shadow-lg transition-all p-6 flex flex-col"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#7B1FA2]/10 flex items-center justify-center mb-4">
                      <Icon size={26} className="text-[#7B1FA2]" />
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
                          <span className="text-[#7B1FA2]">•</span>
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

        {/* Хроника */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Хроника LED в Сибири</h2>
              <p className="text-lg text-slate-600">
                От первого экрана 2006 года до 500+ м² в 2026 году.
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
                    <div className="relative z-10 w-8 h-8 rounded-full bg-[#7B1FA2] border-4 border-white shadow-md mx-auto" />
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

        {/* Преимущества */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Почему выбирают нас</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Опыт, собственное производство, прямые контракты и гарантия.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ADVANTAGES.map((a, i) => {
                const Icon = ADVANTAGE_ICONS[i] ?? Award;
                return (
                  <div
                    key={a.title}
                    className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#F4C430] hover:shadow-xl transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#F4C430]/15 group-hover:bg-[#F4C430] flex items-center justify-center mb-4 transition-colors">
                      <Icon
                        size={22}
                        className="text-amber-600 group-hover:text-[#0B1E3F] transition-colors"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{a.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Процесс — 6 шагов */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Как мы работаем</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                6 шагов от первого звонка до сезонного хранения оборудования.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROCESS.map((p) => (
                <div
                  key={p.step}
                  className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#F4C430] text-[#0B1E3F] flex items-center justify-center text-xl font-bold">
                    {p.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 leading-tight">{p.name}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Портфолио */}
        <LedPortfolio />

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

        <CTAForm accentColor="#F4C430" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
