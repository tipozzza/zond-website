"use client";

import { useEffect, useRef, useState } from "react";

type Variant = "fade-up" | "fade-in" | "slide-in-left" | "scale-in";

const VARIANT_CLASS: Record<Variant, string> = {
  "fade-up": "animate-fade-up",
  "fade-in": "animate-fade-in-soft",
  "slide-in-left": "animate-slide-in-left",
  "scale-in": "animate-scale-in",
};

type Props = {
  variant?: Variant;
  /** Задержка миллисекундах (для stagger). */
  delay?: number;
  /** rootMargin для IntersectionObserver — отрицательный = срабатывает чуть позже. */
  rootMargin?: string;
  /** Если true — анимация запускается один раз, потом наблюдатель отключается. */
  once?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function AnimateOnScroll({
  variant = "fade-up",
  delay = 0,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  className = "",
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return (
    <div
      ref={ref}
      style={shown && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
      className={`${shown ? VARIANT_CLASS[variant] : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
