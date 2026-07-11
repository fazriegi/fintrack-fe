import { Card, Button, Tooltip, Grid } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import numeral from "numeral";
import React from "react";

export default function AssetCard({ showValue, setShowValue, data, loading }) {
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.sm;

  return (
    <>
      <Card
        loading={loading}
        variant="borderless"
        styles={{ body: { padding: isMobile ? "12px 16px" : "24px" } }}
        style={{
          background: "linear-gradient(180deg, #244b4d 0%, #152b2c 100%)",
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
            backgroundColor: "#35d0c3",
            boxShadow: "0 0 8px rgba(53, 208, 195, 0.5)",
          }}
        />

        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
          <Button
            type="text"
            shape="circle"
            icon={showValue ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setShowValue(!showValue)}
            style={{
              color: "#8aa6a3",
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
              color: "#8aa6a3",
              letterSpacing: "0.5px",
            }}
          >
            Total Assets
          </span>
          <Tooltip
            title={
              showValue
                ? `Rp ${numeral(data?.total_assets).format("0,0")}`
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
                ? `Rp ${numeral(data?.total_assets).format("0,0")}`
                : "Rp ************"}
            </h1>
          </Tooltip>
        </div>
      </Card>
    </>
  );
}
