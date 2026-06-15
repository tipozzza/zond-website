"use client";

import { Fragment, useEffect, useRef, useState } from "react";

type Segment = { text: string; accent?: boolean };

type RevealHeadingProps = {
  segments: Segment[];
  className?: string;
  sub?: string;
  subClassName?: string;
};

const STAGGER_MS = 70;

export default function RevealHeading({
  segments,
  className = "",
  sub,
  subClassName = "",
}: RevealHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [instant, setInstant] = useState(false);

  // Разворачиваем сегменты в плоский список слов, сохраняя флаг акцента.
  const words: { word: string; accent: boolean }[] = [];
  segments.forEach((seg) => {
    seg.text
      .split(" ")
      .filter(Boolean)
      .forEach((w) => words.push({ word: w, accent: !!seg.accent }));
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // prefers-reduced-motion: показываем финальное состояние сразу.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setRevealed(true);
      return;
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
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <h2 className={className}>
        {words.map((w, i) => (
          <Fragment key={i}>
            <span
              className={
                "inline-block will-change-transform" +
                (instant
                  ? ""
                  : " transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]") +
                (w.accent ? " reveal-accent" : "")
              }
              style={{
                transitionDelay: instant ? undefined : `${i * STAGGER_MS}ms`,
                transform: revealed ? "translateY(0)" : "translateY(0.7em)",
                opacity: revealed ? 1 : 0,
              }}
            >
              {w.word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </h2>

      {sub ? <p className={subClassName}>{sub}</p> : null}

      <style jsx>{`
        .reveal-accent {
          background-image: linear-gradient(
            90deg,
            #6f395d 0%,
            #ff6bb4 50%,
            #6f395d 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: reveal-shimmer 5s linear infinite;
        }
        @keyframes reveal-shimmer {
          to {
            background-position: -200% center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal-accent {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
