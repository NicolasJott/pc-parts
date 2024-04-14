import { Navigate } from "react-router";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuth } from "../../components/context/AuthContext";

const Login = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/account" replace />;
  }

  return <LoginForm />;
};

export default Login;
