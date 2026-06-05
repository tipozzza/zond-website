import Image from "next/image";
import Link from "next/link";
import { HERO_BLURS } from "@/lib/hero-blurs";
import { pluralizeYears } from "@/lib/pluralize";

const YEARS_ON_MARKET = new Date().getFullYear() - 1992;
const BADGES = [
  `${YEARS_ON_MARKET} ${pluralizeYears(YEARS_ON_MARKET)} на рынке`,
  "226 конструкций",
  "1000+ клиентов",
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <Image
        src="/images/hero-tomsk.jpg"
        alt="Томск на закате с фиолетовой LED-подсветкой"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        blurDataURL={HERO_BLURS.home}
        className="object-cover object-[center_70%]"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent" />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 py-24 flex justify-end">
        <div className="max-w-xl w-full flex flex-col gap-6 text-white">
          <span
            className="self-start inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-section-outdoor animate-pulse shadow-[0_0_12px_rgba(227,6,19,0.8)]" />
            Работаем с 1992 года
          </span>

          <h1
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] drop-shadow-lg animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            Наружная реклама<br />в Томске
          </h1>

          <p
            className="text-xl md:text-2xl text-white/90 font-light leading-relaxed drop-shadow animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            751 рекламная сторона на 226 конструкциях.{" "}
            <Link
              href="/production"
              className="text-accent-yellow underline decoration-accent-yellow/60 hover:text-amber-300 hover:decoration-amber-300 transition-colors"
            >
              Производство
            </Link>{" "}
            и монтаж под ключ — с 1992 года.
          </p>

          <div
            className="flex flex-wrap gap-3 animate-fade-up"
            style={{ animationDelay: "550ms" }}
          >
            <Link
              href="#contact-form"
              className="inline-flex items-center justify-center bg-brand hover:bg-brand/90 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Получить расчёт
            </Link>
            <Link
              href="/outdoor"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              Посмотреть конструкции
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-0 right-0 z-10 animate-fade-up"
        style={{ animationDelay: "800ms" }}
      >
        <div className="max-w-[1280px] mx-auto px-6 flex flex-wrap gap-2 md:gap-4 justify-end">
          {BADGES.map((b) => (
            <span
              key={b}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-medium text-white"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
