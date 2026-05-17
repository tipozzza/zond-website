import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import { COMPANY, CLIENTS, SERVICES } from "@/lib/site-data";

const HERO_STATS = [
  { num: "33", label: "года на рынке" },
  { num: "6", label: "направлений" },
  { num: "244", label: "рекламных конструкции" },
  { num: "1000+", label: "клиентов" },
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
  { year: "2026", text: "244 конструкции, 336 digital-экранов, единственная цифровая сеть города." },
];

const DOT_COLORS = [
  "bg-section-outdoor",
  "bg-section-print",
  "bg-section-production",
  "bg-section-exhibition",
  "bg-section-design",
  "bg-section-led",
];

const SECTION_BG: Record<string, string> = {
  outdoor: "bg-section-outdoor",
  print: "bg-section-print",
  production: "bg-section-production",
  exhibition: "bg-section-exhibition",
  design: "bg-section-design",
  led: "bg-section-led",
};

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
              «Мы применяем 30+ лет опыта и новейшие технологии для развития бизнес-среды и городского пространства Томска.»
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
              <div className="absolute left-[15px] md:left-[19px] top-3 bottom-3 w-0.5 bg-gray-200" />

              {HISTORY.map((item, i) => (
                <li key={item.year} className="relative pl-12 md:pl-16 pb-10 last:pb-0">
                  <span
                    className={`absolute left-0 top-1.5 w-8 h-8 md:w-10 md:h-10 rounded-full ${DOT_COLORS[i % DOT_COLORS.length]} ring-4 ring-[#f6f5fa] shadow-md`}
                  />
                  <div className="text-2xl md:text-3xl font-extrabold leading-none mb-2">
                    {item.year}
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {item.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 6 направлений */}
        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Шесть направлений деятельности
            </h2>
            <p className="text-base text-gray-500 mb-12 max-w-[720px]">
              Полный производственный цикл — от макета до монтажа и размещения.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  className="group flex flex-col p-6 rounded-2xl border border-gray-100 bg-[#f6f5fa] hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${SECTION_BG[s.color] ?? "bg-brand"} text-white flex items-center justify-center text-xl flex-shrink-0`}
                    >
                      {s.icon}
                    </div>
                    <h3 className="font-bold text-base leading-tight">{s.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-4">
                    {s.description}
                  </p>
                  <span className="text-sm font-semibold text-brand group-hover:underline">
                    Подробнее →
                  </span>
                </Link>
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
