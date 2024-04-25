import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = () => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/store/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
