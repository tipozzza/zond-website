import { MAP_TYPES } from "@/lib/site-data";

export default function MapPreview() {
  return (
    <section id="map" className="py-24 bg-[#f6f5fa]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
          <div>
            <span className="inline-block px-3.5 py-1.5 rounded bg-brand text-white text-xs font-bold uppercase tracking-wider mb-4">
              Карта рекламоносителей
            </span>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">
              Лучшие места<br />в Томске и Северске
            </h2>
            <p className="text-lg text-gray-500 mb-7 leading-relaxed">
              656 рекламных поверхностей на ключевых магистралях и в торговых центрах.
              Выберите конструкцию на карте, посмотрите фото и трафик,
              забронируйте онлайн на 3 дня без оплаты.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {MAP_TYPES.map((type) => (
                <span key={type} className="bg-white border border-gray-200 px-3.5 py-1.5 rounded text-sm font-medium hover:border-brand hover:text-brand transition-colors">
                  {type}
                </span>
              ))}
            </div>
            <a href="#" className="btn btn-primary btn-lg">Открыть карту →</a>
          </div>

          {/* Превью карты */}
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[#1a0e3a] to-[#2a1655] relative overflow-hidden shadow-2xl shadow-brand/25">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:40px_40px]" />

            {/* Маркеры */}
            <Marker className="top-[28%] left-[22%]" color="red" />
            <Marker className="top-[42%] left-[58%]" color="blue" />
            <Marker className="top-[55%] left-[32%]" color="red" />
            <Marker className="top-[22%] left-[68%]" color="blue" />
            <Marker className="top-[65%] left-[48%]" color="purple" />
            <Marker className="top-[38%] left-[18%]" color="red" />
            <Marker className="top-[70%] left-[72%]" color="blue" />

            <div className="absolute bottom-6 left-6 right-6 bg-[#140a28]/90 backdrop-blur-md text-white py-4 px-5 rounded-xl flex items-center justify-between gap-4">
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-section-outdoor" />
                  <span>Свободно (416)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-section-design" />
                  <span>Digital (240)</span>
                </div>
              </div>
              <a href="#" className="text-white font-semibold text-xs">Подробнее →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marker({ className, color }: { className: string; color: "red" | "blue" | "purple" }) {
  const colorMap = {
    red: "bg-section-outdoor shadow-[0_0_16px_rgba(227,6,19,0.6)]",
    blue: "bg-section-design shadow-[0_0_16px_rgba(0,174,239,0.6)]",
    purple: "bg-section-led shadow-[0_0_16px_rgba(111,46,145,0.6)]",
  };
  return (
    <div className={`absolute w-5 h-5 rounded-full border-[3px] border-white ${colorMap[color]} ${className}`} />
  );
}
