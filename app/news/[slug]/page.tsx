import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import { NEWS, type NewsItem } from "@/lib/news-data";

const BASE_URL = "https://zond-website.vercel.app";

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
    title: news.title,
    description: news.excerpt,
    openGraph: {
      type: "article",
      title: news.title,
      description: news.excerpt,
      publishedTime: news.date,
      images: [
        {
          url: news.image,
          alt: `${news.title} — Зонд-Реклама, Томск`,
        },
      ],
    },
  };
}

type Segment =
  | { kind: "text"; value: string }
  | { kind: "internal"; href: string; label: string }
  | { kind: "external"; href: string; label: string };

const LINK_RE = /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;

function parseInline(line: string): Segment[] {
  const out: Segment[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(line)) !== null) {
    if (match.index > lastIdx) {
      out.push({ kind: "text", value: line.slice(lastIdx, match.index) });
    }
    const [, label, href] = match;
    out.push({
      kind: href.startsWith("/") ? "internal" : "external",
      href,
      label,
    });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < line.length) {
    out.push({ kind: "text", value: line.slice(lastIdx) });
  }
  return out;
}

function renderInline(segments: Segment[]) {
  return segments.map((seg, i) => {
    if (seg.kind === "text") return <span key={i}>{seg.value}</span>;
    if (seg.kind === "internal") {
      return (
        <Link key={i} href={seg.href} className="text-brand hover:underline">
          {seg.label}
        </Link>
      );
    }
    return (
      <a
        key={i}
        href={seg.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand hover:underline"
      >
        {seg.label}
      </a>
    );
  });
}

function NewsBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={i} className="text-2xl md:text-3xl font-bold mt-8 mb-3 text-slate-900">
              {renderInline(parseInline(block.slice(3).trim()))}
            </h2>
          );
        }
        return (
          <p key={i} className="mb-4 leading-relaxed text-slate-800">
            {renderInline(parseInline(block))}
          </p>
        );
      })}
    </div>
  );
}

function ArticleSchema({ news }: { news: NewsItem }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    datePublished: news.date,
    dateModified: news.date,
    description: news.excerpt,
    image: [`${BASE_URL}${news.image}`],
    author: {
      "@type": "Organization",
      name: "Зонд-Реклама",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Зонд-Реклама",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo-square-purple.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/news/${news.slug}`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
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
      <ArticleSchema news={news} />
      <main className="min-h-screen bg-white py-12">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link href="/news" className="text-sm text-brand hover:underline mb-6 inline-block">
            ← Все новости
          </Link>

          <time className="text-sm text-slate-500 block mb-3">{news.dateLabel}</time>
          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">{news.title}</h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={news.image}
            alt={`${news.title} — Зонд-Реклама, Томск`}
            className="w-full rounded-2xl mb-8"
          />

          <NewsBody content={news.content} />

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
