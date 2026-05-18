"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

type StandardProduct = { id: string; name: string; size: string; area: number; prices: number[] };
type MaterialEntry = { id: string; name: string; prices: number[] };
type PostPrintEntry = { id: string; name: string; price: number };

type PriceData = {
  currency: string;
  minOrder: number;
  standardSizes: { tierLabels: string[]; products: StandardProduct[] };
  solventPerM2: { tierThresholds: number[]; tierLabels: string[]; materials: MaterialEntry[] };
  interiorPerM2: { tierThresholds: number[]; tierLabels: string[]; materials: MaterialEntry[] };
  postPrintPerMeter: PostPrintEntry[];
};

type Mode = "standard" | "solvent" | "interior";

const MODE_TABS: { id: Mode; label: string }[] = [
  { id: "standard", label: "Стандартный размер" },
  { id: "solvent", label: "Свой размер (сольвент)" },
  { id: "interior", label: "Интерьерная печать" },
];

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export default function PrintCalculator() {
  const [data, setData] = useState<PriceData | null>(null);
  const [mode, setMode] = useState<Mode>("standard");

  const [stdProduct, setStdProduct] = useState("");
  const [stdQty, setStdQty] = useState(1);

  const [width, setWidth] = useState(3);
  const [height, setHeight] = useState(6);
  const [material, setMaterial] = useState("");

  const [postPrint, setPostPrint] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/print-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  const calc = useMemo(() => {
    if (!data) return null;
    let total = 0;
    const breakdown: { label: string; value: number }[] = [];

    if (mode === "standard") {
      const product = data.standardSizes.products.find((p) => p.id === stdProduct);
      if (!product || stdQty < 1) return { total: 0, breakdown };
      const tierIdx = stdQty >= 10 ? 3 : stdQty >= 5 ? 2 : stdQty >= 3 ? 1 : 0;
      const unitPrice = product.prices[tierIdx];
      const sum = unitPrice * stdQty;
      breakdown.push({
        label: `${product.name} (${stdQty} шт × ${formatRub(unitPrice)})`,
        value: sum,
      });
      total += sum;
    } else {
      const table = mode === "solvent" ? data.solventPerM2 : data.interiorPerM2;
      const mat = table.materials.find((m) => m.id === material);
      const area = width * height;
      if (!mat || area <= 0) return { total: 0, breakdown };

      let tierIdx = 0;
      if (area >= table.tierThresholds[2]) tierIdx = 3;
      else if (area >= table.tierThresholds[1]) tierIdx = 2;
      else if (area >= table.tierThresholds[0]) tierIdx = 1;

      const pricePerM2 = mat.prices[tierIdx];
      const sum = pricePerM2 * area;
      breakdown.push({
        label: `${mat.name} (${area.toFixed(2)} м² × ${formatRub(pricePerM2)}/м²)`,
        value: Math.round(sum),
      });
      total += sum;

      if (postPrint.length > 0) {
        const perimeter = 2 * (width + height);
        for (const ppId of postPrint) {
          const item = data.postPrintPerMeter.find((p) => p.id === ppId);
          if (!item) continue;
          const sum2 = item.price * perimeter;
          breakdown.push({
            label: `${item.name} (${perimeter.toFixed(1)} м × ${formatRub(item.price)})`,
            value: Math.round(sum2),
          });
          total += sum2;
        }
      }
    }

    total = Math.round(total);
    if (total > 0 && total < data.minOrder) {
      breakdown.push({
        label: `Доплата до минимального заказа (${formatRub(data.minOrder)})`,
        value: data.minOrder - total,
      });
      total = data.minOrder;
    }

    return { total, breakdown };
  }, [data, mode, stdProduct, stdQty, width, height, material, postPrint]);

  if (!data) {
    return (
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="text-center text-slate-500">Загружаем калькулятор...</div>
      </section>
    );
  }

  const togglePostPrint = (id: string, checked: boolean) => {
    setPostPrint((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const activeMaterials = mode === "solvent" ? data.solventPerM2.materials : data.interiorPerM2.materials;
  const totalDisplay = calc && calc.total > 0 ? formatRub(calc.total) : "—";

  return (
    <section id="calculator" className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости печати</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Считает по нашему реальному прайсу. Точную цену с учётом макета и сроков подтвердит менеджер.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-slate-200">
            {MODE_TABS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`py-4 px-2 text-xs md:text-sm font-semibold transition text-center ${
                  mode === m.id
                    ? "bg-[#FFCC00] text-slate-900"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              {mode === "standard" ? (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Изделие</label>
                    <select
                      value={stdProduct}
                      onChange={(e) => setStdProduct(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white"
                    >
                      <option value="">Выберите...</option>
                      {data.standardSizes.products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.size})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Тираж (шт)</label>
                    <input
                      type="number"
                      min={1}
                      value={stdQty}
                      onChange={(e) => setStdQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Скидка от 3 и 5 шт. Спеццена от 10 шт.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Материал</label>
                    <select
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white"
                    >
                      <option value="">Выберите...</option>
                      {activeMaterials.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Ширина (м)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={width}
                        onChange={(e) => setWidth(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Высота (м)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={height}
                        onChange={(e) => setHeight(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2.5"
                      />
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    Площадь: <strong>{(width * height).toFixed(2)} м²</strong>. Минимальный заказ —{" "}
                    {formatRub(data.minOrder)}.
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Постпечатная обработка (опционально)
                    </label>
                    <div className="space-y-2">
                      {data.postPrintPerMeter.map((pp) => (
                        <label
                          key={pp.id}
                          className="flex items-center gap-2 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={postPrint.includes(pp.id)}
                            onChange={(e) => togglePostPrint(pp.id, e.target.checked)}
                          />
                          <span>
                            {pp.name}{" "}
                            <span className="text-slate-500">({pp.price} ₽/пог.м)</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Итого
              </div>
              <div className="text-4xl md:text-5xl font-bold text-amber-600 mb-6 leading-none">
                {totalDisplay}
              </div>

              {calc && calc.breakdown.length > 0 && (
                <>
                  <div className="text-sm font-semibold text-slate-700 mb-2">Расшифровка:</div>
                  <ul className="space-y-1.5 text-sm text-slate-600 mb-6">
                    {calc.breakdown.map((b, i) => (
                      <li key={i} className="flex justify-between gap-3">
                        <span className="leading-snug">{b.label}</span>
                        <strong className="text-slate-900 whitespace-nowrap">
                          {formatRub(b.value)}
                        </strong>
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
                className="w-full bg-[#FFCC00] hover:bg-[#E6B800] disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                Оформить заявку
                <ArrowRight size={20} />
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                Стоимость ориентировочная. Точную цену с учётом макета и сроков подтвердит менеджер.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
