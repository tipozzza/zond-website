"use client";

import type { Side } from "@/lib/types";
import { getCurrentMonthKey } from "@/lib/sides-data";

export type FilterState = {
  types: string[];
  formats: string[];
  illuminatedOnly: boolean;
  freeOnly: boolean;
  selectedMonth: keyof Side["status"];
};

type Props = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  totalCount: number;
  filteredCount: number;
};

const ALL_TYPES = ["Digital", "Щит", "Тривижн", "Сити-формат", "Супер-сайт"];
const ALL_FORMATS = ["3х6", "1,2 х 1,8", "5х15", "6x4", "3х12 м", "5,5х2,5"];
const MONTHS: { value: keyof Side["status"]; label: string }[] = [
  { value: "jan", label: "Январь" },
  { value: "feb", label: "Февраль" },
  { value: "mar", label: "Март" },
  { value: "apr", label: "Апрель" },
  { value: "may", label: "Май" },
  { value: "june", label: "Июнь" },
  { value: "july", label: "Июль" },
  { value: "aug", label: "Август" },
  { value: "sep", label: "Сентябрь" },
  { value: "oct", label: "Октябрь" },
  { value: "nov", label: "Ноябрь" },
  { value: "dec", label: "Декабрь" },
];

export default function SideFilters({ filters, setFilters, totalCount, filteredCount }: Props) {
  const toggleType = (t: string) => {
    setFilters({
      ...filters,
      types: filters.types.includes(t) ? filters.types.filter((x) => x !== t) : [...filters.types, t],
    });
  };

  const toggleFormat = (f: string) => {
    setFilters({
      ...filters,
      formats: filters.formats.includes(f) ? filters.formats.filter((x) => x !== f) : [...filters.formats, f],
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
      <div>
        <div className="text-sm text-slate-500">Найдено</div>
        <div className="text-2xl font-bold text-brand">
          {filteredCount} из {totalCount} сторон
        </div>
      </div>

      <div>
        <div className="font-semibold mb-2">Месяц</div>
        <select
          value={filters.selectedMonth}
          onChange={(e) => setFilters({ ...filters, selectedMonth: e.target.value as keyof Side["status"] })}
          className="w-full border rounded-lg px-3 py-2"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label} 2026
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="font-semibold mb-2">Тип носителя</div>
        <div className="space-y-2">
          {ALL_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.types.includes(t)} onChange={() => toggleType(t)} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="font-semibold mb-2">Формат</div>
        <div className="space-y-2">
          {ALL_FORMATS.map((f) => (
            <label key={f} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={filters.formats.includes(f)} onChange={() => toggleFormat(f)} />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-t pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.illuminatedOnly}
            onChange={(e) => setFilters({ ...filters, illuminatedOnly: e.target.checked })}
          />
          <span>Только освещаемые</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.freeOnly}
            onChange={(e) => setFilters({ ...filters, freeOnly: e.target.checked })}
          />
          <span>Только свободные в выбранный месяц</span>
        </label>
      </div>

      <button
        onClick={() =>
          setFilters({
            types: [],
            formats: [],
            illuminatedOnly: false,
            freeOnly: false,
            selectedMonth: getCurrentMonthKey(),
          })
        }
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
