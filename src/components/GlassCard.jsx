import { theme } from "antd";
import React from "react";

export default function GlassCard({ children, style }) {
  const {
    token: { colorBgContainer, colorBorderSecondary, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        background: `linear-gradient(
          180deg,
          ${colorBgContainer}CC,
          ${colorBgContainer}
        )`,
        border: `1px solid ${colorBorderSecondary}`,
        borderRadius: borderRadiusLG,
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        backdropFilter: "blur(10px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
