import { Card, Button, Space, Typography, Tooltip } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import React from "react";

const { Text } = Typography;

export default function NetworthCard({
  showValue,
  setShowValue,
  data,
  loading,
}) {
  const growth =
    data?.growth_percentage != null ? Number(data.growth_percentage) : 0;

  let status = "neutral";
  if (growth > 0) status = "positive";
  else if (growth < 0) status = "negative";

  const getStatusColor = () => {
    if (status === "positive")
      return { bg: "rgba(39, 174, 96, 0.2)", text: "#27ae60" };
    if (status === "negative")
      return { bg: "rgba(231, 76, 60, 0.2)", text: "#e74c3c" };
    return { bg: "rgba(139, 155, 180, 0.2)", text: "#8b9bb4" };
  };

  const statusColors = getStatusColor();

  return (
    <>
      <Card
        loading={loading}
        variant="borderless"
        style={{
          background: "linear-gradient(180deg, #1c3d5a 0%, #0d1e2d 100%)",
          height: 150,
          position: "relative",
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
          <Button
            type="text"
            shape="circle"
            icon={showValue ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            onClick={() => setShowValue(!showValue)}
            style={{
              color: "#8b9bb4",
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
            marginTop: 4,
            paddingRight: 32,
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: "600",
              textTransform: "uppercase",
              color: "#8b9bb4",
              letterSpacing: "0.5px",
            }}
          >
            Total Net Worth
          </span>
          <Tooltip
            title={
              showValue ? `Rp ${numeral(data?.net_worth).format("0,0")}` : null
            }
            placement="topLeft"
          >
            <h1
              style={{
                margin: "4px 0 8px 0",
                fontSize: 32,
                color: "white",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {showValue
                ? `Rp ${numeral(data?.net_worth).format("0,0")}`
                : "Rp ************"}
            </h1>
          </Tooltip>
          <Space align="center" size="small">
            <div
              style={{
                backgroundColor: statusColors.bg,
                color: statusColors.text,
                padding: "2px 8px",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {status === "positive" && <ArrowUpOutlined />}
              {status === "negative" && <ArrowDownOutlined />}
              {/* {status === "neutral" && <MinusOutlined />} */}
              <span>
                {status === "positive" ? "+" : ""}
                {growth.toFixed(1)}%
              </span>
            </div>
            <Text
              type="secondary"
              style={{ fontSize: "14px", color: "#8b9bb4" }}
            >
              vs last month
            </Text>
          </Space>
        </div>
      </Card>
    </>
  );
}
