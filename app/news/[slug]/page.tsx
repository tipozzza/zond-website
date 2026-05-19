import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import { NEWS } from "@/lib/news-data";

export async function generateStaticParams() {
  return NEWS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = NEWS.find((n) => n.slug === slug);
  if (!news) return { title: "Новость не найдена" };
  return {
    title: `${news.title} | Зонд-Реклама`,
    description: news.excerpt,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = NEWS.find((n) => n.slug === slug);
  if (!news) notFound();

  return (
    <>
      <PixelBorder />
      <Header />
      <main className="min-h-screen bg-white py-12">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link href="/news" className="text-sm text-brand hover:underline mb-6 inline-block">
            ← Все новости
          </Link>

          <time className="text-sm text-slate-500 block mb-3">{news.dateLabel}</time>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{news.title}</h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={news.image} alt={news.title} className="w-full rounded-2xl mb-8" />

          <div className="prose prose-lg max-w-none">
            {news.content.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 leading-relaxed text-slate-800">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/news" className="text-brand hover:underline">
              ← Все новости
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <PixelBorder />
      <FloatingTG />
    </>
  );
}
