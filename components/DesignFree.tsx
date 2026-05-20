export default function DesignFree() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#0B1E3F] to-[#1E3A5F] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
            <div>
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
            <div className="flex justify-center">
              <div className="text-9xl opacity-90">🎨</div>
            </div>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4C430] rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
