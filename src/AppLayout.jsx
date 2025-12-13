import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./components/container/UserDropdown";
import { MENU_ITEMS } from "./menu.config";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const user = JSON.parse(localStorage.getItem("USER") || "null");
  const isLoggedIn = Boolean(user);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={0}
        onBreakpoint={(broken) => {
          setCollapsed(broken);
        }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? 0 : "0 16px",
            color: "#fff",
            fontWeight: 600,
            fontSize: 18,
          }}
        >
          {collapsed ? "FT" : "FinTrack"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[`/${location.pathname.split("/")[1]}`]}
          items={MENU_ITEMS}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 40, height: 40 }}
          />
          {isLoggedIn && <UserDropdown />}
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
