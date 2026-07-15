"use client";

import { useMemo, useRef, useState } from "react";
import type { Side } from "@/lib/types";
import { findConstructionMatches } from "@/lib/side-search";

type Props = {
  sides: Side[];
  onFound: (side: Side) => void;
  className?: string;
};

export default function ConstructionSearch({ sides, onFound, className }: Props) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(
    () => findConstructionMatches(sides, query, 6),
    [sides, query]
  );

  const select = (side: Side) => {
    setNotFound(false);
    setOpen(false);
    onFound(side);
    inputRef.current?.blur();
  };

  const submit = () => {
    if (matches.length > 0) {
      select(matches[0].side);
    } else if (query.trim()) {
      setNotFound(true);
      setOpen(false);
    }
  };

  const clear = () => {
    setQuery("");
    setNotFound(false);
    setOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className={`${className ?? ""} w-[min(420px,calc(100%-1.5rem))]`}>
      <div className="flex items-stretch gap-1 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setNotFound(false);
            setOpen(true);
          }}
          onFocus={() => query && setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submit();
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder="Адрес или № конструкции"
          aria-label="Поиск по адресу или номеру конструкции"
          className="flex-1 min-w-0 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clear}
            aria-label="Очистить"
            className="px-2 text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
        <button
          type="button"
          onClick={submit}
          className="bg-[#F57C28] hover:bg-[#e06a1a] text-white px-4 text-sm font-semibold transition-colors"
        >
          Найти
        </button>
      </div>

      {open && matches.length > 0 && (
        <ul className="mt-1 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden max-h-72 overflow-y-auto">
          {matches.map((m) => (
            <li key={m.construction}>
              <button
                type="button"
                // onMouseDown, чтобы выбор срабатывал до blur инпута
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(m.side);
                }}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 flex gap-2 items-baseline"
              >
                <span className="shrink-0 inline-flex items-center justify-center min-w-[2rem] h-6 px-1.5 rounded bg-[#6F395D] text-white text-xs font-bold">
                  {m.construction}
                </span>
                <span className="text-sm text-slate-700 leading-snug">
                  {m.address}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {notFound && (
        <div className="mt-1 bg-white rounded-lg shadow-lg border border-slate-200 px-3 py-2 text-sm text-slate-600">
          Ничего не найдено. Попробуйте адрес (напр. «Комсомольский 49») или
          номер конструкции (напр. «178»).
        </div>
      )}
    </div>
  );
}
