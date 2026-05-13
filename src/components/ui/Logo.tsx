import React from "react";

export default function Logo({ className = "", size = 1 }: { className?: string; size?: number }) {
  const width = 100 * size;
  const height = 100 * size;

  return (
    <div
      className={className}
      style={{
        background: "#dc2626",
        width: width,
        height: height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
        backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 4px)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-bebas), 'Bebas Neue', sans-serif",
          fontSize: `${60 * size}px`,
          color: "white",
          letterSpacing: "0.05em",
          lineHeight: 1,
          marginTop: `${2 * size}px`,
        }}
      >
        77
      </span>
    </div>
  );
}
