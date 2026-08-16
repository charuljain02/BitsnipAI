export default function Modal({ title, isOpen = true, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
      <div style={{ background: "#0a1a1e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", width: "90%", maxWidth: "420px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "16px" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "18px" }}>×</button>
        </div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>{children}</div>
      </div>
    </div>
  );
}