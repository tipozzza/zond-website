"use client";

import { useRef } from "react";
import Link from "next/link";
import { pluralizeYears } from "@/lib/pluralize";

const YEARS_ON_MARKET = new Date().getFullYear() - 1992;
const BADGES = [
  `${YEARS_ON_MARKET} ${pluralizeYears(YEARS_ON_MARKET)} на рынке`,
  "226 конструкций",
  "1000+ клиентов",
];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const playVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      const p = v.play();
      if (p) p.catch(() => {});
    } catch {}
  };

  const pauseVideo = () => {
    const v = videoRef.current;
    if (v) v.pause();
  };

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-tomsk-poster.jpg"
        onClick={playVideo}
        className="absolute inset-0 w-full h-full object-cover object-[center_70%]"
      >
        <source src="/videos/hero-tomsk.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-24 flex justify-end">
        <div className="max-w-xl w-full flex flex-col gap-6 text-white">
          <span
            className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-section-production animate-pulse shadow-[0_0_12px_rgba(133,196,65,0.8)]" />
            Работаем с 1992 года
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-normal leading-[1.05] drop-shadow-lg animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            Наружная реклама<br />в Томске
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            751 рекламная сторона на 226 конструкциях.{" "}
            <Link
              href="/production"
              className="text-accent-yellow underline decoration-accent-yellow/60 hover:text-amber-300 hover:decoration-amber-300 transition-colors"
            >
              Производство
            </Link>{" "}
            и монтаж под ключ — с 1992 года.
          </p>

          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href="#contact-form"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand/80 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Получить расчёт
            </Link>
            <Link
              href="/outdoor#map"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Посмотреть конструкции
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-0 right-0 z-10 animate-fade-up"
        style={{ animationDelay: "800ms" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex justify-end">
          <div className="max-w-xl w-full flex flex-wrap gap-2 md:gap-4 justify-start">
            {BADGES.map((b) => (
              <span
                key={b}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium text-white"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
