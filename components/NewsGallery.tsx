"use client";

import { useState } from "react";

/**
 * Галерея фотографий новости: сетка превью + лайтбокс по клику.
 * Паттерн лайтбокса переиспользован из components/PublicPortfolio.tsx,
 * добавлена навигация ◀ ▶ между фото. Пустой массив — ничего не рендерим.
 */
export default function NewsGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () => setIndex((i) => (i === null ? i : (i + 1) % images.length));

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Фотографии</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className="group aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden"
            aria-label={`Открыть фото ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${title} — фото ${i + 1}`}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Закрыть"
            className="absolute top-4 right-4 text-white text-3xl hover:text-brand"
          >
            ✕
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label="Предыдущее"
                className="absolute left-4 text-white text-4xl hover:text-brand px-2"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label="Следующее"
                className="absolute right-4 text-white text-4xl hover:text-brand px-2"
              >
                ›
              </button>
            </>
          )}
          <div className="max-w-5xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[index]}
              alt={`${title} — фото ${index + 1}`}
              className="w-full max-h-[85vh] object-contain rounded-lg"
            />
            <div className="text-white/70 text-center text-sm mt-3">
              {index + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
