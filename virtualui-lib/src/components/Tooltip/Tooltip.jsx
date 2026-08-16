import { useState } from "react";

export default function Tooltip({ text = "This is a tooltip", children }) {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <button style={{
        padding: "8px 16px",
        borderRadius: "10px",
        background: "rgba(59,232,255,0.1)",
        border: "1px solid rgba(59,232,255,0.25)",
        color: "#3be8ff",
        fontSize: "13px",
        cursor: "pointer"
      }}>
        {children || "Hover me"}
      </button>
      {show && (
        <div style={{
          position: "absolute",
          bottom: "125%",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#0a1a1e",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#fff",
          fontSize: "12px",
          padding: "6px 10px",
          borderRadius: "8px",
          whiteSpace: "nowrap",
          zIndex: 10
        }}>
          {text}
        </div>
      )}
    </div>
  );
}