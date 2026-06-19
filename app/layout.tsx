import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrika";
import StructuredData from "@/components/StructuredData";
import CookieBanner from "@/components/CookieBanner";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zondreklama.ru"),
  title: {
    default: "Зонд-Реклама — Реклама и производство в Томске с 1992 года",
    template: "%s | Зонд-Реклама",
  },
  description:
    "Наружная реклама, широкоформатная печать, производство вывесок, дизайн и полиграфия в Томске. 751 рекламная сторона, собственный цех. Звоните: 8 (3822) 97-97-05",
  keywords: [
    "реклама Томск",
    "наружная реклама Томск",
    "производство рекламы Томск",
    "печать Томск",
    "Зонд-Реклама",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Зонд-Реклама — Реклама и производство в Томске",
    description:
      "Полный цикл рекламы и производства: наружка, печать, вывески, дизайн, выставки.",
    url: "https://zondreklama.ru",
    siteName: "Зонд-Реклама",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: "/api/og?title=Зонд-Реклама&subtitle=Реклама и производство в Томске с 1992 года&category=ZOND × Лайтово",
        width: 1200,
        height: 630,
        alt: "Зонд-Реклама — рекламная компания в Томске",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Зонд-Реклама — Реклама и производство в Томске",
    description: "Полный цикл рекламы в Томске с 1992 года",
    images: [
      "/api/og?title=Зонд-Реклама&subtitle=Реклама и производство в Томске с 1992 года&category=ZOND × Лайтово",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={rubik.variable}>
      <body>
        <StructuredData />
        <YandexMetrika />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
