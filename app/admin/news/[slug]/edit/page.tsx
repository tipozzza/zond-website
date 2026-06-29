"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import NewsForm from "@/components/admin/NewsForm";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
  gallery?: string[];
};

export default function EditNewsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [news, setNews] = useState<NewsRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/news")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) {
          const item = data.news.find((n: NewsRecord) => n.slug === slug);
          if (item) setNews(item);
        }
        setLoading(false);
      });
  }, [slug, router]);

  if (loading) return <div className="min-h-screen bg-slate-100 p-6">Загрузка...</div>;
  if (!news) return <div className="min-h-screen bg-slate-100 p-6">Новость не найдена</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="text-sm text-slate-600 hover:underline mb-4 inline-block"
        >
          ← К списку новостей
        </Link>
        <h1 className="text-3xl font-bold mb-6">Редактировать: {news.title}</h1>
        <NewsForm mode="edit" initial={news} />
      </div>
    </div>
  );
}
