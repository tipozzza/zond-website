import Image from "next/image";
import Link from "next/link";

type Card = {
  href: string;
  img: string;
  title: string;
  description: string;
  priceBadge: string;
  badgeClass: string;
};

const CARDS: Card[] = [
  {
    href: "/outdoor",
    img: "/images/outdoor-mix.jpg",
    title: "Наружная реклама",
    description:
      "Билборды 6×3, цифровые LED-экраны, тривижн, сити-формат, супер-сайты. 726 рекламных сторон по Томску.",
    priceBadge: "ОТ 29 000 ₽/МЕС",
    badgeClass: "bg-white/95 backdrop-blur text-[#F57C28]",
  },
  {
    href: "/print",
    img: "/images/production.jpg",
    title: "Широкоформатная печать",
    description:
      "Печать на баннере, плёнке, бэклите, сетке, холсте. Сольвентные принтеры Flora, Mimaki, Mustang шириной до 5 м.",
    priceBadge: "ОТ 120 ₽/М²",
    badgeClass: "bg-[#FFCC00] text-slate-900",
  },
  {
    href: "/production",
    img: "/images/production-workshop.jpg",
    title: "Производство",
    description:
      "Объёмные буквы, вывески, лайтбоксы, штендеры, металлоконструкции. Лазерная резка, фрезеровка, сварка. Монтаж с автовышкой.",
    priceBadge: "ОТ 95 ₽/ШТ",
    badgeClass: "bg-white/95 backdrop-blur text-[#7CB342]",
  },
  {
    href: "/design",
    img: "/images/design-portfolio.jpg",
    title: "Дизайн и полиграфия",
    description:
      "Креатив для наружной рекламы, фирменный стиль, логотипы. Визитки, листовки, буклеты, каталоги, плакаты.",
    priceBadge: "ОТ 200 ₽",
    badgeClass: "bg-white/95 backdrop-blur text-[#3949AB]",
  },
  {
    href: "/exhibition",
    img: "/images/exhibition.jpg",
    title: "Выставочные экспозиции",
    description:
      "Уникальный дизайн стенда, мобильные и стационарные конструкции. Проектирование, производство и монтаж по всей России.",
    priceBadge: "ИНДИВИДУАЛЬНО",
    badgeClass: "bg-white/95 backdrop-blur text-[#3FA3D9]",
  },
  {
    href: "/led",
    img: "/images/led-illumination.jpg",
    title: "LED и иллюминация",
    description:
      "Новогоднее оформление улиц, фасадов, ТЦ. Световые 3D-фигуры собственного производства, гирлянды, дюралайт. Бренд Лайтово.",
    priceBadge: "ПО ЗАПРОСУ",
    badgeClass: "bg-white/95 backdrop-blur text-[#7B1FA2]",
  },
];

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
          {CARDS.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group block rounded-3xl overflow-hidden bg-white border border-slate-200 hover:border-brand hover:shadow-2xl hover:shadow-brand/20 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${c.badgeClass}`}
                >
                  {c.priceBadge}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-slate-900 leading-tight">
                  {c.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{c.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
