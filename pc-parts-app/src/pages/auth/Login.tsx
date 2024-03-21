import { Box } from "@chakra-ui/layout";
import { Navigate } from "react-router";
import { LoginForm } from "../../components/auth/LoginForm";
import { useAuth } from "../../components/context/AuthContext";

export const Login = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Box>
      <LoginForm />
    </Box>
  );
};
