"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  fallbackEmoji?: string;
  fallbackClassName?: string;
};

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackEmoji = "🖼️",
  fallbackClassName,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`w-full h-full flex items-center justify-center text-6xl text-slate-400 bg-slate-100 ${fallbackClassName ?? ""}`}
      >
        {fallbackEmoji}
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
