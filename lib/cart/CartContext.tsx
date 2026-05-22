"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  sideId: string;
  address: string;
  type: string;
  format: string;
  pricePerMonth: number | null;
  photo?: string;
};

export type ContactField = "name" | "phone" | "email" | "comment";

export type CartState = {
  items: CartItem[];
  dateFrom: string | null;
  dateTo: string | null;
  contact: { name: string; phone: string; email: string; comment: string };
};

type CartApi = CartState & {
  has: (sideId: string) => boolean;
  add: (item: CartItem) => void;
  remove: (sideId: string) => void;
  clear: () => void;
  setDates: (from: string | null, to: string | null) => void;
  updateContact: (field: ContactField, value: string) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  // Дополнительная telemetry для UI.
  months: number;
  pricePerMonthTotal: number;
  discountPct: number;
  total: number;
};

const STORAGE_KEY = "zond-outdoor-cart";

const EMPTY_STATE: CartState = {
  items: [],
  dateFrom: null,
  dateTo: null,
  contact: { name: "", phone: "", email: "", comment: "" },
};

function load(): CartState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as Partial<CartState>;
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      dateFrom: parsed.dateFrom ?? null,
      dateTo: parsed.dateTo ?? null,
      contact: { ...EMPTY_STATE.contact, ...(parsed.contact ?? {}) },
    };
  } catch {
    return EMPTY_STATE;
  }
}

function save(state: CartState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage может быть недоступен (приватный режим Safari, etc).
  }
}

function diffMonths(fromIso: string | null, toIso: string | null): number {
  if (!fromIso || !toIso) return 0;
  const from = new Date(fromIso);
  const to = new Date(toIso);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return 0;
  const ms = to.getTime() - from.getTime();
  if (ms <= 0) return 0;
  return Math.max(1, Math.round(ms / (30 * 24 * 60 * 60 * 1000)));
}

function discountForMonths(m: number): number {
  if (m >= 12) return 0.15;
  if (m >= 6) return 0.1;
  if (m >= 3) return 0.05;
  return 0;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>(EMPTY_STATE);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) save(state);
  }, [state, hydrated]);

  const has = useCallback(
    (sideId: string) => state.items.some((i) => i.sideId === sideId),
    [state.items],
  );

  const add = useCallback((item: CartItem) => {
    setState((s) =>
      s.items.some((i) => i.sideId === item.sideId)
        ? s
        : { ...s, items: [...s.items, item] },
    );
  }, []);

  const remove = useCallback((sideId: string) => {
    setState((s) => ({ ...s, items: s.items.filter((i) => i.sideId !== sideId) }));
  }, []);

  const clear = useCallback(() => {
    setState(EMPTY_STATE);
  }, []);

  const setDates = useCallback((from: string | null, to: string | null) => {
    setState((s) => ({ ...s, dateFrom: from, dateTo: to }));
  }, []);

  const updateContact = useCallback((field: ContactField, value: string) => {
    setState((s) => ({ ...s, contact: { ...s.contact, [field]: value } }));
  }, []);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const derived = useMemo(() => {
    const pricePerMonthTotal = state.items.reduce(
      (sum, i) => sum + (i.pricePerMonth ?? 0),
      0,
    );
    const months = diffMonths(state.dateFrom, state.dateTo);
    const discountPct = discountForMonths(months);
    const gross = pricePerMonthTotal * months;
    const total = Math.round(gross * (1 - discountPct));
    return { pricePerMonthTotal, months, discountPct, total };
  }, [state.items, state.dateFrom, state.dateTo]);

  const value: CartApi = {
    ...state,
    ...derived,
    isOpen,
    has,
    add,
    remove,
    clear,
    setDates,
    updateContact,
    open,
    close,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside <CartProvider>");
  }
  return ctx;
}
