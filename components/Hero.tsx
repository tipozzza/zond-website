import { STATS } from "@/lib/site-data";

export default function Hero() {
  return (
    <section className="hero-bg text-white pt-[70px] pb-20 relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-14 items-center">
          {/* Левая часть */}
          <div>
            <span className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider mb-7">
              <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
              №1 в наружной рекламе Томска с 1992 года
            </span>

            <h1 className="text-[clamp(38px,5.5vw,64px)] leading-[1.05] font-extrabold tracking-tight mb-7">
              Делаем рекламу,<br />
              которая{" "}
              <span className="bg-gradient-to-r from-accent-yellow via-accent-pink to-section-design bg-clip-text text-transparent">
                видна<br />всему городу
              </span>
            </h1>

            <p className="text-lg text-white/85 mb-9 max-w-[560px] font-light">
              {STATS.area} м² собственной рекламной сети, {STATS.digital} цифровых сторон,
              производство любых вывесок и металлоконструкций. Размещение, печать,
              монтаж и обслуживание — под ключ.
            </p>

            <div className="flex gap-3 flex-wrap mb-14">
              <a href="#contact-form" className="btn btn-primary btn-lg">Подобрать рекламу</a>
              <a href="#map" className="btn btn-outline-white btn-lg">Открыть карту →</a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-9 border-t border-white/10">
              <StatItem num="1992" label="Год основания" />
              <StatItem num={STATS.constructions.toString()} label="Конструкций" />
              <StatItem num={STATS.digital.toString()} label="Цифровых сторон" />
              <StatItem num={STATS.area} label="м² сети" />
            </div>
          </div>

          {/* Правая часть — визуальный макет */}
          <div className="relative bg-white/5 backdrop-blur-2xl rounded-2xl aspect-[4/5] overflow-hidden p-8 border border-white/10">
            <div className="relative z-10 bg-gradient-to-br from-brand to-section-led text-white rounded-lg p-12 text-center mt-8 shadow-2xl shadow-brand/40">
              <div className="text-xs font-bold uppercase tracking-wider opacity-85 mb-3">Digital · Лента, Томск</div>
              <div className="text-3xl font-black leading-none tracking-tight">ОТКРЫТИЕ<br />26 мая</div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-white/95 text-[#1f2530] flex items-center gap-3.5 shadow-xl">
              <div className="w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center flex-shrink-0">📍</div>
              <div className="text-sm leading-snug">
                <strong className="block text-sm mb-0.5">пр. Ленина, центр</strong>
                <span className="text-gray-500 text-xs">1 440 показов в день · 25 000 ₽/мес</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatItem({ num, label }: { num: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-extrabold bg-gradient-to-r from-accent-yellow to-accent-pink bg-clip-text text-transparent leading-none mb-1.5 tracking-tight">
        {num}
      </div>
      <div className="text-xs text-white/85 uppercase tracking-wider font-medium">{label}</div>
    </div>
  );
}
