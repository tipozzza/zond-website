"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [focusSide, setFocusSide] = useState<Side | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchSides()
      .then(setAllSides)
      .catch((err) => console.error("Failed to load sides:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleShowOnMap = (side: Side) => {
    setView("map");
    setFocusSide(side);
    setTimeout(() => {
      mapWrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

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
            onClick={() => {
              setView("map");
              setFocusSide(null);
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === "map"
                ? "bg-[#F57C28] text-white"
                : "bg-white text-slate-700 border border-slate-300"
            }`}
          >
            Карта
          </button>
          <button
            onClick={() => {
              setView("list");
              setFocusSide(null);
            }}
            className={`px-6 py-2 rounded-lg font-semibold transition ${
              view === "list"
                ? "bg-[#F57C28] text-white"
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
            <div style={{ display: view === "map" ? "block" : "none" }}>
              <div ref={mapWrapperRef} className="relative scroll-mt-24">
                <YandexMap
                  sides={filteredSides}
                  onSideClick={setSelectedSide}
                  onSideFocus={setFocusSide}
                  focusSide={focusSide}
                />
                {focusSide && (
                  <div className="absolute top-4 right-4 z-10 bg-white shadow-lg rounded-full pl-4 pr-2 py-1 flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-800">Показана: {focusSide.id}</span>
                    <button
                      onClick={() => setFocusSide(null)}
                      className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm"
                      title="Показать все конструкции"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div style={{ display: view === "list" ? "block" : "none" }}>
              <SidesListView
                sides={filteredSides}
                onSideClick={setSelectedSide}
                onShowOnMap={handleShowOnMap}
              />
            </div>
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
                className="mt-6 bg-[#F57C28] text-white px-8 py-3 rounded-lg"
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
