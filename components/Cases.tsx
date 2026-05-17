"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CASES = [
  {
    image: "/images/outdoor-day.jpg",
    title: "Билборды 6×3",
    caption: "Классические рекламные конструкции в центре и на трассах",
  },
  {
    image: "/images/outdoor-led-night.jpg",
    title: "Цифровые LED-экраны",
    caption: "27 уникальных экранов в проходных местах Томска",
  },
  {
    image: "/images/production.jpg",
    title: "Широкоформатная печать",
    caption: "Собственный цех HP Latex, печать до 5 м шириной",
  },
  {
    image: "/images/exhibition.jpg",
    title: "Выставочные стенды",
    caption: "Проектирование, производство и монтаж под ключ",
  },
  {
    image: "/images/design.jpg",
    title: "Дизайн и брендинг",
    caption: "Креатив для наружной рекламы и интерьерных решений",
  },
  {
    image: "/images/client-meeting.jpg",
    title: "Сопровождение проекта",
    caption: "Один менеджер ведёт ваш проект от заявки до монтажа",
  },
];

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Cases() {
  return (
    <section id="cases" className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Что мы делаем</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Полный цикл наружной рекламы: от концепции до монтажа.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
