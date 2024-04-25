import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useAuth } from "../context/AuthContext";

export const AccountProfile = () => {
  const { user } = useAuth();
  return (
    <Box
      bgColor={"white"}
      borderWidth="1px"
      borderRadius="lg"
      overflow={"hidden"}
      w={"100%"}
      p={8}
    >
      <HStack>
        <FormControl isReadOnly>
          <FormLabel>First Name</FormLabel>
          <Input defaultValue={user?.name.split(" ")[0]} />
        </FormControl>
        <FormControl isReadOnly>
          <FormLabel>Last Name</FormLabel>
          <Input defaultValue={user?.name.split(" ")[1]} />
        </FormControl>
      </HStack>
      <FormControl mt={4} isReadOnly>
        <FormLabel>Email address</FormLabel>
        <Input type="email" defaultValue={user?.email} />
      </FormControl>
      <Button mt={8} width={"100%"} bg={"primary.900"} colorScheme="blue">
        Edit Profile
      </Button>
    </Box>
  );
};
