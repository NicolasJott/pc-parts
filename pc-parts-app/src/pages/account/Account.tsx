import { Box, Container, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AccountNav } from "../../components";

const Account = () => {
  return (
    <Container maxW={"6xl"} centerContent my={24}>
      <HStack w={"100%"} alignItems={"flex-start"}>
        <Box flex={1}>
          <AccountNav />
        </Box>
        <Box p={4} flex={2}>
          <Outlet />
        </Box>
      </HStack>
    </Container>
  );
};

export default Account;
