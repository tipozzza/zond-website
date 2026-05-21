import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import BlogList from "@/components/BlogList";
import { BLOG } from "@/lib/blog-data";

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
