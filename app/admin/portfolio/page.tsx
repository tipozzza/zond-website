"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import type { PortfolioData } from "@/lib/types/portfolio";

export default function PortfolioDashboard() {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/portfolio");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json().catch(() => null);
      if (!res.ok || !json) {
        setError(json?.error || `Не удалось загрузить портфолио (HTTP ${res.status}).`);
        return;
      }
      setData(json.portfolio || null);
      setWarning(
        json.source === "local"
          ? "GitHub недоступен — данные показаны из локальной копии. Сохранение может не работать: проверьте GITHUB_TOKEN в настройках Timeweb."
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

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <AdminNav />
        <h1 className="text-3xl font-bold mb-6">Портфолио — категории</h1>

        {loading && <div className="text-center py-12 text-slate-500">Загрузка...</div>}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
            <div className="font-semibold mb-1">Не удалось загрузить портфолио</div>
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

        {!loading && !error && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.values(data).map((cat) => (
              <Link
                key={cat.slug}
                href={`/admin/portfolio/${cat.slug}`}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-slate-200"
              >
                <div className="text-sm text-slate-500 font-mono mb-1">/{cat.slug}</div>
                <div className="text-xl font-bold mb-2">{cat.title}</div>
                <div className="text-sm text-slate-600">
                  {cat.items.length}{" "}
                  {cat.items.length === 1
                    ? "фото"
                    : cat.items.length >= 2 && cat.items.length <= 4
                      ? "фото"
                      : "фото"}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-sm text-slate-500 bg-white p-4 rounded-xl">
          ℹ️ Изменения публикуются через 2-3 минуты (Timeweb, автодеплой из main).
        </div>
      </div>
    </div>
  );
}
