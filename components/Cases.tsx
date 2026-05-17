"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const CASES = [
  { image: "/images/outdoor-day.jpg", client: "Сеть «Ярче!»", tag: "Наружная реклама" },
  { image: "/images/outdoor-led-night.jpg", client: "СБЕР Банк", tag: "Цифровые экраны" },
  { image: "/images/production.jpg", client: "Эспрессо Профи", tag: "Печать и монтаж" },
  { image: "/images/exhibition.jpg", client: "Газпром нефть", tag: "Выставочный стенд" },
  { image: "/images/design.jpg", client: "ТомскГорТранс", tag: "Брендинг и дизайн" },
  { image: "/images/client-meeting.jpg", client: "ТомскНефть", tag: "Комплексное сопровождение" },
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
          <h2 className="text-4xl font-bold tracking-tight mb-4">Наши работы</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Реальные проекты для крупного и среднего бизнеса Томской области.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.client + i}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={c.image}
                alt={c.client}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="text-white font-bold text-lg leading-tight">{c.client}</div>
                <div className="text-white/70 text-sm mt-1">{c.tag}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
