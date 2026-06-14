import { BankOutlined, HomeOutlined, SolutionOutlined, TransactionOutlined } from "@ant-design/icons";
import Asset from "./pages/asset/Asset";
import Liability from "./pages/liability";
import TransactionPage from "./pages/transaction";
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
  {
    key: "/liabilities",
    label: "Liabilities",
    icon: SolutionOutlined,
    element: Liability,
  },
  {
    key: "/cashflow",
    label: "Cashflow",
    icon: TransactionOutlined,
    element: TransactionPage,
  },
];
