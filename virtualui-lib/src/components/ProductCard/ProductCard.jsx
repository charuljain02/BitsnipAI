import React, { useState } from "react";

export const ProductCard = ({
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  title = "Wireless Headphones",
  description = "Premium noise-cancelling with 30hr battery life",
  price = 199.99,
  currency = "$",
  rating = 4.5,
  reviews = 128,
  discount = 25,
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {},
  onWishlist = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "16px",
        overflow: "hidden",
        width: "280px",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.2)"
      }}
    >
      <div style={{ position: "relative", padding: "16px" }}>
        {discount > 0 && (
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "4px 8px",
            borderRadius: "6px",
            background: "#e11d48",
            color: "#fff",
            fontSize: "11px",
            fontWeight: "700",
            zIndex: 1
          }}>-{discount}%</div>
        )}
        <button
          onClick={() => {
            setWishlisted(!wishlisted);
            onWishlist();
          }}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 1
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? accent : "none"} stroke={wishlisted ? accent : "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
        <div style={{ width: "100%", height: "200px", position: "relative", overflow: "hidden", borderRadius: "12px" }}>
          <img 
            src={image} 
            alt={title} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              transform: hovered ? "scale(1.05)" : "scale(1)", 
              transition: "transform 0.4s ease" 
            }} 
          />
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)" 
          }} />
        </div>
      </div>
      
      <div style={{ padding: "0 16px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: 0 }}>{title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>{rating}</span>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>({reviews})</span>
          </div>
        </div>
        
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.5 }}>{description}</p>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
            <span style={{ fontSize: "18px", fontWeight: "800", color: accent }}>{currency}{price.toFixed(2)}</span>
            {discount > 0 && (
              <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "line-through" }}>
                {currency}{(price * (100 / (100 - discount))).toFixed(2)}
              </span>
            )}
          </div>
          
          <button
            onClick={onAddToCart}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.8) + ")",
              color: "#fff",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              fontFamily: "inherit"
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};