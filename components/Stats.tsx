import Counter from "./Counter";

const STATS = [
  { num: 751, label: "сторон размещения" },
  { num: 336, label: "цифровых сторон" },
  { num: 27, label: "LED-экранов" },
  { num: 244, label: "конструкции" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-7xl font-bold text-brand leading-none mb-3 tracking-tight">
                <Counter to={s.num} />
              </div>
              <div className="text-sm md:text-base text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
