"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

export default function CartPanel() {
  const cart = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [submittedOk, setSubmittedOk] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cart.isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cart.close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cart.isOpen, cart]);

  if (!cart.isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!cart.contact.name || !cart.contact.phone) {
      setError("Заполните имя и телефон");
      return;
    }
    if (cart.items.length === 0) {
      setError("Подбор пуст");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/cart/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.items,
          dateFrom: cart.dateFrom,
          dateTo: cart.dateTo,
          months: cart.months,
          discountPct: cart.discountPct,
          pricePerMonthTotal: cart.pricePerMonthTotal,
          total: cart.total,
          contact: cart.contact,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || "Не удалось отправить заявку. Попробуйте позже или позвоните 8 (3822) 97-97-05.");
        return;
      }
      setSubmittedOk(true);
      cart.clear();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка отправки");
    } finally {
      setSubmitting(false);
    }
  };

  const dateFromMin = new Date().toISOString().slice(0, 10);

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4 animate-fade-in-soft"
      onClick={cart.close}
    >
      <div
        className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Ваш подбор</h2>
            <p className="text-sm text-slate-500">
              {cart.items.length}{" "}
              {cart.items.length === 1 ? "конструкция" : cart.items.length < 5 ? "конструкции" : "конструкций"}
            </p>
          </div>
          <button
            onClick={cart.close}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-xl"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        {submittedOk ? (
          <div className="p-10 text-center flex-1 overflow-y-auto">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold mb-2">Заявка отправлена</h3>
            <p className="text-slate-600 max-w-md mx-auto">
              Менеджер свяжется с вами в течение часа в рабочее время (Пн–Пт 9:00–18:00,
              Сб 10:00–15:00).
            </p>
            <button
              onClick={() => {
                setSubmittedOk(false);
                cart.close();
              }}
              className="mt-6 bg-[#F57C28] hover:bg-[#E26A1F] text-white px-8 py-3 rounded-lg font-semibold"
            >
              Закрыть
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            {/* Период */}
            <section className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Период размещения
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="block text-xs text-slate-600 mb-1">С даты</span>
                  <input
                    type="date"
                    value={cart.dateFrom ?? ""}
                    min={dateFromMin}
                    onChange={(e) => cart.setDates(e.target.value || null, cart.dateTo)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="block text-xs text-slate-600 mb-1">По дату</span>
                  <input
                    type="date"
                    value={cart.dateTo ?? ""}
                    min={cart.dateFrom ?? dateFromMin}
                    onChange={(e) => cart.setDates(cart.dateFrom, e.target.value || null)}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                </label>
              </div>
              {cart.months > 0 && (
                <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
                  <span className="text-slate-700">
                    Период: <strong>{cart.months}</strong>{" "}
                    {cart.months === 1 ? "месяц" : cart.months < 5 ? "месяца" : "месяцев"}
                  </span>
                  {cart.discountPct > 0 && (
                    <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      Скидка {Math.round(cart.discountPct * 100)}%
                    </span>
                  )}
                </div>
              )}
            </section>

            {/* Items */}
            <section className="px-6 py-5 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Выбранные конструкции
              </h3>
              {cart.items.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Список пуст. Кликните на метку на карте и добавьте конструкцию в подбор.
                </p>
              ) : (
                <ul className="space-y-2">
                  {cart.items.map((it) => (
                    <li
                      key={it.sideId}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200"
                    >
                      <div className="w-16 h-12 sm:w-20 sm:h-14 rounded bg-slate-200 overflow-hidden shrink-0">
                        {it.photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.photo}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm truncate">
                          {it.sideId} · {it.address}
                        </div>
                        <div className="text-xs text-slate-500">
                          {it.type} {it.format}
                          {" · "}
                          {it.pricePerMonth
                            ? `${it.pricePerMonth.toLocaleString("ru-RU")} ₽/мес`
                            : "цена по запросу"}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => cart.remove(it.sideId)}
                        className="text-slate-400 hover:text-rose-600 px-2 py-1 text-sm shrink-0"
                        aria-label="Убрать из подбора"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Расчёт */}
            {cart.items.length > 0 && (
              <section className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                <div className="flex justify-between text-sm text-slate-600 mb-1">
                  <span>За месяц</span>
                  <span className="font-semibold">
                    {cart.pricePerMonthTotal.toLocaleString("ru-RU")} ₽
                  </span>
                </div>
                {cart.months > 0 && (
                  <>
                    <div className="flex justify-between text-sm text-slate-600 mb-1">
                      <span>
                        × {cart.months} мес
                        {cart.discountPct > 0 && ` − ${Math.round(cart.discountPct * 100)}%`}
                      </span>
                      <span className="font-semibold">
                        {cart.total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-bold mt-2 pt-2 border-t border-slate-200">
                      <span>Итого за период</span>
                      <span className="text-[#F57C28]">
                        {cart.total.toLocaleString("ru-RU")} ₽
                      </span>
                    </div>
                  </>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  Без учёта печати макета и монтажа. Финальный счёт — менеджер.
                </p>
              </section>
            )}

            {/* Контакты */}
            <section className="px-6 py-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
                Ваши контакты
              </h3>
              <div className="space-y-3">
                <input
                  required
                  type="text"
                  placeholder="Имя *"
                  value={cart.contact.name}
                  onChange={(e) => cart.updateContact("name", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
                />
                <input
                  required
                  type="tel"
                  placeholder="Телефон * +7 (___) ___-__-__"
                  value={cart.contact.phone}
                  onChange={(e) => cart.updateContact("phone", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email (опционально)"
                  value={cart.contact.email}
                  onChange={(e) => cart.updateContact("email", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
                />
                <textarea
                  placeholder="Комментарий — например «срочно», «нужна печать макета»"
                  rows={2}
                  value={cart.contact.comment}
                  onChange={(e) => cart.updateContact("comment", e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm"
                />
              </div>
              {error && <div className="text-rose-600 text-sm mt-3">{error}</div>}
            </section>

            <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center gap-3">
              <p className="w-full text-xs text-gray-500 leading-relaxed">
                Отправляя форму, вы соглашаетесь с{" "}
                <a href="/privacy" className="text-brand">политикой конфиденциальности</a>{" "}
                и даёте согласие на обработку персональных данных.
              </p>
              <button
                type="submit"
                disabled={submitting || cart.items.length === 0}
                className="flex-1 bg-[#F57C28] hover:bg-[#E26A1F] disabled:bg-slate-300 text-white px-6 py-3 rounded-lg font-bold transition"
              >
                {submitting ? "Отправляем..." : "Отправить менеджеру"}
              </button>
              <button
                type="button"
                onClick={cart.clear}
                disabled={cart.items.length === 0}
                className="text-sm text-slate-500 hover:text-rose-600 px-3 py-2 disabled:opacity-40"
              >
                Очистить
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
