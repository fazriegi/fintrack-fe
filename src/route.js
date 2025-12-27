import AssetAdd from "./pages/asset/AssetAdd";
import AssetEdit from "./pages/asset/AssetEdit";

export const routes = [
  {
    path: "/assets/add",
    element: AssetAdd,
  },
  {
    path: "/assets/:id",
    element: AssetEdit,
  },
];



