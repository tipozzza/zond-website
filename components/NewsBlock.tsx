"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NEWS } from "@/lib/news-data";

export default function NewsBlock() {
  const latest = NEWS.slice(0, 3);

  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Новости</h2>
            <p className="text-slate-600">Что нового в Зонд-Реклама</p>
          </div>
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-1 text-brand font-semibold hover:underline"
          >
            Все новости
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latest.map((item) => (
            <Link
              key={item.slug}
              href={`/news/${item.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={`${item.title} — новость Зонд-Реклама, Томск`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="p-5">
                <time className="text-xs text-slate-500 mb-2 block">{item.dateLabel}</time>
                <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-brand transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2 mb-3">{item.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Читать новость
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-brand font-semibold hover:underline"
          >
            Все новости <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
