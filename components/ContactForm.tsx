"use client";

import { useState } from "react";

const DEPARTMENTS = [
  { value: "", label: "Общий вопрос" },
  { value: "sales", label: "Отдел продаж" },
  { value: "design", label: "Дизайн" },
  { value: "production", label: "Производство и монтаж" },
  { value: "accounting", label: "Бухгалтерия" },
];

export default function ContactForm({
  title,
  description,
  requireConsent = false,
}: { title?: string; description?: string; requireConsent?: boolean } = {}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setDepartment("");
    setMessage("");
    setConsent(false);
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !phone || !message) {
      setError("Заполните имя, телефон и сообщение");
      return;
    }
    if (requireConsent && !consent) {
      setError("Подтвердите согласие на обработку персональных данных");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, department, message }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch {
      setError("Не удалось отправить сообщение. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="text-2xl font-bold mb-2">Сообщение отправлено!</h3>
        <p className="text-slate-600 mb-6">
          Менеджер свяжется с вами в течение рабочего дня.
        </p>
        <button
          onClick={reset}
          className="bg-brand hover:bg-brand/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Отправить ещё одно сообщение
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 space-y-4"
    >
      {(title || description) && (
        <div className="mb-1">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Имя *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Телефон *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="+7 ..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Отдел</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand bg-white transition-colors"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1.5">Сообщение *</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:border-brand transition-colors resize-y"
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {requireConsent ? (
        <div className="flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            aria-label="Согласие на обработку персональных данных"
            className="mt-0.5 w-4 h-4 accent-brand shrink-0"
          />
          <span>
            Отправляя форму, вы соглашаетесь с{" "}
            <a href="/privacy" className="text-brand">политикой конфиденциальности</a>{" "}
            и даёте согласие на обработку персональных данных.
          </span>
        </div>
      ) : (
        <p className="text-xs text-gray-500 leading-relaxed">
          Отправляя форму, вы соглашаетесь с{" "}
          <a href="/privacy" className="text-brand">политикой конфиденциальности</a>{" "}
          и даёте согласие на обработку персональных данных.
        </p>
      )}
      <button
        type="submit"
        disabled={submitting || (requireConsent && !consent)}
        title={requireConsent && !consent ? "Подтвердите согласие на обработку персональных данных" : undefined}
        className="w-full md:w-auto bg-brand hover:bg-brand/90 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {submitting ? "Отправляем..." : "Отправить"}
      </button>
    </form>
  );
}
