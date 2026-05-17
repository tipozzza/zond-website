import Link from "next/link";
import { SERVICES } from "@/lib/site-data";

const COLOR_BG: Record<string, string> = {
  outdoor: "bg-section-outdoor text-white",
  print: "bg-section-print text-white",
  production: "bg-section-production text-[#1f2530]",
  exhibition: "bg-section-exhibition text-white",
  design: "bg-section-design text-white",
  led: "bg-section-led text-white",
};

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded bg-brand text-white text-xs font-bold uppercase tracking-wider mb-4">
            Направления
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-tight mb-4">
            6 направлений рекламы<br />под <span className="text-brand">одной крышей</span>
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            От размещения на digital-биллбордах до изготовления металлоконструкций
            и новогоднего оформления фасадов. Весь цикл задач решаем сами.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service) => (
            <article key={service.id} className="bg-white rounded-xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all overflow-hidden">
              <div className={`${COLOR_BG[service.color]} h-36 p-6 flex flex-col justify-between relative overflow-hidden`}>
                <div className="text-5xl leading-none relative z-10">{service.icon}</div>
                <h3 className="text-xl font-bold relative z-10 tracking-tight">{service.title}</h3>
                <div className="absolute -right-5 -bottom-5 w-32 h-32 rounded-full bg-white/10" />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{service.description}</p>
                <div className="text-sm pt-4 border-t border-gray-100 space-y-1.5">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <span className="text-brand font-bold">✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <Link href={service.href} className="inline-flex items-center gap-1.5 mt-4 text-brand font-bold text-sm uppercase tracking-wider hover:gap-3 transition-all">
                  К каталогу →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
