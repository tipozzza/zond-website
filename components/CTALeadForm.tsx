"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { COMPANY, SERVICES } from "@/lib/site-data";

/**
 * Форма «Оставить заявку» из блока CTAForm (стоит на главной и на всех
 * страницах услуг). Отправляет заявку в /api/contact — тот же маршрут, что и
 * форма на странице контактов: письмо уходит на SALES_EMAIL через Resend.
 *
 * До этого у формы не было ни обработчика, ни имён полей: кнопка делала
 * обычную GET-отправку на ту же страницу, страница перезагружалась, браузер
 * прыгал наверх и возвращался к якорю #contact-form, а заявка терялась.
 */

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full py-3.5 px-4 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-brand focus:outline-none transition-colors";

export default function CTALeadForm({ accentColor }: { accentColor?: string }) {
  const pathname = usePathname();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");
  const [website, setWebsite] = useState(""); // honeypot: люди это поле не видят
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const reset = () => {
    setName("");
    setPhone("");
    setEmail("");
    setTask("");
    setComment("");
    setError("");
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const digits = phone.replace(/\D/g, "");
    if (!name.trim()) {
      setError("Напишите, как к вам обращаться.");
      return;
    }
    if (digits.length < 10) {
      setError("Проверьте телефон — нужно не меньше 10 цифр.");
      return;
    }
    // Бот заполнил скрытое поле — делаем вид, что отправили, письмо не шлём.
    if (website) {
      setStatus("sent");
      return;
    }

    // В /api/contact поле message обязательное, а комментарий у нас
    // необязательный: собираем текст из задачи и комментария.
    const messageParts = [
      task ? `Задача: ${task}` : "",
      comment.trim() || "Комментарий не указан.",
    ].filter(Boolean);

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          department: task || "не выбрана",
          message: messageParts.join("\n"),
          page: pathname,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(`Не удалось отправить. Попробуйте ещё раз или позвоните: ${COMPANY.phone}`);
    }
  };

  if (status === "sent") {
    return (
      <div className="min-h-[520px] flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4" aria-hidden="true">✓</div>
        <h3 className="text-2xl font-bold mb-2">Заявка отправлена</h3>
        <p className="text-gray-500 mb-6">Менеджер свяжется с вами в течение часа в рабочее время.</p>
        <button
          type="button"
          onClick={reset}
          className="btn px-6 py-3 text-sm text-white hover:brightness-90 transition-all"
          style={{ backgroundColor: accentColor ?? "#6F395D" }}
        >
          Отправить ещё одну
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="cta-name" className="block text-sm font-semibold mb-1.5">Имя *</label>
        <input
          id="cta-name"
          name="name"
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="cta-phone" className="block text-sm font-semibold mb-1.5">Телефон *</label>
          <input
            id="cta-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cta-email" className="block text-sm font-semibold mb-1.5">Email</label>
          <input
            id="cta-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.ru"
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label htmlFor="cta-task" className="block text-sm font-semibold mb-1.5">Какая задача?</label>
        <select
          id="cta-task"
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className={inputClass}
        >
          <option value="">Выберите направление…</option>
          {SERVICES.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Не определился — нужна консультация">Не определился — нужна консультация</option>
        </select>
      </div>
      <div>
        <label htmlFor="cta-comment" className="block text-sm font-semibold mb-1.5">Комментарий</label>
        <textarea
          id="cta-comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Расскажите про задачу, бюджет, сроки"
          className={`${inputClass} min-h-[80px] resize-y`}
        />
      </div>
      {/* honeypot — скрыт от людей, но виден ботам */}
      <div className="absolute -left-[9999px] top-0 h-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cta-website">Website</label>
        <input
          id="cta-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500 leading-relaxed">
        Нажимая «Отправить», вы соглашаетесь с{" "}
        <a href="/privacy" className="text-brand">политикой конфиденциальности</a>{" "}
        и даёте согласие на обработку персональных данных.
      </p>
      <button
        type="submit"
        disabled={sending}
        className="btn w-full py-4 text-sm text-white hover:-translate-y-0.5 hover:brightness-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
        style={{ backgroundColor: accentColor ?? "#6F395D" }}
      >
        {sending ? "Отправляем…" : "Отправить заявку →"}
      </button>
    </form>
  );
}
