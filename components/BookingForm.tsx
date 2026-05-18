"use client";

import { useState } from "react";
import type { Side } from "@/lib/types";
import { MONTH_LABELS } from "@/lib/sides-data";

type Props = {
  side: Side;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BookingForm({ side, onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [months, setMonths] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const freeMonths = (Object.keys(side.status) as Array<keyof Side["status"]>).filter(
    (m) => side.status[m] === "free"
  );

  const toggleMonth = (m: string) => {
    setMonths(months.includes(m) ? months.filter((x) => x !== m) : [...months, m]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !phone || months.length === 0) {
      setError("Заполните имя, телефон и выберите хотя бы один месяц");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ side, name, phone, email, months, notes }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onSuccess();
    } catch {
      setError("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Заявка на бронирование</h2>
          <button onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-700">
            ✕
          </button>
        </div>
        <div className="bg-slate-50 p-3 rounded-lg mb-4 text-sm">
          <strong>{side.id}</strong> · {side.address} · {side.type} {side.format}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Ваше имя *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Телефон *</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              required
              placeholder="+7 ..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Желаемые месяцы * (свободно сейчас)</label>
            {freeMonths.length === 0 ? (
              <div className="text-sm text-slate-500">
                На ближайшие месяцы все занято — оставьте заявку, менеджер предложит альтернативу
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {freeMonths.map((m) => (
                  <label
                    key={m}
                    className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer ${
                      months.includes(m) ? "bg-brand/10 border-brand" : ""
                    }`}
                  >
                    <input type="checkbox" checked={months.includes(m)} onChange={() => toggleMonth(m)} />
                    <span>{MONTH_LABELS[m]}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Комментарий</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand hover:bg-brand/90 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? "Отправляем..." : "Отправить заявку"}
          </button>
        </form>
      </div>
    </div>
  );
}
