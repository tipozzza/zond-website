"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";

type NewsRecord = {
  slug: string;
  date: string;
  dateLabel: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  externalUrl?: string;
  gallery?: string[];
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
  const [gallery, setGallery] = useState<string[]>(initial?.gallery ?? []);
  const [galleryBusy, setGalleryBusy] = useState(false);

  const update = (field: keyof typeof data, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));

  // Галерея: несколько фото. Сжимаем на клиенте (как в портфолио), затем
  // грузим каждое отдельным запросом с unique=1 (уникальное имя файла), пути
  // складываем в массив gallery, который сохранится вместе с новостью.
  const handleGalleryAdd = async (files: FileList) => {
    setGalleryBusy(true);
    setError("");
    try {
      const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
      for (const f of arr) {
        let upload: File = f;
        try {
          const compressed = await imageCompression(f, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: "image/jpeg",
          });
          upload = new File([compressed], "gallery.jpg", { type: "image/jpeg" });
        } catch {
          // fallback: исходный файл
        }
        const fd = new FormData();
        fd.append("file", upload);
        fd.append("slug", data.slug || transliterate(data.title));
        fd.append("date", data.date);
        fd.append("unique", "1");
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const r = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(r.error || "Ошибка загрузки фото галереи");
          break;
        }
        setGallery((prev) => [...prev, r.url]);
      }
    } finally {
      setGalleryBusy(false);
    }
  };

  const removeGalleryItem = (i: number) =>
    setGallery((prev) => prev.filter((_, idx) => idx !== i));

  const moveGalleryItem = (i: number, dir: -1 | 1) =>
    setGallery((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    setError("");
    try {
      // Сжимаем обложку на клиенте, как и фото галереи, — иначе тяжёлый
      // оригинал (несколько МБ) грузится на странице новостей медленно, «полосами».
      let upload: File = imageFile;
      try {
        const compressed = await imageCompression(imageFile, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
        upload = new File([compressed], "cover.jpg", { type: "image/jpeg" });
      } catch {
        // fallback: исходный файл
      }
      const formData = new FormData();
      formData.append("file", upload);
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
      gallery,
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

      <div>
        <label className="block text-sm font-semibold mb-1">
          Галерея фото {gallery.length > 0 && `(${gallery.length})`}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={galleryBusy}
          onChange={(e) => {
            if (e.target.files?.length) handleGalleryAdd(e.target.files);
            e.target.value = "";
          }}
          className="w-full text-sm"
        />
        <p className="text-xs text-slate-500 mt-1">
          {galleryBusy
            ? "Загрузка и сжатие…"
            : "Можно выбрать несколько файлов. Сжимаются автоматически. Порядок — стрелками."}
        </p>
        {gallery.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
            {gallery.map((url, i) => (
              <div
                key={url}
                className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-100"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryItem(i)}
                  aria-label="Удалить из галереи"
                  className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 rounded-full text-sm leading-none"
                >
                  ✕
                </button>
                <div className="absolute bottom-1 left-1 right-1 flex justify-between">
                  <button
                    type="button"
                    onClick={() => moveGalleryItem(i, -1)}
                    disabled={i === 0}
                    aria-label="Левее"
                    className="bg-black/60 text-white w-6 h-6 rounded-full text-sm leading-none disabled:opacity-30"
                  >
                    ◀
                  </button>
                  <button
                    type="button"
                    onClick={() => moveGalleryItem(i, 1)}
                    disabled={i === gallery.length - 1}
                    aria-label="Правее"
                    className="bg-black/60 text-white w-6 h-6 rounded-full text-sm leading-none disabled:opacity-30"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ))}
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
