"use client";

import { useCart } from "@/lib/cart/CartContext";

export default function FloatingCartButton() {
  const { items, pricePerMonthTotal, open } = useCart();

  if (items.length === 0) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-sm z-50 flex items-center gap-3 bg-[#F57C28] hover:bg-[#E26A1F] text-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10 transition animate-fade-up"
      aria-label="Открыть подбор конструкций"
    >
      <span className="text-2xl shrink-0" aria-hidden>
        🛒
      </span>
      <span className="text-left flex-1">
        <span className="block font-bold text-sm sm:text-base leading-tight">
          В подборе: {items.length}{" "}
          {items.length === 1 ? "конструкция" : items.length < 5 ? "конструкции" : "конструкций"}
        </span>
        {pricePerMonthTotal > 0 && (
          <span className="block text-xs sm:text-sm opacity-90 leading-tight mt-0.5">
            {pricePerMonthTotal.toLocaleString("ru-RU")} ₽/мес → Открыть
          </span>
        )}
      </span>
      <span className="text-xl shrink-0" aria-hidden>
        →
      </span>
    </button>
  );
}
