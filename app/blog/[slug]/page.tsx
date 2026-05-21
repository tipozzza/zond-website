import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PixelBorder from "@/components/PixelBorder";
import FloatingTG from "@/components/FloatingTG";
import { BLOG } from "@/lib/blog-data";
import {
  BLOG_CATEGORY_HREF,
  BLOG_CATEGORY_LABELS,
  type BlogPost,
} from "@/lib/types/blog";

const BASE_URL = "https://zond-website.vercel.app";

export async function generateStaticParams() {
  return BLOG.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG.find((b) => b.slug === slug);
  if (!post) return { title: "Статья не найдена" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitle || post.title,
      description: post.metaDescription,
      publishedTime: post.date,
      images: [
        {
          url: post.image,
          alt: `${post.title} — Зонд-Реклама, Томск`,
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
const IMAGE_RE = /^!\[([^\]]*)\]\((\/[^\s)]+|https?:\/\/[^\s)]+)\)$/;

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

function BlogBody({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="prose prose-lg max-w-none">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        const img = trimmed.match(IMAGE_RE);
        if (img) {
          const [, alt, src] = img;
          return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={alt}
              loading="lazy"
              className="w-full rounded-2xl my-8"
            />
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h2
              key={i}
              className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-slate-900"
            >
              {renderInline(parseInline(trimmed.slice(3).trim()))}
            </h2>
          );
        }
        if (trimmed.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-xl md:text-2xl font-bold mt-8 mb-3 text-slate-900"
            >
              {renderInline(parseInline(trimmed.slice(4).trim()))}
            </h3>
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

function PostingSchema({ post }: { post: BlogPost }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    description: post.metaDescription,
    keywords: post.tags.join(", "),
    image: [`${BASE_URL}${post.image}`],
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
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    timeRequired: `PT${post.readingMinutes}M`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG.find((b) => b.slug === slug);
  if (!post) notFound();

  const related = BLOG.filter(
    (b) => b.slug !== post.slug && b.category === post.category,
  ).slice(0, 3);

  const ctaHref = BLOG_CATEGORY_HREF[post.category];
  const ctaLabel =
    post.category === "general"
      ? "Посмотреть все услуги"
      : `Подробнее об услуге: ${BLOG_CATEGORY_LABELS[post.category]}`;

  return (
    <>
      <PixelBorder />
      <Header />
      <PostingSchema post={post} />
      <main className="min-h-screen bg-white py-12">
        <article className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-brand hover:underline mb-6 inline-block"
          >
            ← Все статьи
          </Link>

          <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
            <span className="bg-brand/10 text-brand font-semibold px-2.5 py-1 rounded-full text-xs">
              {BLOG_CATEGORY_LABELS[post.category] || post.category}
            </span>
            <time>{post.dateLabel}</time>
            <span>•</span>
            <span>~{post.readingMinutes} мин чтения</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {post.title}
          </h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={`${post.title} — Зонд-Реклама, Томск`}
            className="w-full rounded-2xl mb-8"
          />

          <BlogBody content={post.content} />

          <div className="mt-12 p-6 bg-brand/5 border border-brand/20 rounded-2xl">
            <p className="text-slate-800 mb-3">
              Нужна помощь с задачей по теме статьи? Зонд-Реклама работает в Томске с
              1992 года.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={ctaHref}
                className="inline-block bg-brand text-white px-5 py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
              >
                {ctaLabel}
              </Link>
              <Link
                href="/#contact-form"
                className="inline-block border border-brand text-brand px-5 py-2.5 rounded-lg font-semibold hover:bg-brand hover:text-white transition"
              >
                Оставить заявку
              </Link>
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-slate-200">
              <h2 className="text-2xl font-bold mb-6">Похожие статьи</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group block bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-brand transition"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-sm font-bold line-clamp-2 group-hover:text-brand transition">
                        {r.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2">
                        {r.dateLabel} • ~{r.readingMinutes} мин
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12 pt-8 border-t border-slate-200">
            <Link href="/blog" className="text-brand hover:underline">
              ← Все статьи
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
