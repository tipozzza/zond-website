import Link from "next/link";
import AnimateOnScroll from "./AnimateOnScroll";

export default function MapPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand to-purple-900 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimateOnScroll variant="slide-in-left">
            <div className="inline-block bg-white/10 backdrop-blur px-4 py-1 rounded-full text-sm font-semibold mb-4">
              ИНТЕРАКТИВНАЯ КАРТА
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Найдите подходящую конструкцию за 30 секунд
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Все 726 рекламных сторон по Томску на одной карте. Фильтры по типу, формату и доступности.
              Кликаете на метку — видите фото, цену и статус по месяцам. Бронирование онлайн прямо с карты.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
                <div className="text-4xl font-bold">726</div>
                <div className="text-sm text-white/80">рекламных сторон</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
                <div className="text-4xl font-bold">226</div>
                <div className="text-sm text-white/80">конструкций</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
                <div className="text-4xl font-bold">336</div>
                <div className="text-sm text-white/80">цифровых сторон</div>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-xl">
                <div className="text-4xl font-bold">87%</div>
                <div className="text-sm text-white/80">с подсветкой</div>
              </div>
            </div>

            <Link
              href="/outdoor"
              className="inline-flex items-center gap-2 bg-white text-brand px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition shadow-xl"
            >
              Открыть карту конструкций
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </AnimateOnScroll>

          <AnimateOnScroll variant="scale-in" className="relative">
            <div className="relative aspect-[4/3] bg-white/5 backdrop-blur rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <rect width="400" height="300" fill="rgba(255,255,255,0.05)" />
                <path d="M 60 0 Q 80 80 120 160 Q 140 220 180 300" stroke="rgba(100,149,237,0.4)" strokeWidth="40" fill="none" />
                <line x1="0" y1="100" x2="400" y2="120" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <line x1="0" y1="180" x2="400" y2="170" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <line x1="150" y1="0" x2="170" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                <line x1="280" y1="0" x2="260" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="3" />
                {[
                  [180, 110], [220, 130], [195, 165], [230, 175], [165, 190],
                  [205, 200], [240, 145], [265, 160], [285, 195], [255, 220],
                  [180, 235], [215, 250], [310, 180], [330, 145], [290, 230],
                  [245, 110], [275, 130], [300, 100], [340, 200], [320, 240],
                  [155, 130], [135, 165], [185, 145], [225, 165], [275, 225],
                ].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill="white" opacity="0.95" />
                    <circle cx={x} cy={y} r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" from="6" to="14" dur="2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2s" begin={`${i * 0.1}s`} repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
