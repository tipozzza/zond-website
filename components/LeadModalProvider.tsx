"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ContactForm from "./ContactForm";

/**
 * Глобальная модалка «Оставить заявку». Провайдер монтируется в layout и
 * оборачивает всё приложение, поэтому кнопку можно открыть с любой страницы
 * (в т.ч. там, где нет блока формы — напр. /news). Форма переиспользует
 * существующий ContactForm (поля + отправка на /api/contact через Resend).
 */
type LeadModalCtx = { open: () => void; close: () => void };
const Ctx = createContext<LeadModalCtx>({ open: () => {}, close: () => {} });

export const useLeadModal = () => useContext(Ctx);

export default function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    restoreFocus.current = (document.activeElement as HTMLElement) ?? null;
    document.body.style.overflow = "hidden";

    const focusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab") {
        const els = focusable();
        if (els.length === 0) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => focusable()[0]?.focus(), 50);

    return () => {
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      document.body.style.overflow = "";
      restoreFocus.current?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Оставить заявку"
        >
          <div
            ref={dialogRef}
            className="relative w-full max-w-2xl my-6 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-2 top-2 z-10 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-brand flex items-center justify-center text-lg"
            >
              ✕
            </button>
            <ContactForm
              title="Оставить заявку"
              description="Заполните форму — менеджер свяжется в ближайшее время."
              requireConsent
            />
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
