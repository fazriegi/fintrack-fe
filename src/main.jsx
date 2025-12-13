import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        token: {
          colorBgBase: "#0E0F12",
          colorBgContainer: "#15171C",

          colorPrimary: "#6B8AFB",

          colorTextBase: "#EDEEF0",
          colorTextSecondary: "#9AA0AA",

          colorBorder: "#23262E",
        },

        components: {
          Layout: {
            bodyBg: "#0E0F12",
            siderBg: "#0E0F12",
            headerBg: "#15171C",
          },

          Menu: {
            darkItemBg: "#0E0F12",
            darkItemHoverBg: "#15171C",
            darkItemSelectedBg: "#1A1D24",
            darkItemSelectedColor: "#EDEEF0",
          },

          Button: {
            primaryShadow: "none",
            defaultBorderColor: "#23262E",
          },

          Card: {
            colorBgContainer: "#15171C",
          },
        },
        fontFamily: "Inter, system-ui, -apple-system, BlinkMacSystemFont",
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>
);
