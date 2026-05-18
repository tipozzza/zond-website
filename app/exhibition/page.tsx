import Image from "next/image";
import { Palette, Printer, Box, Layers, Calendar, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingWA from "@/components/FloatingWA";
import ImageWithFallback from "@/components/ImageWithFallback";
import ExhibitionCalculator from "@/components/ExhibitionCalculator";
import ExhibitionPortfolio from "@/components/ExhibitionPortfolio";

const SERVICES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Palette,
    title: "Дизайн экспозиции",
    text: "Концепция стенда, фотопанелей, презентационных материалов.",
  },
  {
    icon: Printer,
    title: "Печать фотопанелей",
    text: "Своё производство — баннерная ткань, плёнка, бесшовная печать до 5 м.",
  },
  {
    icon: Box,
    title: "Мобильные стенды MAXIBIT",
    text: "Премиум-сегмент с 1993 года — Pop-up, баннерные, декорации, Fold-up.",
  },
  {
    icon: Layers,
    title: "Эконом-стенды JUST",
    text: "Расширенный ассортимент: X-стенды, роллапы, призмы, ресепшены.",
  },
  {
    icon: Calendar,
    title: "Аренда оборудования",
    text: "Сдаём в аренду на одну выставку — экономия для разовых событий.",
  },
  {
    icon: Star,
    title: "Проекты под ключ",
    text: "Эксклюзивные экспозиции от 1993 — от концепции до монтажа на любой площадке.",
  },
];

const MAXIBIT_MODELS: {
  img: string;
  title: string;
  type: string;
  price: string;
  description: string;
  size: string;
}[] = [
  {
    img: "/images/exhibition/maxibit-network.jpg",
    title: "NETWORK 3×3",
    type: "POP-UP СТЕНД",
    price: "ОТ 73 000 ₽",
    description:
      "Корпоративный pop-up стенд. Зонтичная алюминиевая конструкция, магнитные фотопанели. 300+ сборок-разборок без потери геометрии.",
    size: "3×3 м",
  },
  {
    img: "/images/exhibition/maxibit-solo.jpg",
    title: "SOLO",
    type: "БАННЕРНЫЙ",
    price: "ОТ 9 800 ₽",
    description:
      "Эконом-класс. Идеален для POS-материалов в торговых залах. Компактная конструкция, минимальная цена.",
    size: "85×200 см",
  },
  {
    img: "/images/exhibition/maxibit-stage.jpg",
    title: "STAGE 3×2",
    type: "ДЕКОРАЦИЯ",
    price: "ОТ 58 000 ₽",
    description:
      "Декорация на сцене, выставке, в студии. Двусторонняя, бесшовное фотопанно, трёхлучевая нога.",
    size: "3×2 м",
  },
  {
    img: "/images/exhibition/maxibit-foldup.jpg",
    title: "FOLD-UP ORIGINAL 8",
    type: "С ФРИЗОМ",
    price: "ОТ 91 000 ₽",
    description:
      "Самая продаваемая Fold-up конструкция в мире. Соединённые алюминиевые рамы с жёсткими фотопанелями.",
    size: "3 ряда",
  },
];

const JUST_MODELS: {
  name: string;
  subtitle: string;
  description: string;
  minPrice: number;
}[] = [
  {
    name: "JUST X FAST",
    subtitle: "Баннерный стенд",
    description: "Голливудской устойчивости. Цвет — чёрный, оранжевый. Время монтажа — 30 секунд.",
    minPrice: 600,
  },
  {
    name: "JUST X LARGE",
    subtitle: "Баннерный стенд",
    description: "Цвет — чёрный. Материал металлический сплав, пластик. Голливудская устойчивость.",
    minPrice: 700,
  },
  {
    name: "JUST PRISM",
    subtitle: "Трёхсторонний баннерный стенд",
    description: "Материал — алюминий, пластик. Поставляется в чехле для переноски. Монтаж 30 секунд.",
    minPrice: 2200,
  },
  {
    name: "JUST UP 3×3 MAGNET",
    subtitle: "Зонтичный (Pop Up) стенд",
    description: "Pop Up стенд 3×3 секции. Поставляется в жёсткой бокс-трибуне на колёсиках.",
    minPrice: 2750,
  },
  {
    name: "JUST L FLEX",
    subtitle: "Баннерный стенд",
    description: "Материал — алюминий, пластик. Защёлкивающийся профиль — соединяется в длину.",
    minPrice: 1550,
  },
  {
    name: "JUST ROLL TIP D",
    subtitle: "Роллерный стенд",
    description: "Роллерный, алюминий. Постер хранится в основании, выкатывается. Монтаж 15 секунд.",
    minPrice: 550,
  },
  {
    name: "JUST COUNTER 2×2",
    subtitle: "Мобильный Pop Up ресепшен",
    description: "Материал — трубки, металл. Pop Up ресепшен. Нейлоновый чехол в подарок.",
    minPrice: 1000,
  },
  {
    name: "JUST SWING ZIGZAG",
    subtitle: "Брошюрная стойка",
    description: "Стойка на 6 карманов A4. Алюминий и оргстекло. Поставляется в чемодане.",
    minPrice: 11400,
  },
];

const TIMELINE: { year: number; project: string }[] = [
  { year: 1993, project: "Выставочная экспозиция СХК на CEETEX, Лондон (Англия)" },
  { year: 1995, project: "Оформление выставки Томской области, Харбин (Китай)" },
  { year: 1996, project: "Графический комплекс экспозиции Томской области, ярмарка в Ганновере (Германия)" },
  { year: 2006, project: "Получение дилерства Maxibit + экспозиция Томской области на «Интурмаркет»" },
  { year: 2008, project: "Выставочная экспозиция Департамента развития предпринимательства на ИНТУРМАРКЕТ-2008" },
  { year: 2015, project: "Участие в выставках рекламных технологий в Шанхае и Москве" },
  { year: 2016, project: "Расширение ассортимента выставочного оборудования. Оформление ТПУ к 120-летию" },
  { year: 2017, project: "Участие в 17-й выставке «Нефть, газ, геология»" },
  { year: 2022, project: "Оформление международной конференции «ГОРОД IT»" },
  { year: 2024, project: "Город IT 2024 + чемпионат RoboCup" },
  { year: 2025, project: "Комплексное оформление «Город IT 2025»" },
];

export default function ExhibitionPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[85vh] flex items-center bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/exhibition.jpg"
              alt="Выставочные стенды"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
          </div>
          <div className="max-w-[1280px] mx-auto px-6 py-20 relative z-10 w-full">
            <div className="max-w-2xl">
              <div className="inline-block bg-[#3FA3D9] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
                ВЫСТАВЛЯЕМСЯ С 1993 ГОДА
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white tracking-tight leading-tight">
                Выставочные стенды и экспозиции в Томске
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Официальный дилер MAXIBIT (Швеция) с 2006 года. От Pop-up стендов за 1 800 ₽
                до уникальных экспозиций «под ключ».
              </p>
              <div className="flex gap-4 flex-wrap mb-12">
                <a
                  href="#calculator"
                  className="bg-[#3FA3D9] hover:bg-[#2E91C7] text-white px-8 py-4 rounded-xl text-base font-bold transition shadow-xl"
                >
                  Рассчитать стенд
                </a>
                <a
                  href="#models"
                  className="bg-black/50 backdrop-blur border border-white/40 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-black/70 transition shadow-xl"
                >
                  Все модели
                </a>
              </div>
              <div className="flex gap-8 text-left">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#3FA3D9] leading-none">30+</div>
                  <div className="text-sm text-white/80 mt-1">лет в выставках</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#3FA3D9] leading-none">12</div>
                  <div className="text-sm text-white/80 mt-1">моделей стендов</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#3FA3D9] leading-none">Maxibit</div>
                  <div className="text-sm text-white/80 mt-1">дилер с 2006</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Что мы делаем */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Полный цикл выставочной подготовки
            </h2>
            <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
              6 направлений — от концепции стенда до монтажа на любой площадке мира.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white rounded-2xl border border-slate-200 hover:border-[#3FA3D9] hover:shadow-lg transition-all p-6">
                  <div className="w-12 h-12 rounded-xl bg-[#3FA3D9]/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-[#3FA3D9]" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MAXIBIT */}
        <section id="models" className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Официальный дилер с 2006
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">MAXIBIT — премиум-сегмент</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Швеция, с 1993 года на мировом рынке. Цельнометаллические конструкции, 300+ сборок без потери геометрии.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {MAXIBIT_MODELS.map((m) => (
                <article
                  key={m.title}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-[#3FA3D9] hover:shadow-2xl hover:shadow-[#3FA3D9]/20 transition-all"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                    <ImageWithFallback
                      src={m.img}
                      alt={m.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      fallbackNode={
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3FA3D9] to-[#1E5F8C] flex flex-col items-center justify-center text-white p-6 text-center">
                          <div className="text-2xl font-bold tracking-wider">MAXIBIT</div>
                          <div className="text-xs opacity-80 uppercase tracking-widest mt-1">
                            Премиум-сегмент
                          </div>
                        </div>
                      }
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#3FA3D9]">
                      {m.price}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-[#3FA3D9] uppercase tracking-wider mb-1">
                      {m.type}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-slate-900 leading-tight">{m.title}</h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">{m.description}</p>
                    <div className="text-sm text-slate-500">
                      <strong className="text-slate-700">Размер:</strong> {m.size}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* JUST */}
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                Расширенный ассортимент
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">JUST — эконом-сегмент</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Доступные мобильные стенды для разовых мероприятий и POS-материалов. От 1 800 ₽.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {JUST_MODELS.map((model) => (
                <article
                  key={model.name}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-[#3FA3D9] hover:shadow-xl transition-all"
                >
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-700 to-slate-900 flex flex-col items-center justify-center text-white p-4 text-center">
                    <div className="text-xs uppercase tracking-widest opacity-60 mb-2">
                      {model.subtitle}
                    </div>
                    <div className="text-2xl font-bold tracking-tight">{model.name}</div>
                  </div>
                  <div className="p-5">
                    <div className="text-xl font-bold text-[#3FA3D9] mb-1">
                      от {model.minPrice.toLocaleString("ru-RU")} ₽
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{model.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Калькулятор */}
        <ExhibitionCalculator />

        {/* Портфолио */}
        <ExhibitionPortfolio />

        {/* Хроника */}
        <section className="py-12 md:py-20 bg-slate-50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Хроника проектов</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                32 года выставочной работы — от Лондона 1993 до «Город IT 2025».
              </p>
            </div>
            <div className="relative">
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-3 left-0 right-0 h-0.5 bg-slate-300"
              />
              <ol className="flex gap-6 overflow-x-auto lg:overflow-visible lg:grid lg:grid-cols-11 pb-4">
                {TIMELINE.map((t) => (
                  <li
                    key={t.year}
                    className="relative flex-shrink-0 w-56 lg:w-auto text-center"
                  >
                    <div className="mx-auto mb-3 w-6 h-6 rounded-full bg-[#3FA3D9] ring-4 ring-white shadow-md relative z-10" />
                    <div className="text-lg font-bold text-slate-900 mb-1">{t.year}</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t.project}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <CTAForm accentColor="#3FA3D9" />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingWA />
    </>
  );
}
