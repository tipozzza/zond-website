import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import NewsGallery from "@/components/NewsGallery";
import { NEWS, type NewsItem } from "@/lib/news-data";
import { buildOgUrl } from "@/lib/og";

const BASE_URL = "https://zondreklama.ru";

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
  const ogUrl = buildOgUrl({
    title: news.title,
    subtitle: news.dateLabel,
    category: "Новости",
  });
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
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: `${news.title} — Зонд-Реклама, Томск`,
        },
      ],
    },
  };
}

type Segment =
  | { kind: "text"; value: string }
  | { kind: "internal"; href: string; label: string }
  | { kind: "external"; href: string; label: string }
  | { kind: "file"; href: string; label: string };

const LINK_RE = /\[([^\]]+)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)/g;

// Ссылка на файл (каталог, прайс) — обычный <a download>, не next/link:
// Link стал бы префетчить файл целиком (PDF каталога ~17 МБ) при каждом
// показе новости и пытаться открыть его как страницу сайта.
const FILE_RE = /\.(pdf|docx?|xlsx?|pptx?|zip)$/i;

// Адрес сайта, написанный в тексте без разметки («zondreklama.ru/led»),
// превращаем во внутреннюю ссылку. Точка в конце предложения в ссылку
// не попадает: в пути допускаем только буквы, цифры, «-», «_» и «/».
// Почту (office@zondreklama.ru) и поддомены не трогаем — см. lookbehind.
const SITE_RE = /(?<![@\w.\/-])(?:https?:\/\/)?(?:www\.)?zondreklama\.ru(\/[A-Za-z0-9\-_/]*)?/g;

function linkify(text: string): Segment[] {
  const out: Segment[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  SITE_RE.lastIndex = 0;
  while ((match = SITE_RE.exec(text)) !== null) {
    if (match.index > lastIdx) out.push({ kind: "text", value: text.slice(lastIdx, match.index) });
    out.push({ kind: "internal", href: match[1] || "/", label: match[0] });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < text.length) out.push({ kind: "text", value: text.slice(lastIdx) });
  return out;
}

function parseInline(line: string): Segment[] {
  const out: Segment[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(line)) !== null) {
    if (match.index > lastIdx) {
      out.push(...linkify(line.slice(lastIdx, match.index)));
    }
    const [, label, href] = match;
    const path = href.split(/[?#]/)[0];
    out.push({
      kind: FILE_RE.test(path) ? "file" : href.startsWith("/") ? "internal" : "external",
      href,
      label,
    });
    lastIdx = match.index + match[0].length;
  }
  if (lastIdx < line.length) {
    out.push(...linkify(line.slice(lastIdx)));
  }
  return out;
}

function renderInline(segments: Segment[]) {
  return segments.map((seg, i) => {
    if (seg.kind === "text") return <span key={i}>{seg.value}</span>;
    if (seg.kind === "file") {
      return (
        <a key={i} href={seg.href} download className="text-brand hover:underline">
          {seg.label}
        </a>
      );
    }
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
        const segments = parseInline(block.trim());
        // Абзац из одной ссылки на файл — показываем кнопкой «скачать»,
        // чтобы каталог было видно сразу, а не искать ссылку в тексте.
        if (segments.length === 1 && segments[0].kind === "file") {
          const file = segments[0];
          return (
            <p key={i} className="my-6 not-prose">
              <a
                href={file.href}
                download
                className="btn btn-primary gap-2 whitespace-normal text-center no-underline"
              >
                <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
                {file.label}
              </a>
            </p>
          );
        }
        return (
          <p key={i} className="mb-4 leading-relaxed text-slate-800">
            {renderInline(segments)}
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

          <Image
            src={news.image}
            alt={`${news.title} — Зонд-Реклама, Томск`}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 768px"
            className="w-full h-auto rounded-2xl mb-8"
            priority
          />

          <NewsBody content={news.content} />

          <NewsGallery images={news.gallery ?? []} title={news.title} />

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
