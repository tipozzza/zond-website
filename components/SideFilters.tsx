"use client";

export type FilterState = {
  types: string[];
  formats: string[];
  illuminatedOnly: boolean;
};

type Props = {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  totalCount: number;
  filteredCount: number;
};

const ALL_TYPES = ["Digital", "Щит", "Тривижн", "Сити-формат", "Супер-сайт"];
const ALL_FORMATS = ["3х6", "1,2 х 1,8", "5х15", "6x4", "3х12 м", "5,5х2,5"];

export const EMPTY_FILTERS: FilterState = {
  types: [],
  formats: [],
  illuminatedOnly: false,
};

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
        <div className="text-2xl font-bold text-[#F57C28]">
          {filteredCount} из {totalCount} сторон
        </div>
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

      <div className="border-t pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.illuminatedOnly}
            onChange={(e) => setFilters({ ...filters, illuminatedOnly: e.target.checked })}
          />
          <span>Только освещаемые</span>
        </label>
      </div>

      <button
        onClick={() => setFilters(EMPTY_FILTERS)}
        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-sm"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
