"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { Side } from "@/lib/types";
import { TYPE_COLORS } from "@/lib/sides-data";

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
  onSideFocus: (side: Side) => void;
  focusSide?: Side | null;
};

export default function YandexMap({ sides, onSideClick, onSideFocus, focusSide }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const clustererHiddenRef = useRef(false);
  const onSideClickRef = useRef(onSideClick);
  const onSideFocusRef = useRef(onSideFocus);
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && !!window.ymaps
  );
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    onSideClickRef.current = onSideClick;
    onSideFocusRef.current = onSideFocus;
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
      (window as any).__zondClusterer = clusterer;

      const placemarks = sides
        .filter((s) => s.lat !== null && s.lng !== null)
        .map((side) => {
          const color = TYPE_COLORS[side.type] || "#666";
          const photoHtml = side.photo_filename
            ? `<img src="/images/constructions/${side.photo_filename}" alt="${side.id}" style="width:100%;max-width:280px;height:auto;border-radius:6px;margin-bottom:8px;display:block;" onerror="this.style.display='none'" />`
            : "";
          const price = side.priceFinal ? side.priceFinal.toLocaleString("ru-RU") + " ₽/мес" : "";
          const button = `<button onclick="window.__zondOpenSide('${side.id}'); return false;" style="background:#F57C28;color:white;padding:8px 16px;border-radius:6px;border:none;cursor:pointer;font-weight:600;margin-top:8px;">Подробнее и забронировать</button>`;
          const placemark = new window.ymaps.Placemark(
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
          placemark.events.add("click", (e: any) => {
            e.preventDefault();
            onSideFocusRef.current(side);
          });
          return placemark;
        });

      clusterer.add(placemarks);
      map.geoObjects.add(clusterer);

      const highlightLayer = new window.ymaps.GeoObjectCollection();
      map.geoObjects.add(highlightLayer);
      (window as any).__zondHighlightLayer = highlightLayer;
      clustererHiddenRef.current = false;

      mapInstance.current = map;
      setMapReady(true);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.destroy();
        mapInstance.current = null;
      }
      setMapReady(false);
    };
  }, [scriptLoaded, sides]);

  useEffect(() => {
    if (!mapReady || !mapInstance.current) return;
    const map = mapInstance.current;
    const clusterer = (window as any).__zondClusterer;
    const highlightLayer = (window as any).__zondHighlightLayer;
    if (!clusterer || !highlightLayer) return;

    highlightLayer.removeAll();

    if (focusSide && focusSide.lat != null && focusSide.lng != null) {
      if (!clustererHiddenRef.current) {
        map.geoObjects.remove(clusterer);
        clustererHiddenRef.current = true;
      }

      const HighlightLayout = window.ymaps.templateLayoutFactory.createClass(
        `<div style="position:relative;width:32px;height:32px;margin-left:-16px;margin-top:-16px;">
          <div style="position:absolute;inset:0;background:#F57C28;border:4px solid white;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3);z-index:2;"></div>
          <div style="position:absolute;inset:-8px;border:3px solid #F57C28;border-radius:50%;opacity:0.5;animation:zondPulse 1.6s ease-out infinite;"></div>
        </div>
        <style>@keyframes zondPulse{0%{transform:scale(0.7);opacity:0.7}100%{transform:scale(2);opacity:0}}</style>`
      );

      const placemark = new window.ymaps.Placemark(
        [focusSide.lat, focusSide.lng],
        {
          hintContent: `${focusSide.id} — ${focusSide.type} ${focusSide.format}`,
          balloonContentHeader: `<strong>${focusSide.id}</strong> · ${focusSide.type} ${focusSide.format}`,
          balloonContentBody: `${focusSide.address}<br/>${focusSide.priceFinal ? focusSide.priceFinal.toLocaleString("ru-RU") + " ₽/мес" : ""}`,
          balloonContentFooter: `<button onclick="window.__zondOpenSide && window.__zondOpenSide('${focusSide.id}'); return false;" style="background:#F57C28;color:white;padding:8px 16px;border-radius:6px;border:none;cursor:pointer;font-weight:600;">Подробнее и забронировать</button>`,
        },
        {
          iconLayout: HighlightLayout,
          iconShape: { type: "Circle", coordinates: [0, 0], radius: 16 },
        }
      );
      highlightLayer.add(placemark);
      map.setCenter([focusSide.lat, focusSide.lng], 17, { duration: 500 });
      const t = setTimeout(() => placemark.balloon.open(), 600);
      return () => clearTimeout(t);
    } else {
      if (clustererHiddenRef.current) {
        map.geoObjects.add(clusterer);
        clustererHiddenRef.current = false;
      }
    }
  }, [focusSide, mapReady]);

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
