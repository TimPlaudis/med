export default function Sidebar({
  clinics,
  search,
  setSearch,
  setFilter,
  onSelect,
}: any) {
  return (
    <div style={styles.wrapper}>
      <h2 style={{ marginBottom: 10 }}>Medical Registry</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <select
        onChange={(e) => setFilter(e.target.value)}
        style={styles.input}
      >
        <option value="all">All</option>
        <option value="hospital">Hospitals</option>
        <option value="clinic">Clinics</option>
        <option value="dentistry">Dentistry</option>
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      {clinics.map((c: any) => (
        <div key={c.id} style={styles.card} onClick={() => onSelect(c)}>
          <b>{c.name}</b>
          <div style={{ fontSize: 12 }}>{c.address}</div>
          <div style={styles.tag}>{c.category}</div>
        </div>
      ))}
    </div>
  );
}

const styles: any = {
  wrapper: {
    width: 360,
    padding: 15,
    borderRight: "1px solid #eee",
    height: "100vh",
    overflowY: "auto",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 8,
  },
  card: {
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 10,
    marginBottom: 10,
    cursor: "pointer",
    background: "#fff",
  },
  tag: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
};
