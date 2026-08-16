export default function StatCard({ label = "Total Revenue", value = "$24,500", change = "+12%" }) {
  const isPositive = change.startsWith("+");
  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      padding: "18px",
      width: "220px"
    }}>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "8px" }}>{label}</p>
      <p style={{ color: "#fff", fontSize: "24px", fontWeight: 700, marginBottom: "6px" }}>{value}</p>
      <span style={{
        fontSize: "11px",
        fontWeight: 600,
        color: isPositive ? "#34d399" : "#f87171",
        background: isPositive ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
        padding: "2px 8px",
        borderRadius: "999px"
      }}>
        {change} this month
      </span>
    </div>
  );
}