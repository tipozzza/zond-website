"use client";

import { useCart, type CartItem } from "@/lib/cart/CartContext";

type Props = {
  item: CartItem;
  className?: string;
};

export default function AddToCartButton({ item, className = "" }: Props) {
  const cart = useCart();
  const inCart = cart.has(item.sideId);

  const base =
    "inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition";

  return (
    <button
      type="button"
      onClick={() => (inCart ? cart.remove(item.sideId) : cart.add(item))}
      className={`${base} ${
        inCart
          ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-500 hover:bg-emerald-100"
          : "bg-white text-[#F57C28] border-2 border-[#F57C28] hover:bg-[#F57C28]/5"
      } ${className}`}
      aria-pressed={inCart}
    >
      {inCart ? (
        <>
          <span aria-hidden>✓</span>В подборе — убрать
        </>
      ) : (
        <>
          <span aria-hidden>➕</span>В подбор
        </>
      )}
    </button>
  );
}
