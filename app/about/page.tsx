import type { Metadata } from "next";
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
import FloatingTG from "@/components/FloatingTG";
import { COMPANY, CLIENTS } from "@/lib/site-data";

const HERO_STATS = [
  { num: "33", label: "года рынку" },
  { num: "6", label: "направлений" },
  { num: "226", label: "конструкций" },
  { num: "1000+", label: "клиентов" },
  { num: "726", label: "рекламных сторон" },
  { num: "50 000", label: "м²/год печати" },
  { num: "27", label: "уникальных LED-экранов" },
  { num: "500+", label: "объектов иллюминации в год" },
];

type HistoryItem = { year: string; text: string; icon?: string; highlight?: boolean };

const HISTORY: HistoryItem[] = [
  { year: "1992", icon: "🚀", highlight: true, text: "Создание рекламной фирмы. Размещение первой коммерческой сети рекламных установок в Томске." },
  { year: "1993", text: "Рождение фирмы «Зонд-реклама». Первый в Томске издательский комплекс на Apple Macintosh. Разработка экспозиции СХК на выставке CEETEX в Лондоне." },
  { year: "1994", icon: "🏅", highlight: true, text: "Лицензия №1 на размещение наружной рекламы в Томске. Генеральный подрядчик мэрии. Оформление 50-летия Томской области." },
  { year: "1995", icon: "🖨️", highlight: true, text: "Установка первого за Уралом оборудования полноцветной широкоформатной печати. Оформление выставки Томской области в Харбине (Китай). Медаль «Сибирской ярмарки»." },
  { year: "1996", text: "Первая крупномасштабная политическая рекламная кампания в Томске — выборы Президента РФ. Экспозиция Томской области в Ганновере (Германия)." },
  { year: "1997", icon: "📜", highlight: true, text: "Первый патент РФ на рекламную установку 3×6 м. Создание Томского отделения Союза дизайнеров России." },
  { year: "1998", text: "Монтаж первых систем «тривижн» в Сибири. Разработка фирменного стиля холдинга «Юниверс» (Москва)." },
  { year: "1999", text: "Разработка концепции архитектурно-художественного оформления города Томска." },
  { year: "2000", text: "Выход газеты «АукционЪ ONLINE». Первая в Томске интернет-версия периодического издания." },
  { year: "2001", text: "Строительство рекламного комплекса в «Губернаторском квартале». Сертификат дилера «тривижн» от «Фавор-Гарант» (Санкт-Петербург)." },
  { year: "2002", text: "Организация «Принт-центра» и креативного отдела. Рекламная кампания «Игра с Крюгером» для ОАО «Томское пиво»." },
  { year: "2003", text: "Конкурс «Детский городок». Строительство рекламного комплекса на пл. Транспортной. Покупка первого в Томске широкоформатного принтера Teckwin (3,2 м)." },
  { year: "2004", icon: "🏆", highlight: true, text: "Оформление Томска к 400-летию. Высшая российская награда в области дизайна — «Виктория». Выход журнала «ТОМСК magazine»." },
  { year: "2005", text: "Внедрение ERP-системы Microsoft Navision. Появление Группы компаний «Зонд-реклама». Разработка фирменного стиля ГК." },
  { year: "2006", icon: "🤝", highlight: true, text: "Сертификат дилера MAXIBIT W.W.AB (Швеция). Экспозиция Томской области на «Интурмаркет» (Москва). 1 место на конкурсе по наружной рекламе на пр. Ленина." },
  { year: "2007", icon: "💡", highlight: true, text: "Установка первого в Томске светодиодного полноцветного видеоэкрана на пл. Новособорной. Открытие Аллеи трудовой славы строителей." },
  { year: "2008", text: "2 место на конкурсе по наружной рекламе на пр. Ленина. Разработка экспозиции для Департамента развития предпринимательства на «ИНТУРМАРКЕТ-2008»." },
  { year: "2009", text: "Внедрение 1С-8. Покупка нового сольвентного принтера-каттера." },
  { year: "2010", text: "Оформление транспортного кольца на пр. Фрунзе. Выпуск изданий «Город ONLINE» и «Здоровье ONLINE»." },
  { year: "2011", text: "Первый в Томске цветной 3D-плоттер Z Corporation ZPrinter 450. Оформление Томска к форуму «Innovus-2011». Покупка УФ-принтера MATAN Barak 3 HS iQ." },
  { year: "2012", icon: "🌟", highlight: true, text: "20-летний юбилей. Компания вошла в топ-100 лучших рекламных агентств России. Открытие магазина светодиодной продукции. 20 новых тривижнов." },
  { year: "2013", text: "Ребрендинг компании. Монтаж новых для Томска суперсайтов 5×15 м. Новые сити-форматы в центре города." },
  { year: "2014", text: "Участие в разработке схемы наружной рекламы в Томске. Победы в конкурсах. Фестиваль «Томск — столица Российского дизайна»." },
  { year: "2015", text: "Расширение парка: Flora LJ-3208P, OKI ES9541, HP DESIGNJET Z5200 PS. Расширение сети рекламоносителей в Северск. Выставки в Шанхае и Москве." },
  { year: "2016", icon: "📺", highlight: true, text: "Установка первых Digital billboards в центре города. Оформление ТПУ к 120-летию. Расширение ассортимента выставочного оборудования." },
  { year: "2017", text: "25-летний юбилей. Расширение сети цифровых билбордов до 10 установок. Покупка нового сольвентного плоттера. Первые рекламные конструкции в Асино." },
  { year: "2018", text: "Расширение сети цифровых билбордов до 14 установок. Покупка принтера Magellan. Производство 17 остановочных комплексов для Томска." },
  { year: "2019", icon: "🎯", highlight: true, text: "Установка первого в Томске цифрового билборда формата 5×15 м. Размещение сети цифровых indoor-пилонов в ТЦ. Производство въездного 19-метрового знака для Томска." },
  { year: "2020", text: "Запуск сервиса «гирлянды-томск.рф». Подготовка микрорайона «Северный парк» к Новому году. Запуск производственного направления «Паспорт фасада»." },
  { year: "2021", icon: "✨", highlight: true, text: "Формирование бренда «Лайтово» — выход на федеральный рынок. Открытие Губернаторского Светленского лицея. Оформление офисов банка «ВТБ». Ребрендинг Межениновской птицефабрики." },
  { year: "2022", icon: "🎉", highlight: true, text: "30-летний юбилей ГК «Зонд-реклама». Переоборудование сети под новый фирстиль. Оформление международной конференции «ГОРОД IT». Ребрендинг ТПУ." },
  { year: "2023", text: "Расширение цифровой сети до 19 разноформатных установок. Первый цифровой билборд в Северске. Брендирование микрорайона «Левобережный life». Новый бортогибочный станок." },
  { year: "2024", icon: "🚀", highlight: true, text: "Замена видеоэкрана на главной площади на цифровой билборд 6×4 м. Переоборудование сети 3×6: экраны 1152×576 px. Новый интерьерный принтер. Оформление «Город IT» и «RoboCup»." },
  { year: "2025", icon: "🏆", highlight: true, text: "Ребрендинг 9 отделений «Сбера» по Томской области. Открытие сквера атомщиков. Оформление к 421-летию Томска. Стела в Парабели. Уникальный двусторонний цифровой 3×6 для ОЭЗ. 7 новых цифровых билбордов. Оформление «Город IT 2025». Брендирование микрорайона «Белозёрский»." },
];

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
    desc: "Установили первый цифровой светодиодный экран на пл. Новособорной в 2007 году",
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
    title: "Собственная сеть в городе",
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
  { year: "1994", title: "Лицензия №1", desc: "Первая лицензия на размещение наружной рекламы в Томске" },
  { year: "1995", title: "Первый полноцвет в Сибири", desc: "Установка первого за Уралом оборудования широкоформатной печати" },
  { year: "1997", title: "Патент РФ на 3×6", desc: "Первый в России патент на рекламную установку 3×6 м" },
  { year: "2004", title: "Премия «Виктория»", desc: "Высшая российская награда в области дизайна" },
  { year: "2006", title: "Дилер MAXIBIT", desc: "Швеция. Премиум выставочное оборудование. Единственные в Сибири" },
  { year: "2007", title: "Первый LED-экран в Томске", desc: "Установка первого полноцветного видеоэкрана на пл. Новособорной" },
  { year: "2012", title: "Топ-100 агентств России", desc: "Вошли в рейтинг лучших рекламных агентств России" },
  { year: "2016", title: "Первые Digital-биллборды", desc: "Первые цифровые рекламные носители в центре Томска" },
  { year: "2021", title: "Бренд Лайтово", desc: "Выход на федеральный рынок новогодней иллюминации" },
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

export const metadata: Metadata = {
  title: "О компании Зонд-Реклама в Томске — 33 года с 1992 года",
  description:
    "О компании Зонд-Реклама в Томске. 33 года истории с 1992 года. Полный цикл рекламы и производства.",
};

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
              Рекламно-производственная компания в Томске с 1992 года.
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
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-brand to-purple-300" />

              {HISTORY.map((item) => (
                <li key={item.year} className="relative pl-10 pb-8 last:pb-0">
                  <span
                    className={`absolute left-2 top-2 rounded-full bg-brand ${
                      item.highlight ? "w-4 h-4 ring-4 ring-brand/20" : "w-3 h-3"
                    }`}
                  />
                  <div
                    className={`font-bold text-brand mb-1 ${
                      item.highlight ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {item.icon && (
                      <span className="mr-2" aria-hidden>
                        {item.icon}
                      </span>
                    )}
                    {item.year}
                  </div>
                  <p
                    className={`text-slate-700 leading-relaxed ${
                      item.highlight ? "text-base font-medium" : "text-sm"
                    }`}
                  >
                    {item.text}
                  </p>
                </li>
              ))}
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
                  className="h-12 flex items-center justify-center text-lg font-extrabold text-gray-500 opacity-70 hover:opacity-100 hover:text-brand transition-all"
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
            <div className="rounded-2xl border border-gray-100 bg-[#f6f5fa] overflow-hidden px-5">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  className="flex justify-between gap-4 py-4 border-b border-slate-100 last:border-b-0"
                >
                  <span className="text-slate-700">{m.role}</span>
                  <span className="font-semibold text-slate-900 text-right">{m.name}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Полный список контактов — на{" "}
              <Link href="/contacts" className="text-brand font-semibold hover:underline">
                странице контактов
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
      className={`p-6 rounded-2xl bg-white border border-gray-100 ${wide ? "md:col-span-2" : ""}`}
    >
      <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
        {label}
      </span>
      {children}
    </div>
  );
}
