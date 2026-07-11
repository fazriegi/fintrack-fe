import React, { useState, useEffect } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme, Drawer, Grid } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./components/container/UserDropdown";
import { MENU_ITEMS } from "./sidebar-menu";
import { APP_NAME } from "./pkg/constant";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgBase },
  } = theme.useToken();

  const user = JSON.parse(localStorage.getItem("USER") || "null");
  const isLoggedIn = Boolean(user);

  const location = useLocation();
  const navigate = useNavigate();

  const appNameUppercaseOnly = APP_NAME.match(/[A-Z]/g).join('');

  const screens = useBreakpoint();
  const isMobile = screens.md === false;

  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [isMobile]);

  const brandHeader = (
    <div
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: collapsed && !isMobile ? "center" : "space-between",
        padding: collapsed && !isMobile ? 0 : "0 16px",
        color: "#fff",
        fontWeight: 600,
        fontSize: 18,
        gap: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/fintrack.svg" alt="Logo" style={{ width: 32, height: 32 }} />
        {(!collapsed || isMobile) && (
          <span
            style={{
              background: "linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {APP_NAME}
          </span>
        )}
      </div>
      {isMobile && (
        <Button
          type="text"
          icon={<MenuFoldOutlined />}
          onClick={() => setCollapsed(true)}
          style={{ color: "#fff", fontSize: 16 }}
        />
      )}
    </div>
  );

  const menuElement = (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[`/${location.pathname.split("/")[1]}`]}
      items={MENU_ITEMS.map((items) => ({
        key: items.key,
        label: items.label,
        icon: <items.icon />,
        element: <items.element />,
      }))}
      onClick={({ key }) => {
        navigate(key);
        if (isMobile) {
          setCollapsed(true);
        }
      }}
    />
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {!isMobile && (
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
          {brandHeader}
          {menuElement}
        </Sider>
      )}

      {isMobile && (
        <Drawer
          placement="left"
          onClose={() => setCollapsed(true)}
          open={!collapsed}
          styles={{
            body: { padding: 0, background: colorBgBase },
          }}
          width={220}
          closable={false}
        >
          {brandHeader}
          {menuElement}
        </Drawer>
      )}

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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
