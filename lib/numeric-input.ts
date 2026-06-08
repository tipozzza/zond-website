"use client";

import { useState, type ChangeEvent, type FocusEvent } from "react";

/**
 * Хуки для числового ввода с правильным UX:
 *
 * 1. type="text" + inputMode="numeric"/"decimal" — мобильная клавиатура остаётся
 *    цифровой, но в браузере select() РАБОТАЕТ (на type="number" не работает,
 *    из-за чего юзер набирает «6» поверх «60» и получает «606» вместо «6»).
 *
 * 2. Промежуточные значения ниже min разрешены ВО ВРЕМЯ набора —
 *    юзер может стереть «60» до пустого и набрать «15» по одной цифре.
 *    Старая логика `Math.max(min, parseInt(...) || min)` блокировала это:
 *    при попытке очистить поле сразу подставлялся min, юзер дописывал «5»
 *    к уже стоящему «1» и получал «15».
 *
 * 3. Clamp к [min, max] срабатывает только на blur и при программном setRaw.
 *
 * Возвращает: value (число, готовое для расчётов, всегда в пределах [min, max]),
 * setRaw (для программных сбросов извне) и props (spread в <input>).
 */

export type NumericInputResult = {
  value: number;
  setRaw: (raw: string) => void;
  props: {
    type: "text";
    inputMode: "numeric" | "decimal";
    pattern: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onFocus: (e: FocusEvent<HTMLInputElement>) => void;
  };
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

export function useIntegerInput(
  initial: number,
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): NumericInputResult {
  const [raw, setRaw] = useState(String(initial));
  const parsed = parseInt(raw, 10);
  const value = Number.isFinite(parsed) ? clamp(parsed, min, max) : min;
  return {
    value,
    setRaw,
    props: {
      type: "text",
      inputMode: "numeric",
      pattern: "[0-9]*",
      value: raw,
      onChange: (e) => {
        const v = e.target.value;
        if (v === "" || /^\d+$/.test(v)) setRaw(v);
      },
      onBlur: () => {
        const n = parseInt(raw, 10);
        setRaw(String(Number.isFinite(n) ? clamp(n, min, max) : min));
      },
      onFocus: (e) => e.currentTarget.select(),
    },
  };
}

export function useDecimalInput(
  initial: number,
  min: number,
  max: number = Number.POSITIVE_INFINITY,
): NumericInputResult {
  const [raw, setRaw] = useState(String(initial));
  const parsed = parseFloat(raw);
  const value = Number.isFinite(parsed) ? clamp(parsed, min, max) : min;
  return {
    value,
    setRaw,
    props: {
      type: "text",
      inputMode: "decimal",
      pattern: "[0-9]*[.,]?[0-9]*",
      value: raw,
      onChange: (e) => {
        // Принимаем запятую как разделитель (привычка ru-локали) и заменяем на точку.
        const v = e.target.value.replace(",", ".");
        if (v === "" || /^\d*\.?\d*$/.test(v)) setRaw(v);
      },
      onBlur: () => {
        const n = parseFloat(raw);
        const clamped = Number.isFinite(n) ? clamp(n, min, max) : min;
        // Округляем до 2 знаков для эстетики (3.14 а не 3.140000001).
        setRaw(String(Math.round(clamped * 100) / 100));
      },
      onFocus: (e) => e.currentTarget.select(),
    },
  };
}
