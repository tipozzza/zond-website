"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const CASES = [
  {
    href: "/outdoor",
    image: "/images/outdoor-day.jpg",
    title: "Наружная реклама",
    caption: "Билборды 6×3, цифровые LED-экраны, тривижн, сити-формат, супер-сайты. 726 рекламных сторон по Томску.",
  },
  {
    href: "/print",
    image: "/images/production.jpg",
    title: "Широкоформатная печать",
    caption: "Печать на баннере, плёнке, бэклите, сетке, холсте. Сольвентные принтеры Flora, Mimaki, Mustang шириной до 5 м. Качество для интерьера и улицы.",
  },
  {
    href: "/production",
    image: "/images/production-workshop.jpg",
    title: "Производство",
    caption: "Объёмные буквы, вывески, лайтбоксы, штендеры, металлоконструкции. Лазерная резка, фрезеровка, сварка. Монтаж с автовышкой.",
  },
  {
    href: "/design",
    image: "/images/design.jpg",
    title: "Дизайн и полиграфия",
    caption: "Креатив для наружной рекламы, фирменный стиль, логотипы. Визитки, листовки, буклеты, каталоги, плакаты.",
  },
  {
    href: "/exhibition",
    image: "/images/exhibition.jpg",
    title: "Выставочные стенды",
    caption: "Уникальный дизайн стенда, мобильные и стационарные конструкции. Проектирование, производство и монтаж по всей России.",
  },
  {
    href: "/led",
    image: "/images/led-illumination.jpg",
    title: "LED и иллюминация",
    caption: "Новогоднее оформление улиц, фасадов, ТЦ. Световые 3D-фигуры собственного производства, гирлянды, дюралайт. Бренд Лайтово.",
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
            От идеи до монтажа — полный цикл рекламных и световых проектов.
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
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col-reverse gap-2">
                  <div className="text-white font-bold text-xl leading-tight">{c.title}</div>
                  <div className="text-white/80 text-sm leading-snug">{c.caption}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
