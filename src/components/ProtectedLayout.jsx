import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const user = localStorage.getItem("USER");
  const token = localStorage.getItem("TOKEN");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
