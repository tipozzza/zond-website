import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Settings, Zap, Scissors, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import ProductionCalculator from "@/components/ProductionCalculator";
import PortfolioGallery from "@/components/PortfolioGallery";

const CATEGORIES: {
  img: string;
  title: string;
  priceBadge: string;
  secondBadge: string;
  subtitle: string;
  description: string;
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
    description:
      "Цельная конструкция с боковым каркасом. От монолитных без подсветки до букв с открытыми диодами и контражурным свечением.",
  },
  {
    img: "/images/production/sequin-letters.jpg",
    title: "Буквы-пайетки",
    priceBadge: "ОТ 13 540 ₽/м²",
    secondBadge: "ЖИВАЯ ВЫВЕСКА",
    subtitle: "Динамика · ТРЦ · Особое внимание",
    description:
      "Сотни вращающихся диодов создают динамическое изображение. Реагирует на ветер, привлекает максимум внимания.",
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
    icon: Scissors,
    name: "Плоттер ZEONCUT FB-6090",
    desc: "Резка плёнки и бумаги: контурная, по форме, для аппликации.",
  },
  {
    icon: Wrench,
    name: "Металлообработка",
    desc: "Сварка, гибка, покраска. Каркасы коробов и металлоконструкций.",
  },
];

export const metadata: Metadata = {
  title: "Производство наружной рекламы и вывесок в Томске — Зонд-Реклама",
  description:
    "Производство наружной рекламы и вывесок в Томске с 1992 года. Объёмные буквы, лайтбоксы, штендеры. Свой цех с ЧПУ и лазером.",
};

export default function ProductionPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[70vh] bg-gradient-to-br from-green-900 to-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/production-workshop.jpg"
              alt="Цех производства вывесок"
              fill
              priority
              sizes="100vw"
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
                Производство вывесок и конструкций
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                Объёмные буквы, лайтбоксы, плоские вывески, таблички. Все этапы у нас:
                проектирование → ЧПУ-фрезеровка → сборка → монтаж.
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
                  href="#calculator"
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
                      <span>Рассчитать стоимость</span>
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
        <PortfolioGallery />

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

        {/* Согласование рекламы */}
        <section id="approval" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Согласование рекламы</h2>
            <p className="text-slate-700 mb-4">
              Размещение наружной рекламы в Томске требует согласования с администрацией города.
              Готовим полный пакет документов:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2"><span className="text-brand">✓</span> Паспорт фасада здания</li>
              <li className="flex gap-2"><span className="text-brand">✓</span> Паспорт рекламного места</li>
              <li className="flex gap-2"><span className="text-brand">✓</span> Паспорт рекламной конструкции</li>
              <li className="flex gap-2"><span className="text-brand">✓</span> Согласование с городской администрацией</li>
            </ul>
            <a
              href="#contact-form"
              className="inline-block bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Получить расчёт
            </a>
          </div>
        </section>

        <CTAForm accentColor="#7CB342" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
