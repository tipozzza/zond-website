"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    ymaps: any;
  }
}

const OFFICE_COORDS: [number, number] = [56.4847, 84.9756];

export default function OfficeMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    window.ymaps.ready(() => {
      if (mapInstance.current) mapInstance.current.destroy();

      const map = new window.ymaps.Map(mapRef.current!, {
        center: OFFICE_COORDS,
        zoom: 16,
        controls: ["zoomControl", "fullscreenControl"],
      });

      const placemark = new window.ymaps.Placemark(
        OFFICE_COORDS,
        {
          hintContent: "ГК «Зонд-Реклама»",
          balloonContentHeader: "<strong>ГК «Зонд-Реклама»</strong>",
          balloonContentBody:
            "пр. Фрунзе, 115 (офис)<br/>пр. Фрунзе, 109 (производственный цех)<br/>Пн–Пт 9:00–18:00",
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
