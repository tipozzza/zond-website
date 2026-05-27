"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !data || active.id === over.id) return;
    const oldIndex = data.items.findIndex((it) => it.id === active.id);
    const newIndex = data.items.findIndex((it) => it.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    const reordered = arrayMove(data.items, oldIndex, newIndex);
    const orderedIds = reordered.map((it) => it.id);
    const prev = data.items;
    setData({ ...data, items: reordered }); // optimistic
    const res = await fetch("/api/admin/portfolio/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category, orderedIds }),
    });
    if (!res.ok) {
      setData({ ...data, items: prev });
      const err = await res.json();
      alert(`Ошибка сортировки: ${err.error || "неизвестная"}`);
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
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={data.items.map((it) => it.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {data.items.map((item) => (
                  <SortableCard
                    key={item.id}
                    item={item}
                    category={category}
                    onEdit={() => setEditId(item.id)}
                    onDelete={() => handleDelete(item.id, item.title)}
                    onYearChange={(year) => {
                      setData((prev) =>
                        prev
                          ? {
                              ...prev,
                              items: prev.items.map((it) =>
                                it.id === item.id ? { ...it, completionYear: year } : it,
                              ),
                            }
                          : prev,
                      );
                    }}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {!loading && data && data.items.length > 1 && (
          <div className="mt-4 text-xs text-slate-500 text-center">
            🖱️ Перетаскивайте карточки чтобы поменять порядок
          </div>
        )}

        {showAdd && (
          <AddPhotosModal
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

function SortableCard({
  item,
  category,
  onEdit,
  onDelete,
  onYearChange,
}: {
  item: PortfolioItem;
  category: string;
  onEdit: () => void;
  onDelete: () => void;
  onYearChange: (year: number | null) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  const [editingYear, setEditingYear] = useState(false);
  const [yearDraft, setYearDraft] = useState(
    item.completionYear != null ? String(item.completionYear) : "",
  );
  const [yearSaving, setYearSaving] = useState(false);

  const saveYear = async () => {
    if (yearSaving) return;
    const trimmed = yearDraft.trim();
    const parsed = trimmed === "" ? null : parseInt(trimmed, 10);
    const valid = parsed === null || (Number.isFinite(parsed) && parsed >= 1992 && parsed <= 2099);
    if (!valid) {
      setYearDraft(item.completionYear != null ? String(item.completionYear) : "");
      setEditingYear(false);
      return;
    }
    if (parsed === (item.completionYear ?? null)) {
      setEditingYear(false);
      return;
    }
    setYearSaving(true);
    try {
      const res = await fetch(`/api/admin/portfolio/${category}/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completionYear: parsed }),
      });
      if (res.ok) onYearChange(parsed);
      else setYearDraft(item.completionYear != null ? String(item.completionYear) : "");
    } catch {
      setYearDraft(item.completionYear != null ? String(item.completionYear) : "");
    } finally {
      setYearSaving(false);
      setEditingYear(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
    >
      <div
        {...attributes}
        {...listeners}
        className="aspect-[4/3] bg-slate-100 overflow-hidden cursor-grab active:cursor-grabbing"
        title="Перетащите чтобы поменять порядок"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <div className="p-3">
        <div className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</div>
        <div className="text-xs text-slate-500 line-clamp-2 mb-2">{item.description}</div>
        <div className="flex items-center justify-between gap-2 mb-2 text-xs">
          <span className="text-slate-500">Год:</span>
          {editingYear ? (
            <input
              type="number"
              min={1992}
              max={2099}
              value={yearDraft}
              autoFocus
              disabled={yearSaving}
              onChange={(e) => setYearDraft(e.target.value)}
              onBlur={saveYear}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveYear();
                if (e.key === "Escape") {
                  setYearDraft(item.completionYear != null ? String(item.completionYear) : "");
                  setEditingYear(false);
                }
              }}
              placeholder="2024"
              className="w-20 border border-slate-300 rounded px-2 py-0.5 text-xs text-right disabled:opacity-50"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingYear(true)}
              className="font-semibold text-slate-700 hover:text-brand hover:underline"
              title="Кликните чтобы изменить год"
            >
              {item.completionYear ?? "— не указан"}
            </button>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 text-xs">
          <button onClick={onEdit} className="text-brand hover:underline">
            ✏️ Редактировать
          </button>
          <button onClick={onDelete} className="text-red-600 hover:underline">
            🗑️ Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

type PendingFile = {
  id: string;
  file: File;
  title: string;
  description: string;
  completionYear: string; // в форме храним как строку, парсим на сервере
  preview: string;
  originalKB: number;
  compressedKB?: number;
  compressedFile?: File;
};

function stripExt(name: string) {
  return name.replace(/\.[^/.]+$/, "");
}

function AddPhotosModal({
  category,
  onClose,
  onSuccess,
}: {
  category: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [pending, setPending] = useState<PendingFile[]>([]);
  const [globalDesc, setGlobalDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState("");

  const addFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files);
    const next: PendingFile[] = [];
    for (const f of arr) {
      if (!f.type.startsWith("image/")) continue;
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      let compressedFile: File | undefined;
      let compressedKB: number | undefined;
      try {
        const compressed = await imageCompression(f, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
        compressedFile = new File([compressed], f.name.replace(/\.[^/.]+$/, ".jpg"), {
          type: "image/jpeg",
        });
        compressedKB = Math.round(compressedFile.size / 1024);
      } catch {
        // fallback: keep original
      }
      next.push({
        id,
        file: f,
        title: stripExt(f.name),
        description: "",
        completionYear: "",
        preview: URL.createObjectURL(f),
        originalKB: Math.round(f.size / 1024),
        compressedFile,
        compressedKB,
      });
    }
    setPending((p) => [...p, ...next]);
  };

  const removeOne = (id: string) => setPending((p) => p.filter((it) => it.id !== id));
  const update = (
    id: string,
    field: "title" | "description" | "completionYear",
    value: string,
  ) => setPending((p) => p.map((it) => (it.id === id ? { ...it, [field]: value } : it)));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending.length === 0) {
      setError("Выберите хотя бы один файл");
      return;
    }
    setSaving(true);
    setError("");
    setProgress({ done: 0, total: pending.length });

    let firstError: string | null = null;
    for (let i = 0; i < pending.length; i++) {
      const it = pending[i];
      const form = new FormData();
      const uploadFile = it.compressedFile ?? it.file;
      form.append("image", uploadFile);
      form.append("title", it.title || stripExt(it.file.name));
      const desc = it.description || globalDesc;
      form.append("description", desc);
      if (it.completionYear) form.append("completionYear", it.completionYear);
      try {
        const res = await fetch(`/api/admin/portfolio/${category}`, { method: "POST", body: form });
        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: "Unknown error" }));
          firstError = firstError ?? `${it.title}: ${err.error || res.status}`;
          break;
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "network error";
        firstError = firstError ?? `${it.title}: ${msg}`;
        break;
      }
      setProgress({ done: i + 1, total: pending.length });
    }

    setSaving(false);
    if (firstError) {
      setError(firstError);
    } else {
      onSuccess();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={() => !saving && onClose()}
    >
      <form
        onSubmit={handleSave}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-4"
      >
        <h2 className="text-2xl font-bold">Добавить фото</h2>

        <DropZone onFiles={addFiles} />

        {pending.length === 0 && (
          <p className="text-sm text-slate-500 text-center">
            Можно перетащить несколько файлов сразу.
          </p>
        )}

        {pending.length > 0 && (
          <>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Общее описание (применить ко всем без своего описания)
              </label>
              <input
                value={globalDesc}
                onChange={(e) => setGlobalDesc(e.target.value)}
                placeholder="Опционально"
                className="w-full border border-slate-300 rounded-lg px-3 py-2"
              />
            </div>

            <div className="space-y-2 border border-slate-200 rounded-xl p-3 max-h-72 overflow-y-auto">
              {pending.map((it) => (
                <div
                  key={it.id}
                  className="flex items-start gap-3 bg-slate-50 rounded-lg p-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.preview}
                    alt=""
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <input
                      value={it.title}
                      onChange={(e) => update(it.id, "title", e.target.value)}
                      placeholder="Название"
                      className="w-full border border-slate-300 rounded px-2 py-1 text-sm mb-1"
                    />
                    <input
                      value={it.description}
                      onChange={(e) => update(it.id, "description", e.target.value)}
                      placeholder="Описание (опционально)"
                      className="w-full border border-slate-300 rounded px-2 py-1 text-xs mb-1"
                    />
                    <input
                      type="number"
                      min={1992}
                      max={2099}
                      value={it.completionYear}
                      onChange={(e) => update(it.id, "completionYear", e.target.value)}
                      placeholder="Год реализации (например 2024)"
                      className="w-full border border-slate-300 rounded px-2 py-1 text-xs mb-1"
                    />
                    <div className="text-xs text-slate-500">
                      {it.compressedKB
                        ? `Сжато с ${it.originalKB} КБ до ${it.compressedKB} КБ`
                        : `${it.originalKB} КБ (без сжатия)`}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOne(it.id)}
                    aria-label="Убрать"
                    className="text-slate-400 hover:text-red-600 px-2 py-1 text-lg"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {error && <div className="text-red-600 text-sm">{error}</div>}

        {saving && (
          <div className="text-sm text-slate-600">
            Загрузка: {progress.done} из {progress.total}…
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || pending.length === 0}
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? "Сохранение..." : `Сохранить все${pending.length ? ` (${pending.length})` : ""}`}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="text-slate-600 hover:text-slate-900 px-4 py-2 disabled:opacity-50"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

function DropZone({ onFiles }: { onFiles: (files: FileList | File[]) => void }) {
  const [dragOver, setDragOver] = useState(false);
  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files?.length) onFiles(e.dataTransfer.files);
      }}
      className={`block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
        dragOver ? "border-brand bg-brand/5" : "border-slate-300 hover:border-slate-400"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => {
          if (e.target.files) onFiles(e.target.files);
          e.target.value = "";
        }}
        className="hidden"
      />
      <div className="text-slate-500 text-sm">
        Перетащите файлы или нажмите чтобы выбрать (можно несколько)
      </div>
    </label>
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
  const [completionYear, setCompletionYear] = useState(
    item.completionYear != null ? String(item.completionYear) : "",
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const trimmedYear = completionYear.trim();
    const payload: Record<string, unknown> = {
      title,
      description,
      completionYear: trimmedYear === "" ? null : parseInt(trimmedYear, 10),
    };
    const res = await fetch(`/api/admin/portfolio/${category}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-48 object-cover rounded-lg"
        />
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
        <div>
          <label className="block text-sm font-semibold mb-1">Год реализации проекта</label>
          <input
            type="number"
            min={1992}
            max={2099}
            value={completionYear}
            onChange={(e) => setCompletionYear(e.target.value)}
            placeholder="2024"
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
          <p className="text-xs text-slate-500 mt-1">
            Если неизвестен — оставьте пустым, работа отсортируется в конец.
          </p>
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
