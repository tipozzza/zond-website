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

// Кир.↔лат. гомоглифы → канонический латинский вид (после lowercase), чтобы
// "1A" (лат.) и "1А" (кир.) считались одинаковыми независимо от раскладки.
const HOMOGLYPHS: Record<string, string> = {
  а: "a", в: "b", с: "c", е: "e", н: "h", к: "k",
  м: "m", о: "o", р: "p", т: "t", х: "x", у: "y",
};
const HOMOGLYPH_RE = new RegExp(`[${Object.keys(HOMOGLYPHS).join("")}]`, "g");

// Нормализация поискового текста: lowercase, убрать пробелы, свести гомоглифы.
const norm = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "").replace(HOMOGLYPH_RE, (c) => HOMOGLYPHS[c] ?? c);

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
    const q = norm(search);
    let base: Side[];
    if (!q) {
      base = sides;
    } else {
      // Идентификатор конструкции: цифры + опц. сторона (буква + опц. цифры),
      // напр. "1", "11", "1А", "118B", "244А1".
      const idMatch = q.match(/^(\d+)([a-z]\d*)?$/);
      if (idMatch) {
        const num = parseInt(idMatch[1], 10);
        const qSide = idMatch[2]; // напр. "a", "a1" или undefined
        const qSideHasDigit = qSide ? /\d/.test(qSide) : false;
        // Поиск ТОЛЬКО по номеру (числовое сравнение) и стороне, не по адресу.
        base = sides.filter((s) => {
          if (parseInt(s.construction, 10) !== num) return false;
          if (!qSide) return true;
          const ns = norm(s.side);
          // "244А1" → точное совпадение (не цеплять А10/А11);
          // "2А" → префикс (любая сторона на А).
          return qSideHasDigit ? ns === qSide : ns.startsWith(qSide);
        });
      } else {
        // Текстовый запрос ("Кирова", "Digital", "Щит") — по адресу и типу.
        base = sides.filter(
          (s) => norm(s.address).includes(q) || norm(s.type).includes(q)
        );
      }
    }

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
