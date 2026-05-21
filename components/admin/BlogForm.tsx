"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BLOG_CATEGORIES,
  BLOG_CATEGORY_LABELS,
  computeReadingMinutes,
  type BlogCategory,
  type BlogPost,
} from "@/lib/types/blog";

type Props = {
  initial?: BlogPost;
  mode: "create" | "edit";
};

const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const TRANSLIT_MAP: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z",
  и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r",
  с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sch",
  ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya",
};

function autoDateLabel(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return "";
  return `${parseInt(d, 10).toString().padStart(2, "0")} ${MONTHS[parseInt(m, 10) - 1]} ${y}`;
}

function transliterate(s: string) {
  return s
    .toLowerCase()
    .split("")
    .map((c) => (TRANSLIT_MAP[c] !== undefined ? TRANSLIT_MAP[c] : c))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export default function BlogForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState({
    slug: initial?.slug || "",
    date: initial?.date || new Date().toISOString().slice(0, 10),
    dateLabel: initial?.dateLabel || "",
    title: initial?.title || "",
    metaTitle: initial?.metaTitle || "",
    metaDescription: initial?.metaDescription || "",
    excerpt: initial?.excerpt || "",
    category: (initial?.category || "general") as BlogCategory,
    tagsRaw: (initial?.tags || []).join(", "),
    image: initial?.image || "",
    content: initial?.content || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const readingMinutes = useMemo(
    () => computeReadingMinutes(data.content),
    [data.content],
  );

  const update = <K extends keyof typeof data>(field: K, value: (typeof data)[K]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("slug", data.slug || transliterate(data.title));
      formData.append("date", data.date);
      const res = await fetch("/api/admin/blog/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Ошибка загрузки");
        return;
      }
      update("image", result.url);
      alert("Фото загружено!");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const tags = data.tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      slug: data.slug || transliterate(data.title),
      date: data.date,
      dateLabel: data.dateLabel || autoDateLabel(data.date),
      title: data.title,
      metaTitle: data.metaTitle.trim() || undefined,
      metaDescription: data.metaDescription,
      excerpt: data.excerpt,
      category: data.category,
      tags,
      image: data.image,
      content: data.content,
      readingMinutes: computeReadingMinutes(data.content),
    };

    try {
      const url =
        mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${initial!.slug}`;
      const method = mode === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Ошибка сохранения");
        return;
      }
      alert(mode === "create" ? "Статья создана!" : "Статья обновлена!");
      router.push("/admin/blog");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm p-6 space-y-4 max-w-3xl"
    >
      <div>
        <label className="block text-sm font-semibold mb-1">Заголовок (H1) *</label>
        <input
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Дата *</label>
          <input
            type="date"
            value={data.date}
            onChange={(e) => {
              update("date", e.target.value);
              update("dateLabel", autoDateLabel(e.target.value));
            }}
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Подпись даты</label>
          <input
            value={data.dateLabel}
            onChange={(e) => update("dateLabel", e.target.value)}
            placeholder="01 мая 2026"
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          URL slug {mode === "edit" && "(нельзя менять)"}
        </label>
        <input
          value={data.slug}
          onChange={(e) =>
            update("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
          }
          disabled={mode === "edit"}
          placeholder="auto от заголовка"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 disabled:bg-slate-100"
        />
        <p className="text-xs text-slate-500 mt-1">
          Используется в URL статьи: /blog/{data.slug || "auto"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Категория *</label>
          <select
            value={data.category}
            onChange={(e) => update("category", e.target.value as BlogCategory)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-white"
          >
            {BLOG_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {BLOG_CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">
            Время чтения (авто)
          </label>
          <input
            value={`~${readingMinutes} мин`}
            disabled
            className="w-full border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Теги (через запятую)</label>
        <input
          value={data.tagsRaw}
          onChange={(e) => update("tagsRaw", e.target.value)}
          placeholder="наружная реклама, билборды, Томск"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Meta Title (SEO, ≤ 60 симв.)
        </label>
        <input
          value={data.metaTitle}
          onChange={(e) => update("metaTitle", e.target.value)}
          placeholder="Если пусто — берётся заголовок"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-slate-500 mt-1">
          Длина: {data.metaTitle.length} симв.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Meta Description (SEO, 140-160 симв.) *
        </label>
        <textarea
          value={data.metaDescription}
          onChange={(e) => update("metaDescription", e.target.value)}
          required
          rows={2}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
        <p className="text-xs text-slate-500 mt-1">
          Длина: {data.metaDescription.length} симв.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Краткое описание (для карточки списка) *
        </label>
        <textarea
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
          rows={2}
          placeholder="1-2 предложения"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">
          Контент (Markdown) *
        </label>
        <textarea
          value={data.content}
          onChange={(e) => update("content", e.target.value)}
          required
          rows={20}
          placeholder="Используйте ## для подзаголовков и [текст](/url) для ссылок. Абзацы — через пустую строку."
          className="w-full border border-slate-300 rounded-lg px-3 py-2 font-mono text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">
          Поддержка: ## заголовки 2-го уровня, [текст](/url) — внутренние ссылки,
          [текст](https://…) — внешние. Длинные статьи: 1500-3500 слов.
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Главное фото (обложка)</label>
        <div className="flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="flex-1 text-sm"
          />
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={!imageFile || uploading}
            className="bg-slate-700 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            {uploading ? "Загрузка..." : "Загрузить"}
          </button>
        </div>
        {data.image && (
          <div className="mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image} alt="" className="max-h-32 rounded" />
            <p className="text-xs text-slate-500 mt-1">{data.image}</p>
          </div>
        )}
        <p className="text-xs text-slate-500 mt-2">
          Внутри текста статьи можно вставлять ссылки на любые существующие фото из{" "}
          <code>/images/</code> — используйте Markdown-синтаксис изображения (см.
          инструкцию).
        </p>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="bg-brand text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {saving ? "Сохранение..." : "Сохранить"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
          className="text-slate-600 hover:text-slate-900 px-4 py-3"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
