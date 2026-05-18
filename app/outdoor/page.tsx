import Image from "next/image";
import Link from "next/link";
import { Trophy, Map, Zap, Gift, History, Camera } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import OutdoorMapSection from "@/components/OutdoorMapSection";

const BADGES = ["32+ года на рынке", "726 сторон", "336 цифровых"];

const STATS = [
  { num: "1992", label: "год основания" },
  { num: "226", label: "конструкций" },
  { num: "336", label: "цифровых сторон" },
  { num: "27", label: "уникальных LED-экранов" },
];

const CONSTRUCTIONS = [
  {
    name: "Digital 3×6",
    price: "от 45 000 ₽/мес",
    description: "Цифровой биллборд формата 3×6. Ролик 8 секунд, до 60 показов в час.",
  },
  {
    name: "Щит 3×6",
    price: "от 29 000 ₽/мес",
    description: "Классический статичный билборд. Идеален для долгосрочных кампаний.",
  },
  {
    name: "Тривижн 3×6",
    price: "от 35 000 ₽/мес",
    description:
      "Вращающийся щит на 3 стороны — 1 поверхность показывает 3 разных рекламы.",
  },
  {
    name: "Сити-формат 1,2×1,8",
    price: "от 9 000 ₽/мес",
    description:
      "Компактные конструкции на остановках и у магазинов. Высокое внимание пешеходов.",
  },
  {
    name: "Супер-сайт 5×15",
    price: "от 75 000 ₽/мес",
    description:
      "Крупноформатные щиты на въездах в город и магистралях. Максимальный охват.",
  },
];

const ADVANTAGES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Trophy,
    title: "Крупнейшая digital-сеть Томска",
    text: "27 уникальных цифровых экранов в проходных местах города.",
  },
  {
    icon: Map,
    title: "726 сторон под управлением",
    text: "Лидер по охвату наружной рекламы в Томской области.",
  },
  {
    icon: Zap,
    title: "Размещение от 3 дней",
    text: "Свой цех печати и бригады монтажа — без посредников и долгих согласований.",
  },
  {
    icon: Gift,
    title: "Бесплатный подбор программы",
    text: "Менеджер составит план с учётом вашего бюджета, аудитории и целей.",
  },
  {
    icon: History,
    title: "Опыт 32+ года",
    text: "Работаем в Томске с 1992 года. Знаем что работает в этом городе.",
  },
  {
    icon: Camera,
    title: "Фотоотчёт после монтажа",
    text: "Документируем каждое размещение — вы видите свою рекламу на конструкции.",
  },
];

const STEPS = [
  { num: 1, title: "Заявка", text: "Звоните 8 (3822) 97-97-05 или оставьте заявку онлайн" },
  { num: 2, title: "Подбор", text: "Менеджер подберёт программу под задачу за 1–2 дня" },
  { num: 3, title: "Согласование", text: "Утверждаем макет и подписываем договор" },
  { num: 4, title: "Размещение", text: "Печатаем, монтируем, присылаем фотоотчёт" },
];

const FAQ = [
  {
    q: "Чем отличается digital-биллборд от статичного щита?",
    a: "Digital — это цифровая LED-панель: можно менять контент в любой момент, видна одинаково хорошо днём и ночью. Статичный щит дешевле, но требует печати баннера, не меняется, эффективнее в дневное время. Digital сильнее для коротких акций и тестирования, статика — для длительных имиджевых кампаний.",
  },
  {
    q: "Сколько раз в день показывают мою рекламу на digital?",
    a: "В формате Digital 3×6 ваш ролик длиной 8 секунд показывается до 60 раз в час. За сутки — порядка 1 440 показов на одной стороне.",
  },
  {
    q: "Что такое сторона A и сторона B?",
    a: "Каждая рекламная конструкция имеет две стороны для размещения. Сторона A — по направлению основного потока транспорта, сторона B — по встречному. Сторона A обычно стоит чуть дороже из-за лучшего трафика.",
  },
  {
    q: "Какой минимальный срок размещения?",
    a: "Для digital — от 1 дня (можно запустить ролик на конкретное событие). Для статичных конструкций — от 1 месяца (нужно время на печать баннера и монтаж). При размещении от 3 месяцев действуют скидки.",
  },
  {
    q: "Что входит в стоимость размещения?",
    a: "В цену включено: само размещение на конструкции, регулярная проверка состояния, замена в случае повреждения по нашей вине. Печать баннера и монтаж — отдельно (от 5 000 ₽ за щит 3×6). Дизайн макета — отдельная услуга.",
  },
  {
    q: "Можно ли поменять макет во время кампании?",
    a: "На digital — да, без доплаты, бесплатно меняем хоть каждый день. На статичных конструкциях — это перемонтаж, стоит как новый монтаж (от 5 000 ₽ за щит 3×6) плюс печать нового баннера.",
  },
];

export default function OutdoorPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[90vh] flex items-center overflow-hidden">
          <Image
            src="/images/outdoor-mix.jpg"
            alt="Наружная реклама в Томске"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900/70 via-orange-900/30 to-transparent" />

          <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-24">
            <div className="max-w-xl flex flex-col gap-6 text-white">
              <span className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
                Наружная реклама
              </span>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-lg">
                Наружная реклама<br />в Томске
              </h1>

              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow">
                726 рекламных сторон на 226 конструкциях, 336 digital.
                Лидер наружной рекламы Томска с 1992 года.
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
              Лидер по охвату наружной рекламы в Томской области.
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
        <div id="map">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CONSTRUCTIONS.map((c) => (
                <article
                  key={c.name}
                  className="flex flex-col p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#F57C28] transition-all"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">
                    {c.name}
                  </h3>
                  <div className="text-[#F57C28] font-bold mb-4">{c.price}</div>
                  <p className="text-slate-600 leading-relaxed flex-1">{c.description}</p>
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
              {ADVANTAGES.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#F57C28]/10 text-[#F57C28] flex items-center justify-center flex-shrink-0">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base mb-1.5 leading-tight">{title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                  </div>
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

        {/* FAQ */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[860px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Часто задаваемые вопросы
            </h2>
            <div className="space-y-3">
              {FAQ.map((item) => (
                <details
                  key={item.q}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer font-semibold text-base list-none hover:bg-slate-50 transition-colors">
                    <span>{item.q}</span>
                    <span className="w-8 h-8 rounded-full bg-[#F57C28]/10 text-[#F57C28] flex-shrink-0 flex items-center justify-center text-lg leading-none group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTAForm accentColor="#F57C28" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
