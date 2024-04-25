import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      leftIcon={<ArrowBackIcon />}
      variant="ghost"
      onClick={() => navigate(-1)}
    >
      Back
    </Button>
  );
};
