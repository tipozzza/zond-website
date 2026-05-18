"use client";

import { useMemo, useState } from "react";
import type { Side } from "@/lib/types";

type Props = {
  sides: Side[];
  onSideClick: (side: Side) => void;
  onShowOnMap: (side: Side) => void;
};

type SortKey = "id" | "address" | "type" | "format" | "priceFinal" | "grp";

const PER_PAGE = 50;

const COLUMNS: { k: SortKey; label: string }[] = [
  { k: "id", label: "Номер" },
  { k: "address", label: "Адрес" },
  { k: "type", label: "Тип" },
  { k: "format", label: "Формат" },
  { k: "priceFinal", label: "Цена ₽/мес" },
  { k: "grp", label: "GRP" },
];

export default function SidesListView({ sides, onSideClick, onShowOnMap }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let result = sides;
    if (q) {
      result = sides.filter(
        (s) =>
          s.id.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q) ||
          s.type.toLowerCase().includes(q) ||
          s.format.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv), "ru")
        : String(bv).localeCompare(String(av), "ru");
    });
    return result;
  }, [sides, search, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
    setPage(1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Поиск по адресу, номеру, типу..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
        />
        <div className="mt-2 text-sm text-slate-500">
          Показано {pageItems.length} из {filtered.length} (всего {sides.length})
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.k}
                  onClick={() => toggleSort(col.k)}
                  className="px-3 py-3 text-left font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 whitespace-nowrap"
                >
                  {col.label}
                  {sortKey === col.k && (sortDir === "asc" ? " ↑" : " ↓")}
                </th>
              ))}
              <th className="px-3 py-3 text-left font-semibold text-slate-700">Освещ.</th>
              <th className="px-3 py-3 text-left font-semibold text-slate-700">Действие</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((s) => (
              <tr key={s.id} className="border-t border-slate-100 hover:bg-brand/5">
                <td className="px-3 py-2 font-mono font-semibold">{s.id}</td>
                <td className="px-3 py-2">{s.address}</td>
                <td className="px-3 py-2">{s.type}</td>
                <td className="px-3 py-2">{s.format}</td>
                <td className="px-3 py-2 font-semibold">
                  {s.priceFinal ? s.priceFinal.toLocaleString("ru-RU") : "—"}
                </td>
                <td className="px-3 py-2">{s.grp ?? "—"}</td>
                <td className="px-3 py-2">{s.illuminated ? "✓" : "—"}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onSideClick(s)}
                      className="text-brand font-semibold hover:underline whitespace-nowrap"
                    >
                      Подробнее
                    </button>
                    <button
                      onClick={() => onShowOnMap(s)}
                      className="text-slate-600 hover:text-brand hover:underline whitespace-nowrap"
                      title="Показать на карте"
                    >
                      📍 На карте
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            ← Назад
          </button>
          <span>
            Страница {safePage} из {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="px-3 py-1 rounded border disabled:opacity-50"
          >
            Далее →
          </button>
        </div>
      )}
    </div>
  );
}
