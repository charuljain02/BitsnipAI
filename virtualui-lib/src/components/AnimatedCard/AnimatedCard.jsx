import React, { useState } from "react";

export const AnimatedCard = ({
  title = "Premium Features",
  description = "Unlock all advanced capabilities with our premium plan",
  icon = "💎",
  accent = "#7c3aed",
  bg = "#0f172a",
  width = "280px",
  height = "180px",
  onHoverEffect = true,
  onClick = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHoverEffect && setHovered(true)}
      onMouseLeave={() => onHoverEffect && setHovered(false)}
      style={{
        width: width,
        height: height,
        background: bg,
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.08)"),
        cursor: "pointer",
        boxShadow: hovered ? "0 15px 30px rgba(0,0,0,0.5)" : "0 5px 15px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.2s ease",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <div style={{
        position: "absolute",
        top: "-50px",
        right: "-50px",
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        background: alpha(accent, 0.1),
        filter: "blur(20px)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease"
      }} />
      <div style={{
        width: "48px",
        height: "48px",
        borderRadius: "12px",
        background: alpha(accent, 0.2),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "24px",
        marginBottom: "16px",
        border: "1px solid " + alpha(accent, 0.3)
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: "16px",
        fontWeight: "700",
        color: "#fff",
        margin: "0 0 8px"
      }}>{title}</h3>
      <p style={{
        fontSize: "13px",
        color: "rgba(255,255,255,0.6)",
        lineHeight: "1.5",
        margin: 0
      }}>{description}</p>
      <div style={{
        position: "absolute",
        bottom: "24px",
        right: "24px",
        width: "24px",
        height: "24px",
        borderRadius: "6px",
        background: alpha(accent, 0.3),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease"
      }}>
        <svg width="12" height="12" viewBox="0 0 15 15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 1.5L14 7m0 0l-5.5 5.5M14 7H1" />
        </svg>
      </div>
    </div>
  );
};