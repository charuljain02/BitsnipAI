import React, { useState } from "react";

export const Button = ({
  text = "Click Me",
  bgColor = "#4f46e5",
  hoverColor = "#4338ca",
  textColor = "#ffffff",
  size = "medium",
  onClick = () => {},
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeStyles = {
    small: { padding: "6px 12px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "14px" },
    large: { padding: "14px 28px", fontSize: "16px" },
  };

  const styles = {
    backgroundColor: isHovered ? hoverColor : bgColor,
    color: textColor,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    ...sizeStyles[size],
  };

  return (
    <button
      style={styles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;