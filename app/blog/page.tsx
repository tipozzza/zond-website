import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import BlogList from "@/components/BlogList";
import { BLOG } from "@/lib/blog-data";
import { buildOgUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Блог Зонд-Реклама — гайды по рекламе и производству",
  description:
    "Полезные материалы о наружной рекламе, печати, производстве вывесок, дизайне и LED-решениях в Томске. Опыт компании Зонд-Реклама с 1992 года.",
  keywords: [
    "блог Зонд-Реклама",
    "реклама Томск статьи",
    "наружная реклама гайд",
    "производство вывесок инструкция",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Блог ZOND — гайды по рекламе",
    description:
      "Цены, согласования, технологии для бизнеса в Томске. Опыт компании с 1992 года.",
    url: "https://zondreklama.ru/blog",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Блог ZOND — гайды по рекламе",
          subtitle: "Цены, согласования, технологии для бизнеса в Томске",
          category: "Блог",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог ZOND — гайды по рекламе",
    description: "Цены, согласования, технологии для бизнеса в Томске",
    images: [
      buildOgUrl({
        title: "Блог ZOND — гайды по рекламе",
        subtitle: "Цены, согласования, технологии для бизнеса в Томске",
        category: "Блог",
      }),
    ],
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Блог", url: "/blog" },
          ]}
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Блог</h1>
            <p className="text-slate-600">
              Гайды и статьи о рекламе, печати и производстве в Томске
            </p>
          </div>
          <BlogList posts={BLOG} />
        </div>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
