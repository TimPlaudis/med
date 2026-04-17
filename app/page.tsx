"use client";

import { useEffect, useState } from "react";
import { clinics as data } from "@/data/clinics";
import Sidebar from "@/components/Sidebar";
import Map from "@/components/Map";
import { getDistance } from "@/lib/distance";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const [selected, setSelected] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setUserLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  }, []);

  let filtered = data.filter((c) => {
    const matchSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "all" || c.category === filter || c.type === filter;

    return matchSearch && matchFilter;
  });

  if (sort === "near" && userLocation) {
    filtered = filtered
      .map((c) => ({
        ...c,
        distance: getDistance(
          userLocation.lat,
          userLocation.lng,
          c.lat,
          c.lng
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <Sidebar
          clinics={filtered}
          search={search}
          setSearch={setSearch}
          setFilter={setFilter}
          setSort={setSort}
          onSelect={setSelected}
          userLocation={userLocation}
        />

        <div style={styles.map}>
          <Map clinics={filtered} selected={selected} />
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "95%",
    height: "92vh",
    display: "flex",
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    background: "#fff",
  },
  map: {
    flex: 1,
  },
};
