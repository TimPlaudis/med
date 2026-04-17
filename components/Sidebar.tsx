"use client";

export default function Sidebar({
  clinics,
  search,
  setSearch,
  setFilter,
  setSort,
  onSelect,
  userLocation,
}: any) {
  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Medical Registry</h2>

      {/* SEARCH */}
      <input
        style={styles.input}
        placeholder="Search clinic..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FILTER */}
      <select
        style={styles.input}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="clinic">Clinics</option>
        <option value="hospital">Hospitals</option>
        <option value="dentistry">Dentistry</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      {/* SORT */}
      <select
        style={styles.input}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="default">Sort: Default</option>
        <option value="near">Sort: Nearest</option>
      </select>

      {/* GEO INFO */}
      {userLocation && (
        <div style={styles.geoBox}>
          📍 Your location detected
        </div>
      )}

      {/* LIST */}
      <div style={styles.list}>
        {clinics.length === 0 && (
          <div style={{ opacity: 0.6 }}>No clinics found</div>
        )}

        {clinics.map((c: any) => (
          <div
            key={c.id}
            style={styles.card}
            onClick={() => onSelect(c)}
          >
            <div style={styles.name}>{c.name}</div>
            <div style={styles.address}>{c.address}</div>

            <div style={styles.tags}>
              <span style={styles.tag}>{c.category}</span>
              <span style={styles.tag}>{c.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  wrapper: {
    width: 380,
    height: "100vh",
    overflowY: "auto",
    padding: 16,
    borderRight: "1px solid #eaeaea",
    background: "#fff",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    marginBottom: 12,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none",
  },

  geoBox: {
    padding: 8,
    marginBottom: 10,
    background: "#f0f7ff",
    border: "1px solid #cfe4ff",
    borderRadius: 8,
    fontSize: 12,
  },

  list: {
    marginTop: 10,
  },

  card: {
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    marginBottom: 10,
    cursor: "pointer",
    transition: "0.2s",
  },

  name: {
    fontWeight: "bold",
    marginBottom: 4,
  },

  address: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 6,
  },

  tags: {
    display: "flex",
    gap: 6,
  },

  tag: {
    fontSize: 11,
    padding: "2px 6px",
    background: "#f3f3f3",
    borderRadius: 6,
  },
};
