import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const user = localStorage.getItem("USER");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
