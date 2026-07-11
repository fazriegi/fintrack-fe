import { Card, Progress, Grid } from "antd";
import React, { useEffect, useState, useRef } from "react";

export default function DebtRatioCard({ data, loading }) {
  const containerRef = useRef(null);
  const [progressSize, setProgressSize] = useState(140);

  const screens = Grid.useBreakpoint();
  const isMobile = !screens.sm;

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const maxCircleSize = isMobile ? 85 : 140;
        setProgressSize(Math.min(maxCircleSize, Math.max(60, width)));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Calculate ratio
  const ratio =
    data?.total_assets > 0
      ? (data?.total_liabilities / data?.total_assets) * 100
      : 0;

  const formattedRatio = ratio.toFixed(1);

  let ratioColor = "#4ade80";
  if (ratio > 70) {
    ratioColor = "#ef4444";
  } else if (ratio > 50) {
    ratioColor = "#f97316";
  } else if (ratio > 30) {
    ratioColor = "#eab308";
  }
  // Make font size and stroke width scale perfectly with the circle size
  const dynamicFontSize = Math.max(10, progressSize * 0.15);
  const dynamicStrokeWidth = Math.max(6, progressSize * 0.1);

  return (
    <>
      <Card
        loading={loading}
        variant="borderless"
        style={{
          background: "linear-gradient(180deg, #1e2532 0%, #11161d 100%)",
          height: isMobile ? 120 : 150,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
        styles={{ body: { padding: isMobile ? "12px 16px" : "16px 12px" } }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 12 : 14,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#8b9bb4",
              letterSpacing: "0.5px",
            }}
          >
            Debt Ratio
          </span>
          <div
            ref={containerRef}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: isMobile ? 2 : 10,
              width: "100%",
            }}
          >
            <Progress
              type="dashboard"
              percent={ratio}
              gapDegree={180}
              strokeWidth={dynamicStrokeWidth}
              strokeColor={{
                "0%": "#4ade80",
                "50%": "#eab308",
                "100%": "#ef4444",
              }}
              railColor="#334155"
              size={progressSize}
              format={() => (
                <span
                  style={{
                    color: ratioColor,
                    fontSize: `${dynamicFontSize}px`,
                    fontWeight: "bold",
                  }}
                >
                  {formattedRatio}%
                </span>
              )}
            />
          </div>
        </div>
      </Card>
    </>
  );
}
