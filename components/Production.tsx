"use client";

import { motion } from "framer-motion";
import ImageSlideshow from "./ImageSlideshow";

const PRODUCTION_IMAGES = [
  {
    src: "/images/production-workshop.jpg",
    alt: "Производственный цех: лазерная резка и сварка металлоконструкций",
  },
  {
    src: "/images/production.jpg",
    alt: "Широкоформатный принтер HP Latex в работе",
  },
  {
    src: "/images/exhibition.jpg",
    alt: "Готовый выставочный стенд из нашего производства",
  },
];

const FEATURES = [
  "Печать до 5 метров шириной",
  "Срок производства от 3 дней",
  "Своя бригада монтажа с автовышкой",
  "Гарантия на конструкции 12 месяцев",
];

export default function Production() {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <ImageSlideshow
              images={PRODUCTION_IMAGES}
              interval={5000}
              className="aspect-[4/3]"
            />
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-white text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Производство сейчас
            </div>
          </div>

          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="block text-xs font-semibold text-brand uppercase tracking-wider mb-3"
            >
              Производство
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight"
            >
              Все этапы — у нас в Томске
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-slate-600 leading-relaxed mb-8"
            >
              От проектирования до монтажа — никаких посредников. Собственный цех широкоформатной
              печати (HP Latex), станки лазерной резки, бригады монтажников. Это значит
              контроль качества, сжатые сроки и адекватные цены.
            </motion.p>

            <motion.ul className="space-y-3.5">
              {FEATURES.map((f, i) => (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.5L6.5 12L13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-base text-slate-700">{f}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
