import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";

export const LoginForm = () => {
  return (
    <Box
      display={"flex"}
      minH={"80vh"}
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <VStack spacing={16} minW={"lg"}>
        <VStack alignItems={"flex-start"} spacing={0} w={"100%"}>
          <Heading textAlign={"left"}>Welcome back!</Heading>
          <Text textAlign={"left"}>Log in to your account to continue.</Text>
        </VStack>
        <VStack spacing={8} w={"100%"}>
          <Input placeholder="Email" width={"100%"} />
          <Input placeholder="Password" />
          <Button w={"100%"} colorScheme="blue" bg={"primary.900"}>
            Log In
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
