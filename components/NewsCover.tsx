"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Обложка новости в карточке (пропорции карточки — 16:10).
 *
 * Если пропорции картинки близки к карточке (±12 %), она заполняет карточку
 * целиком, как обычное фото. Если сильно отличаются (квадратный баннер,
 * узкая полоса), обрезать нельзя — пропадёт текст на баннере. Тогда картинка
 * показывается целиком, а поля по краям заполняет её же размытая копия.
 * Рекомендуемый размер обложки для админки — 1600 × 1000.
 */
const CARD_RATIO = 16 / 10;

export default function NewsCover({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  const [fits, setFits] = useState(true);

  return (
    <>
      {!fits && (
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes={sizes}
          className="object-cover scale-125 blur-2xl opacity-60"
        />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`${fits ? "object-cover" : "object-contain"} group-hover:scale-105 transition-transform duration-700`}
        onLoad={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (!img.naturalWidth || !img.naturalHeight) return;
          const r = img.naturalWidth / img.naturalHeight / CARD_RATIO;
          setFits(r > 0.88 && r < 1.12);
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </>
  );
}
