"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ymaps: any;
  }
}

const OFFICE_ADDRESS = "Россия, Томск, проспект Фрунзе, 115";
// Fallback на случай, если геокодер недоступен / не вернёт результат.
// Используется только если ymaps.geocode() не нашёл адрес.
const FALLBACK_COORDS: [number, number] = [56.4794, 84.9534];

export default function OfficeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && !!window.ymaps
  );

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    window.ymaps.ready(async () => {
      if (mapInstance.current) mapInstance.current.destroy();

      let coords: [number, number] = FALLBACK_COORDS;
      try {
        const result = await window.ymaps.geocode(OFFICE_ADDRESS, { results: 1 });
        const geoObject = result.geoObjects.get(0);
        if (geoObject) {
          const resolved = geoObject.geometry.getCoordinates();
          if (Array.isArray(resolved) && resolved.length === 2) {
            coords = [resolved[0], resolved[1]];
          }
        }
      } catch {
        // Силенциозный fallback — карта всё равно отрисуется по координатам.
      }

      const map = new window.ymaps.Map(mapRef.current!, {
        center: coords,
        zoom: 17,
        controls: ["zoomControl", "fullscreenControl"],
      });

      const placemark = new window.ymaps.Placemark(
        coords,
        {
          hintContent: "ГК «Зонд-Реклама»",
          balloonContentHeader: "<strong>ГК «Зонд-Реклама»</strong>",
          balloonContentBody:
            "пр. Фрунзе, 115 (офис + шоурум + производство)<br/>Пн–Пт 9:00–18:00, Сб 10:00–15:00",
        },
        {
          preset: "islands#violetIcon",
        }
      );

      map.geoObjects.add(placemark);
      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [scriptLoaded]);

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        ref={mapRef}
        className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-slate-100"
      />
    </>
  );
}
