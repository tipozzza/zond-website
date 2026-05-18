"use client";

import type { Side } from "@/lib/types";
import { MONTH_LABELS, STATUS_LABELS, STATUS_COLORS, getSidePhotoUrl } from "@/lib/sides-data";

type Props = {
  side: Side;
  onClose: () => void;
  onBook: () => void;
};

export default function SideDetails({ side, onClose, onBook }: Props) {
  const photoUrl = getSidePhotoUrl(side);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-sm text-slate-500">Сторона</div>
            <div className="text-3xl font-bold text-brand">{side.id}</div>
          </div>
          <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-700">
            ✕
          </button>
        </div>

        {photoUrl ? (
          <div className="relative w-full aspect-[4/3] mb-4 rounded-xl overflow-hidden bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
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

          {side.priceFinal && (
            <div className="bg-brand/5 p-4 rounded-lg">
              <div className="text-sm text-slate-500">Стоимость аренды</div>
              <div className="text-3xl font-bold text-brand">{side.priceFinal.toLocaleString("ru-RU")} ₽/мес</div>
              {side.priceFull && side.priceFull !== side.priceFinal && (
                <div className="text-sm text-slate-500">
                  Прайс: <s>{side.priceFull.toLocaleString("ru-RU")} ₽</s> · скидка {side.discountPct}%
                </div>
              )}
              {side.installCost && (
                <div className="text-sm text-slate-600 mt-1">
                  + монтаж: {side.installCost.toLocaleString("ru-RU")} ₽
                </div>
              )}
            </div>
          )}

          <div>
            <div className="text-sm text-slate-500 mb-2">Статус по месяцам (2026)</div>
            <div className="grid grid-cols-4 gap-2">
              {(Object.keys(side.status) as Array<keyof Side["status"]>).map((m) => (
                <div key={m} className="text-center">
                  <div className="text-xs text-slate-500">{MONTH_LABELS[m]}</div>
                  <div className="w-full h-2 rounded mt-1" style={{ background: STATUS_COLORS[side.status[m]] }} />
                  <div className="text-xs mt-1">{STATUS_LABELS[side.status[m]]}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onBook}
            className="w-full bg-brand hover:bg-brand/90 text-white py-4 rounded-lg font-semibold text-lg mt-4"
          >
            Забронировать сторону
          </button>
        </div>
      </div>
    </div>
  );
}
