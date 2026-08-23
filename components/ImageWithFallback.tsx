"use client";

import { useState } from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  fallbackText?: string;
  fallbackClassName?: string;
  fallbackNode?: React.ReactNode;
};

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackEmoji = "🖼️",
  fallbackText,
  fallbackClassName,
  fallbackNode,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallbackNode) return <>{fallbackNode}</>;
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 ${fallbackClassName ?? ""}`}
      >
        <div className="text-6xl">{fallbackEmoji}</div>
        {fallbackText && <div className="text-sm font-semibold mt-2">{fallbackText}</div>}
      </div>
    );
  }

  // fill + sizes: отдаём картинку через оптимизатор Next (WebP/AVIF нужного
  // размера) вместо тяжёлого оригинала. Все места вызова оборачивают компонент
  // в контейнер с `relative` и фиксированной пропорцией, поэтому fill безопасен.
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
