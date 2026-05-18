import Image from "next/image";

const TEAM_STATS = [
  { value: "55", label: "Человек в команде" },
  { value: "32", label: "Года опыта" },
  { value: "3", label: "Городов присутствия" },
  { value: "1000+", label: "Реализованных проектов" },
];

export default function Team() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Команда, которая решает задачи
          </h2>
          <p className="text-lg text-slate-600">
            55 человек: проектировщики, дизайнеры, монтажники, менеджеры — каждый эксперт в своём.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-xl mb-16">
          <Image
            src="/images/team.jpg"
            alt="Команда Зонд-Реклама"
            fill
            sizes="(min-width: 1024px) 72rem, 100vw"
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {TEAM_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-brand mb-3 leading-none">
                {s.value}
              </div>
              <div className="text-sm text-slate-600">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
