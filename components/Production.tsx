import Image from "next/image";

const FEATURES = [
  "Печать до 5 метров шириной",
  "Срок производства от 3 дней",
  "Своя бригада монтажа с автовышкой",
  "Гарантия на конструкции 12 месяцев",
];

export default function Production() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/production.jpg"
              alt="Цех широкоформатной печати"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <span className="block text-xs font-semibold text-brand uppercase tracking-wider mb-3">
              Производство
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5 leading-tight">
              Все этапы — у нас в Томске
            </h2>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8">
              От проектирования до монтажа — никаких посредников. Собственный цех широкоформатной
              печати (HP Latex), станки лазерной резки, бригады монтажников. Это значит
              контроль качества, сжатые сроки и адекватные цены.
            </p>

            <ul className="space-y-3.5">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center mt-0.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-base text-slate-700">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
