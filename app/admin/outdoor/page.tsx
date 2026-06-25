"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import AdminNav from "@/components/admin/AdminNav";
import type { Side, SideStatus } from "@/lib/types";
import { MONTH_KEYS, MONTH_LABELS, STATUS_LABELS, getCurrentMonthKey } from "@/lib/sides-data";
import { PHOTO_URL_PREFIX, SIDE_STATUSES, SIDE_TYPES } from "@/lib/outdoor-admin";

// Нормализация поиска: lowercase + кир.↔лат. гомоглифы (как в публичном списке).
const HOMO: Record<string, string> = {
  а: "a", в: "b", с: "c", е: "e", н: "h", к: "k", м: "m", о: "o", р: "p", т: "t", х: "x", у: "y",
};
const HOMO_RE = new RegExp(`[${Object.keys(HOMO).join("")}]`, "g");
const norm = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "").replace(HOMO_RE, (c) => HOMO[c] ?? c);

const byConstruction = (a: Side, b: Side) => {
  const an = parseInt(a.construction, 10);
  const bn = parseInt(b.construction, 10);
  if (an !== bn) return an - bn;
  return a.side.localeCompare(b.side, "ru", { numeric: true });
};

const photoUrl = (s: Side) => (s.photo_filename ? `${PHOTO_URL_PREFIX}/${s.photo_filename}` : null);

type Group = { construction: string; address: string; list: Side[] };

export default function AdminOutdoorPage() {
  const router = useRouter();
  const [sides, setSides] = useState<Side[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [editing, setEditing] = useState<Side | null>(null);
  const [creating, setCreating] = useState<{ construction: string; locked: boolean } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/outdoor");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        setError(data?.error || `Не удалось загрузить список (HTTP ${res.status}).`);
        return;
      }
      setSides(data.sides || []);
      setWarning(
        data.source === "local"
          ? "GitHub недоступен — список из локальной копии. Сохранение может не работать: проверьте GITHUB_TOKEN в настройках Timeweb."
          : null,
      );
    } catch {
      setError("Сервер не отвечает или нет соединения. Попробуйте обновить страницу.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    load();
  }, [load]);

  const groups: Group[] = useMemo(() => {
    const q = norm(search);
    const filtered = !q
      ? sides
      : sides.filter((s) => {
          const numOnly = q.match(/^(\d+)$/);
          if (numOnly) {
            return (
              parseInt(s.construction, 10) === parseInt(numOnly[1], 10) ||
              norm(s.construction).includes(q)
            );
          }
          return (
            norm(s.construction).includes(q) ||
            norm(s.address).includes(q) ||
            norm(s.type).includes(q) ||
            norm(s.id).includes(q)
          );
        });
    const map = new Map<string, Side[]>();
    filtered.forEach((s) => {
      const g = map.get(s.construction);
      if (g) g.push(s);
      else map.set(s.construction, [s]);
    });
    return [...map.entries()]
      .map(([construction, list]) => ({
        construction,
        address: list[0]?.address || "",
        list: [...list].sort(byConstruction),
      }))
      .sort((a, b) => parseInt(a.construction, 10) - parseInt(b.construction, 10));
  }, [sides, search]);

  const toggle = (c: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });

  const deleteSide = async (s: Side) => {
    if (!confirm(`Удалить сторону ${s.construction}${s.side}?`)) return;
    const res = await fetch(`/api/admin/outdoor/${encodeURIComponent(s.id)}`, { method: "DELETE" });
    if (res.ok) load();
    else {
      const err = await res.json().catch(() => ({}));
      alert(`Ошибка: ${err.error || res.status}`);
    }
  };

  const deleteConstruction = async (construction: string, count: number) => {
    if (!confirm(`Удалить всю конструкцию №${construction} (${count} стор.)? Действие необратимо.`))
      return;
    const res = await fetch(`/api/admin/outdoor?construction=${encodeURIComponent(construction)}`, {
      method: "DELETE",
    });
    if (res.ok) load();
    else {
      const err = await res.json().catch(() => ({}));
      alert(`Ошибка: ${err.error || res.status}`);
    }
  };

  const monthKey = getCurrentMonthKey();

  return (
    <div className="min-h-screen bg-slate-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <AdminNav />
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">Наружка — конструкции</h1>
          <button
            onClick={() => setCreating({ construction: "", locked: false })}
            className="bg-brand text-white px-5 py-2 rounded-lg font-semibold"
          >
            ➕ Конструкция
          </button>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по номеру, адресу, типу…"
          className="w-full mb-4 px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
        />

        {loading && <div className="text-center py-12 text-slate-500">Загрузка...</div>}

        {!loading && error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
            <div className="font-semibold mb-1">Не удалось загрузить список</div>
            <div className="text-sm mb-4">{error}</div>
            <button
              onClick={load}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700"
            >
              Повторить
            </button>
          </div>
        )}

        {!loading && !error && warning && (
          <div className="mb-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 text-sm">
            ⚠️ {warning}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="text-sm text-slate-500 mb-3">
              Конструкций: {groups.length} · сторон: {groups.reduce((n, g) => n + g.list.length, 0)}
            </div>

            <div className="space-y-3">
              {groups.map((g) => {
                const isOpen = expanded.has(g.construction);
                return (
                  <div key={g.construction} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="flex items-center gap-3 p-4">
                      <button
                        onClick={() => toggle(g.construction)}
                        className="flex-1 flex items-center gap-3 text-left min-w-0"
                      >
                        <span className="text-slate-400 shrink-0">{isOpen ? "▾" : "▸"}</span>
                        <span className="font-mono font-bold text-brand shrink-0">
                          №{g.construction}
                        </span>
                        <span className="text-sm text-slate-500 shrink-0">
                          {g.list.length} стор.
                        </span>
                        <span className="text-sm text-slate-600 truncate">{g.address}</span>
                      </button>
                      <button
                        onClick={() => setCreating({ construction: g.construction, locked: true })}
                        className="text-brand text-sm font-semibold shrink-0 hover:underline"
                      >
                        + сторона
                      </button>
                      <button
                        onClick={() => deleteConstruction(g.construction, g.list.length)}
                        className="text-red-600 text-sm shrink-0 hover:underline"
                        title="Удалить конструкцию"
                      >
                        🗑
                      </button>
                    </div>

                    {isOpen && (
                      <div className="border-t border-slate-100 divide-y divide-slate-100">
                        {g.list.map((s) => {
                          const url = photoUrl(s);
                          const st = s.status?.[monthKey] as SideStatus | undefined;
                          return (
                            <div key={s.id} className="flex items-center gap-3 p-3 sm:px-4">
                              <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                                {url ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={url}
                                    alt={s.id}
                                    className="w-full h-full object-cover"
                                    onError={(e) => (e.currentTarget.style.display = "none")}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                                    нет фото
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm">
                                  Сторона {s.side}{" "}
                                  <span className="text-slate-400 font-mono text-xs">({s.id})</span>
                                </div>
                                <div className="text-xs text-slate-500 truncate">
                                  {s.type} {s.format}
                                  {s.illuminated ? " · 💡" : ""}
                                  {st ? ` · ${STATUS_LABELS[st] ?? st}` : ""}
                                </div>
                              </div>
                              <button
                                onClick={() => setEditing(s)}
                                className="text-brand text-sm font-semibold shrink-0 hover:underline"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => deleteSide(s)}
                                className="text-red-600 text-sm shrink-0 hover:underline"
                              >
                                ✕
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              {groups.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-500">
                  Ничего не найдено.
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-8 text-sm text-slate-500 bg-white p-4 rounded-xl">
          ℹ️ Изменения публикуются на сайте автоматически через 2-3 минуты после сохранения
          (Timeweb, автодеплой из main).
        </div>
      </div>

      {editing && (
        <SideFormModal
          mode="edit"
          initial={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      {creating && (
        <SideFormModal
          mode="create"
          initial={null}
          lockedConstruction={creating.locked ? creating.construction : undefined}
          onClose={() => setCreating(null)}
          onSaved={() => {
            setCreating(null);
            load();
          }}
        />
      )}
    </div>
  );
}

// ───────────────────────── Форма стороны (создание + редактирование) ─────────

type FormState = {
  construction: string;
  side: string;
  address: string;
  type: string;
  format: string;
  material: string;
  direction: string;
  priceFinal: string;
  grp: string;
  installCost: string;
  lat: string;
  lng: string;
  illuminated: boolean;
  status: Record<string, SideStatus>;
};

const numStr = (v: number | null | undefined) => (v == null ? "" : String(v));

function toFormState(s: Side | null, lockedConstruction?: string): FormState {
  const status: Record<string, SideStatus> = {};
  MONTH_KEYS.forEach((m) => {
    status[m] = (s?.status?.[m] as SideStatus) ?? "free";
  });
  return {
    construction: s?.construction ?? lockedConstruction ?? "",
    side: s?.side ?? "",
    address: s?.address ?? "",
    type: s?.type ?? "Щит",
    format: s?.format ?? "",
    material: s?.material ?? "",
    direction: s?.direction ?? "",
    priceFinal: numStr(s?.priceFinal),
    grp: numStr(s?.grp),
    installCost: numStr(s?.installCost),
    lat: numStr(s?.lat),
    lng: numStr(s?.lng),
    illuminated: s?.illuminated ?? false,
    status,
  };
}

function SideFormModal({
  mode,
  initial,
  lockedConstruction,
  onClose,
  onSaved,
}: {
  mode: "create" | "edit";
  initial: Side | null;
  lockedConstruction?: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [f, setF] = useState<FormState>(() => toFormState(initial, lockedConstruction));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState<string | null>(
    initial?.photo_filename ? `${PHOTO_URL_PREFIX}/${initial.photo_filename}` : null,
  );
  const [photoBusy, setPhotoBusy] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setF((p) => ({ ...p, [k]: v }));

  const idChanges =
    mode === "edit" &&
    initial != null &&
    (f.construction.trim() !== initial.construction || f.side.trim() !== initial.side);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.construction.trim() || !f.side.trim()) {
      setError("Заполните номер конструкции и сторону");
      return;
    }
    setSaving(true);
    setError("");
    const payload = {
      construction: f.construction.trim(),
      side: f.side.trim(),
      address: f.address,
      type: f.type,
      format: f.format,
      material: f.material,
      direction: f.direction,
      priceFinal: f.priceFinal,
      grp: f.grp,
      installCost: f.installCost,
      lat: f.lat,
      lng: f.lng,
      illuminated: f.illuminated,
      status: f.status,
    };
    try {
      const res =
        mode === "create"
          ? await fetch("/api/admin/outdoor", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/outdoor/${encodeURIComponent(initial!.id)}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error || `Ошибка сохранения (HTTP ${res.status})`);
        setSaving(false);
        return;
      }
      onSaved();
    } catch {
      setError("Сеть недоступна. Попробуйте ещё раз.");
      setSaving(false);
    }
  };

  const handlePhoto = async (file: File) => {
    if (!initial) return;
    setPhotoBusy(true);
    setError("");
    try {
      let upload: File = file;
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          fileType: "image/jpeg",
        });
        upload = new File([compressed], "photo.jpg", { type: "image/jpeg" });
      } catch {
        // fallback: исходный файл
      }
      const form = new FormData();
      form.append("image", upload);
      const res = await fetch(`/api/admin/outdoor/${encodeURIComponent(initial.id)}/photo`, {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.photo_filename) {
        setError(data?.error || `Не удалось загрузить фото (HTTP ${res.status})`);
      } else {
        // cache-bust превью
        setPhoto(`${PHOTO_URL_PREFIX}/${data.photo_filename}?t=${Date.now()}`);
      }
    } catch {
      setError("Не удалось загрузить фото.");
    } finally {
      setPhotoBusy(false);
    }
  };

  const inputCls = "w-full border border-slate-300 rounded-lg px-3 py-2 text-sm";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-3 overflow-y-auto"
      onClick={() => !saving && !photoBusy && onClose()}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-5 sm:p-6 max-w-2xl w-full my-4 space-y-4"
      >
        <h2 className="text-xl font-bold">
          {mode === "create" ? "Новая сторона" : `Сторона ${initial?.id}`}
        </h2>

        {/* Фото (только в режиме редактирования — нужен существующий id) */}
        {mode === "edit" ? (
          <div className="flex items-center gap-4">
            <div className="w-28 h-20 rounded-lg bg-slate-100 overflow-hidden shrink-0">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                  нет фото
                </div>
              )}
            </div>
            <label className="text-sm">
              <span className="block font-semibold mb-1">Фото конструкции</span>
              <input
                type="file"
                accept="image/*"
                disabled={photoBusy}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handlePhoto(file);
                  e.target.value = "";
                }}
                className="text-xs"
              />
              <span className="block text-xs text-slate-500 mt-1">
                {photoBusy ? "Загрузка…" : "Файл сожмётся и заменит текущее фото на сайте"}
              </span>
            </label>
          </div>
        ) : (
          <p className="text-xs text-slate-500">
            Фото можно добавить после создания — откройте сторону на редактирование.
          </p>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="block font-semibold mb-1">Номер конструкции *</span>
            <input
              value={f.construction}
              onChange={(e) => set("construction", e.target.value)}
              disabled={lockedConstruction != null}
              className={inputCls + (lockedConstruction != null ? " bg-slate-100" : "")}
              required
            />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Сторона *</span>
            <input
              value={f.side}
              onChange={(e) => set("side", e.target.value)}
              className={inputCls}
              placeholder="А1 / B / Б2"
              required
            />
          </label>
        </div>

        {idChanges && (
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">
            ⚠️ Меняется номер/сторона — ссылка /outdoor/{initial?.id} станет /outdoor/
            {f.construction.trim()}
            {f.side.trim()}.
          </div>
        )}

        <label className="text-sm block">
          <span className="block font-semibold mb-1">Адрес</span>
          <input value={f.address} onChange={(e) => set("address", e.target.value)} className={inputCls} />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            <span className="block font-semibold mb-1">Тип</span>
            <select value={f.type} onChange={(e) => set("type", e.target.value)} className={inputCls}>
              {SIDE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              {!SIDE_TYPES.includes(f.type) && <option value={f.type}>{f.type}</option>}
            </select>
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Формат</span>
            <input
              value={f.format}
              onChange={(e) => set("format", e.target.value)}
              className={inputCls}
              placeholder="3х6"
            />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Материал</span>
            <input value={f.material} onChange={(e) => set("material", e.target.value)} className={inputCls} />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Направление</span>
            <input value={f.direction} onChange={(e) => set("direction", e.target.value)} className={inputCls} />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Цена ₽/мес (внутр.)</span>
            <input
              inputMode="numeric"
              value={f.priceFinal}
              onChange={(e) => set("priceFinal", e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">GRP</span>
            <input inputMode="decimal" value={f.grp} onChange={(e) => set("grp", e.target.value)} className={inputCls} />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Монтаж ₽</span>
            <input
              inputMode="numeric"
              value={f.installCost}
              onChange={(e) => set("installCost", e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="text-sm flex items-end gap-2 pb-2">
            <input
              type="checkbox"
              checked={f.illuminated}
              onChange={(e) => set("illuminated", e.target.checked)}
              className="w-4 h-4"
            />
            <span className="font-semibold">Освещение</span>
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Широта (lat)</span>
            <input inputMode="decimal" value={f.lat} onChange={(e) => set("lat", e.target.value)} className={inputCls} />
          </label>
          <label className="text-sm">
            <span className="block font-semibold mb-1">Долгота (lng)</span>
            <input inputMode="decimal" value={f.lng} onChange={(e) => set("lng", e.target.value)} className={inputCls} />
          </label>
        </div>

        <div>
          <div className="font-semibold text-sm mb-2">Занятость по месяцам</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MONTH_KEYS.map((m) => (
              <label key={m} className="text-xs">
                <span className="block text-slate-500 mb-0.5">{MONTH_LABELS[m]}</span>
                <select
                  value={f.status[m]}
                  onChange={(e) =>
                    set("status", { ...f.status, [m]: e.target.value as SideStatus })
                  }
                  className="w-full border border-slate-300 rounded px-2 py-1"
                >
                  {SIDE_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {STATUS_LABELS[st] ?? st}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </div>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={saving || photoBusy}
            className="bg-brand text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Сохранить"}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={saving || photoBusy}
            className="text-slate-600 hover:text-slate-900 px-4 py-2 disabled:opacity-50"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}
