import Link from "next/link";
import {
  Megaphone,
  Printer,
  Wrench,
  Palette,
  Lightbulb,
  Building2,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICES } from "@/lib/site-data";

const ICONS: Record<string, LucideIcon> = {
  outdoor: Megaphone,
  print: Printer,
  production: Wrench,
  design: Palette,
  led: Lightbulb,
  exhibition: Building2,
};

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          6 направлений <span className="text-brand">под одной крышей</span>
        </h2>
        <p className="text-lg text-slate-600 text-center mb-16 max-w-3xl mx-auto">
          От проектирования до монтажа: наружная реклама, печать, производство конструкций,
          дизайн, выставочные стенды и LED-решения.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id] ?? Megaphone;
            return (
              <article
                key={service.id}
                className="group bg-white rounded-3xl p-8 relative overflow-hidden border border-slate-200 hover:border-brand shadow-sm hover:shadow-2xl hover:shadow-brand/20 hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                <span className="absolute top-4 right-6 text-7xl font-black text-slate-100 group-hover:text-brand/10 transition-colors duration-500 select-none pointer-events-none leading-none">
                  0{index + 1}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand/10 to-brand/5 group-hover:from-brand group-hover:to-purple-600 flex items-center justify-center transition-all duration-500 mb-5 relative z-10">
                  <Icon
                    size={28}
                    className="text-brand group-hover:text-white transition-colors duration-500"
                  />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed flex-1 relative z-10">
                  {service.description}
                </p>

                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-brand font-semibold group/link relative z-10 self-start"
                >
                  <span>Подробнее</span>
                  <ArrowRight
                    size={18}
                    className="group-hover/link:translate-x-1 transition-transform duration-300"
                  />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
