import React, { useState } from "react";

export const PasswordStrengthMeter = ({ password = "", width = "300px" }) => {
  const getStrength = (pass) => {
    const length = pass.length;
    const hasNumber = /\d/.test(pass);
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (hasNumber) score++;
    if (hasLetter) score++;
    if (hasSpecial) score++;
    return Math.min(score, 5);
  };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const strength = getStrength(password);
  const colors = ["#e11d48", "#f97316", "#f59e0b", "#84cc16", "#10b981"];
  const emojis = ["😡", "😕", "😐", "🙂", "😎"];
  return (
    <div style={{ width: width, fontFamily: "system-ui,sans-serif" }}>
      <div style={{ height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", overflow: "hidden", position: "relative", marginBottom: "10px" }}>
        <div style={{ width: (strength / 5) * 100 + "%", height: "100%", background: colors[strength], borderRadius: "3px", transition: "width 0.3s ease" }} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: "500" }}>
        <span style={{ fontSize: "18px" }}>{emojis[strength]}</span>
        {strength === 0 && "Very Weak"}
        {strength === 1 && "Weak"}
        {strength === 2 && "Fair"}
        {strength === 3 && "Good"}
        {strength === 4 && "Strong"}
      </div>
    </div>
  );
};