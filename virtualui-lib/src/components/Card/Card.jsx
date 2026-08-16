import React, { useState } from "react";

export const Card = ({
  title = "Premium Card",
  description = "This is a beautifully designed card component with subtle animations.",
  accent = "#6366f1",
  bg = "#0f172a",
  width = "360px",
  padding = "24px",
  radius = "16px",
  shadow = true,
  border = false,
  hoverEffect = true
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  return (
    <div
      onMouseEnter={() => hoverEffect && setHovered(true)}
      onMouseLeave={() => hoverEffect && setHovered(false)}
      style={{
        background: bg,
        width: width,
        padding: padding,
        borderRadius: radius,
        border: border ? "1px solid " + alpha(accent, 0.2) : "none",
        boxShadow: shadow ? "0 10px 30px rgba(0,0,0,0.4)" : "none",
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
        transform: hovered && hoverEffect ? "translateY(-4px)" : "none",
        boxShadow: hovered && hoverEffect ? "0 15px 40px rgba(0,0,0,0.5)" : shadow ? "0 10px 30px rgba(0,0,0,0.4)" : "none"
      }}
    >
      <h3 style={{
        fontSize: "18px",
        fontWeight: "700",
        color: "#fff",
        margin: "0 0 12px",
        lineHeight: "1.4"
      }}>{title}</h3>
      <p style={{
        fontSize: "14px",
        color: "rgba(255,255,255,0.65)",
        lineHeight: "1.6",
        margin: "0"
      }}>{description}</p>
      {hovered && hoverEffect && (
        <div style={{
          position: "absolute",
          inset: "0",
          borderRadius: radius,
          background: alpha(accent, 0.03),
          pointerEvents: "none",
          border: "1px solid " + alpha(accent, 0.15)
        }} />
      )}
    </div>
  );
};