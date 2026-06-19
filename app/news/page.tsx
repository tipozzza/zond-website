import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/news-data";
import { buildOgUrl } from "@/lib/og";

export const metadata: Metadata = {
  title: "Новости Зонд-Реклама — что происходит в компании",
  description:
    "Новые цифровые билборды, реализованные проекты, акции и события рекламной компании Зонд-Реклама в Томске. Обновления каждую неделю.",
  keywords: [
    "новости Зонд-Реклама",
    "новости рекламы Томск",
    "новые билборды Томск",
  ],
  alternates: { canonical: "/news" },
  openGraph: {
    title: "Новости агентства ZOND",
    description:
      "Реклама, производство, события в Томске. Цифровые билборды, реализованные проекты, акции.",
    url: "https://zondreklama.ru/news",
    siteName: "ZOND",
    locale: "ru_RU",
    type: "website",
    images: [
      {
        url: buildOgUrl({
          title: "Новости агентства ZOND",
          subtitle: "Реклама, производство, события в Томске",
          category: "Новости",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Новости агентства ZOND",
    description: "Реклама, производство, события в Томске",
    images: [
      buildOgUrl({
        title: "Новости агентства ZOND",
        subtitle: "Реклама, производство, события в Томске",
        category: "Новости",
      }),
    ],
  },
};

export default function NewsPage() {
  return (
    <>
      <PixelBorder />
      <Header />
      <main className="min-h-screen bg-slate-50 py-12">
        <Breadcrumb
          items={[
            { name: "Главная", url: "/" },
            { name: "Новости", url: "/news" },
          ]}
        />
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Новости</h1>
            <p className="text-slate-600">Что происходит в Зонд-Реклама</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS.map((item) => (
              <Link
                key={item.slug}
                href={`/news/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <time className="text-xs text-slate-500 mb-2">{item.dateLabel}</time>
                  <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-brand transition">
                    {item.title}
                  </h2>
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{item.excerpt}</p>
                  <span className="text-sm font-semibold text-brand mt-auto">Читать далее →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
