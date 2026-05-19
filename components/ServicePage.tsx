import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTAForm from "@/components/CTAForm";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import { SERVICES } from "@/lib/site-data";
import { notFound } from "next/navigation";

const HERO_BG: Record<string, string> = {
  outdoor: "bg-section-outdoor",
  print: "bg-section-print",
  production: "bg-section-production",
  exhibition: "bg-section-exhibition",
  design: "bg-section-design",
  led: "bg-section-led",
};

export default function ServicePage({ id }: { id: string }) {
  const service = SERVICES.find((s) => s.id === id);
  if (!service) notFound();

  const heroBg = HERO_BG[id] ?? "bg-brand";

  return (
    <>
      <PixelBorder />
      <Header />
      <main>
        <section className={`${heroBg} text-white py-24 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30" />
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="text-6xl mb-6">{service.icon}</div>
            <h1 className="text-[clamp(38px,5.5vw,64px)] leading-[1.05] font-extrabold tracking-tight mb-6 max-w-[800px]">
              {service.title}
            </h1>
            <p className="text-lg text-white/90 max-w-[720px] font-light leading-relaxed">
              {service.description}
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">
              Что мы предлагаем
            </h2>
            <ul className="grid md:grid-cols-3 gap-6">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="p-6 rounded-2xl border border-gray-100 bg-[#f6f5fa] text-base leading-relaxed"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <CTAForm />
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
