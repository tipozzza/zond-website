"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { Side } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/sides-data";

declare global {
  interface Window {
    ymaps: any;
  }
}

type Props = {
  sides: Side[];
  onSideClick: (side: Side) => void;
};

export default function YandexMap({ sides, onSideClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    window.ymaps.ready(() => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }

      const map = new window.ymaps.Map(mapRef.current, {
        center: [56.4847, 84.9482],
        zoom: 12,
        controls: ["zoomControl", "geolocationControl", "fullscreenControl", "searchControl"],
      });

      const clusterer = new window.ymaps.Clusterer({
        preset: "islands#violetClusterIcons",
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        gridSize: 80,
      });

      const placemarks = sides
        .filter((s) => s.lat !== null && s.lng !== null)
        .map((side) => {
          const color = TYPE_COLORS[side.type] || "#666";
          const placemark = new window.ymaps.Placemark(
            [side.lat, side.lng],
            {
              hintContent: `${side.id} — ${side.type} ${side.format}`,
              balloonContentHeader: `<strong>${side.id}</strong>`,
              balloonContentBody: `${side.address}<br/>${side.type} • ${side.format}`,
            },
            {
              preset: "islands#dotIcon",
              iconColor: color,
            }
          );

          placemark.events.add("click", () => {
            onSideClick(side);
          });

          return placemark;
        });

      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      mapInstance.current = map;
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
    };
  }, [scriptLoaded, sides, onSideClick]);

  const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_KEY;

  return (
    <>
      <Script
        src={`https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div ref={mapRef} className="w-full h-[600px] rounded-2xl overflow-hidden shadow-xl" />
    </>
  );
}
