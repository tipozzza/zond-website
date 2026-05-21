import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/blog"
          className="text-sm text-slate-600 hover:underline mb-4 inline-block"
        >
          ← К списку статей
        </Link>
        <h1 className="text-3xl font-bold mb-6">Добавить статью</h1>
        <BlogForm mode="create" />
      </div>
    </div>
  );
}
