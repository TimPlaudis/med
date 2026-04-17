"use client";

import { useEffect, useState } from "react";
import { clinics as data } from "@/data/clinics";
import Map from "@/components/Map";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<any>(null);
  const [geo, setGeo] = useState<any>(null);

  const filtered = data.filter((c) => {
    const matchSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || c.category === filter || c.type === filter;

    return matchSearch && matchFilter;
  });

  // 📍 GEOLOCATION
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setGeo({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar
        clinics={filtered}
        search={search}
        setSearch={setSearch}
        setFilter={setFilter}
        onSelect={setSelected}
      />

      <div style={{ flex: 1 }}>
        <Map clinics={filtered} selected={selected} />
      </div>
    </div>
  );
}
