import Link from "next/link";
import { TIMELINE } from "@/lib/site-data";

export default function Timeline() {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-[#0a0820] to-[#1a0e3a] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(111,46,145,0.4)_0%,transparent_40%),radial-gradient(circle_at_80%_70%,rgba(0,174,239,0.2)_0%,transparent_40%)]" />

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-14">
          <span className="inline-block px-3.5 py-1.5 rounded bg-white/12 text-white text-xs font-bold uppercase tracking-wider mb-4">
            О компании
          </span>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-tight mb-4">
            33 года развития<br />рекламного рынка Томска
          </h2>
          <p className="text-lg text-white/85 leading-relaxed">
            Мы первыми установили щит 3×6 в Томске, первыми привезли{" "}
            <Link href="/outdoor" className="underline decoration-white/40 hover:decoration-white">
              digital-биллборд
            </Link>
            , первыми построили цифровую сеть. Развиваем рынок вместе с городом.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 relative mt-14">
          <div className="hidden lg:block absolute left-7 right-7 top-5 h-0.5 bg-gradient-to-r from-section-outdoor via-section-production via-section-exhibition to-section-led opacity-50" />

          {TIMELINE.map((item) => (
            <div key={item.year} className="text-center relative">
              <div className="w-4 h-4 rounded-full bg-white mx-auto mb-6 relative z-10 shadow-[0_0_0_6px_rgba(255,255,255,0.2)]" />
              <div className="text-3xl font-extrabold mb-2">{item.year}</div>
              <div className="text-sm text-white/85 leading-relaxed">{item.event}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
