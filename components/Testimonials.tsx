"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    text: "Работаем с ZOND уже 8 лет. Никаких сорванных сроков, всегда на связи. Когда нужно срочно — делают.",
    name: "Алексей Иванов",
    role: "Директор по маркетингу «Ярче!»",
    initials: "АИ",
  },
  {
    text: "Сделали комплексную кампанию: дизайн, печать, монтаж на 40 конструкциях. Всё в один срок и без согласований по 100 раз.",
    name: "Мария Петрова",
    role: "Бренд-менеджер «СБЕР»",
    initials: "МП",
  },
  {
    text: "Цех у них реальный, видел сам. Не посредники — производят сами. Это редкость в Томске.",
    name: "Игорь Сидоров",
    role: "ИП Сидоров (сеть кофеен)",
    initials: "ИС",
  },
];

const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Что говорят клиенты
          </h2>
          <p className="text-lg text-slate-600">
            Доверие, проверенное годами сотрудничества.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              variants={card}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-white p-8 rounded-2xl shadow-md overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 left-4 text-7xl leading-none text-brand/20 font-serif select-none"
              >
                ❝
              </span>
              <blockquote className="relative text-slate-700 leading-relaxed mb-6">
                {t.text}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand text-white font-bold flex items-center justify-center text-sm flex-shrink-0">
                  {t.initials}
                </div>
                <div className="text-sm leading-tight">
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-500 mt-0.5">{t.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
