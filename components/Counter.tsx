"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

type CounterProps = {
  to: number;
  duration?: number;
  suffix?: string;
  format?: (n: number) => string;
  className?: string;
};

export default function Counter({
  to,
  duration = 1.5,
  suffix = "",
  format,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const display = format ? format(value) : Math.round(value).toLocaleString("ru-RU");

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
