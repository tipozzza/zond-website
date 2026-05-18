"use client";

import { useEffect, useMemo, useState } from "react";
import type { Side } from "@/lib/types";
import { fetchSides, getCurrentMonthKey } from "@/lib/sides-data";
import YandexMap from "./YandexMap";
import SideFilters, { type FilterState } from "./SideFilters";
import SideDetails from "./SideDetails";
import BookingForm from "./BookingForm";
import SidesListView from "./SidesListView";

export default function OutdoorMapSection() {
  const [allSides, setAllSides] = useState<Side[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>(() => ({
    types: [],
    formats: [],
    illuminatedOnly: false,
    freeOnly: false,
    selectedMonth: getCurrentMonthKey(),
  }));
  const [view, setView] = useState<"map" | "list">("map");
  const [selectedSide, setSelectedSide] = useState<Side | null>(null);
  const [bookingSide, setBookingSide] = useState<Side | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    fetchSides()
      .then(setAllSides)
      .catch((err) => console.error("Failed to load sides:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredSides = useMemo(() => {
    return allSides.filter((s) => {
      if (filters.types.length > 0 && !filters.types.includes(s.type)) return false;
      if (filters.formats.length > 0 && !filters.formats.includes(s.format)) return false;
      if (filters.illuminatedOnly && !s.illuminated) return false;
      if (filters.freeOnly && s.status[filters.selectedMonth] !== "free") return false;
      return true;
    });
  }, [allSides, filters]);

  if (loading) {
    return <div className="text-center py-12 text-slate-500">Загружаем карту конструкций...</div>;
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2">Карта конструкций</h2>
          <p className="text-slate-600">
            726 рекламных сторон по Томску · выберите площадку и забронируйте онлайн
          </p>
        </div>

        <div className="flex justify-center mb-6 gap-2">
          <button
            onClick={() => setView("map")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === "map"
                ? "bg-brand text-white"
                : "bg-white text-slate-700 border border-slate-300"
            }`}
          >
            Карта
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === "list"
                ? "bg-brand text-white"
                : "bg-white text-slate-700 border border-slate-300"
            }`}
          >
            Список таблицей
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          <div>
            <SideFilters
              filters={filters}
              setFilters={setFilters}
              totalCount={allSides.length}
              filteredCount={filteredSides.length}
            />
          </div>
          <div>
            {view === "map" ? (
              <YandexMap sides={filteredSides} onSideClick={setSelectedSide} />
            ) : (
              <SidesListView sides={filteredSides} onSideClick={setSelectedSide} />
            )}
          </div>
        </div>

        {selectedSide && !bookingSide && (
          <SideDetails
            side={selectedSide}
            onClose={() => setSelectedSide(null)}
            onBook={() => {
              setBookingSide(selectedSide);
            }}
          />
        )}

        {bookingSide && !bookingSuccess && (
          <BookingForm
            side={bookingSide}
            onClose={() => setBookingSide(null)}
            onSuccess={() => {
              setBookingSuccess(true);
            }}
          />
        )}

        {bookingSuccess && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setBookingSuccess(false);
              setBookingSide(null);
              setSelectedSide(null);
            }}
          >
            <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
              <div className="text-5xl mb-4">✓</div>
              <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
              <p className="text-slate-600">Менеджер свяжется с вами в течение рабочего дня. Спасибо!</p>
              <button
                onClick={() => {
                  setBookingSuccess(false);
                  setBookingSide(null);
                  setSelectedSide(null);
                }}
                className="mt-6 bg-brand text-white px-8 py-3 rounded-lg"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
