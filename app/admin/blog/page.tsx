"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import { BLOG_CATEGORY_LABELS, type BlogPost } from "@/lib/types/blog";

export default function AdminBlogDashboard() {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setError(data?.error || `Не удалось загрузить список (HTTP ${res.status}).`);
        return;
      }
      setBlog(data.blog || []);
      setWarning(
        data.source === "local"
          ? "GitHub недоступен — список показан из локальной копии. Сохранение может не работать: проверьте GITHUB_TOKEN в настройках Timeweb."
          : null,
      );
    } catch {
      setError("Сервер не отвечает или нет соединения. Попробуйте обновить страницу.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Удалить статью "${title}"?`)) return;
    const res = await fetch(`/api/admin/blog/${slug}`, { method: "DELETE" });
    if (res.ok) {
      alert("Удалено. Timeweb передеплоит за 2-3 минуты.");
      load();
    } else {
      alert("Ошибка удаления");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <AdminNav />
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Блог — управление</h1>
          <Link
            href="/admin/blog/new"
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold"
          >
            + Добавить статью
          </Link>
        </div>

        {loading && (
          <div className="text-center py-12 text-slate-500">Загрузка...</div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
            <div className="font-semibold mb-1">Не удалось загрузить список</div>
            <div className="text-sm mb-4">{error}</div>
            <button
              onClick={load}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700"
            >
              Повторить
            </button>
          </div>
        )}

        {!loading && !error && warning && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm">
            ⚠️ {warning}
          </div>
        )}

        {!loading && !error && blog.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500">
            Статей пока нет. Создайте первую через «+ Добавить статью».
          </div>
        )}

        {!loading && !error && blog.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold">Дата</th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Заголовок
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Категория
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-semibold">
                    Мин
                  </th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {blog.map((b) => (
                  <tr key={b.slug} className="border-t border-slate-100">
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {b.dateLabel}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      <div>{b.title}</div>
                      <div className="text-xs text-slate-500 font-mono">{b.slug}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {BLOG_CATEGORY_LABELS[b.category] || b.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      ~{b.readingMinutes}
                    </td>
                    <td className="px-4 py-3 flex gap-2 justify-end">
                      <Link
                        href={`/admin/blog/${b.slug}/edit`}
                        className="text-brand hover:underline text-sm"
                      >
                        Редактировать
                      </Link>
                      <button
                        onClick={() => handleDelete(b.slug, b.title)}
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
          ℹ️ Изменения публикуются на сайте автоматически через 2-3 минуты после
          сохранения (Timeweb, автодеплой из main).
        </div>
      </div>
    </div>
  );
}
