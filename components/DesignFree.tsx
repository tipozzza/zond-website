import Image from "next/image";

export default function DesignFree() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden text-white shadow-2xl">
          {/* Фоновое фото */}
          <Image
            src="/images/led/service-design-free.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          {/* Затемнение, чтобы текст оставался читаемым */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1E3F]/95 via-[#0B1E3F]/85 to-[#0B1E3F]/40" />

          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-2xl">
              <div className="inline-block bg-[#F4C430] text-[#0B1E3F] px-3 py-1 rounded-full text-sm font-bold mb-4">
                БЕСПЛАТНО
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Дизайн-проект — за наш счёт
              </h2>
              <p className="text-lg text-white/90 mb-6 leading-relaxed">
                Прежде чем заказать оформление — получите готовый дизайн-проект бесплатно.
                Покажем как будет выглядеть фасад, ёлка или площадь до начала работ. Учтём
                бюджет, площадь, ваши пожелания.
              </p>
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 bg-[#F4C430] hover:bg-[#E8B86E] text-[#0B1E3F] px-8 py-4 rounded-xl font-bold transition"
              >
                Получить дизайн-проект
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
