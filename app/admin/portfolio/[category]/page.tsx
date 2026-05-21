"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import type { PortfolioCategory, PortfolioItem } from "@/lib/types/portfolio";

export default function CategoryAdminPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;

  const [data, setData] = useState<PortfolioCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/admin/portfolio/${category}`);
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const json = await res.json();
    setData(json.category || null);
    setLoading(false);
  }, [category, router]);

  useEffect(() => {
    load();
  }, [load]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Удалить «${title}»?`)) return;
    const res = await fetch(`/api/admin/portfolio/${category}/${id}`, { method: "DELETE" });
    if (res.ok) {
      alert("Удалено. Vercel передеплоит за 2-3 минуты.");
      load();
    } else {
      const err = await res.json();
      alert(`Ошибка: ${err.error || "неизвестная"}`);
    }
  };

  const move = async (idx: number, direction: -1 | 1) => {
    if (!data) return;
    const items = [...data.items];
    const newIdx = idx + direction;
    if (newIdx < 0 || newIdx >= items.length) return;
    [items[idx], items[newIdx]] = [items[newIdx], items[idx]];
    const orderedIds = items.map((it) => it.id);
    setData({ ...data, items }); // optimistic
    const res = await fetch("/api/admin/portfolio/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, orderedIds }),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(`Ошибка: ${err.error || "неизвестная"}`);
      load();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <AdminNav />
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/admin/portfolio" className="text-sm text-slate-600 hover:underline">
              ← К категориям
            </Link>
            <h1 className="text-3xl font-bold mt-2">
              {data?.title || "Категория"}{" "}
              <span className="text-slate-400 font-mono text-base">/{category}</span>
            </h1>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold"
          >
            ➕ Добавить фото
          </button>
        </div>

        {loading && <div className="text-center py-12 text-slate-500">Загрузка...</div>}

        {!loading && data && data.items.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-500">
            Пока нет фото. Нажмите «Добавить фото».
          </div>
        )}

        {!loading && data && data.items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.items.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</div>
                  <div className="text-xs text-slate-500 line-clamp-2 mb-3">{item.description}</div>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex gap-1">
                      <button
                        onClick={() => move(idx, -1)}
                        disabled={idx === 0}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                        title="Вверх"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => move(idx, 1)}
                        disabled={idx === data.items.length - 1}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30"
                        title="Вниз"
                      >
                        ↓
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditId(item.id)}
                        className="text-brand hover:underline"
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        className="text-red-600 hover:underline"
                      >
                        🗑️ Удалить
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showAdd && (
          <AddPhotoModal
            category={category}
            onClose={() => setShowAdd(false)}
            onSuccess={() => {
              setShowAdd(false);
              load();
            }}
          />
        )}

        {editId && data && (
          <EditItemModal
            category={category}
            item={data.items.find((it) => it.id === editId)!}
            onClose={() => setEditId(null)}
            onSuccess={() => {
              setEditId(null);
              load();
            }}
          />
        )}
      </div>
    </div>
  );
}

function AddPhotoModal({
  category,
  onClose,
  onSuccess,
}: {
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Выберите файл");
      return;
    }
    setSaving(true);
    setError("");
    const form = new FormData();
    form.append("image", file);
    form.append("title", title);
    form.append("description", description);
    const res = await fetch(`/api/admin/portfolio/${category}`, { method: "POST", body: form });
    setSaving(false);
    if (res.ok) {
      onSuccess();
    } else {
      const err = await res.json();
      setError(err.error || "Ошибка");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold">Добавить фото</h2>

        <label
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const f = e.dataTransfer.files?.[0];
            if (f) setFile(f);
          }}
          className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
            dragOver ? "border-brand bg-brand/5" : "border-slate-300 hover:border-slate-400"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          {file ? (
            <div className="text-sm">
              <div className="font-semibold">{file.name}</div>
              <div className="text-slate-500">{(file.size / 1024).toFixed(0)} KB</div>
            </div>
          ) : (
            <div className="text-slate-500 text-sm">
              Перетащите файл или нажмите чтобы выбрать
            </div>
          )}
        </label>

        <div>
          <label className="block text-sm font-semibold mb-1">Заголовок *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 px-4 py-2"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

function EditItemModal({
  category,
  item,
  onClose,
  onSuccess,
}: {
  category: string;
  item: PortfolioItem;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch(`/api/admin/portfolio/${category}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    setSaving(false);
    if (res.ok) {
      onSuccess();
    } else {
      const err = await res.json();
      setError(err.error || "Ошибка");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold">Редактировать</h2>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.title} className="w-full max-h-48 object-cover rounded-lg" />
        <div>
          <label className="block text-sm font-semibold mb-1">Заголовок *</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 px-4 py-2"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
