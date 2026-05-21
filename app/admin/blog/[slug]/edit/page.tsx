"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import BlogForm from "@/components/admin/BlogForm";
import type { BlogPost } from "@/lib/types/blog";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/blog")
      .then((r) => {
        if (r.status === 401) {
          router.push("/admin/login");
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (data) {
          const item = data.blog.find((b: BlogPost) => b.slug === slug);
          if (item) setPost(item);
        }
        setLoading(false);
      });
  }, [slug, router]);

  if (loading)
    return <div className="min-h-screen bg-slate-100 p-6">Загрузка...</div>;
  if (!post)
    return <div className="min-h-screen bg-slate-100 p-6">Статья не найдена</div>;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/admin/blog"
          className="text-sm text-slate-600 hover:underline mb-4 inline-block"
        >
          ← К списку статей
        </Link>
        <h1 className="text-3xl font-bold mb-6">Редактировать: {post.title}</h1>
        <BlogForm mode="edit" initial={post} />
      </div>
    </div>
  );
}
