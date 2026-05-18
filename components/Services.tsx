import Link from "next/link";
import {
  Megaphone,
  Printer,
  Wrench,
  Palette,
  Lightbulb,
  Building2,
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
          6 направлений рекламы
        </h2>
        <p className="text-lg text-slate-600 text-center mb-12 max-w-2xl mx-auto">
          От размещения на digital-биллбордах до изготовления металлоконструкций — весь цикл задач решаем сами.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id] ?? Megaphone;
            return (
              <article
                key={service.id}
                className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:border-brand transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-5">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-5 flex-1 leading-relaxed">{service.description}</p>
                <Link
                  href={service.href}
                  className="text-brand font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all self-start"
                >
                  Подробнее →
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
