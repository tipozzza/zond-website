"use client";

const PRODUCTS = [
  {
    name: "Гирлянда Нить",
    image: "/images/led/product-nit.jpg",
    description:
      "Классическая гирлянда-нить с тёплыми белыми LED. Универсальное решение для деревьев, фасадов и интерьеров.",
  },
  {
    name: "Гирлянда Бахрома",
    image: "/images/led/product-bahroma.jpg",
    description:
      "Свисающие нити разной длины — идеально для оформления карнизов, козырьков и витрин.",
  },
  {
    name: "Гирлянда Занавес",
    image: "/images/led/product-zanaves.jpg",
    description: "Стена из света для оформления окон, входных групп и фотозон.",
  },
  {
    name: "Гирлянда Шары",
    image: "/images/led/product-shary.jpg",
    description:
      "Светящиеся шары на прозрачном проводе — мягкий уют для кафе, террас и банкетных залов.",
  },
  {
    name: "Светодиодные снежинки",
    image: "/images/led/product-snejinki.jpg",
    description:
      "Объёмные подвесные снежинки с холодным белым свечением — украшение для улиц и общественных пространств.",
  },
  {
    name: "Светодиодные метеориты",
    image: "/images/led/product-meteority.jpg",
    description: "Эффект падающих звёзд — динамичная подсветка для деревьев и фасадов.",
  },
  {
    name: "Дюралайт",
    image: "/images/led/product-duralight.jpg",
    description: "Гибкий световой шнур для контурной подсветки любых форм и линий.",
  },
  {
    name: "Световая фигура «Снеговик»",
    image: "/images/led/product-snegovik-shary.jpg",
    description:
      "Объёмная LED-фигура высотой 1,5–3 м — украшение площадей, скверов и входных групп. Изготавливаем фигуры любых форм под заказ.",
  },
];

export default function LightovoProducts() {
  return (
    <section id="products" className="py-20 bg-[#0B1E3F] text-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Виды продукции LIGHTOVO</h2>
          <p className="text-white/70">
            Все гирлянды сертифицированы и протестированы на заводе
          </p>
          <div className="w-16 h-1 bg-[#F4C430] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {PRODUCTS.map((product, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-900 mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-1">{product.name}</h3>
              <p className="text-xs text-white/70 text-center">{product.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="https://lightovo.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition"
          >
            Полный каталог на lightovo.ru
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
