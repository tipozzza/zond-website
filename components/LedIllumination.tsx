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

const formatRub = (n: number) => `${n.toLocaleString("ru-RU")} ₽`;

function ItemCard({ item, imgPrefix }: { item: Item; imgPrefix: string }) {
  const [failed, setFailed] = useState(false);
  const src = `/images/led/${imgPrefix}-${item.id}.jpg`;

  return (
    <article className="group bg-[#0B1E3F] rounded-2xl overflow-hidden border border-[#1E3661] hover:border-[#F4C430] transition-all hover:shadow-xl hover:shadow-[#F4C430]/20 relative">
      {item.sale && (
        <div className="absolute top-3 right-3 z-10 bg-[#F4C430] text-[#0B1E3F] px-2.5 py-1 rounded-full text-xs font-bold">
          SALE
        </div>
      )}
      <div className="relative aspect-[4/3] overflow-hidden">
        {failed ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0B1E3F] to-[#0E1A2B] text-[#F4C430]">
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
        <h3 className="text-lg font-bold text-white leading-tight mb-1">{item.name}</h3>
        {item.subtitle && (
          <p className="text-xs text-white/60 mb-3 leading-snug">{item.subtitle}</p>
        )}
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-[#F4C430]">
            от {formatRub(item.priceFrom)}
          </span>
          <span className="text-xs text-white/60">/{item.unit}</span>
        </div>
        {item.sale && item.oldPrice && (
          <div className="text-xs text-white/50 line-through mt-1">
            {formatRub(item.oldPrice)}
          </div>
        )}
      </div>
    </article>
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
    <section className="py-12 md:py-20 bg-[#0B1E3F]">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Гирлянды */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Гирлянды</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              10 типов — от классической «Нити» до тематических конструкций.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {data.illumination.garlands.map((g) => (
              <ItemCard key={g.id} item={g} imgPrefix="garland" />
            ))}
          </div>
        </div>

        {/* 3D-фигуры */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">3D-фигуры</h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Олени, снеговики, ёлки и сюжетные композиции.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.illumination.figures3d.map((f) => (
              <ItemCard key={f.id} item={f} imgPrefix="figure" />
            ))}
          </div>
        </div>

        {/* 2D-фигуры */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              2D-фигуры и архитектурный декор
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Плоские конструкции для столбов, фасадов, пешеходных зон.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.illumination.figures2d.map((f) => (
              <ItemCard key={f.id} item={f} imgPrefix="figure-2d" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
