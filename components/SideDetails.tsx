"use client";

import type { Side } from "@/lib/types";
import AddToCartButton from "@/components/cart/AddToCartButton";

type Props = {
  side: Side;
  onClose: () => void;
  onBook: () => void;
};

export default function SideDetails({ side, onClose, onBook }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm text-slate-500">Сторона</div>
            <div className="text-3xl font-bold text-[#F57C28]">{side.id}</div>
          </div>
          <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-700">
            ✕
          </button>
        </div>

        {side.photo_filename ? (
          <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/images/constructions/${side.photo_filename}`}
              alt={`Конструкция ${side.id} — ${side.address}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center text-slate-400 text-sm">Фото отсутствует</div>';
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full aspect-[4/3] mb-4 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
            Фото в обработке
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-500">Адрес</div>
            <div className="font-semibold">{side.address}</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-slate-500">Тип</div>
              <div className="font-semibold">{side.type}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Формат</div>
              <div className="font-semibold">{side.format}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Направление</div>
              <div className="font-semibold">{side.direction || "—"}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500">Освещение</div>
              <div className="font-semibold">{side.illuminated ? "Да" : "Нет"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={onBook}
              className="flex-1 bg-[#F57C28] hover:bg-[#E26A1F] text-white py-4 rounded-lg font-semibold text-lg"
            >
              Забронировать сторону
            </button>
            <AddToCartButton
              item={{
                sideId: side.id,
                address: side.address,
                type: side.type,
                format: side.format,
                pricePerMonth: side.priceFinal,
                photo: side.photo_filename
                  ? `/images/constructions/${side.photo_filename}`
                  : undefined,
              }}
              className="flex-1 py-4 text-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
