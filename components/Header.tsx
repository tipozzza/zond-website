import Image from "next/image";
import Link from "next/link";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

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

        <nav className="hidden lg:flex gap-7 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[#1f2530] hover:text-brand transition-colors">
              {link.label}
            </a>
          ))}
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
