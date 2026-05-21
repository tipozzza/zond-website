"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

const SLIDES = [
  {
    image: "/images/production-workshop.jpg",
    imageAlt: "Цех производства вывесок и металлоконструкций — ZOND, Томск",
    badge: "ПРОИЗВОДСТВО",
    title: "Металл и сборка",
    description:
      "Лазерная резка, фрезеровка, сварка металлоконструкций. От объёмных букв и лайтбоксов до крупногабаритных билбордов. Каждый этап под контролем мастеров с многолетним стажем.",
    features: [
      "Лазерная резка стали и нержавейки",
      "Сварка с гарантией 12 месяцев",
      "Объёмные буквы, вывески, лайтбоксы",
      "Срок производства от 3 дней",
    ],
  },
  {
    image: "/images/production.jpg",
    imageAlt: "Сольвентные принтеры Flora и Magellan — широкоформатная печать в Томске, ZOND",
    badge: "ШИРОКОФОРМАТНАЯ ПЕЧАТЬ",
    title: "Печать любого формата",
    description:
      "Собственный парк сольвентных принтеров Flora, Magellan, Mustang. Печать на баннере, плёнке, бэклите, сетке, холсте. Ширина до 3,2 м — для любых форматов наружной и интерьерной рекламы.",
    features: [
      "Принтеры Flora, Magellan, Mustang",
      "Ширина печати до 3,2 м",
      "Любые носители: баннер, плёнка, сетка, холст",
      "Готовый тираж за 1–3 дня",
    ],
  },
  {
    image: "/images/exhibition.jpg",
    imageAlt: "Выставочные стенды MAXIBIT под ключ — ZOND, Томск",
    badge: "ВЫСТАВКИ И СТЕНДЫ",
    title: "Готовые работы под ключ",
    description:
      "Производим и монтируем выставочные стенды, экспозиции, корпоративные конструкции. Уникальный дизайн под бренд клиента, мобильные и стационарные решения. Опыт работы по всей России.",
    features: [
      "Проектирование 3D-стенда",
      "Изготовление за 5–10 дней",
      "Монтаж в любом городе России",
      "Демонтаж и хранение для повторного использования",
    ],
  },
];

const INTERVAL_MS = 7000;

export default function Production() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Slideshow */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="sync">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={current}
                src={slide.image}
                alt={slide.imageAlt}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{
                  opacity: 1,
                  scale: 1.1,
                  transition: {
                    opacity: { duration: 1 },
                    scale: { duration: 8, ease: "linear" },
                  },
                }}
                exit={{ opacity: 0, transition: { duration: 1 } }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full text-white text-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Производство сейчас
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/75 w-2"
                  }`}
                  aria-label={`Слайд ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Synced text */}
          <div className="lg:min-h-[500px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-sm font-semibold text-brand uppercase tracking-wider mb-3">
                  {slide.badge}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
                  {slide.title}
                </h2>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  {slide.description}
                </p>
                <ul className="space-y-3">
                  {slide.features.map((feature, i) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <Check size={14} className="text-green-700" strokeWidth={3} />
                      </span>
                      <span className="text-slate-800">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
