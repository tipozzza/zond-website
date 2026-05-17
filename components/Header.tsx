import Image from "next/image";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

const SERVICES_DROPDOWN = [
  { label: "Наружная реклама", href: "/outdoor" },
  { label: "Широкоформатная печать", href: "/print" },
  { label: "Производство", href: "/production" },
  { label: "Дизайн и полиграфия", href: "/design" },
  { label: "LED и новогоднее", href: "/led" },
  { label: "Выставочные экспозиции", href: "/exhibition" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[76px] gap-8">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-purple.png"
            alt={COMPANY.fullName}
            width={180}
            height={44}
            className="h-11 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex gap-7 text-sm font-medium items-center">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 text-[#1f2530] hover:text-brand transition-colors py-2"
                >
                  {link.label}
                  <svg
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible focus-within:opacity-100 focus-within:visible transition-opacity">
                  <div className="min-w-[260px] py-2 bg-white rounded-xl shadow-xl border border-gray-100">
                    {SERVICES_DROPDOWN.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-5 py-2.5 text-sm text-[#1f2530] hover:bg-[#f6f5fa] hover:text-brand transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1f2530] hover:text-brand transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${COMPANY.phoneRaw}`} className="font-semibold text-brand hidden md:inline">
            {COMPANY.phone}
          </a>
          <a href="#contact-form" className="btn btn-primary">Оставить заявку</a>
        </div>
      </div>
    </header>
  );
}
