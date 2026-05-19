"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
};

type Props = {
  initial?: NewsRecord;
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
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
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
    .slice(0, 50);
}

export default function NewsForm({ initial, mode }: Props) {
  const router = useRouter();
  const [data, setData] = useState({
    slug: initial?.slug || "",
    date: initial?.date || new Date().toISOString().slice(0, 10),
    dateLabel: initial?.dateLabel || "",
    title: initial?.title || "",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    image: initial?.image || "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof typeof data, value: string) =>
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
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
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

    const payload = {
      ...data,
      slug: data.slug || transliterate(data.title),
      dateLabel: data.dateLabel || autoDateLabel(data.date),
    };

    try {
      const url = mode === "create" ? "/api/admin/news" : `/api/admin/news/${initial!.slug}`;
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
      alert(mode === "create" ? "Новость создана!" : "Новость обновлена!");
      router.push("/admin");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-4 max-w-3xl">
      <div>
        <label className="block text-sm font-semibold mb-1">Заголовок *</label>
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
          Используется в URL новости: /news/{data.slug || "auto"}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Краткое описание *</label>
        <textarea
          value={data.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          required
          rows={2}
          placeholder="1-2 предложения для превью"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Полный текст *</label>
        <textarea
          value={data.content}
          onChange={(e) => update("content", e.target.value)}
          required
          rows={8}
          placeholder="Абзацы разделяйте пустой строкой (двойной Enter)"
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-1">Фото</label>
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
          onClick={() => router.push("/admin")}
          className="text-slate-600 hover:text-slate-900 px-4 py-3"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
