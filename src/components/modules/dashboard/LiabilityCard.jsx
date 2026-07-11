import { Card, Button, Tooltip, Grid } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import numeral from "numeral";
import React from "react";

export default function LiabilityCard({
  showValue,
  setShowValue,
  data,
  loading,
}) {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <>
      <Card
        loading={loading}
        variant="borderless"
        styles={{ body: { padding: isMobile ? "12px 16px" : "24px" } }}
        style={{
          background: "linear-gradient(180deg, #5c2424 0%, #2b1111 100%)",
          height: isMobile ? 120 : 150,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: isMobile ? 12 : 24,
            left: 0,
            right: 0,
            height: "4px",
            backgroundColor: "#ff4d4f",
            boxShadow: "0 0 8px rgba(255, 77, 79, 0.5)",
          }}
        />

        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
          <Button
            type="text"
            shape="circle"
            icon={showValue ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setShowValue(!showValue)}
            style={{
              color: "#b38c8c",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            marginTop: isMobile ? 0 : 12,
            paddingRight: 32,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: isMobile ? 12 : 14,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#b38c8c",
              letterSpacing: "0.5px",
            }}
          >
            Total Liabilities
          </span>
          <Tooltip
            title={
              showValue
                ? `Rp ${numeral(data?.total_liabilities).format("0,0")}`
                : null
            }
            placement="topLeft"
          >
            <h1
              style={{
                margin: "4px 0 0 0",
                fontSize: isMobile ? 24 : 32,
                color: "white",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {showValue
                ? `Rp ${numeral(data?.total_liabilities).format("0,0")}`
                : "Rp ************"}
            </h1>
          </Tooltip>
        </div>
      </Card>
    </>
  );
}
