import { BankOutlined, HomeOutlined } from "@ant-design/icons";
import Asset from "./pages/asset/Asset";
import Home from "./pages/Home";

export const MENU_ITEMS = [
  {
    key: "/",
    label: "Home",
    icon: HomeOutlined,
    element: Home,
  },
  {
    key: "/assets",
    label: "Assets",
    icon: BankOutlined,
    element: Asset,
  },
];
