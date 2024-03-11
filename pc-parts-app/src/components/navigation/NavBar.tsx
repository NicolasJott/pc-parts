import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
} from "@chakra-ui/react";
import { ShoppingCartDrawer } from "../ShoppingCart";

export const NavBar = () => {
  return (
    <Box
      px={6}
      display={"flex"}
      alignItems={"center"}
      w={"100%"}
      h={16}
      justifyContent={"space-between"}
    >
      {/* Links */}
      <Box flex={"1"} display={"flex"} justifyContent={"flex-start"}>
        <HStack gap={8} alignItems={"center"}>
          <Link textDecorationColor={"background.800"} href="/">
            <Heading fontSize={"md"} color={"lightText.800"}>
              PC PARTS
            </Heading>
          </Link>
          <Link color={"lightText.700"} href="/store">
            <Text fontSize={"sm"}>Store</Text>
          </Link>
          <Link color={"lightText.700"} href="/about">
            <Text fontSize={"sm"}>About</Text>
          </Link>
        </HStack>
      </Box>

      {/* Search Input */}
      <Box flex={"2"} display={"flex"} justifyContent={"center"}>
        <InputGroup w={"70%"} justifyContent={"center"} size={"sm"}>
          <Input
            placeholder="Search for products..."
            borderRadius={4}
            _placeholder={{ color: "lightText.700" }}
            borderColor={"lightText.500"}
            color={"lightText.800"}
            focusBorderColor="lightText.600"
            _hover={{ borderColor: "lightText.600" }}
          />
          <InputRightElement>
            <SearchIcon fontSize={"inherit"} color={"lightText.800"} />
          </InputRightElement>
        </InputGroup>
      </Box>

      {/* Shopping Cart */}
      <Box flex={"1"} display={"flex"} justifyContent={"flex-end"}>
        <HStack gap={8} alignItems={"center"}>
          <Link color={"lightText.700"} href="/account">
            <Text fontSize={"sm"}>Account</Text>
          </Link>
          <ShoppingCartDrawer />
        </HStack>
      </Box>
    </Box>
  );
};
