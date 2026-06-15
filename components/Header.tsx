"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { COMPANY, NAV_LINKS } from "@/lib/site-data";

const SERVICES_MAIN = [
  { label: "Наружная реклама", href: "/outdoor" },
  { label: "Широкоформатная печать", href: "/print" },
  { label: "Производство", href: "/production" },
  { label: "Дизайн и полиграфия", href: "/design" },
  { label: "Выставочные экспозиции", href: "/exhibition" },
  { label: "Светодиодная продукция", href: "/led" },
];

const SERVICES_ADDITIONAL = [
  { label: "Русификация вывесок", href: "/russifikaciya" },
  { label: "Паспорт фасада", href: "/pasport-fasada" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);
  const mobileNavLinks = NAV_LINKS.filter((l) => !l.hasDropdown);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[76px] gap-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-horizontal-purple.png"
              alt={COMPANY.fullName}
              width={180}
              height={48}
              className="h-12 md:h-14 w-auto"
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
                      {SERVICES_MAIN.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="block px-5 py-2.5 text-sm text-[#1f2530] hover:bg-[#f6f5fa] hover:text-brand transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                      <div className="my-1.5 mx-5 border-t border-gray-100" />
                      <div className="px-5 pt-1 pb-1 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                        Доп. услуги
                      </div>
                      {SERVICES_ADDITIONAL.map((s) => (
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

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${COMPANY.phoneRaw}`} className="font-semibold text-brand">
              {COMPANY.phone}
            </a>
            <a href="#contact-form" className="btn btn-primary">
              Оставить заявку
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -mr-2 text-[#1f2530]"
            aria-label="Открыть меню"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={close} />
          <div className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[400px] bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <Image
                src="/logo-horizontal-purple.png"
                alt={COMPANY.fullName}
                width={150}
                height={40}
                className="h-9 w-auto"
              />
              <button
                onClick={close}
                className="p-2 -mr-2 text-[#1f2530]"
                aria-label="Закрыть меню"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="text-xs uppercase tracking-wider text-gray-400 mb-3 font-semibold">
                Услуги
              </div>
              <div className="space-y-1">
                {SERVICES_MAIN.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    onClick={close}
                    className="block py-2 text-lg font-medium text-[#1f2530] hover:text-brand transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <div className="my-2 pt-2 border-t border-gray-100">
                  <div className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold mb-1">
                    Доп. услуги
                  </div>
                  {SERVICES_ADDITIONAL.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={close}
                      className="block py-2 text-lg font-medium text-[#1f2530] hover:text-brand transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-b border-gray-100">
              <div className="space-y-1">
                {mobileNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="block py-2 text-lg font-medium text-[#1f2530] hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 text-xl font-bold text-brand"
              >
                <Phone size={22} />
                {COMPANY.phone}
              </a>
              <a
                href="#contact-form"
                onClick={close}
                className="block w-full bg-brand hover:bg-brand/90 text-white text-center px-6 py-4 rounded-xl font-bold text-lg transition-colors"
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
