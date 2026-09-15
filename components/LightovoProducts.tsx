import Image from "next/image";
import { SECTIONS } from "@/lib/lightovo-catalog";

/**
 * «Виды продукции LIGHTOVO» — девять карточек по разделам каталога
 * (lib/lightovo-catalog.ts): фото, название, короткое описание, цена «от»
 * и якорь на подробный раздел с ценами ниже на странице (#catalog-<id>).
 * Серверный компонент: данные каталога не уезжают в клиентский бандл.
 */
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#catalog-${s.id}`}
              className="group bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-[#F4C430]/60 transition-all flex flex-col"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900 mb-4">
                <Image
                  src={s.hero.src}
                  alt={`${s.label} — ${s.titleAccent}. Лайтово, Томск`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg font-bold text-center mb-1">{s.label}</h3>
              <p className="text-xs text-white/70 text-center flex-1">{s.titleAccent}</p>
              <div className="text-center mt-3">
                <span className="text-[#F4C430] font-bold">{s.from}</span>
              </div>
              <div className="text-center text-xs text-white/60 mt-1 group-hover:text-white transition-colors">
                Подробнее и цены ↓
              </div>
            </a>
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
