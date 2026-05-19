import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЗОНД-РЕКЛАМА — Наружная реклама в Томске с 1992 года",
  description:
    "Зонд-Реклама — рекламно-производственная компания в Томске с 1992 года. 726 рекламных сторон на 226 конструкциях. Полный цикл: дизайн, печать, производство, монтаж.",
  keywords: [
    "наружная реклама Томск", "digital биллборды Томск",
    "производство вывесок Томск", "широкоформатная печать Томск",
    "Зонд-Реклама",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body>{children}</body>
    </html>
  );
}
