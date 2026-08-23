"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  type BlogCategory,
  type BlogPost,
} from "@/lib/types/blog";

type Props = { posts: BlogPost[] };

export default function BlogList({ posts }: Props) {
  const [active, setActive] = useState<BlogCategory | "all">("all");

  const visibleCategories = useMemo(() => {
    const present = new Set(posts.map((p) => p.category));
    return BLOG_CATEGORIES.filter((c) => present.has(c));
  }, [posts]);

  const filtered = useMemo(() => {
    if (active === "all") return posts;
    return posts.filter((p) => p.category === active);
  }, [posts, active]);

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-500">
        Статьи скоро появятся. Загляните позже.
      </div>
    );
  }

  return (
    <>
      {visibleCategories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          <button
            onClick={() => setActive("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              active === "all"
                ? "bg-brand text-white"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Все
          </button>
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                active === cat
                  ? "bg-brand text-white"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {BLOG_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold text-brand px-2.5 py-1 rounded-full">
                {BLOG_CATEGORY_LABELS[item.category] || item.category}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <time>{item.dateLabel}</time>
                <span>~{item.readingMinutes} мин</span>
              </div>
              <h2 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-brand transition">
                {item.title}
              </h2>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">
                {item.excerpt}
              </p>
              <span className="text-sm font-semibold text-brand mt-auto">
                Читать статью →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
