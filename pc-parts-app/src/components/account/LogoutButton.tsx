import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const LogoutButton = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    session.end();
    navigate(0);
  };

  return <Button onClick={logout}>Logout</Button>;
};
