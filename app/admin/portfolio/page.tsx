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

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/portfolio");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const json = await res.json();
    setData(json.portfolio || null);
    setLoading(false);
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

        {!loading && data && (
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
          ℹ️ Изменения публикуются через 2-3 минуты (Vercel автодеплой).
        </div>
      </div>
    </div>
  );
}
