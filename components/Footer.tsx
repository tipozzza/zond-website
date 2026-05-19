import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/site-data";

const SECTIONS = [
  {
    title: "Направления",
    links: [
      { label: "Наружная реклама", href: "/outdoor" },
      { label: "Широкоформатная печать", href: "/print" },
      { label: "Производство", href: "/production" },
      { label: "Выставочные экспозиции", href: "/exhibition" },
      { label: "Дизайн и полиграфия", href: "/design" },
      { label: "Светодиодная продукция", href: "/led" },
    ],
  },
  {
    title: "Компания",
    links: [
      { label: "О нас", href: "/about" },
      { label: "Кейсы", href: "/#cases" },
      { label: "Контакты", href: "/contacts" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contacts" className="footer-bg text-white/85 pt-16 pb-6">
      <div className="max-w-[1280px] mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Image
              src="/logo-horizontal-white.png"
              alt={COMPANY.fullName}
              width={200}
              height={53}
              className="h-12 w-auto mb-4"
            />
            <p className="text-sm leading-relaxed mb-4">
              Лидер рекламно-производственной отрасли в Томске с 1992 года.
              Полный цикл: размещение, производство, дизайн, монтаж, обслуживание.
            </p>
            <div className="flex gap-2.5 mt-4">
              {["VK", "TG", "YT", "WA"].map((n) => (
                <a key={n} href="#" className="w-9 h-9 rounded-lg bg-white/8 flex items-center justify-center text-xs font-bold text-white hover:bg-white hover:text-brand transition-colors">
                  {n}
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-2.5 text-sm">
                {section.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Контакты</h4>
            <ul className="space-y-2.5 text-sm">
              <li>{COMPANY.address}</li>
              <li><a href={`tel:${COMPANY.phoneRaw}`} className="hover:text-white">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-white">{COMPANY.email}</a></li>
              <li>{COMPANY.hours}</li>
            </ul>
          </div>
        </div>

        <div className="pt-7 border-t border-white/10 flex justify-between items-center text-xs flex-wrap gap-4">
          <span>© 1992–2026 {COMPANY.fullName} · {COMPANY.legalName} · ИНН {COMPANY.inn}</span>
          <a href="#" className="hover:text-white">Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
}
