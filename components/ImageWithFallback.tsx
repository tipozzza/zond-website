"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  fallbackText?: string;
  fallbackClassName?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackEmoji = "🖼️",
  fallbackText,
  fallbackClassName,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100 ${fallbackClassName ?? ""}`}
      >
        <div className="text-6xl">{fallbackEmoji}</div>
        {fallbackText && <div className="text-sm font-semibold mt-2">{fallbackText}</div>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
