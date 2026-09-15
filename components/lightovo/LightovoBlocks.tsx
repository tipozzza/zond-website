import Image from "next/image";
import { SECTIONS, SOLUTIONS, STEPS } from "@/lib/lightovo-catalog";
import CatalogSection from "./CatalogSection";
import CatalogHashOpener from "./CatalogHashOpener";

/**
 * Три блока каталога Лайтово для страницы /led в светлом стиле сайта:
 *  — «Каталог сезона с ценами» — девять раскрывающихся разделов;
 *  — «Готовые решения» — четыре типовых объекта с ценой материалов;
 *  — «Как заказать» — четыре шага и сезонный календарь.
 * Данные только из lib/lightovo-catalog.ts.
 */

export function CatalogWithPrices() {
  return (
    <section id="catalog" className="py-12 md:py-20 bg-white scroll-mt-24">
      <CatalogHashOpener />
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Каталог сезона 2026/2027 с ценами</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Розничные цены за материалы со склада в Томске. Монтаж считаем после замера.
          </p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4" />
        </div>
        <div className="space-y-4">
          {SECTIONS.map((s, i) => (
            <CatalogSection key={s.id} s={s} open={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="py-12 md:py-20 bg-slate-50 scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Сколько стоит оформление типового объекта</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Четыре готовых набора из позиций каталога. Цена — материалы со склада, монтаж отдельно.
          </p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SOLUTIONS.map((s) => (
            <article
              key={s.seg}
              className="bg-white rounded-2xl border border-slate-200 hover:border-[#F4C430] hover:shadow-lg transition-all overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-slate-100">
                <Image
                  src={s.img}
                  alt={`${s.seg}: ${s.title} — новогоднее оформление Лайтово, Томск`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#0B1E3F] text-[#F4C430] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {s.seg}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-3">{s.title}</h3>
                <ul className="space-y-1.5 text-sm text-slate-700 flex-1">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="text-[#F4C430] mt-0.5 shrink-0">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-baseline justify-between gap-3">
                  <span className="text-2xl font-bold text-[#0B1E3F]">{s.price}</span>
                  <span className="text-xs text-slate-500">материалы</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#contact-form"
            className="inline-flex items-center gap-2 bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition shadow-lg"
          >
            Получить расчёт для своего объекта
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function HowToOrder() {
  return (
    <section id="how-to-order" className="py-12 md:py-20 bg-white scroll-mt-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Как заказать</h2>
          <p className="text-lg text-slate-600">От фото объекта до демонтажа после праздников.</p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((st) => (
            <article
              key={st.n}
              className="group bg-white rounded-3xl p-7 relative overflow-hidden border-2 border-slate-200 hover:border-[#F4C430] shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div
                aria-hidden="true"
                className="absolute top-3 right-5 text-6xl font-black text-slate-100 group-hover:text-[#F4C430]/40 transition-colors duration-300 select-none pointer-events-none leading-none"
              >
                {st.n}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 relative z-10 pr-12">{st.t}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10">{st.d}</p>
            </article>
          ))}
        </div>

        <p className="text-center text-slate-600 mt-8">
          Продажа материалов — сентябрь–ноябрь, монтаж — ноябрь–декабрь, демонтаж — январь–февраль.
        </p>
      </div>
    </section>
  );
}
