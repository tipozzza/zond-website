"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Counter from "./Counter";

const COUNTERS = [
  { to: 55, suffix: "", label: "Человек в команде" },
  { to: 32, suffix: "", label: "Года опыта" },
  { to: 7, suffix: "", label: "Городов присутствия" },
  { to: 1000, suffix: "+", label: "Реализованных проектов" },
];

export default function Team() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Команда, которая решает задачи
          </h2>
          <p className="text-lg text-slate-600">
            55 человек: проектировщики, дизайнеры, монтажники, менеджеры — каждый эксперт в своём.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-6xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-16"
        >
          <Image
            src="/images/team.jpg"
            alt="Команда Зонд-Реклама"
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {COUNTERS.map((c) => (
            <div key={c.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-brand leading-none mb-3 tracking-tight">
                <Counter to={c.to} suffix={c.suffix} />
              </div>
              <div className="text-sm text-slate-600">{c.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
