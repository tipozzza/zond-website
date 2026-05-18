"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { Side } from "@/lib/types";
import { TYPE_COLORS, getSidePhotoUrl } from "@/lib/sides-data";

declare global {
  interface Window {
    ymaps: any;
    __zondSides: Record<string, Side>;
    __zondOpenSide: (id: string) => void;
  }
}

type Props = {
  sides: Side[];
  onSideClick: (side: Side) => void;
};

export default function YandexMap({ sides, onSideClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const onSideClickRef = useRef(onSideClick);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    onSideClickRef.current = onSideClick;
  });

  useEffect(() => {
    if (!scriptLoaded || !mapRef.current) return;

    window.ymaps.ready(() => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
      }

      const map = new window.ymaps.Map(mapRef.current!, {
        center: [56.4847, 84.9482],
        zoom: 12,
        controls: ["zoomControl", "geolocationControl", "fullscreenControl", "searchControl"],
      });

      window.__zondSides = {};
      sides.forEach((s) => {
        window.__zondSides[s.id] = s;
      });
      window.__zondOpenSide = (id: string) => {
        const side = window.__zondSides[id];
        if (side) {
          map.balloon.close();
          onSideClickRef.current(side);
        }
      };

      const clusterer = new window.ymaps.Clusterer({
        preset: "islands#violetClusterIcons",
        groupByCoordinates: false,
        clusterDisableClickZoom: false,
        gridSize: 80,
        clusterBalloonContentLayout: "cluster#balloonAccordion",
        clusterBalloonPanelMaxMapArea: 0,
      });

      const placemarks = sides
        .filter((s) => s.lat !== null && s.lng !== null)
        .map((side) => {
          const color = TYPE_COLORS[side.type] || "#666";
          const photoUrl = getSidePhotoUrl(side);
          const photoHtml = photoUrl
            ? `<img src="${photoUrl}" alt="${side.id}" style="width:100%;max-width:280px;height:auto;border-radius:6px;margin-bottom:8px;display:block;" onerror="this.style.display='none'" />`
            : "";
          const price = side.priceFinal ? side.priceFinal.toLocaleString("ru-RU") + " ₽/мес" : "";
          const button = `<button onclick="window.__zondOpenSide('${side.id}'); return false;" style="background:#3D2E91;color:white;padding:8px 16px;border-radius:6px;border:none;cursor:pointer;font-weight:600;margin-top:8px;">Подробнее и забронировать</button>`;
          return new window.ymaps.Placemark(
            [side.lat, side.lng],
            {
              hintContent: `${side.id} — ${side.type} ${side.format}`,
              balloonContentHeader: `<strong>${side.id}</strong> · ${side.type} ${side.format}`,
              balloonContentBody: `${photoHtml}${side.address}<br/>${price}`,
              balloonContentFooter: button,
            },
            {
              preset: "islands#dotIcon",
              iconColor: color,
            }
          );
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
  }, [scriptLoaded, sides]);

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
