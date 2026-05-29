"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

// Loose types — JSON has heterogeneous shapes between categories.
type SimpleItem = { id: string; name: string; prices: (number | null)[] };
type TirageRange = {
  label: string;
  min: number;
  max: number | null;
  price?: number | null;
  price4_0?: number | null;
  price4_4?: number | null;
  price1Color?: number | null;
  price2Colors?: number | null;
};
type PolyItem = { id: string; name: string; tirageRanges: TirageRange[]; minQty?: number };
type LeafletFormat = {
  id: string;
  name: string;
  tirageOneSide: TirageRange[];
  densities: { id: string; name: string; oneSide: (number | null)[]; twoSides: (number | null)[] }[];
};
type OkItem = { id: string; name: string; tirages: TirageRange[]; minQty?: number };
type SvItem = { id: string; name: string; tirages: TirageRange[]; minQty?: number };
type LogoType = { id: string; name: string; desc?: string; priceFromConcept: number; priceFromRework: number };
type BrandPackage = { id: string; name: string; price: number; includes: string[] };

type PriceData = {
  currency: string;
  designPolygraphy: { title: string; tierLabels: string[]; items: SimpleItem[] };
  designSouvenir: { title: string; tierLabels: string[]; items: SimpleItem[] };
  designOutdoor: { title: string; tierLabels: string[]; items: SimpleItem[] };
  polygraphyPrint: { title: string; items: PolyItem[] };
  leaflets: { title: string; formats: LeafletFormat[] };
  openOtkrytka: { title: string; items: OkItem[] };
  souvenirs: { title: string; items: SvItem[] };
  logoBranding: { title: string; logoTypes: LogoType[] };
  brandbook: { title: string; packages: BrandPackage[] };
};

type Category =
  | "designPolygraphy"
  | "designSouvenir"
  | "designOutdoor"
  | "polygraphyPrint"
  | "leaflets"
  | "openOtkrytka"
  | "souvenirs"
  | "logoBranding"
  | "brandbook";

type BreakdownItem = { label: string; value: number };
type CalcResult = { total: number; breakdown: BreakdownItem[] };

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "designPolygraphy", label: "Дизайн полиграфии" },
  { id: "designSouvenir", label: "Дизайн сувенирки" },
  { id: "designOutdoor", label: "Дизайн наружки" },
  { id: "polygraphyPrint", label: "Полиграфия (печать)" },
  { id: "leaflets", label: "Листовки" },
  { id: "openOtkrytka", label: "Открытки ЕВРО" },
  { id: "souvenirs", label: "Сувениры (печать)" },
  { id: "logoBranding", label: "Логотип" },
  { id: "brandbook", label: "Брендбук" },
];

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

const findRangeIdx = (ranges: TirageRange[], qty: number): number => {
  for (let i = 0; i < ranges.length; i++) {
    const r = ranges[i];
    if (qty >= r.min && (r.max == null || qty <= r.max)) return i;
  }
  return -1;
};

export default function DesignCalculator() {
  const [data, setData] = useState<PriceData | null>(null);
  const [cat, setCat] = useState<Category>("designPolygraphy");

  // Design (3 категории с одинаковой формой ввода)
  const [dpItem, setDpItem] = useState("");
  const [dpTier, setDpTier] = useState(0);
  const [dsItem, setDsItem] = useState("");
  const [dsTier, setDsTier] = useState(0);
  const [doItem, setDoItem] = useState("");
  const [doTier, setDoTier] = useState(0);

  // Полиграфия печать
  const [ppItem, setPpItem] = useState("");
  const [ppQty, setPpQty] = useState(100);
  const [ppColor, setPpColor] = useState<"4_4" | "4_0">("4_4");

  // Листовки
  const [lfFormat, setLfFormat] = useState("");
  const [lfDensity, setLfDensity] = useState("");
  const [lfSide, setLfSide] = useState<"oneSide" | "twoSides">("oneSide");
  const [lfQty, setLfQty] = useState(100);

  // Открытки
  const [okItem, setOkItem] = useState("");
  const [okQty, setOkQty] = useState(50);
  const [okColor, setOkColor] = useState<"4_4" | "4_0">("4_4");

  // Сувениры
  const [svItem, setSvItem] = useState("");
  const [svQty, setSvQty] = useState(100);
  const [svColors, setSvColors] = useState<1 | 2>(1);

  // Логотип
  const [logoType, setLogoType] = useState("");
  const [logoRework, setLogoRework] = useState(false);

  // Брендбук
  const [bbPackage, setBbPackage] = useState("");

  useEffect(() => {
    fetch("/data/design-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  const calc = useMemo<CalcResult | null>(() => {
    if (!data) return null;
    const breakdown: BreakdownItem[] = [];
    let total = 0;
    const inquiry = (label: string): CalcResult => {
      breakdown.push({ label, value: 0 });
      breakdown.push({ label: "Уточняйте — цена индивидуальная", value: 0 });
      return { total: 0, breakdown };
    };

    // ===== Дизайн: 3 категории с одинаковой логикой =====
    const designCat = (
      block: { tierLabels: string[]; items: SimpleItem[] },
      itemId: string,
      tier: number
    ): CalcResult => {
      const item = block.items.find((i) => i.id === itemId);
      if (!item) return { total: 0, breakdown };
      const tl = block.tierLabels[tier];
      const price = item.prices[tier];
      if (price == null) return inquiry(`${item.name} · ${tl}`);
      breakdown.push({ label: `${item.name}`, value: 0 });
      breakdown.push({ label: tl, value: price });
      return { total: price, breakdown };
    };

    if (cat === "designPolygraphy" && dpItem) {
      return designCat(data.designPolygraphy, dpItem, dpTier);
    }
    if (cat === "designSouvenir" && dsItem) {
      return designCat(data.designSouvenir, dsItem, dsTier);
    }
    if (cat === "designOutdoor" && doItem) {
      return designCat(data.designOutdoor, doItem, doTier);
    }

    // ===== Полиграфия печать =====
    if (cat === "polygraphyPrint" && ppItem) {
      const item = data.polygraphyPrint.items.find((i) => i.id === ppItem);
      if (!item) return { total: 0, breakdown };
      const minQ = item.minQty ?? 1;
      const qty = Math.max(minQ, ppQty);
      const rangeIdx = findRangeIdx(item.tirageRanges, qty);
      if (rangeIdx < 0) return inquiry(`${item.name} · ${qty} шт`);
      const range = item.tirageRanges[rangeIdx];
      let pricePerUnit: number | null = null;
      let colorLabel = "";
      if (range.price !== undefined) {
        pricePerUnit = range.price ?? null;
      } else {
        pricePerUnit = ppColor === "4_4" ? (range.price4_4 ?? null) : (range.price4_0 ?? null);
        colorLabel = ppColor === "4_4" ? " (4+4)" : " (4+0)";
      }
      if (pricePerUnit == null) return inquiry(`${item.name}${colorLabel} · ${qty} шт`);
      const sum = pricePerUnit * qty;
      breakdown.push({ label: `${item.name}${colorLabel}`, value: 0 });
      breakdown.push({
        label: `${qty} шт × ${formatRub(pricePerUnit)} (тираж ${range.label})`,
        value: Math.round(sum),
      });
      total = sum;
    }

    // ===== Листовки =====
    else if (cat === "leaflets" && lfFormat && lfDensity) {
      const format = data.leaflets.formats.find((f) => f.id === lfFormat);
      if (!format) return { total: 0, breakdown };
      const density = format.densities.find((d) => d.id === lfDensity);
      if (!density) return { total: 0, breakdown };
      const minQ = format.tirageOneSide[0]?.min ?? 1;
      const qty = Math.max(minQ, lfQty);
      const rangeIdx = findRangeIdx(format.tirageOneSide, qty);
      if (rangeIdx < 0) return inquiry(`${format.name} · ${qty} шт`);
      const range = format.tirageOneSide[rangeIdx];
      const pricePerUnit = lfSide === "oneSide" ? density.oneSide[rangeIdx] : density.twoSides[rangeIdx];
      const sideLabel = lfSide === "oneSide" ? "4+0" : "4+4";
      if (pricePerUnit == null) return inquiry(`${format.name} · ${density.name} · ${sideLabel}`);
      const sum = pricePerUnit * qty;
      breakdown.push({
        label: `${format.name} · ${density.name} · ${sideLabel}`,
        value: 0,
      });
      breakdown.push({
        label: `${qty} шт × ${formatRub(pricePerUnit)} (тираж ${range.label})`,
        value: Math.round(sum),
      });
      total = sum;
    }

    // ===== Открытки =====
    else if (cat === "openOtkrytka" && okItem) {
      const item = data.openOtkrytka.items.find((i) => i.id === okItem);
      if (!item) return { total: 0, breakdown };
      const minQ = item.minQty ?? 1;
      const qty = Math.max(minQ, okQty);
      const rangeIdx = findRangeIdx(item.tirages, qty);
      if (rangeIdx < 0) return inquiry(`${item.name} · ${qty} шт`);
      const range = item.tirages[rangeIdx];
      let pricePerUnit: number | null = null;
      let colorLabel = "";
      if (range.price !== undefined) {
        pricePerUnit = range.price ?? null;
      } else {
        pricePerUnit = okColor === "4_4" ? (range.price4_4 ?? null) : (range.price4_0 ?? null);
        colorLabel = okColor === "4_4" ? " (4+4)" : " (4+0)";
      }
      if (pricePerUnit == null) return inquiry(`${item.name}${colorLabel} · ${qty} шт`);
      const sum = pricePerUnit * qty;
      breakdown.push({ label: `${item.name}${colorLabel}`, value: 0 });
      breakdown.push({
        label: `${qty} шт × ${formatRub(pricePerUnit)} (тираж ${range.label})`,
        value: Math.round(sum),
      });
      total = sum;
    }

    // ===== Сувениры =====
    else if (cat === "souvenirs" && svItem) {
      const item = data.souvenirs.items.find((i) => i.id === svItem);
      if (!item) return { total: 0, breakdown };
      const minQ = item.minQty ?? 1;
      const qty = Math.max(minQ, svQty);
      const rangeIdx = findRangeIdx(item.tirages, qty);
      if (rangeIdx < 0) return inquiry(`${item.name} · ${qty} шт`);
      const range = item.tirages[rangeIdx];
      const pricePerUnit = svColors === 1 ? (range.price1Color ?? null) : (range.price2Colors ?? null);
      const colorLabel = svColors === 1 ? "1 цвет" : "2 цвета";
      if (pricePerUnit == null) return inquiry(`${item.name} · ${qty} шт · ${colorLabel}`);
      const sum = pricePerUnit * qty;
      breakdown.push({ label: `${item.name} · ${colorLabel}`, value: 0 });
      breakdown.push({
        label: `${qty} шт × ${formatRub(pricePerUnit)} (тираж ${range.label})`,
        value: Math.round(sum),
      });
      total = sum;
    }

    // ===== Логотип =====
    else if (cat === "logoBranding" && logoType) {
      const type = data.logoBranding.logoTypes.find((t) => t.id === logoType);
      if (!type) return { total: 0, breakdown };
      const price = logoRework ? type.priceFromRework : type.priceFromConcept;
      breakdown.push({ label: type.name, value: 0 });
      breakdown.push({
        label: logoRework ? "Доработка существующего" : "Разработка с нуля",
        value: price,
      });
      total = price;
    }

    // ===== Брендбук =====
    else if (cat === "brandbook" && bbPackage) {
      const pkg = data.brandbook.packages.find((p) => p.id === bbPackage);
      if (!pkg) return { total: 0, breakdown };
      breakdown.push({ label: pkg.name, value: pkg.price });
      total = pkg.price;
    }

    return { total: Math.round(total), breakdown };
  }, [
    data,
    cat,
    dpItem,
    dpTier,
    dsItem,
    dsTier,
    doItem,
    doTier,
    ppItem,
    ppQty,
    ppColor,
    lfFormat,
    lfDensity,
    lfSide,
    lfQty,
    okItem,
    okQty,
    okColor,
    svItem,
    svQty,
    svColors,
    logoType,
    logoRework,
    bbPackage,
  ]);

  if (!data) {
    return (
      <section id="calculator" className="py-20 bg-slate-50">
        <div className="text-center text-slate-500">Загружаем калькулятор...</div>
      </section>
    );
  }

  const inputCls = "w-full border border-slate-300 rounded-lg px-3 py-2.5 bg-white";
  const labelCls = "block text-sm font-semibold mb-1.5";

  const renderDesignInputs = (
    block: { tierLabels: string[]; items: SimpleItem[] },
    item: string,
    setItem: (v: string) => void,
    tier: number,
    setTier: (v: number) => void
  ) => (
    <>
      <div>
        <label className={labelCls}>Позиция</label>
        <select value={item} onChange={(e) => setItem(e.target.value)} className={inputCls}>
          <option value="">Выберите...</option>
          {block.items.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelCls}>Сложность</label>
        <select
          value={tier}
          onChange={(e) => setTier(parseInt(e.target.value))}
          className={inputCls}
        >
          {block.tierLabels.map((tl, i) => (
            <option key={tl} value={i}>{tl}</option>
          ))}
        </select>
      </div>
    </>
  );

  const totalDisplay = calc && calc.total > 0 ? formatRub(calc.total) : "—";

  // Активный итем для polygraphyPrint, чтобы знать показывать color selector или нет
  const ppItemObj = data.polygraphyPrint.items.find((i) => i.id === ppItem);
  const ppHasColorChoice = !!ppItemObj?.tirageRanges.some((r) => r.price4_0 !== undefined);
  const okItemObj = data.openOtkrytka.items.find((i) => i.id === okItem);
  const okHasColorChoice = !!okItemObj?.tirages.some((r) => r.price4_0 !== undefined);

  return (
    <section id="calculator" className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Калькулятор стоимости</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            9 категорий — от визитки до брендбука. Реальные цены из нашего прайса. Срочность +30%
            считается отдельно.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-3 border-b border-slate-200">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`py-3 px-2 text-xs md:text-sm font-semibold transition text-center border-b border-slate-200 ${
                  cat === c.id
                    ? "bg-[#3949AB] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="space-y-4">
              {cat === "designPolygraphy" &&
                renderDesignInputs(data.designPolygraphy, dpItem, setDpItem, dpTier, setDpTier)}
              {cat === "designSouvenir" &&
                renderDesignInputs(data.designSouvenir, dsItem, setDsItem, dsTier, setDsTier)}
              {cat === "designOutdoor" &&
                renderDesignInputs(data.designOutdoor, doItem, setDoItem, doTier, setDoTier)}

              {cat === "polygraphyPrint" && (
                <>
                  <div>
                    <label className={labelCls}>Позиция</label>
                    <select value={ppItem} onChange={(e) => setPpItem(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.polygraphyPrint.items.map((i) => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тираж (шт)</label>
                    <input
                      type="number"
                      onFocus={(e) => e.currentTarget.select()}
                      min={1}
                      value={ppQty}
                      onChange={(e) => setPpQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className={inputCls}
                    />
                    {ppItemObj?.minQty && (
                      <p className="text-xs text-slate-500 mt-1.5">
                        Минимальный тираж — {ppItemObj.minQty} шт.
                      </p>
                    )}
                  </div>
                  {ppHasColorChoice && (
                    <div>
                      <label className={labelCls}>Цветность</label>
                      <div className="flex gap-3">
                        {(["4_0", "4_4"] as const).map((c) => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="radio"
                              name="ppColor"
                              checked={ppColor === c}
                              onChange={() => setPpColor(c)}
                            />
                            {c === "4_0" ? "4+0 (одна сторона)" : "4+4 (обе стороны)"}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {cat === "leaflets" && (
                <>
                  <div>
                    <label className={labelCls}>Формат</label>
                    <select
                      value={lfFormat}
                      onChange={(e) => {
                        setLfFormat(e.target.value);
                        setLfDensity("");
                      }}
                      className={inputCls}
                    >
                      <option value="">Выберите...</option>
                      {data.leaflets.formats.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  {lfFormat && (
                    <div>
                      <label className={labelCls}>Плотность бумаги</label>
                      <select
                        value={lfDensity}
                        onChange={(e) => setLfDensity(e.target.value)}
                        className={inputCls}
                      >
                        <option value="">Выберите...</option>
                        {data.leaflets.formats
                          .find((f) => f.id === lfFormat)
                          ?.densities.map((d) => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                          ))}
                      </select>
                    </div>
                  )}
                  <div>
                    <label className={labelCls}>Сторонность</label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="lfSide"
                          checked={lfSide === "oneSide"}
                          onChange={() => setLfSide("oneSide")}
                        />
                        4+0 (одна сторона)
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm">
                        <input
                          type="radio"
                          name="lfSide"
                          checked={lfSide === "twoSides"}
                          onChange={() => setLfSide("twoSides")}
                        />
                        4+4 (обе)
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Тираж (шт)</label>
                    <input
                      type="number"
                      onFocus={(e) => e.currentTarget.select()}
                      min={1}
                      value={lfQty}
                      onChange={(e) => setLfQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className={inputCls}
                    />
                    <p className="text-xs text-slate-500 mt-1.5">A4 — от 10, A5 — от 20, A6 — от 40 шт.</p>
                  </div>
                </>
              )}

              {cat === "openOtkrytka" && (
                <>
                  <div>
                    <label className={labelCls}>Позиция</label>
                    <select value={okItem} onChange={(e) => setOkItem(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.openOtkrytka.items.map((i) => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тираж (шт)</label>
                    <input
                      type="number"
                      onFocus={(e) => e.currentTarget.select()}
                      min={1}
                      value={okQty}
                      onChange={(e) => setOkQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className={inputCls}
                    />
                    {okItemObj?.minQty && (
                      <p className="text-xs text-slate-500 mt-1.5">
                        Минимальный тираж — {okItemObj.minQty} шт.
                      </p>
                    )}
                  </div>
                  {okHasColorChoice && (
                    <div>
                      <label className={labelCls}>Цветность</label>
                      <div className="flex gap-3">
                        {(["4_0", "4_4"] as const).map((c) => (
                          <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
                            <input
                              type="radio"
                              name="okColor"
                              checked={okColor === c}
                              onChange={() => setOkColor(c)}
                            />
                            {c === "4_0" ? "4+0" : "4+4"}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {cat === "souvenirs" && (
                <>
                  <div>
                    <label className={labelCls}>Тип</label>
                    <select value={svItem} onChange={(e) => setSvItem(e.target.value)} className={inputCls}>
                      <option value="">Выберите...</option>
                      {data.souvenirs.items.map((i) => (
                        <option key={i.id} value={i.id}>{i.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Тираж (шт)</label>
                    <input
                      type="number"
                      onFocus={(e) => e.currentTarget.select()}
                      min={1}
                      value={svQty}
                      onChange={(e) => setSvQty(Math.max(1, parseInt(e.target.value) || 1))}
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Кол-во цветов в макете</label>
                    <div className="flex gap-3">
                      {([1, 2] as const).map((c) => (
                        <label key={c} className="flex items-center gap-2 cursor-pointer text-sm">
                          <input
                            type="radio"
                            name="svColors"
                            checked={svColors === c}
                            onChange={() => setSvColors(c)}
                          />
                          {c === 1 ? "1 цвет" : "2 цвета"}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {cat === "logoBranding" && (
                <>
                  <div>
                    <label className={labelCls}>Тип логотипа</label>
                    <select
                      value={logoType}
                      onChange={(e) => setLogoType(e.target.value)}
                      className={inputCls}
                    >
                      <option value="">Выберите...</option>
                      {data.logoBranding.logoTypes.map((t) => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                      ))}
                    </select>
                    {logoType && (
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {data.logoBranding.logoTypes.find((t) => t.id === logoType)?.desc}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input
                        type="checkbox"
                        checked={logoRework}
                        onChange={(e) => setLogoRework(e.target.checked)}
                      />
                      Доработка существующего логотипа (вместо разработки с нуля)
                    </label>
                  </div>
                </>
              )}

              {cat === "brandbook" && (
                <div>
                  <label className={labelCls}>Пакет</label>
                  <div className="space-y-2">
                    {data.brandbook.packages.map((p) => (
                      <label
                        key={p.id}
                        className={`block p-4 border rounded-xl cursor-pointer transition ${
                          bbPackage === p.id
                            ? "border-[#3949AB] bg-[#3949AB]/5"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <input
                            type="radio"
                            name="bbPackage"
                            checked={bbPackage === p.id}
                            onChange={() => setBbPackage(p.id)}
                            className="sr-only"
                          />
                          <strong>{p.name}</strong>
                          <span className="text-[#3949AB] font-bold">{formatRub(p.price)}</span>
                        </div>
                        <ul className="text-xs text-slate-600 space-y-0.5 mt-2">
                          {p.includes.slice(0, 3).map((it) => (
                            <li key={it}>• {it}</li>
                          ))}
                          {p.includes.length > 3 && (
                            <li className="text-slate-400">+ ещё {p.includes.length - 3} позиций</li>
                          )}
                        </ul>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-[#3949AB]/10 to-slate-50 rounded-2xl p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Итого
              </div>
              <div className="text-4xl md:text-5xl font-bold text-[#3949AB] mb-6 leading-none">
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
                className="w-full bg-[#3949AB] hover:bg-[#303F9F] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2"
              >
                Оформить заявку
                <ArrowRight size={20} />
              </button>
              <p className="text-xs text-slate-500 text-center mt-3 leading-relaxed">
                Ориентировочная цена. Точную стоимость с учётом макета и срочности подтвердит менеджер.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
