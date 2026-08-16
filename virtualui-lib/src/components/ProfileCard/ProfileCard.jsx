import React, { useState } from "react";

export const ProfileCard = ({
  name = "Alexandra Chen",
  role = "Senior Product Designer",
  location = "San Francisco, CA",
  avatar = "https://i.pravatar.cc/150?img=47",
  coverColor = "#0F172A",
  accentColor = "#38BDF8",
  bio = "Crafting intuitive digital experiences at the intersection of design systems and human psychology.",
  stats = [
    { label: "Projects", value: "128" },
    { label: "Followers", value: "4.2k" },
    { label: "Following", value: "310" },
  ],
  tags = ["UI/UX", "Systems", "Figma", "React"],
  onFollow = null,
  onMessage = null,
  initialFollowed = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const [followed, setFollowed] = useState(initialFollowed);
  const [msgHovered, setMsgHovered] = useState(false);

  const handleFollow = () => {
    setFollowed((f) => !f);
    onFollow?.(!followed);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "320px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: hovered
          ? "0 12px 24px rgba(0,0,0,0.12)"
          : "0 4px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          height: "90px",
          backgroundColor: coverColor,
          position: "relative",
        }}
      />

      <div style={{ padding: "0 20px 20px", marginTop: "-45px" }}>
        <img
          src={avatar}
          alt={name}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            border: "4px solid #ffffff",
            objectFit: "cover",
            display: "block",
          }}
        />

        <div style={{ marginTop: "12px" }}>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" }}>
            {name}
          </h3>
          <p style={{ margin: "2px 0", fontSize: "14px", color: accentColor, fontWeight: 600 }}>
            {role}
          </p>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{location}</p>
        </div>

        <p
          style={{
            fontSize: "13px",
            color: "#4b5563",
            lineHeight: 1.5,
            margin: "12px 0",
          }}
        >
          {bio}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "16px",
          }}
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: `${accentColor}20`,
                color: accentColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px 0",
            borderTop: "1px solid #f3f4f6",
            borderBottom: "1px solid #f3f4f6",
            marginBottom: "16px",
          }}
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: "16px", fontWeight: 700, color: "#111827" }}>
                {stat.value}
              </p>
              <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={handleFollow}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              backgroundColor: followed ? "#e5e7eb" : accentColor,
              color: followed ? "#374151" : "#ffffff",
              transition: "all 0.2s ease",
            }}
          >
            {followed ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => onMessage?.()}
            onMouseEnter={() => setMsgHovered(true)}
            onMouseLeave={() => setMsgHovered(false)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "8px",
              border: `1px solid ${accentColor}`,
              fontWeight: 600,
              fontSize: "13px",
              cursor: "pointer",
              backgroundColor: msgHovered ? `${accentColor}15` : "transparent",
              color: accentColor,
              transition: "all 0.2s ease",
            }}
          >
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;