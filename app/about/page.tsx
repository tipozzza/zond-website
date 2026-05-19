import Link from "next/link";
import {
  Trophy,
  Award,
  Zap,
  History as HistoryIcon,
  Building2,
  Map as MapIcon,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import { COMPANY, CLIENTS } from "@/lib/site-data";

const HERO_STATS = [
  { num: "33", label: "года рынку" },
  { num: "6", label: "направлений" },
  { num: "226", label: "конструкций" },
  { num: "1000+", label: "клиентов" },
  { num: "726", label: "рекламных сторон" },
  { num: "500 000", label: "м²/год печати" },
  { num: "27", label: "уникальных LED-экранов" },
  { num: "500+", label: "объектов иллюминации в год" },
];

const HISTORY = [
  { year: "1992", text: "Основание компании. Учреждено ТОО «РА ВАЛС лтл». Первая сеть рекламных установок в Томске." },
  { year: "1993", text: "Учреждено ТОО «Зонд-Реклама». Первые фотопривязки рекламы. Партнёрство с МНПО «ЗОНД» (Россия-Болгария)." },
  { year: "1995", text: "Первый полноцветный билборд 3×6, напечатанный в Томске." },
  { year: "1996", text: "Президентская рекламная кампания." },
  { year: "1997", text: "Запуск собственного производства рекламных конструкций." },
  { year: "1998", text: "Первые сити-форматы в Томске." },
  { year: "2000", text: "Запуск проекта «Аукцион Online»." },
  { year: "2004", text: "Концепция оформления Томска к 400-летию города. Высшая награда СД России. Рекламный комплекс к юбилею." },
  { year: "2005", text: "Новый фирменный стиль." },
  { year: "2007", text: "Первый светодиодный экран в Томске." },
  { year: "2011", text: "Внедрение УФ-печати и 3D-печати на территории Томска. Ребрендинг газеты." },
  { year: "2012", text: "Установка первых бегущих строк в Сибири. Первые контракты с китайскими заводами на поставку оборудования. Открытие магазина светодиодной продукции." },
  { year: "2013", text: "20 лет компании. Установка крупноформатных конструкций 5×15 в Томске. Светодиодный экран для стадиона «Янтарь» в Северске." },
  { year: "2014", text: "Участие в разработке схемы наружной рекламы в Томске." },
  { year: "2015", text: "Расширение сети в Северске. Участие в выставках рекламных технологий в Шанхае и Москве." },
  { year: "2016", text: "Первый Digital-биллборд в Томске. Оформление ТПУ к 120-летию. Новогоднее оформление Новособорной площади." },
  { year: "2017", text: "Ребрендинг торговой сети «Холидей». Установка 30 остановочных павильонов. Первая Digital-сеть в Томске. Развитие Digital-INDOOR." },
  { year: "2018", text: "Первый крупноформатный Digital 5×15." },
  { year: "2026", text: "226 конструкций, 336 digital-сторон, единственная цифровая сеть города." },
];

const DOT_COLORS = [
  "bg-section-outdoor",
  "bg-section-print",
  "bg-section-production",
  "bg-section-exhibition",
  "bg-section-design",
  "bg-section-led",
];

const KEY_YEARS = new Set(["1992", "1995", "2007", "2018", "2026"]);
const YEAR_EMOJI: Record<string, string> = {
  "1992": "🚀",
  "1995": "🖨️",
  "2007": "💡",
  "2018": "📺",
  "2026": "🏆",
};

const WHY_ZOND = [
  {
    icon: Trophy,
    title: "Единственные в Сибири",
    desc: "Авторизованный дилер MAXIBIT (Швеция) с 2006 года — премиум выставочное оборудование",
  },
  {
    icon: Award,
    title: "Бренд Лайтово с 2008",
    desc: "1000+ позиций новогодней иллюминации, более 500 объектов в год по всей России",
  },
  {
    icon: Zap,
    title: "Первый LED в Томске",
    desc: "Установили первый цифровой светодиодный экран на пл. Новособорной в 2006 году",
  },
  {
    icon: HistoryIcon,
    title: "33 года в одной нише",
    desc: "Не меняли профиль с 1992 — это и есть глубина экспертизы",
  },
  {
    icon: Building2,
    title: "Полный цикл под ключ",
    desc: "Дизайн → производство → монтаж → демонтаж → хранение. Ни одного посредника",
  },
  {
    icon: MapIcon,
    title: "Крупнейшая сеть города",
    desc: "226 собственных конструкций, 726 рекламных сторон, 27 цифровых экранов в Томске",
  },
  {
    icon: Sparkles,
    title: "Уникальная техника",
    desc: "OKI ES9541 с белилами и лаком — единственный такой принтер в Томске",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия 12 месяцев",
    desc: "На все производственные конструкции. Бесплатное обслуживание в гарантийный период",
  },
];

const ACHIEVEMENTS = [
  { year: "1995", title: "Первый полноцвет 3×6", desc: "В Томске. На сольвентном принтере." },
  { year: "2006", title: "Первый LED-экран", desc: "Установили на пл. Новособорной — первый в городе." },
  { year: "2006", title: "Дилер MAXIBIT", desc: "Швеция. Премиум выставочное оборудование. Единственные в Сибири." },
  { year: "2008", title: "Создан бренд Лайтово", desc: "Полный цикл новогодней иллюминации городов и фасадов." },
  { year: "2011", title: "Первая УФ-печать в Сибири", desc: "Принтер Matan Barak — печать прямо на жёстких материалах." },
  { year: "2018", title: "Первая сеть Digital в Томске", desc: "Запуск собственной сети цифровых экранов 3×6." },
  { year: "2024", title: "OKI ES9541 с белилами и лаком", desc: "Единственный такой принтер в Томске." },
  { year: "2025", title: "Партнёр Город IT и RoboCup", desc: "Крупнейшие IT-события региона." },
];

const TEAM = [
  { role: "Исполнительный директор", name: "Любимов А.В." },
  { role: "Начальник Деп. производства", name: "Алешин Е.Н." },
  { role: "Начальник РЭС", name: "Просников И.А." },
  { role: "Главный бухгалтер", name: "Рабцевич О.М." },
  { role: "РОП", name: "Шалагина Н.Н." },
];

const GROUP_COMPANIES = [
  "ООО Формат Сити",
  "ИП Паршуто Д.Е.",
  "ООО ДиджиталСити (Северск)",
];

export default function AboutPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="hero-bg text-white pt-[70px] pb-20 relative overflow-hidden">
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider mb-7">
              О компании
            </span>

            <h1 className="text-[clamp(38px,5.5vw,64px)] leading-[1.05] font-extrabold tracking-tight mb-7">
              ГК{" "}
              <span className="bg-gradient-to-r from-accent-yellow via-accent-pink to-section-design bg-clip-text text-transparent">
                Зонд-Реклама
              </span>
            </h1>

            <p className="text-lg text-white/85 mb-12 max-w-[720px] font-light leading-relaxed">
              Лидер рекламно-производственной отрасли в Томске с 1992 года.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-9 border-t border-white/10">
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-accent-yellow to-accent-pink bg-clip-text text-transparent leading-none mb-2 tracking-tight">
                    {s.num}
                  </div>
                  <div className="text-xs text-white/85 uppercase tracking-wider font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Миссия */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-brand mb-4">
              Миссия
            </span>
            <blockquote className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight max-w-[900px]">
              «Мы применяем 33 года опыта и новейшие технологии для развития бизнес-среды и городского пространства Томска.»
            </blockquote>
            <div className="text-sm text-gray-500 mt-6">
              Из брендплатформы компании, 2016
            </div>
          </div>
        </section>

        {/* История — vertical timeline */}
        <section className="py-20 bg-[#f6f5fa]">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Наша история
            </h2>
            <p className="text-base text-gray-500 mb-14">
              Ключевые вехи компании с 1992 года.
            </p>

            <ol className="relative">
              <div className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-brand to-purple-300" />

              {HISTORY.map((item, i) => {
                const emoji = YEAR_EMOJI[item.year];
                const isKey = KEY_YEARS.has(item.year);
                return (
                  <li key={item.year} className="relative pl-12 md:pl-16 pb-10 last:pb-0">
                    <span
                      className={`absolute left-0 top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full ${DOT_COLORS[i % DOT_COLORS.length]} ring-4 ring-[#f6f5fa] shadow-md`}
                    />
                    <div className="text-2xl md:text-3xl font-extrabold leading-none mb-2">
                      {emoji && (
                        <span className="mr-2" aria-hidden>
                          {emoji}
                        </span>
                      )}
                      {item.year}
                    </div>
                    <p
                      className={`text-base leading-relaxed ${
                        isKey ? "font-semibold text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {item.text}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Миссия и ценности */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <div className="inline-block bg-brand text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                НАШИ ЦЕННОСТИ
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Во что мы верим</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                ZOND начинался как маленькая рекламная мастерская в Томске 1992 года. За 33 года вырос в группу компаний, но три принципа остались неизменными.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3">Делаем сами</h3>
                <p className="text-slate-600 leading-relaxed">
                  Никаких посредников. Свой цех печати, свой цех металла, свои монтажники, свои дизайнеры. Это значит контроль качества и адекватные цены без накруток.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-xl font-bold mb-3">Без задержек</h3>
                <p className="text-slate-600 leading-relaxed">
                  Стандартный баннер 6×3 — 10 минут на печать. Размещение на конструкции — от 3 дней. Готовая вывеска — от 5 дней. Срочность — это наш формат работы.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-4">🏠</div>
                <h3 className="text-xl font-bold mb-3">Знаем Томск</h3>
                <p className="text-slate-600 leading-relaxed">
                  Где какой трафик, какая аудитория ходит мимо какого ТЦ, что работает на Иркутском тракте и что — на Кировке. Это знание не купишь — его нарабатывают десятилетиями.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Почему ZOND */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-3">Почему именно ZOND</h2>
              <p className="text-lg text-slate-600 max-w-[720px] mx-auto">
                Восемь причин, по которым клиенты выбирают нас уже 33 года.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {WHY_ZOND.map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Достижения */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Достижения</h2>
              <p className="text-lg text-slate-600">Ключевые вехи 33-летнего пути</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {ACHIEVEMENTS.map((item, i) => (
                <div
                  key={`${item.year}-${i}`}
                  className="bg-gradient-to-br from-brand/5 to-purple-50 rounded-2xl p-6 border border-brand/10 hover:shadow-lg transition"
                >
                  <div className="text-3xl font-bold text-brand mb-2">{item.year}</div>
                  <div className="font-bold mb-1">{item.title}</div>
                  <div className="text-sm text-slate-600">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Клиенты */}
        <section className="py-20 bg-[#f6f5fa]">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Наши клиенты
            </h2>
            <p className="text-base text-gray-500 mb-12">
              Более 1000 компаний выбрали нас за 33 года работы.
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
              {CLIENTS.map((c) => (
                <div
                  key={c}
                  className="h-12 flex items-center justify-center text-lg font-extrabold text-gray-400 opacity-60 hover:opacity-100 hover:text-brand transition-all"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Команда */}
        <section className="py-20 bg-white">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
              Руководящий состав
            </h2>
            <ul className="divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-[#f6f5fa] overflow-hidden">
              {TEAM.map((m) => (
                <li
                  key={m.name}
                  className="flex flex-wrap items-baseline justify-between gap-4 p-5"
                >
                  <span className="text-sm text-gray-500">{m.role}</span>
                  <span className="font-bold text-base">{m.name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-gray-500">
              Полный список контактов — на странице{" "}
              <Link href="/contacts" className="text-brand font-semibold hover:underline">
                /contacts
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Юридическая информация */}
        <section className="py-20 bg-[#f6f5fa]">
          <div className="max-w-[1000px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
              Юридическая информация
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <LegalCard label="Юр. лицо">
                <strong className="block text-base">{COMPANY.legalName}</strong>
                <span className="block text-sm text-gray-500 mt-1">ИНН {COMPANY.inn}</span>
              </LegalCard>
              <LegalCard label="Адрес">
                <span className="text-base">{COMPANY.address}</span>
              </LegalCard>
              <LegalCard label="Группа компаний" wide>
                <ul className="space-y-1.5 text-base">
                  {GROUP_COMPANIES.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </LegalCard>
            </div>
          </div>
        </section>

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
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
      className={`p-6 rounded-2xl bg-white border border-gray-100 ${wide ? "md:col-span-2" : ""}`}
    >
      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
        {label}
      </span>
      {children}
    </div>
  );
}
