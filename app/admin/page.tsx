"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [news, setNews] = useState<NewsRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/news");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setNews(data.news || []);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Удалить новость "${title}"?`)) return;
    const res = await fetch(`/api/admin/news/${slug}`, { method: "DELETE" });
    if (res.ok) {
      alert("Удалено. Vercel передеплоит за 2-3 минуты.");
      load();
    } else {
      alert("Ошибка удаления");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Новости — управление</h1>
          <div className="flex gap-3">
            <Link
              href="/admin/news/new"
              className="bg-brand text-white px-6 py-2 rounded-lg font-semibold"
            >
              + Добавить новость
            </Link>
            <button
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900 px-4 py-2"
            >
              Выйти
            </button>
          </div>
        </div>

        {loading && <div className="text-center py-12 text-slate-500">Загрузка...</div>}

        {!loading && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Дата</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Заголовок</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Slug</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {news.map((n) => (
                  <tr key={n.slug} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-600">{n.dateLabel}</td>
                    <td className="px-4 py-3 font-medium">{n.title}</td>
                    <td className="px-4 py-3 text-sm text-slate-500 font-mono">{n.slug}</td>
                    <td className="px-4 py-3 flex gap-2 justify-end">
                      <Link
                        href={`/admin/news/${n.slug}/edit`}
                        className="text-brand hover:underline text-sm"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(n.slug, n.title)}
                        className="text-red-600 hover:underline text-sm ml-2"
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8 text-sm text-slate-500 bg-white p-4 rounded-xl">
          ℹ️ Изменения публикуются на сайте автоматически через 2-3 минуты после сохранения (Vercel автодеплой).
        </div>
      </div>
    </div>
  );
}
