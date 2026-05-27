import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Settings, Zap, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import ProductionCalculator from "@/components/ProductionCalculator";
import Breadcrumb from "@/components/Breadcrumb";
import ServiceSchema from "@/components/ServiceSchema";
import FAQ from "@/components/FAQ";
import PublicPortfolio from "@/components/PublicPortfolio";
import { HERO_BLURS } from "@/lib/hero-blurs";

const CATEGORIES: {
  img: string;
  title: string;
  priceBadge: string;
  secondBadge: string;
  subtitle: string;
  description: string;
  customQuote?: boolean;
}[] = [
  {
    img: "/images/production/tablichki.jpg",
    title: "Таблички",
    priceBadge: "ОТ 95 ₽/ШТ",
    secondBadge: "ТИРАЖ ОТ 10 ШТ",
    subtitle: "Офисы · Кабинеты · Навигация",
    description:
      "Шильдики на двери, информационные плашки, навигация по зданию. Печать или гравировка по ПВХ, оргстеклу, композиту, металлу.",
  },
  {
    img: "/images/production/flat-signs.jpg",
    title: "Плоские вывески",
    priceBadge: "ОТ 1 240 ₽/м²",
    secondBadge: "БЕЗ ПОДСВЕТКИ",
    subtitle: "Бюджетный фасад · Магазины · Кафе",
    description:
      "Композит, ПВХ или оргстекло с печатью или плёночной аппликацией. Самый быстрый и недорогой способ оформить фасад.",
  },
  {
    img: "/images/production/lightbox.jpg",
    title: "Световые короба",
    priceBadge: "ОТ 10 500 ₽/м²",
    secondBadge: "ГАРАНТИЯ 3-5 ЛЕТ",
    subtitle: "Брендирование · Двусторонние · Видны издалека",
    description:
      "Объёмные конструкции с внутренней LED-подсветкой. Светятся 24/7. Алюминиевый профиль, фасонная форма по эскизу.",
  },
  {
    img: "/images/production/pseudo-letters.jpg",
    title: "Псевдообъёмные буквы",
    priceBadge: "ОТ 16 ₽/СМ ВЫСОТЫ",
    secondBadge: "БЮДЖЕТНО",
    subtitle: "Интерьер · Reception · Кабинеты",
    description:
      "Плоские буквы из ПВХ или оргстекла с эффектом объёма за счёт дистанционных держателей. Лёгкий и недорогой вариант.",
  },
  {
    img: "/images/production/volumetric-letters.jpg",
    title: "Объёмные буквы",
    priceBadge: "ОТ 65 ₽ БЕЗ ПОДСВЕТКИ",
    secondBadge: "С ПОДСВЕТКОЙ ОТ 105 ₽",
    subtitle: "Фасад · ТЦ · Премиум-сегмент",
    // TODO: уточнить формулировку у производства (от 26.05.2026) —
    // «цельная конструкция с боковым каркасом» точно ли описывает наши
    // объёмные буквы или нужна другая инженерная характеристика.
    description:
      "Цельная конструкция с боковым каркасом. От монолитных без подсветки до букв с открытыми диодами и контражурным свечением.",
  },
  {
    // TODO: текущее фото возможно показывает LED-буквы — Дмитрий пришлёт правильное
    // фото фасада с пайетками; до этого момента fallback на sequin-letters.jpg.
    img: "/images/production/sequin-letters.jpg",
    title: "Буквы-пайетки",
    priceBadge: "ОТ 13 540 ₽/м²",
    secondBadge: "ЖИВАЯ ВЫВЕСКА · БЕЗ ЭЛЕКТРОНИКИ",
    subtitle: "Фасады · витрины · праздничное оформление",
    description:
      "Декоративные блестящие диски на подвижном основании создают эффект мерцания и переливов от движения воздуха. Используются для оформления фасадов, витрин, праздничных конструкций. Без электроники.",
    // Калькулятор пайеток не предусмотрен (расчёт индивидуальный) — кнопка
    // ведёт на форму заявки с предзаполненным контекстом.
    customQuote: true,
  },
];

const STEPS = [
  { num: 1, title: "Бриф", text: "Заполняете калькулятор или звоните — обсуждаем задачу." },
  { num: 2, title: "Замер", text: "Выезд специалиста. По Томску — бесплатно." },
  { num: 3, title: "Проект", text: "Рендер и согласование макета." },
  { num: 4, title: "Договор", text: "Подписываем договор и принимаем предоплату." },
  { num: 5, title: "Производство", text: "От 3 до 21 дня в зависимости от изделия." },
  { num: 6, title: "Монтаж", text: "Монтаж и сдача объекта с фотоотчётом." },
];

const MATERIALS = [
  { name: "ПВХ", thickness: "3–10 мм", use: "Таблички, плоские вывески, основы под аппликацию" },
  { name: "Оргстекло (акрил)", thickness: "3–10 мм", use: "Лица световых коробов, прозрачные таблички" },
  { name: "ПЭТ", thickness: "1–5 мм", use: "Защитные стёкла, лёгкие конструкции" },
  { name: "АКП (композит)", thickness: "3 мм", use: "Крупноформатные фасадные вывески, кассеты" },
  { name: "Сотовый поликарбонат", thickness: "5–10 мм", use: "Плоские вывески, объёмные конструкции" },
  { name: "Монолитный поликарбонат", thickness: "3–10 мм", use: "Прочные прозрачные поверхности" },
];

const EQUIPMENT: { icon: LucideIcon; name: string; desc: string }[] = [
  {
    icon: Settings,
    name: "ЧПУ-фрезер",
    desc: "Фрезеровка ПВХ, композита, оргстекла. Любые контуры и буквы.",
  },
  {
    icon: Zap,
    name: "Лазерный станок",
    desc: "Точная резка металлических заготовок и тонких пластиков.",
  },
  {
    icon: Wrench,
    name: "Металлообработка",
    desc: "Сварка, гибка, покраска. Каркасы коробов и металлоконструкций.",
  },
];

export const metadata: Metadata = {
  title: "Изготовление вывесок в Томске под ключ — от 1 дня | Зонд",
  description:
    "Световые и неоновые вывески, лайтбоксы, объёмные буквы, таблички в Томске. Изготовление от 1 дня, монтаж под ключ, гарантия 12 месяцев. Бесплатный замер. От 95 ₽.",
  keywords: [
    "изготовление вывесок Томск",
    "вывески Томск",
    "световые вывески",
    "неоновая вывеска Томск",
    "заказать вывеску",
    "лайтбокс Томск",
  ],
  openGraph: {
    images: [
      {
        url: "/api/og?title=Вывески и световые конструкции под ключ&subtitle=Согласование, производство, монтаж в Томске&category=Производство",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function ProductionPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <ServiceSchema
        serviceType="Производство наружной рекламы"
        name="Изготовление вывесок и конструкций в Томске"
        description="Объёмные буквы, лайтбоксы, световые короба, штендеры, таблички. Собственный цех с ЧПУ."
        lowPrice={95}
        priceRange="95-50 000 ₽"
      />
      <main>
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Производство", url: "/production" },
          ]}
        />
        {/* Hero */}
        <section className="relative min-h-[70vh] bg-gradient-to-br from-green-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/production-workshop.jpg"
              alt="Изготовление вывесок в Томске под ключ"
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={HERO_BLURS.production}
              className="object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10">
            <div className="max-w-2xl text-white">
              <div className="inline-block bg-[#7CB342] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                СОБСТВЕННОЕ ПРОИЗВОДСТВО С 1992 ГОДА
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                Изготовление вывесок в Томске под ключ
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Световые, неоновые, объёмные. От 1 дня. Гарантия 12 месяцев. Бесплатный замер.
              </p>
              <div className="flex gap-4 flex-wrap">
                <a
                  href="#calculator"
                  className="bg-[#7CB342] hover:bg-[#689F38] text-white px-8 py-4 rounded-xl font-bold transition-colors"
                >
                  Рассчитать стоимость
                </a>
                <a
                  href="#works"
                  className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                >
                  Наши работы
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Предупреждение о законе 2026 */}
        <section className="bg-red-50 border-y border-red-200 py-6">
          <div className="container mx-auto px-4 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-red-900 mb-1">
                ⚠ С 1 марта 2026 запрещены англоязычные вывески
              </h3>
              <p className="text-red-700 text-sm">
                Штрафы до 500 000 ₽. Поможем заменить или дополнить переводом — от 1 дня.
              </p>
            </div>
            <a
              href="/russifikaciya"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold whitespace-nowrap"
            >
              Подробнее →
            </a>
          </div>
        </section>

        {/* Что мы производим */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Что мы производим
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              6 направлений с реальными ценами. Кликайте на карточку — откроется калькулятор.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CATEGORIES.map((c) => (
                <a
                  key={c.title}
                  href={c.customQuote ? "#contact-form" : "#calculator"}
                  className="group block rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-[#7CB342] hover:shadow-2xl hover:shadow-[#7CB342]/20 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <Image
                      src={c.img}
                      alt={c.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#7CB342]">
                      {c.priceBadge}
                    </div>
                    <div className="absolute top-4 right-4 bg-[#7CB342] text-white px-3 py-1 rounded-full text-xs font-bold">
                      {c.secondBadge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">{c.title}</h3>
                    <p className="text-sm text-[#7CB342] font-semibold mb-3">{c.subtitle}</p>
                    <p className="text-slate-600 mb-4 leading-relaxed">{c.description}</p>
                    <div className="flex items-center text-[#7CB342] font-semibold">
                      <span>{c.customQuote ? "Индивидуальный расчёт — оставить заявку" : "Рассчитать стоимость"}</span>
                      <ArrowRight
                        size={18}
                        className="ml-1 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <ProductionCalculator />

        {/* Этапы работы */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Как мы работаем</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              6 шагов от первого звонка до сдачи объекта с фотоотчётом.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {STEPS.map((s) => (
                <div key={s.num} className="flex gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-[#7CB342] text-white flex items-center justify-center text-xl font-bold">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1 leading-tight">{s.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Портфолио */}

        {/* Материалы */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Материалы
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              6 базовых материалов, из которых делаем основу любого изделия.
            </p>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm max-w-4xl mx-auto">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Материал</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Толщина</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Применение</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MATERIALS.map((m) => (
                      <tr key={m.name} className="border-t border-slate-100 hover:bg-[#7CB342]/5">
                        <td className="px-4 py-3 font-semibold text-slate-900">{m.name}</td>
                        <td className="px-4 py-3 text-slate-600">{m.thickness}</td>
                        <td className="px-4 py-3 text-slate-600">{m.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Оборудование */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Оборудование цеха</h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              Полный цикл «от макета до металла» — без передачи на сторону.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {EQUIPMENT.map(({ icon: Icon, name, desc }) => (
                <div
                  key={name}
                  className="bg-white rounded-2xl border border-slate-200 p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#7CB342]/10 flex items-center justify-center mb-4">
                    <Icon size={26} className="text-[#7CB342]" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 leading-tight">{name}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Согласование рекламы — компактный блок со ссылкой на /pasport-fasada */}
        <section id="approval" className="py-12 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Согласование вывесок и паспорт фасада
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Берём на себя сбор документов, переговоры с Комитетом архитектуры Томска
              и получение разрешения. Полный цикл — за 3-4 недели.
            </p>
            <Link
              href="/pasport-fasada"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white font-medium rounded-lg hover:opacity-90 transition"
            >
              Подробнее о паспорте фасада →
            </Link>
          </div>
        </section>

        {/* Почему мы — УТП */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Почему заказывают вывески у нас
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🏆</div>
                <h3 className="font-bold text-lg mb-2">{new Date().getFullYear() - 1992} лет в Томске</h3>
                <p className="text-slate-600">Знаем что согласовать, как смонтировать, где есть подводные камни</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-lg mb-2">От 1 дня</h3>
                <p className="text-slate-600">Таблички и срочные заказы — за 1 рабочий день</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">📏</div>
                <h3 className="font-bold text-lg mb-2">Бесплатный замер</h3>
                <p className="text-slate-600">Выезд по Томску — бесплатно. Точные размеры и фото</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🛡️</div>
                <h3 className="font-bold text-lg mb-2">Гарантия 12 месяцев</h3>
                <p className="text-slate-600">На конструкцию и LED-подсветку. Бесплатное обслуживание</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">🏭</div>
                <h3 className="font-bold text-lg mb-2">Собственный цех</h3>
                <p className="text-slate-600">ЧПУ-фрезер, лазер, металлообработка. Без посредников</p>
              </div>
              <div className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-bold text-lg mb-2">Согласование под ключ</h3>
                <p className="text-slate-600">Берём бумажную работу на себя — Паспорт фасада, согласование с администрацией</p>
              </div>
            </div>
          </div>
        </section>

        <FAQ
          title="Частые вопросы"
          items={[
            { question: "Сколько стоит вывеска с объёмными буквами в Томске?", answer: "От 25 000 руб за вывеску длиной 2 м с буквами высотой 30 см (акрил со светодиодной подсветкой). Световые буквы с лицевой подсветкой — от 5 000 руб за букву высотой 50 см. Точная смета — по эскизу или фото фасада." },
            { question: "Помогаете ли с согласованием вывески в администрации Томска?", answer: "Да, полное сопровождение: паспорт вывески, согласование в Комитете архитектуры и градостроительства, замеры на месте. Это занимает 3-4 недели от подачи до получения разрешения." },
            { question: "Какой срок изготовления вывески под ключ?", answer: "Стандартный — 7-10 рабочих дней с момента утверждения макета. Сложные конструкции (3D-буквы с внутренней подсветкой, нестандартные материалы) — до 15 дней. Монтаж — отдельный день." },
            { question: "Какая гарантия на вывеску и лайтбокс?", answer: "Гарантия 2 года на материалы (акрил, металл, профиль) и 1 год на электронику (драйверы, светодиоды). Сервисное обслуживание после гарантии — по фиксированным тарифам, выезд по Томску — 1 500 руб." },
            { question: "Делаете ли объёмные буквы любой высоты?", answer: "Изготавливаем буквы от 5 см до 3 метров высотой. Максимальная единичная буква — 3 м (для крышных установок и фасадов). Технология производства — цельноклееные с ПВХ-бортом (стандарт) или с алюминиевым бортом (премиум для мелкого шрифта и долговечности)." },
            { question: "Из каких материалов делаете вывески?", answer: "Основные: акрил (молочный для подсветки, цветной без подсветки), пластик ПВХ, металл (нержавейка, алюминий, оцинковка), композитные панели. Подсветка — LED-модули или светодиодные ленты в зависимости от задачи." },
          ]}
        />

        <PublicPortfolio category="production" />

        <CTAForm accentColor="#7CB342" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
