"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

type PriceItem = {
  name: string;
  price?: number;
  priceFrom?: number;
  priceTo?: number;
  isRental?: boolean;
};

type Model = {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  size?: string;
  items: PriceItem[];
  extras?: PriceItem[];
};

type Brand = { models: Model[] };

type PriceData = {
  currency: string;
  maxibit: Brand;
  just: Brand;
};

type BrandKey = "maxibit" | "just";

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const itemPrice = (it: PriceItem): number => it.price ?? it.priceFrom ?? 0;
const itemDisplayPrice = (it: PriceItem): string => {
  if (it.price != null) return formatRub(it.price);
  if (it.priceFrom != null && it.priceTo != null)
    return `от ${formatRub(it.priceFrom)} до ${formatRub(it.priceTo)}`;
  if (it.priceFrom != null) return `от ${formatRub(it.priceFrom)}`;
  return "—";
};

export default function ExhibitionCalculator() {
  const [data, setData] = useState<PriceData | null>(null);
  const [brand, setBrand] = useState<BrandKey>("maxibit");
  const [modelId, setModelId] = useState("");
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch("/data/exhibition-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  // При смене бренда сбрасываем модель и выбор
  useEffect(() => {
    setModelId("");
    setSelected(new Set());
  }, [brand]);

  // При смене модели сбрасываем выбор
  useEffect(() => {
    setSelected(new Set());
  }, [modelId]);

  const model = useMemo<Model | null>(() => {
    if (!data) return null;
    return data[brand].models.find((m) => m.id === modelId) ?? null;
  }, [data, brand, modelId]);

  const total = useMemo(() => {
    if (!model) return 0;
    let sum = 0;
    selected.forEach((idx) => {
      const it = model.items[idx];
      if (it) sum += itemPrice(it);
    });
    return Math.round(sum);
  }, [model, selected]);

  if (!data) {
    return (
      <section id="calculator" className="py-12 md:py-20 bg-slate-50">
        <div className="text-center text-slate-500">Загружаем калькулятор...</div>
      </section>
    );
  }

  const toggle = (idx: number, checked: boolean) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(idx);
      else next.delete(idx);
      return next;
    });
  };

  return (
    <section id="calculator" className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стенда</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Выберите бренд, модель и нужные позиции. Срочность +30% считается отдельно.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Brand tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200">
            {(["maxibit", "just"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                className={`py-4 px-4 text-sm md:text-base font-semibold transition ${
                  brand === b
                    ? "bg-[#3FA3D9] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {b === "maxibit" ? "MAXIBIT (премиум)" : "JUST (эконом)"}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1.5">Модель</label>
                <select
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white"
                >
                  <option value="">Выберите...</option>
                  {data[brand].models.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                      {m.subtitle ? ` — ${m.subtitle}` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {model && (
                <>
                  {model.size && (
                    <div className="text-sm text-slate-500">
                      Размер: <strong>{model.size}</strong>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-semibold mb-2">Позиции</label>
                    <div className="space-y-2">
                      {model.items.map((it, idx) => (
                        <label
                          key={idx}
                          className={`flex items-start gap-2 p-3 rounded-lg border cursor-pointer transition ${
                            selected.has(idx)
                              ? "bg-[#3FA3D9]/5 border-[#3FA3D9]"
                              : "bg-white border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selected.has(idx)}
                            onChange={(e) => toggle(idx, e.target.checked)}
                            className="mt-1"
                          />
                          <div className="flex-1 text-sm">
                            <div className="text-slate-700 leading-snug">
                              {it.name}
                              {it.isRental && (
                                <span className="ml-2 text-xs font-semibold text-amber-600 uppercase">
                                  аренда
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {itemDisplayPrice(it)}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!model && (
                <div className="text-sm text-slate-500 py-4">
                  Сначала выберите модель — появятся позиции.
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-[#3FA3D9]/10 to-slate-50 rounded-2xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Итого
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#3FA3D9] mb-6 leading-none">
                {total > 0 ? formatRub(total) : "—"}
              </div>

              {model && selected.size > 0 && (
                <>
                  <div className="text-sm font-semibold text-slate-700 mb-2">Расчёт:</div>
                  <ul className="space-y-1.5 text-sm text-slate-600 mb-6">
                    {[...selected]
                      .sort((a, b) => a - b)
                      .map((idx) => {
                        const it = model.items[idx];
                        return (
                          <li key={idx} className="flex justify-between gap-3">
                            <span className="leading-snug">{it.name}</span>
                            <strong className="text-slate-900 whitespace-nowrap">
                              {formatRub(itemPrice(it))}
                            </strong>
                          </li>
                        );
                      })}
                  </ul>
                </>
              )}

              <button
                disabled={total === 0}
                onClick={() => {
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-[#3FA3D9] hover:bg-[#2E91C7] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                Оформить заявку
                <ArrowRight size={20} />
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                Ориентировочная цена. Точную стоимость с учётом дизайна и сроков подтвердит менеджер.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
