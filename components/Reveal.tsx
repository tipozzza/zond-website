"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type From = "up" | "left" | "right" | "scale" | "auto";

export default function Reveal({
  children,
  from = "auto",
  delay = 0,
  className = "",
  amount = 0.18,
}: {
  children: ReactNode;
  from?: From;
  delay?: number;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [shown, setShown] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [dir, setDir] = useState<Exclude<From, "auto">>(from === "auto" ? "up" : from);

  useEffect(() => {
    setMounted(true);
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;

    if (from === "auto") {
      const r = el.getBoundingClientRect();
      const vw = window.innerWidth;
      if (r.width > vw * 0.72) setDir("up");
      else {
        const cx = (r.left + r.width / 2) / vw;
        setDir(cx < 0.42 ? "left" : cx > 0.58 ? "right" : "up");
      }
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [from, amount]);

  const hidden = mounted && !shown && !reduce;
  const offset =
    dir === "left" ? "translate3d(-48px,12px,0)" :
    dir === "right" ? "translate3d(48px,12px,0)" :
    dir === "scale" ? "scale(.92)" :
    "translate3d(0,40px,0)";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? offset : "none",
        transition: reduce
          ? "none"
          : `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(.22,.7,.25,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
