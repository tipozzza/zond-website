"use client";

import { useMemo, useState } from "react";
import type { Side } from "@/lib/types";

type Props = {
  sides: Side[];
  onSideClick: (side: Side) => void;
  onShowOnMap: (side: Side) => void;
};

type SortKey = "construction" | "address" | "type" | "format" | "priceFinal" | "grp";

const COLUMNS: { k: SortKey; label: string }[] = [
  { k: "construction", label: "Номер" },
  { k: "address", label: "Адрес" },
  { k: "type", label: "Тип" },
  { k: "format", label: "Формат" },
  { k: "priceFinal", label: "Цена ₽/мес" },
  { k: "grp", label: "GRP" },
];

// `id` в данных НЕ уникален (у конструкций с двумя сторонами A/B обе стороны
// имеют одинаковый id). Уникальный ключ — construction + side.
const rowKey = (s: Side) => `${s.construction}|${s.side}`;
const rowLabel = (s: Side) => `${s.construction}${s.side}`;

// Сортировка по умолчанию: номер конструкции числами (с учётом ведущих нулей),
// затем сторона натурально (А1 < А2 < А10 < Б1).
const byConstruction = (a: Side, b: Side) => {
  const an = parseInt(a.construction, 10);
  const bn = parseInt(b.construction, 10);
  if (an !== bn) return an - bn;
  return a.side.localeCompare(b.side, "ru", { numeric: true });
};

export default function SidesListView({ sides, onSideClick, onShowOnMap }: Props) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("construction");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = q
      ? sides.filter(
          (s) =>
            s.construction.toLowerCase().includes(q) ||
            s.address.toLowerCase().includes(q) ||
            s.type.toLowerCase().includes(q)
        )
      : sides;

    const dir = sortDir === "asc" ? 1 : -1;
    return [...base].sort((a, b) => {
      let cmp: number;
      switch (sortKey) {
        case "construction":
          cmp = byConstruction(a, b);
          break;
        case "priceFinal":
        case "grp": {
          const av = a[sortKey];
          const bv = b[sortKey];
          if (av == null && bv == null) cmp = byConstruction(a, b);
          else if (av == null) return 1; // пустые значения всегда внизу
          else if (bv == null) return -1;
          else cmp = av - bv;
          break;
        }
        default:
          cmp = String(a[sortKey] ?? "").localeCompare(
            String(b[sortKey] ?? ""),
            "ru",
            { numeric: true }
          );
      }
      if (cmp === 0) cmp = byConstruction(a, b); // стабильный tiebreak
      return dir * cmp;
    });
  }, [sides, search, sortKey, sortDir]);

  const toggleSort = (k: SortKey) => {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir("asc");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по адресу, номеру, типу..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#F57C28] focus:border-transparent"
        />
        <div className="mt-2 text-sm text-slate-500">
          Показано {filtered.length} из {filtered.length} (всего {sides.length})
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
            {filtered.map((s) => (
              <tr key={rowKey(s)} className="border-t border-slate-100 hover:bg-[#F57C28]/5">
                <td className="px-3 py-2 font-mono font-semibold">{rowLabel(s)}</td>
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
                      className="text-[#F57C28] font-semibold hover:underline whitespace-nowrap"
                    >
                      Подробнее
                    </button>
                    <button
                      onClick={() => onShowOnMap(s)}
                      className="text-slate-600 hover:text-[#F57C28] hover:underline whitespace-nowrap"
                      title="Показать на карте"
                    >
                      📍 На карте
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-8 text-center text-slate-500">
                  Ничего не найдено
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
