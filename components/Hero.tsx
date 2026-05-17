"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const BADGES = ["32+ года на рынке", "244 конструкции", "1000+ клиентов"];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Image
        src="/images/hero-tomsk.jpg"
        alt="Томск на закате с фиолетовой LED-подсветкой"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-24 w-full">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-white mb-7"
        >
          <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
          №1 в наружной рекламе Томска с 1992 года
        </motion.span>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6 max-w-4xl drop-shadow-lg"
        >
          Наружная реклама<br />в Томске
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-xl md:text-2xl text-white/90 max-w-2xl mb-10 font-light leading-relaxed drop-shadow"
        >
          751 рекламная сторона на 244 конструкциях. Производство и монтаж под ключ — с 1992 года.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-3"
        >
          <Link
            href="#contact-form"
            className="inline-flex items-center justify-center bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Получить расчёт
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
          >
            Посмотреть конструкции
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-0 right-0 z-10"
      >
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap gap-2 md:gap-4">
          {BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium text-white"
            >
              {b}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
