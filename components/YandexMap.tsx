"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { Side } from "@/lib/types";

// Все метки одного брендового цвета. Раньше различались по TYPE_COLORS,
// но это создавало впечатление "светофора" статусов — убрали.
const MARKER_COLOR = "#6F395D";

declare global {
  interface Window {
    ymaps: any;
    __zondSides: Record<string, Side>;
    __zondOpenSide: (id: string) => void;
    __zondAddSideToCart: (id: string) => void;
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
      // Прямое добавление в подбор из balloon — без открытия модалки.
      window.__zondAddSideToCart = (id: string) => {
        const side = window.__zondSides[id];
        if (!side || !window.__zondAddToCart) return;
        window.__zondAddToCart({
          sideId: side.id,
          address: side.address,
          type: side.type,
          format: side.format,
          pricePerMonth: side.priceFinal,
          photo: side.photo_filename
            ? `/images/constructions/${side.photo_filename}`
            : undefined,
        });
        map.balloon.close();
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

      // Группируем стороны по конструкции: одна метка на конструкцию с её
      // НОМЕРОМ (iconContent), а стороны А/Б показываем в балуне по клику.
      // Кластер из РАЗНЫХ конструкций остаётся со счётчиком и при зуме
      // распадается на метки-номера.
      const byConstruction = new Map<string, Side[]>();
      sides
        .filter((s) => s.lat !== null && s.lng !== null)
        .forEach((s) => {
          const group = byConstruction.get(s.construction);
          if (group) group.push(s);
          else byConstruction.set(s.construction, [s]);
        });

      const placemarks: any[] = [];
      byConstruction.forEach((group, construction) => {
        const rep = group[0]; // координата конструкции — по первой стороне
        const photoSide = group.find((s) => s.photo_filename);
        const photoHtml = photoSide
          ? `<img src="/images/constructions/${photoSide.photo_filename}" alt="Конструкция ${construction}" style="width:100%;max-width:280px;height:auto;border-radius:6px;margin-bottom:8px;display:block;" onerror="this.style.display='none'" />`
          : "";
        const sidesHtml = group
          .map((side) => {
            const price = side.priceFinal
              ? side.priceFinal.toLocaleString("ru-RU") + " ₽/мес"
              : "";
            return `
              <div style="border-top:1px solid #eee;padding-top:8px;margin-top:8px;">
                <div style="font-weight:600;">Сторона ${side.side} · ${side.type} ${side.format}${price ? ` · ${price}` : ""}</div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">
                  <button onclick="window.__zondOpenSide('${side.id}'); return false;" style="flex:1;min-width:140px;background:#F57C28;color:white;padding:8px 14px;border-radius:6px;border:none;cursor:pointer;font-weight:600;">Подробнее</button>
                  <button onclick="window.__zondAddSideToCart('${side.id}'); return false;" style="flex:1;min-width:120px;background:white;color:#F57C28;padding:8px 14px;border-radius:6px;border:2px solid #F57C28;cursor:pointer;font-weight:600;">➕ В подбор</button>
                </div>
              </div>`;
          })
          .join("");

        const placemark = new window.ymaps.Placemark(
          [rep.lat, rep.lng],
          {
            iconContent: construction,
            hintContent: `Конструкция ${construction} · ${group.length} ${group.length === 1 ? "сторона" : "стор."}`,
            balloonContentHeader: `<strong>Конструкция №${construction}</strong>`,
            balloonContentBody: `${photoHtml}<div>${rep.address}</div>${sidesHtml}`,
          },
          {
            preset: "islands#violetStretchyIcon",
            iconColor: MARKER_COLOR,
          }
        );
        placemarks.push(placemark);
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
          balloonContentFooter: `
            <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">
              <button onclick="window.__zondOpenSide && window.__zondOpenSide('${focusSide.id}'); return false;" style="flex:1;min-width:140px;background:#F57C28;color:white;padding:8px 14px;border-radius:6px;border:none;cursor:pointer;font-weight:600;">Подробнее</button>
              <button onclick="window.__zondAddSideToCart && window.__zondAddSideToCart('${focusSide.id}'); return false;" style="flex:1;min-width:120px;background:white;color:#F57C28;padding:8px 14px;border-radius:6px;border:2px solid #F57C28;cursor:pointer;font-weight:600;">➕ В подбор</button>
            </div>`,
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
