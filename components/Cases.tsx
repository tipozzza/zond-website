import { CASES } from "@/lib/site-data";

export default function Cases() {
  return (
    <section id="cases" className="py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded bg-brand text-white text-xs font-bold uppercase tracking-wider mb-4">
            Кейсы клиентов
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-tight mb-4">
            Наши клиенты добиваются<br />
            <span className="text-brand">измеримых результатов</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Подробные истории работы с федеральными сетями и томскими компаниями.
            Что было задачей, как мы её решили, какой результат получили.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {CASES.map((caseItem) => (
            <article key={caseItem.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:border-brand-light transition-all">
              <div className={`bg-gradient-to-br ${caseItem.gradient} aspect-[16/10] flex items-end p-5 relative overflow-hidden`}>
                <span className="bg-white/95 text-[#1f2530] px-3 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {caseItem.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="text-xs text-brand uppercase tracking-wider mb-2 font-semibold">{caseItem.client}</div>
                <h3 className="text-lg font-bold mb-3.5 leading-snug">{caseItem.title}</h3>
                <div className="flex gap-6 pt-4 border-t border-gray-200">
                  {caseItem.results.map((r, i) => (
                    <div key={i}>
                      <div className="text-2xl font-extrabold text-brand leading-none">{r.num}</div>
                      <div className="text-xs text-gray-500 mt-1">{r.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
