"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDecimalInput, useIntegerInput } from "@/lib/numeric-input";

type Mode = "illumination" | "screen";

type IllItem = {
  id: string;
  name: string;
  subtitle?: string;
  priceFrom: number;
  unit: string;
  category: "garland" | "figure3d" | "figure2d";
};

type ScreenRange = {
  type: string;
  priceFromRUB: number;
  priceFromUSD?: number;
  perUnit: string;
};

type PriceData = {
  illumination: {
    garlands: { id: string; name: string; subtitle?: string; priceFrom: number; unit: string }[];
    figures3d: { id: string; name: string; subtitle?: string; priceFrom: number; unit: string }[];
    figures2d: { id: string; name: string; subtitle?: string; priceFrom: number; unit: string }[];
  };
  ledScreens: {
    pricing: {
      estimatedRanges: ScreenRange[];
    };
  };
};

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

export default function LedCalculator() {
  const [data, setData] = useState<PriceData | null>(null);
  const [mode, setMode] = useState<Mode>("illumination");

  // illumination state
  const [illId, setIllId] = useState("");
  const { value: illQty, props: illQtyProps } = useIntegerInput(10, 1);

  // screen state
  const [screenType, setScreenType] = useState("");
  const { value: screenSize, props: screenSizeProps } = useDecimalInput(2, 0.1);

  useEffect(() => {
    fetch("/data/led-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  const illuminationItems = useMemo<IllItem[]>(() => {
    if (!data) return [];
    return [
      ...data.illumination.garlands.map((g) => ({ ...g, category: "garland" as const })),
      ...data.illumination.figures3d.map((f) => ({ ...f, category: "figure3d" as const })),
      ...data.illumination.figures2d.map((f) => ({ ...f, category: "figure2d" as const })),
    ];
  }, [data]);

  const calc = useMemo(() => {
    if (!data) return null;
    if (mode === "illumination") {
      const item = illuminationItems.find((i) => i.id === illId);
      if (!item) return { total: 0, breakdown: [] as string[] };
      const qty = Math.max(1, illQty);
      const total = item.priceFrom * qty;
      return {
        total: Math.round(total),
        breakdown: [
          `${item.name} (${item.category === "garland" ? "гирлянда" : item.category === "figure3d" ? "3D-фигура" : "2D-фигура"})`,
          `${qty} ${item.unit} × ${formatRub(item.priceFrom)}`,
        ],
      };
    }
    const range = data.ledScreens.pricing.estimatedRanges.find((r) => r.type === screenType);
    if (!range) return { total: 0, breakdown: [] as string[] };
    const size = Math.max(0.1, screenSize);
    const total = range.priceFromRUB * size;
    return {
      total: Math.round(total),
      breakdown: [
        range.type,
        `${size.toFixed(2)} ${range.perUnit} × ${formatRub(range.priceFromRUB)}`,
        range.priceFromUSD ? `(базовая цена в USD: ${range.priceFromUSD}/${range.perUnit})` : "",
      ].filter(Boolean),
    };
  }, [data, mode, illId, illQty, illuminationItems, screenType, screenSize]);

  if (!data) {
    return (
      <section id="calculator" className="py-12 md:py-20 bg-white">
        <div className="text-center text-slate-500">Загружаем калькулятор...</div>
      </section>
    );
  }

  const inputCls = "w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white";
  const labelCls = "block text-sm font-semibold mb-1.5";

  const totalDisplay = calc && calc.total > 0 ? formatRub(calc.total) : "—";
  const screenRange = data.ledScreens.pricing.estimatedRanges.find((r) => r.type === screenType);

  return (
    <section id="calculator" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Иллюминация — ориентировочно. LED-экраны — цена зависит от курса USD ЦБ РФ.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-2 border-b border-slate-200">
            <button
              onClick={() => setMode("illumination")}
              className={`py-4 px-4 text-sm md:text-base font-semibold transition ${
                mode === "illumination"
                  ? "bg-[#F4C430] text-[#0B1E3F]"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Иллюминация под ключ
            </button>
            <button
              onClick={() => setMode("screen")}
              className={`py-4 px-4 text-sm md:text-base font-semibold transition ${
                mode === "screen"
                  ? "bg-[#67008F] text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              LED-экран
            </button>
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              {mode === "illumination" ? (
                <>
                  <div>
                    <label className={labelCls}>Позиция</label>
                    <select
                      value={illId}
                      onChange={(e) => setIllId(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Выберите...</option>
                      <optgroup label="Гирлянды">
                        {data.illumination.garlands.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name} — от {formatRub(g.priceFrom)}/{g.unit}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="3D-фигуры">
                        {data.illumination.figures3d.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} — от {formatRub(f.priceFrom)}/{f.unit}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="2D-фигуры">
                        {data.illumination.figures2d.map((f) => (
                          <option key={f.id} value={f.id}>
                            {f.name} — от {formatRub(f.priceFrom)}/{f.unit}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>
                      Количество ({illuminationItems.find((i) => i.id === illId)?.unit ?? "ед."})
                    </label>
                    <input {...illQtyProps} className={inputCls} />
                  </div>
                  <div className="text-xs text-slate-500 leading-relaxed">
                    Цены ориентировочные. Окончательная сумма зависит от объекта и сезона.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className={labelCls}>Тип экрана</label>
                    <select
                      value={screenType}
                      onChange={(e) => setScreenType(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Выберите...</option>
                      {data.ledScreens.pricing.estimatedRanges.map((r) => (
                        <option key={r.type} value={r.type}>
                          {r.type} — от {formatRub(r.priceFromRUB)}/{r.perUnit}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>
                      Размер ({screenRange?.perUnit ?? "м²"})
                    </label>
                    <input {...screenSizeProps} className={inputCls} />
                  </div>
                  <div className="text-xs text-slate-500 leading-relaxed">
                    Цена в RUB — ориентировочная по курсу 100₽/$. Точную стоимость рассчитает
                    менеджер по курсу ЦБ РФ на день сделки.
                  </div>
                </>
              )}
            </div>

            <div
              className={`${
                mode === "illumination"
                  ? "bg-gradient-to-br from-[#F4C430]/10 to-slate-50"
                  : "bg-gradient-to-br from-[#67008F]/10 to-slate-50"
              } rounded-2xl p-6`}
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Итого
              </div>
              <div
                className={`text-4xl md:text-5xl font-bold mb-6 leading-none ${
                  mode === "illumination" ? "text-amber-600" : "text-[#67008F]"
                }`}
              >
                {totalDisplay}
              </div>

              {calc && calc.breakdown.length > 0 && (
                <>
                  <div className="text-sm font-semibold text-slate-700 mb-2">Расчёт:</div>
                  <ul className="space-y-1.5 text-sm text-slate-600 mb-6">
                    {calc.breakdown.map((line, i) => (
                      <li key={i} className="leading-snug">{line}</li>
                    ))}
                  </ul>
                </>
              )}

              <button
                disabled={!calc || calc.total === 0}
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`w-full disabled:opacity-50 disabled:cursor-not-allowed py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 ${
                  mode === "illumination"
                    ? "bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F]"
                    : "bg-[#67008F] hover:bg-[#57007A] text-white"
                }`}
              >
                Оформить заявку
                <ArrowRight size={20} />
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                Точную стоимость с учётом монтажа и сезона подтвердит менеджер.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
