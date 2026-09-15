import Image from "next/image";
import type { Section } from "@/lib/lightovo-catalog";

/**
 * Один раздел каталога Лайтово на странице /led — раскрывающийся блок в
 * светлом стиле сайта (белые карточки, border-slate-200, акцент #F4C430).
 *
 * Внутри повторяет разворот печатного альбома: заголовок и вводка, большое
 * фото и три маленьких, карточка «Сколько это стоит», карточка «Что выбрать»
 * и таблица «Все варианты со склада». Все тексты и цены — только из
 * lib/lightovo-catalog.ts, здесь ничего не придумываем.
 *
 * <details> вместо JS-аккордеона: содержимое всех разделов лежит в HTML
 * (индексируется), а картинки внутри свёрнутых блоков не грузятся, пока
 * блок закрыт — next/image ставит loading="lazy".
 */
export default function CatalogSection({ s, open = false }: { s: Section; open?: boolean }) {
  return (
    <details
      id={`catalog-${s.id}`}
      open={open}
      className="group scroll-mt-24 bg-white rounded-2xl border border-slate-200 open:border-[#F4C430] open:shadow-lg transition-shadow"
    >
      <summary className="cursor-pointer list-none select-none px-5 md:px-8 py-5 flex items-center gap-4 md:gap-6 hover:bg-slate-50 rounded-2xl [&::-webkit-details-marker]:hidden">
        <span className="text-[#F4C430] font-black text-2xl md:text-3xl tabular-nums leading-none w-9 md:w-12 shrink-0">
          {s.num}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-xl md:text-2xl font-bold text-slate-900 leading-tight">{s.label}</span>
          <span className="hidden sm:block text-sm text-slate-500 mt-0.5 truncate">{s.titleAccent}</span>
        </span>
        <span className="text-right shrink-0">
          <span className="block font-bold text-slate-900 whitespace-nowrap">{s.from}</span>
          <span className="block text-xs text-slate-500 mt-0.5">
            <span className="group-open:hidden">Подробнее ↓</span>
            <span className="hidden group-open:inline">Свернуть ↑</span>
          </span>
        </span>
      </summary>

      <div className="px-5 md:px-8 pb-6 md:pb-8 border-t border-slate-100">
        {/* Заголовок разворота и вводка */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-4 lg:gap-12 items-end pt-6 mb-6">
          <h3 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900">
            {s.title} <span className="text-[#0B1E3F]/70">{s.titleAccent}</span>
          </h3>
          <p className="text-slate-600 leading-relaxed">{s.lead}</p>
        </div>

        {/* Фото слева, расчёт и подсказки справа */}
        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5">
          <div className="grid gap-4 content-start">
            <figure className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
              <Image
                src={s.hero.src}
                alt={s.hero.caption}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-[#0B1E3F]/90 to-transparent text-sm text-white leading-snug">
                {s.hero.caption}
              </figcaption>
            </figure>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {s.photos.map((p) => (
                <figure key={p.src} className="min-w-0">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <Image
                      src={p.src}
                      alt={p.caption}
                      fill
                      sizes="(max-width: 1024px) 33vw, 230px"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="text-xs text-slate-500 leading-snug mt-1.5">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Сколько это стоит */}
            <div className="rounded-2xl border border-[#F4C430]/60 bg-[#F4C430]/10 p-5 md:p-6">
              <div className="text-[#0B1E3F] text-xs font-bold uppercase tracking-wider">Сколько это стоит</div>
              <div className="text-lg font-bold text-slate-900 mt-1 mb-3">{s.calc.title}</div>
              <table className="w-full text-sm">
                <tbody>
                  {s.calc.rows.map((r, i) => {
                    const isSum = i === s.calc.rows.length - 1 && r.how === "";
                    return (
                      <tr key={`${r.what}-${i}`} className="border-t border-[#0B1E3F]/10">
                        <td className={`py-2 pr-2 ${isSum ? "font-bold text-slate-900" : "text-slate-700"}`}>{r.what}</td>
                        <td className="py-2 pr-3 text-right whitespace-nowrap text-slate-500 hidden sm:table-cell">{r.how}</td>
                        <td className={`py-2 text-right whitespace-nowrap font-bold ${isSum ? "text-[#0B1E3F] text-base" : "text-slate-900"}`}>
                          {r.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="text-xs text-slate-500 leading-relaxed mt-3">{s.calc.note}</p>
            </div>

            {/* Что выбрать */}
            <div className="rounded-2xl border border-slate-200 p-5 md:p-6 flex-1 flex flex-col">
              <div className="font-bold text-slate-900 mb-3">Что выбрать</div>
              <ul className="space-y-2.5">
                {s.tips.map((t) => (
                  <li key={t.t} className="relative pl-4 text-sm leading-relaxed text-slate-700">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-[#F4C430]" />
                    <b className="text-slate-900 font-semibold">{t.t}</b> {t.d}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-3 border-t border-slate-100 text-sm font-bold text-[#0B1E3F]">
                Совет: {s.advice}
              </div>
            </div>
          </div>
        </div>

        {/* Все варианты со склада */}
        <div className="mt-6">
          <div className="font-bold text-slate-900 mb-3">
            Все варианты со склада <span className="text-slate-400 font-medium">· {s.variants.length}</span>
          </div>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3 font-semibold">Вариант</th>
                  <th className="py-2.5 px-3 font-semibold">Артикул</th>
                  <th className="py-2.5 px-3 font-semibold">Характеристики</th>
                  <th className="py-2.5 px-3 text-right font-semibold whitespace-nowrap">Цена</th>
                </tr>
              </thead>
              <tbody>
                {s.variants.map((v) => (
                  <tr key={v.name} className="border-t border-slate-200 align-top">
                    <td className="py-3 px-3">
                      <div className="font-semibold text-slate-900">{v.name}</div>
                      {v.note && <div className="text-xs text-slate-500 mt-0.5">{v.note}</div>}
                      {v.stock && (
                        <span
                          className={`inline-block mt-1.5 text-[11px] rounded-full border px-2 py-0.5 ${
                            v.stock === "под заказ"
                              ? "border-slate-300 text-slate-500"
                              : "border-[#F4C430] bg-[#F4C430]/15 text-[#0B1E3F]"
                          }`}
                        >
                          {v.stock}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-xs pt-3.5">{v.art || "—"}</td>
                    <td className="py-3 px-3 text-slate-700 text-xs pt-3.5 leading-relaxed">{v.spec}</td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <div className="font-bold text-slate-900">{v.price}</div>
                      <div className="text-xs text-slate-500">за {v.unit}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Цены за материалы, без шнуров подключения и монтажа. Наличие по цветам меняется каждую неделю сезона —
            уточняйте по телефону.
          </p>
        </div>
      </div>
    </details>
  );
}
