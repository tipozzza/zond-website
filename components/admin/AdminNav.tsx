"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminNav() {
  const router = useRouter();
  const pathname = usePathname();
  const isPortfolio = pathname.startsWith("/admin/portfolio");
  const isBlog = pathname.startsWith("/admin/blog");
  const isNews = !isPortfolio && !isBlog;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <nav className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
      <div className="flex gap-2">
        <Link
          href="/admin"
          className={`px-4 py-2 rounded-lg font-semibold ${
            isNews ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Новости
        </Link>
        <Link
          href="/admin/portfolio"
          className={`px-4 py-2 rounded-lg font-semibold ${
            isPortfolio ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Портфолио
        </Link>
        <Link
          href="/admin/blog"
          className={`px-4 py-2 rounded-lg font-semibold ${
            isBlog ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Блог
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="text-slate-600 hover:text-slate-900 px-4 py-2 text-sm"
      >
        Выйти
      </button>
    </nav>
  );
}
