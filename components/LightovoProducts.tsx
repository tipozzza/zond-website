"use client";

const PRODUCTS = [
  { name: "Гирлянда Нить", image: "/images/led/product-nit.jpg", description: "Тонкая декоративная гирлянда" },
  { name: "Гирлянда Бахрома", image: "/images/led/product-bahroma.jpg", description: "Свисающие нити-сосульки" },
  { name: "Гирлянда Сетка", image: "/images/led/product-setka.jpg", description: "Для деревьев и фасадов" },
  { name: "Дюралайт", image: "/images/led/product-duralight.jpg", description: "Гибкий световой шнур" },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent)
                      parent.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center text-5xl">✨</div>';
                  }}
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
