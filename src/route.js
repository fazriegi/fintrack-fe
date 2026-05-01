import AssetAdd from "./pages/asset/AssetAdd";
import AssetEdit from "./pages/asset/AssetEdit";
import LiabilityAdd from "./pages/liability/LiabilityAdd";
import LiabilityEdit from "./pages/liability/LiabilityEdit";

export const routes = [
  {
    path: "/assets/add",
    element: AssetAdd,
  },
  {
    path: "/assets/:id",
    element: AssetEdit,
  },
  {
    path: "/liabilities/add",
    element: LiabilityAdd,
  },
  {
    path: "/liabilities/:id",
    element: LiabilityEdit,
  },
];



