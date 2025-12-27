import React from "react";
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, message, Space, theme, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import api from "src/pkg/api";

const { Text } = Typography;

export default function UserDropdown() {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("USER") || "{}");

  const items = [
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
    },
  ];

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("USER");
      message.success("You have been logged out.");
      navigate("/login");
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          if (key === "logout") {
            handleLogout();
          }
          if (key === "settings") {
            navigate("/settings");
          }
        },
      }}
      placement="bottomRight"
      trigger={["click"]}
    >
      <Space style={{ cursor: "pointer" }}>
        <Avatar
          size={28}
          style={{
            backgroundColor: colorPrimary,
          }}
        >
          {user?.name?.[0]?.toUpperCase() || <UserOutlined />}
        </Avatar>

        <div style={{ lineHeight: 1.1 }}>
          <Text strong>{user?.name || "User"}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            {user?.email || ""}
          </Text>
        </div>
      </Space>
    </Dropdown>
  );
}
