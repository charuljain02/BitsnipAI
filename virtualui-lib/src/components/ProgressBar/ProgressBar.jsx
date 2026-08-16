export default function ProgressBar({ value = 65, label = "Progress" }) {
  return (
    <div style={{ width: "100%", maxWidth: "320px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>{label}</span>
        <span style={{ color: "#3be8ff", fontSize: "12px", fontWeight: 600 }}>{value}%</span>
      </div>
      <div style={{ width: "100%", height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
        <div style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "999px",
          background: "linear-gradient(90deg, #3be8ff, #0ab5d4)",
          transition: "width 0.3s ease"
        }} />
      </div>
    </div>
  );
}