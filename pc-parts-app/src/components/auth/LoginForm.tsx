import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Text, VStack } from "@chakra-ui/layout";

export const LoginForm = () => {
  return (
    <Box
      minH={"60vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      maxWidth={"xl"}
      mx={"auto"}
    >
      <VStack
        spacing={16}
        mx={{ base: 8, md: 0 }}
        p={{ base: 8, md: 16 }}
        bg={"white"}
        borderRadius={"lg"}
        borderWidth={"2px"}
        borderColor={"neutral.200"}
      >
        <VStack alignItems={"flex-start"} spacing={0} w={"100%"}>
          <Heading textAlign={"left"}>Welcome back!</Heading>
          <Text textAlign={"left"}>Log in to your account to continue.</Text>
        </VStack>
        <VStack spacing={8} w={"100%"}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input placeholder="Email address" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input placeholder="Password" />
          </FormControl>
          <Button w={"100%"} colorScheme="blue" bg={"primary.900"}>
            Log In
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
