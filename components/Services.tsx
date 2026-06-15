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
import RevealHeading from "./RevealHeading";

const ICONS: Record<string, LucideIcon> = {
  outdoor: Megaphone,
  print: Printer,
  production: Wrench,
  design: Palette,
  led: Lightbulb,
  exhibition: Building2,
};

const ACCENT_COLORS: Record<string, string> = {
  outdoor: "#F57C28",
  print: "#FFCC00",
  production: "#7CB342",
  exhibition: "#3FA3D9",
  design: "#1657BD",
  led: "#67008F",
};

export default function Services() {
  return (
    <section id="services" className="py-12 md:py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <RevealHeading
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          segments={[
            { text: "6 направлений" },
            { text: "под одной крышей", accent: true },
          ]}
          sub="От проектирования до монтажа: наружная реклама, печать, производство конструкций, дизайн, выставочные стенды и LED-решения."
          subClassName="text-lg text-slate-600 text-center mb-16 max-w-3xl mx-auto"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id] ?? Megaphone;
            const accent = ACCENT_COLORS[service.id] ?? "#6F395D";
            return (
              <article
                key={service.id}
                style={{ "--accent": accent } as React.CSSProperties}
                className="group bg-white rounded-3xl p-8 relative overflow-hidden border-2 border-slate-200 hover:border-[var(--accent)] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col"
              >
                <span
                  className="absolute top-4 right-6 text-5xl sm:text-6xl md:text-7xl font-black text-slate-200 group-hover:text-[var(--accent)] transition-colors duration-500 select-none pointer-events-none leading-none"
                  style={{ opacity: 0.15 }}
                >
                  0{index + 1}
                </span>

                <div className="w-14 h-14 rounded-2xl bg-slate-100 group-hover:bg-[var(--accent)] flex items-center justify-center transition-all duration-500 mb-6 relative z-10">
                  <Icon
                    size={24}
                    className="text-slate-700 group-hover:text-white transition-colors duration-500"
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
                  style={{ color: accent }}
                  className="inline-flex items-center gap-2 font-semibold group/link relative z-10 self-start transition-colors"
                >
                  <span>Подробнее о {service.title.toLowerCase()}</span>
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
