const STATS = [
  { num: "751", label: "рекламных сторон" },
  { num: "348", label: "цифровых сторон" },
  { num: "27", label: "цифровых LED-экранов" },
  { num: "226", label: "конструкций" },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-20 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl shadow-lg p-6 text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand mb-2 leading-none">{s.num}</div>
              <div className="text-sm text-slate-600 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
