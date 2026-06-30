"use client";

import { useEffect, useRef, useState } from "react";
import { SIDES_COUNT } from "@/lib/site-data";

const STATS = [
  { num: SIDES_COUNT, label: "рекламных сторон" },
  { num: 348, label: "цифровых сторон" },
  { num: 27, label: "цифровых LED-экранов" },
  { num: 226, label: "конструкций" },
];

const DURATION = 2000;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const startedRef = useRef(false);
  const [values, setValues] = useState<number[]>(() => STATS.map(() => 0));

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    // prefers-reduced-motion: показываем финальные значения сразу, без анимации
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValues(STATS.map((s) => s.num));
      return;
    }

    let rafId = 0;
    let startTs = 0;

    const step = (ts: number) => {
      if (!startTs) startTs = ts;
      const progress = Math.min((ts - startTs) / DURATION, 1);
      const eased = easeOutCubic(progress);
      setValues(STATS.map((s) => Math.round(s.num * eased)));
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            rafId = requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand mb-2 leading-none tabular-nums">
                {values[i]}
              </div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
