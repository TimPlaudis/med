"use client";

import { useEffect, useRef } from "react";

export default function Map({ clinics, selected }: any) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

    script.onload = () => {
      // @ts-ignore
      ymaps.ready(() => {
        // @ts-ignore
        mapInstance.current = new ymaps.Map(mapRef.current, {
          center: [51.128, 71.430],
          zoom: 12,
        });

        renderMarkers();
      });
    };

    document.body.appendChild(script);
  }, []);

  const renderMarkers = () => {
    if (!mapInstance.current) return;

    mapInstance.current.geoObjects.removeAll();

    clinics.forEach((c: any) => {
      // @ts-ignore
      const marker = new ymaps.Placemark(
        [c.lat, c.lng],
        {
          balloonContent: `<b>${c.name}</b><br/>${c.address}`,
        }
      );

      mapInstance.current.geoObjects.add(marker);
    });
  };

  useEffect(() => {
    renderMarkers();
  }, [clinics]);

  useEffect(() => {
    if (selected && mapInstance.current) {
      mapInstance.current.setCenter(
        [selected.lat, selected.lng],
        15
      );
    }
  }, [selected]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
