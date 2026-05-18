"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CASES = [
  {
    href: "/outdoor",
    image: "/images/outdoor-day.jpg",
    title: "Наружная реклама",
    caption: "Все форматы: билборды, LED-экраны, тривижн, сити-формат. 726 сторон по Томску.",
  },
  {
    href: "/print",
    image: "/images/production.jpg",
    title: "Широкоформатная печать",
    caption: "Собственный цех HP Latex, печать до 5 м шириной.",
  },
  {
    href: "/production",
    image: "/images/production-workshop.jpg",
    title: "Производство",
    caption: "Изготовление конструкций под ключ: проектирование, металл, монтаж.",
  },
  {
    href: "/design",
    image: "/images/design.jpg",
    title: "Дизайн и полиграфия",
    caption: "Креатив для наружной рекламы, брендинг, печатная продукция.",
  },
  {
    href: "/exhibition",
    image: "/images/exhibition.jpg",
    title: "Выставочные стенды",
    caption: "Проектирование, производство и монтаж под ключ.",
  },
  {
    href: "/led",
    image: "/images/led-illumination.jpg",
    title: "LED и иллюминация",
    caption: "Новогодняя иллюминация городов, фасадов, ТЦ. Бренд Лайтово.",
  },
];

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Cases() {
  return (
    <section id="cases" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Что мы делаем</h2>
          <p className="text-lg text-slate-600">
            6 направлений бизнеса под одной крышей.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.div
              key={c.href}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
            >
              <Link
                href={c.href}
                className="group block relative aspect-[4/3] rounded-2xl overflow-hidden hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-white font-bold text-lg leading-tight">{c.title}</div>
                  <div className="text-white/70 text-sm mt-1">{c.caption}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
