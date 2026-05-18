"use client";

import { useEffect, useState } from "react";

type Item = {
  id: string;
  name: string;
  subtitle?: string;
  priceFrom: number;
  unit: string;
  sale?: boolean;
  oldPrice?: number;
};

type PriceData = {
  illumination: {
    garlands: Item[];
    figures3d: Item[];
    figures2d: Item[];
  };
};

type Theme = "dark" | "light";

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

function ItemCard({ item, imgPrefix, theme }: { item: Item; imgPrefix: string; theme: Theme }) {
  const [failed, setFailed] = useState(false);
  const src = `/images/led/${imgPrefix}-${item.id}.jpg`;
  const isDark = theme === "dark";

  return (
    <article
      className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-xl relative ${
        isDark
          ? "bg-[#0B1E3F] border-[#1E3661] hover:border-[#F4C430] hover:shadow-[#F4C430]/20"
          : "bg-white border-slate-200 hover:border-[#F4C430]"
      }`}
    >
      {item.sale && (
        <div className="absolute top-3 right-3 z-10 bg-[#F4C430] text-[#0B1E3F] px-2.5 py-1 rounded-full text-xs font-bold">
          SALE
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden">
        {failed ? (
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              isDark
                ? "bg-gradient-to-br from-[#0B1E3F] to-[#0E1A2B] text-[#F4C430]"
                : "bg-gradient-to-br from-slate-100 to-slate-200 text-amber-600"
            }`}
          >
            <div className="text-5xl">✨</div>
            <div className="text-xs font-semibold mt-2 opacity-70">Фото скоро</div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      <div className="p-4">
        <h3
          className={`text-lg font-bold leading-tight mb-1 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {item.name}
        </h3>
        {item.subtitle && (
          <p className={`text-xs mb-3 leading-snug ${isDark ? "text-white/60" : "text-slate-500"}`}>
            {item.subtitle}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span
            className={`text-xl font-bold ${isDark ? "text-[#F4C430]" : "text-amber-600"}`}
          >
            от {formatRub(item.priceFrom)}
          </span>
          <span className={`text-xs ${isDark ? "text-white/60" : "text-slate-500"}`}>
            /{item.unit}
          </span>
        </div>
        {item.sale && item.oldPrice && (
          <div
            className={`text-xs line-through mt-1 ${isDark ? "text-white/50" : "text-slate-400"}`}
          >
            {formatRub(item.oldPrice)}
          </div>
        )}
      </div>
    </article>
  );
}

function SectionHead({
  theme,
  title,
  subtitle,
}: {
  theme: Theme;
  title: string;
  subtitle: string;
}) {
  const isDark = theme === "dark";
  return (
    <div className="text-center mb-10">
      <h2 className={`text-3xl md:text-4xl font-bold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
        {title}
      </h2>
      <p className={`max-w-2xl mx-auto ${isDark ? "text-white/70" : "text-slate-600"}`}>
        {subtitle}
      </p>
    </div>
  );
}

export default function LedIllumination() {
  const [data, setData] = useState<PriceData | null>(null);

  useEffect(() => {
    fetch("/data/led-pricing.json")
      .then((r) => r.json())
      .then((d: PriceData) => setData(d))
      .catch((e) => console.error("Failed to load pricing:", e));
  }, []);

  if (!data) {
    return (
      <section className="py-20 bg-[#0B1E3F] text-center text-white/60">
        Загружаем каталог иллюминации...
      </section>
    );
  }

  return (
    <>
      {/* Гирлянды — тёмная */}
      <section className="py-12 md:py-20 bg-[#0B1E3F]">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHead
            theme="dark"
            title="Гирлянды"
            subtitle="10 типов — от классической «Нити» до тематических конструкций."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.illumination.garlands.map((g) => (
              <ItemCard key={g.id} item={g} imgPrefix="garland" theme="dark" />
            ))}
          </div>
        </div>
      </section>

      {/* 3D-фигуры — светлая */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHead
            theme="light"
            title="3D-фигуры"
            subtitle="Олени, снеговики, ёлки и сюжетные композиции."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.illumination.figures3d.map((f) => (
              <ItemCard key={f.id} item={f} imgPrefix="figure" theme="light" />
            ))}
          </div>
        </div>
      </section>

      {/* 2D-фигуры — тёмная */}
      <section className="py-12 md:py-20 bg-[#0B1E3F]">
        <div className="max-w-[1280px] mx-auto px-6">
          <SectionHead
            theme="dark"
            title="2D-фигуры и архитектурный декор"
            subtitle="Плоские конструкции для столбов, фасадов, пешеходных зон."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.illumination.figures2d.map((f) => (
              <ItemCard key={f.id} item={f} imgPrefix="figure-2d" theme="dark" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
