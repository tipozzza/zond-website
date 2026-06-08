"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDecimalInput, useIntegerInput } from "@/lib/numeric-input";

type Size = { id: string; label: string; minHeight?: number };
type PricedItem = { id: string; name: string; desc?: string; prices: (number | null)[]; warrantyYears?: number };
type GraphicsType = { id: string; label: string };
type PseudoLetterMaterial = { id: string; label: string };
type PseudoLetterEntry = { id: string; name: string; desc?: string; prices: Record<string, number> };

type PriceData = {
  currency: string;
  startingPrices: Record<string, number>;
  tablichki: { title: string; minQty: number; sizes: Size[]; materials: PricedItem[]; tirageNote?: string };
  flatSigns: { title: string; graphicsTypes: GraphicsType[]; materials: PricedItem[] };
  lightBoxes: { title: string; faceTypes: GraphicsType[]; structures: PricedItem[] };
  pseudoLetters: { title: string; materialsAndPrices: PseudoLetterEntry[]; materials: PseudoLetterMaterial[] };
  volumetricLetters: { title: string; sizes: Size[]; types: PricedItem[] };
};

type Category = "tablichki" | "flatSigns" | "lightBoxes" | "pseudoLetters" | "volumetricLetters";

type BreakdownItem = { label: string; value: number };

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tablichki", label: "Таблички" },
  { id: "flatSigns", label: "Плоские вывески" },
  { id: "lightBoxes", label: "Световые короба" },
  { id: "pseudoLetters", label: "Псевдобуквы" },
  { id: "volumetricLetters", label: "Объёмные буквы" },
];

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export default function ProductionCalculator() {
  const [data, setData] = useState<PriceData | null>(null);
  const [cat, setCat] = useState<Category>("volumetricLetters");

  // Таблички
  const [tMaterial, setTMaterial] = useState("");
  const [tSizeIdx, setTSizeIdx] = useState(0);
  const { value: tQty, props: tQtyProps } = useIntegerInput(10, 1);

  // Плоские вывески
  const [fMaterial, setFMaterial] = useState("");
  const [fGraphics, setFGraphics] = useState(0);
  const { value: fWidth, props: fWidthProps } = useDecimalInput(2, 0.1);
  const { value: fHeight, props: fHeightProps } = useDecimalInput(1, 0.1);

  // Световые короба
  const [lbStructure, setLbStructure] = useState("");
  const [lbFace, setLbFace] = useState(0);
  const { value: lbWidth, props: lbWidthProps } = useDecimalInput(2, 0.1);
  const { value: lbHeight, props: lbHeightProps } = useDecimalInput(1, 0.1);

  // Псевдобуквы
  const [pType, setPType] = useState("");
  const [pMaterial, setPMaterial] = useState("");
  const { value: pCount, props: pCountProps } = useIntegerInput(5, 1);
  const { value: pHeight, props: pHeightProps } = useIntegerInput(30, 5);

  // Объёмные буквы
  const [vType, setVType] = useState("");
  const { value: vCount, props: vCountProps } = useIntegerInput(5, 1);
  const { value: vHeight, props: vHeightProps } = useIntegerInput(60, 15);

  useEffect(() => {
    fetch("/data/production-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  const calc = useMemo<{ total: number; breakdown: BreakdownItem[] } | null>(() => {
    if (!data) return null;
    const breakdown: BreakdownItem[] = [];
    let total = 0;

    if (cat === "tablichki" && tMaterial) {
      const mat = data.tablichki.materials.find((m) => m.id === tMaterial);
      const size = data.tablichki.sizes[tSizeIdx];
      if (!mat || !size) return { total: 0, breakdown };
      const unitPriceRaw = mat.prices[tSizeIdx];
      if (unitPriceRaw == null) return { total: 0, breakdown };
      const unitPrice = unitPriceRaw;
      const qty = Math.max(1, tQty);
      const sum = unitPrice * qty;
      breakdown.push({
        label: `${mat.name} ${size.label} (${qty} шт × ${formatRub(unitPrice)})`,
        value: sum,
      });
      total = sum;
      if (qty < data.tablichki.minQty) {
        breakdown.push({
          label: `⚠ При тираже меньше ${data.tablichki.minQty} шт цена индивидуальная — уточните у менеджера`,
          value: 0,
        });
      }
    } else if (cat === "flatSigns" && fMaterial) {
      const mat = data.flatSigns.materials.find((m) => m.id === fMaterial);
      if (!mat) return { total: 0, breakdown };
      const area = fWidth * fHeight;
      const priceRaw = mat.prices[fGraphics];
      if (priceRaw == null || area <= 0) return { total: 0, breakdown };
      const sum = priceRaw * area;
      const graphic = data.flatSigns.graphicsTypes[fGraphics];
      breakdown.push({ label: `${mat.name} · ${graphic.label}`, value: 0 });
      breakdown.push({
        label: `${area.toFixed(2)} м² × ${formatRub(priceRaw)}/м²`,
        value: Math.round(sum),
      });
      total = sum;
    } else if (cat === "lightBoxes" && lbStructure) {
      const struct = data.lightBoxes.structures.find((s) => s.id === lbStructure);
      const face = data.lightBoxes.faceTypes[lbFace];
      if (!struct || !face) return { total: 0, breakdown };
      const area = lbWidth * lbHeight;
      const priceRaw = struct.prices[lbFace];
      if (priceRaw == null) {
        breakdown.push({ label: struct.name, value: 0 });
        breakdown.push({ label: `${face.label}: цена по запросу`, value: 0 });
        return { total: 0, breakdown };
      }
      if (area <= 0) return { total: 0, breakdown };
      const sum = priceRaw * area;
      breakdown.push({ label: face.label, value: 0 });
      breakdown.push({
        label: `${area.toFixed(2)} м² × ${formatRub(priceRaw)}/м²`,
        value: Math.round(sum),
      });
      if (struct.warrantyYears) {
        breakdown.push({ label: `Гарантия: ${struct.warrantyYears} года`, value: 0 });
      }
      total = sum;
    } else if (cat === "pseudoLetters" && pType && pMaterial) {
      const item = data.pseudoLetters.materialsAndPrices.find((m) => m.id === pType);
      if (!item) return { total: 0, breakdown };
      const pricePerCm = item.prices[pMaterial];
      if (pricePerCm == null) return { total: 0, breakdown };
      const height = Math.max(5, pHeight);
      const count = Math.max(1, pCount);
      const sumPerLetter = pricePerCm * height;
      const sum = sumPerLetter * count;
      const matLabel = data.pseudoLetters.materials.find((m) => m.id === pMaterial)?.label ?? pMaterial;
      breakdown.push({ label: `${item.name} · ${matLabel}`, value: 0 });
      breakdown.push({
        label: `1 буква: ${height} см × ${formatRub(pricePerCm)} = ${formatRub(sumPerLetter)}`,
        value: 0,
      });
      breakdown.push({ label: `${count} букв`, value: sum });
      total = sum;
    } else if (cat === "volumetricLetters" && vType) {
      const type = data.volumetricLetters.types.find((t) => t.id === vType);
      if (!type) return { total: 0, breakdown };
      const height = Math.max(15, vHeight);
      let sizeIdx = 0;
      if (height >= 100) sizeIdx = 2;
      else if (height >= 60) sizeIdx = 1;
      const pricePerCmRaw = type.prices[sizeIdx];
      if (pricePerCmRaw == null) return { total: 0, breakdown };
      const count = Math.max(1, vCount);
      const sumPerLetter = pricePerCmRaw * height;
      const sum = sumPerLetter * count;
      breakdown.push({ label: type.name, value: 0 });
      breakdown.push({
        label: `1 буква: ${height} см × ${formatRub(pricePerCmRaw)} = ${formatRub(sumPerLetter)}`,
        value: 0,
      });
      breakdown.push({ label: `${count} букв`, value: sum });
      if (type.warrantyYears) {
        breakdown.push({ label: `Гарантия: ${type.warrantyYears} года`, value: 0 });
      }
      total = sum;
    }

    return { total: Math.round(total), breakdown };
  }, [data, cat, tMaterial, tSizeIdx, tQty, fMaterial, fGraphics, fWidth, fHeight, lbStructure, lbFace, lbWidth, lbHeight, pType, pMaterial, pCount, pHeight, vType, vCount, vHeight]);

  if (!data) {
    return (
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="text-center text-slate-500">Загружаем калькулятор...</div>
      </section>
    );
  }

  const inputCls = "w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white";
  const labelCls = "block text-sm font-semibold mb-1.5";

  const totalDisplay = calc && calc.total > 0 ? formatRub(calc.total) : "—";

  return (
    <section id="calculator" className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Реальные цены из нашего прайса. Точную стоимость с учётом монтажа и индивидуальных требований уточнит менеджер.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 border-b border-slate-200">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`py-3 px-2 text-xs md:text-sm font-semibold transition ${
                  cat === c.id
                    ? "bg-[#7CB342] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              {cat === "tablichki" && (
                <>
                  <div>
                    <label className={labelCls}>Материал</label>
                    <select value={tMaterial} onChange={(e) => setTMaterial(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.tablichki.materials.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Размер</label>
                    <select value={tSizeIdx} onChange={(e) => setTSizeIdx(parseInt(e.target.value))} className={inputCls}>
                      {data.tablichki.sizes.map((s, i) => (
                        <option key={s.id} value={i}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тираж (шт)</label>
                    <input {...tQtyProps} className={inputCls} />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Цена за 1 шт при тираже от {data.tablichki.minQty} шт.
                    </p>
                  </div>
                </>
              )}

              {cat === "flatSigns" && (
                <>
                  <div>
                    <label className={labelCls}>Материал</label>
                    <select value={fMaterial} onChange={(e) => setFMaterial(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.flatSigns.materials.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тип графики</label>
                    <select value={fGraphics} onChange={(e) => setFGraphics(parseInt(e.target.value))} className={inputCls}>
                      {data.flatSigns.graphicsTypes.map((g, i) => (
                        <option key={g.id} value={i}>{g.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Ширина, м</label>
                      <input {...fWidthProps} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Высота, м</label>
                      <input {...fHeightProps} className={inputCls} />
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Площадь: <strong>{(fWidth * fHeight).toFixed(2)} м²</strong>
                  </div>
                </>
              )}

              {cat === "lightBoxes" && (
                <>
                  <div>
                    <label className={labelCls}>Тип конструкции</label>
                    <select value={lbStructure} onChange={(e) => setLbStructure(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.lightBoxes.structures.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тип лицевой панели</label>
                    <select value={lbFace} onChange={(e) => setLbFace(parseInt(e.target.value))} className={inputCls}>
                      {data.lightBoxes.faceTypes.map((f, i) => (
                        <option key={f.id} value={i}>{f.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Ширина, м</label>
                      <input {...lbWidthProps} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Высота, м</label>
                      <input {...lbHeightProps} className={inputCls} />
                    </div>
                  </div>
                </>
              )}

              {cat === "pseudoLetters" && (
                <>
                  <div>
                    <label className={labelCls}>Тип</label>
                    <select value={pType} onChange={(e) => setPType(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.pseudoLetters.materialsAndPrices.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Материал</label>
                    <select value={pMaterial} onChange={(e) => setPMaterial(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.pseudoLetters.materials.map((m) => (
                        <option key={m.id} value={m.id}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Кол-во букв</label>
                      <input {...pCountProps} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Высота, см</label>
                      <input {...pHeightProps} className={inputCls} />
                    </div>
                  </div>
                </>
              )}

              {cat === "volumetricLetters" && (
                <>
                  <div>
                    <label className={labelCls}>Тип буквы</label>
                    <select value={vType} onChange={(e) => setVType(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.volumetricLetters.types.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>Кол-во букв</label>
                      <input {...vCountProps} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>Высота буквы, см</label>
                      <input {...vHeightProps} className={inputCls} />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Минимум 15 см. Цена меняется на отметках 30 / 60 / 100 см.
                  </p>
                </>
              )}
            </div>

            <div className="bg-gradient-to-br from-[#7CB342]/10 to-slate-50 rounded-2xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Итого
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#7CB342] mb-6 leading-none">
                {totalDisplay}
              </div>

              {calc && calc.breakdown.length > 0 && (
                <>
                  <div className="text-sm font-semibold text-slate-700 mb-2">Расчёт:</div>
                  <ul className="space-y-1.5 text-sm text-slate-600 mb-6">
                    {calc.breakdown.map((b, i) => (
                      <li key={i} className="flex justify-between gap-3">
                        <span className="leading-snug">{b.label}</span>
                        {b.value > 0 && (
                          <strong className="text-slate-900 whitespace-nowrap">
                            {formatRub(b.value)}
                          </strong>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <button
                disabled={!calc || calc.total === 0}
                onClick={() => {
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-[#7CB342] hover:bg-[#689F38] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                Оформить заявку
                <ArrowRight size={20} />
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                Ориентировочная цена. Монтаж и срочность считаются отдельно (срочность +30%).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
