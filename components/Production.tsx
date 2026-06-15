"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { SERVICES_12 } from "@/lib/services-12";
import Reveal from "./Reveal";

const INTERVAL_MS = 5000;
const SWIPE_THRESHOLD = 50;

export default function Production() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % SERVICES_12.length) + SERVICES_12.length) % SERVICES_12.length);
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SERVICES_12.length), []);
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SERVICES_12.length) % SERVICES_12.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next, current]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const slide = SERVICES_12[current];

  return (
    <section
      className="py-12 md:py-20 bg-slate-50"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div
          className="grid lg:grid-cols-2 gap-12 items-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Slideshow */}
          <Reveal from="left">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-slate-200">
            {/* Все слайды лежат стопкой; активный получает opacity-100, остальные — 0.
                Плавный cross-fade обеспечивается CSS transition-opacity. */}
            {SERVICES_12.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={s.id}
                src={s.image}
                alt={s.imageAlt}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                  i === current ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Стрелки навигации */}
            <button
              type="button"
              onClick={prev}
              aria-label="Предыдущий слайд"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white flex items-center justify-center transition"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Следующий слайд"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur text-white flex items-center justify-center transition"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute inset-x-0 bottom-14 flex justify-center z-10 px-4">
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold shadow-xl transition-colors text-sm md:text-base"
              >
                {slide.cta}
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* 12 точек: на узких экранах чуть мельче */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 max-w-[90%] flex-wrap justify-center">
              {SERVICES_12.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "bg-white w-6" : "bg-white/50 hover:bg-white/75 w-1.5"
                  }`}
                  aria-label={`Слайд ${i + 1}: ${s.title}`}
                  aria-current={i === current}
                />
              ))}
            </div>
          </div>
          </Reveal>

          {/* Synced text — фиксированная min-height чтобы не «прыгало» при смене.
              key={current} перезапускает CSS-анимации при каждом переходе. */}
          <Reveal from="right">
          <div className="min-h-[420px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-center">
            <div key={current} className="animate-fade-up">
              <div className="text-xs sm:text-sm font-semibold text-brand uppercase tracking-wider mb-3">
                {slide.badge}
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-slate-900 leading-tight">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg text-slate-700 mb-6 md:mb-8 leading-relaxed">
                {slide.description}
              </p>
              <ul className="space-y-2.5">
                {slide.features.map((feature, i) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 animate-slide-in-left"
                    style={{ animationDelay: `${200 + i * 80}ms` }}
                  >
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                      <Check size={14} className="text-green-700" strokeWidth={3} />
                    </span>
                    <span className="text-slate-800 text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
