import { Navigate } from "react-router";
import { SignupForm } from "../../components";
import { useAuth } from "../../components/context/AuthContext";

const Signup = () => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/store/account" replace />;
  }

  return <SignupForm />;
};

export default Signup;
