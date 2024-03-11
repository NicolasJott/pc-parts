import { Box } from "@chakra-ui/react";
import { NavBar } from "../components/navigation";

export const Landing = () => {
  return (
    <Box display={"flex"} bg={"background.800"} h={"100vh"}>
      <NavBar />
    </Box>
  );
};
