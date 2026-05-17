export default function Stats() {
  const stats = [
    { num: "33", label: "года на рынке Томска" },
    { num: "1000+", label: "клиентов работали с нами с 1992 года" },
    { num: "№1", label: "по количеству м² наружной рекламы" },
    { num: "6", label: "производственных направлений в одной ГК" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-brand to-section-led text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className={`text-center p-4 ${i < stats.length - 1 ? "lg:border-r border-white/10" : ""}`}>
              <div className="text-6xl font-extrabold leading-none mb-3.5 tracking-tight">{s.num}</div>
              <div className="text-sm text-white/85 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
