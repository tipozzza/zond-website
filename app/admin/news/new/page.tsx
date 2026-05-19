import Link from "next/link";
import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin"
          className="text-sm text-slate-600 hover:underline mb-4 inline-block"
        >
          ← К списку новостей
        </Link>
        <h1 className="text-3xl font-bold mb-6">Добавить новость</h1>
        <NewsForm mode="create" />
      </div>
    </div>
  );
}
