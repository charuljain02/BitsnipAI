export default function Breadcrumb({ items = ["Home", "Components", "Breadcrumb"] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{
            color: i === items.length - 1 ? "#3be8ff" : "rgba(255,255,255,0.4)",
            fontWeight: i === items.length - 1 ? 600 : 400,
            cursor: i === items.length - 1 ? "default" : "pointer"
          }}>
            {item}
          </span>
          {i < items.length - 1 && (
            <span style={{ color: "rgba(255,255,255,0.2)" }}>/</span>
          )}
        </span>
      ))}
    </div>
  );
}