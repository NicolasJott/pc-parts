import {
  Box,
  Divider,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

const links = [
  { name: "Home", href: "/" },
  { name: "Store", href: "/store" },
  { name: "About", href: "/about" },
  { name: "Terms & Conditions", href: "/terms-and-conditions" },
  { name: "Shipping & Return Policy", href: "/shipping-and-return-policy" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "FAQ", href: "/faq" },
];

export const Footer = () => {
  return (
    <Box>
      <Box maxW={{ md: "1300px", base: "100vw" }} mx={"auto"}>
        <Divider my={8} borderColor={"lightText.700"} />
        <Stack
          flexDir={{ md: "row", base: "column" }}
          my={16}
          mx={8}
          gap={{ md: 16, base: 4 }}
          alignItems={"flex-start"}
        >
          <Box>
            <Link textDecorationColor={"background.800"} href="/">
              <Heading fontSize={"md"} color={"#010101"}>
                PC PARTS
              </Heading>
            </Link>
          </Box>
          <VStack
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            gap={4}
          >
            {links.map(({ name, href }, index) => (
              <Link key={index} color={"lightText.600"} href={href}>
                <Text fontSize={"md"}>{name}</Text>
              </Link>
            ))}
          </VStack>
        </Stack>
      </Box>
      <Divider my={4} borderColor={"lightText.700"} w={"100%"} />
      <Box maxW={{ md: "1300px", base: "100vw" }} mx={"auto"} pb={4}>
        <HStack justifyContent={"space-between"} mx={8}>
          <Text color={"lightText.600"} fontSize={"sm"}>
            © {new Date().getFullYear()} PC PARTS. All rights reserved.
          </Text>
          <Text color={"lightText.600"} fontSize={"sm"}>
            Created by Nicolas Ott
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};
