"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "auto";

type RevealProps = {
  children: ReactNode;
  /** Задержка появления, мс (для ступенчатой анимации карточек). */
  delay?: number;
  /** Откуда выезжает блок. "auto" — направление выбирается по позиции на экране. */
  from?: Direction;
  className?: string;
};

const DISTANCE = 40; // px смещения скрытого состояния

export default function Reveal({
  children,
  delay = 0,
  from = "auto",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [instant, setInstant] = useState(false);
  const [dir, setDir] = useState<Exclude<Direction, "auto">>("up");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // prefers-reduced-motion: сразу финальное состояние, без анимации.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setRevealed(true);
      return;
    }

    // Разрешаем "auto" по позиции: узкие блоки едут с ближней стороны,
    // широкие (почти на всю ширину) — снизу.
    if (from === "auto") {
      const rect = node.getBoundingClientRect();
      const vw = window.innerWidth || 1;
      if (rect.width < vw * 0.7) {
        const center = rect.left + rect.width / 2;
        setDir(center < vw / 2 ? "left" : "right");
      } else {
        setDir("up");
      }
    } else {
      setDir(from);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [from]);

  let hiddenTransform: string;
  switch (dir) {
    case "down":
      hiddenTransform = `translateY(-${DISTANCE}px)`;
      break;
    case "left":
      hiddenTransform = `translateX(-${DISTANCE}px)`;
      break;
    case "right":
      hiddenTransform = `translateX(${DISTANCE}px)`;
      break;
    case "up":
    default:
      hiddenTransform = `translateY(${DISTANCE}px)`;
      break;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "none" : hiddenTransform,
        transition: instant
          ? undefined
          : "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: instant ? undefined : `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
