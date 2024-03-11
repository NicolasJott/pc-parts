import { Box, Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { QuantityCard } from ".";

export const CartItem = () => {
  return (
    <Box w={"100%"} p={2}>
      <Box mb={4} p={2} display={"flex"}>
        <Box
          bg="background.800"
          w={16}
          h={16}
          border={"1px solid  #404040"}
          p={8}
          color="white"
          borderRadius={4}
        ></Box>
        <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
          <VStack ml={4} spacing={1} align={"flex-start"}>
            <Heading fontSize={"sm"} color={"lightText.800"}>
              Product Name
            </Heading>
            <Text fontSize={"sm"} color={"lightText.700"}>
              Category
            </Text>
          </VStack>
          <VStack
            ml={4}
            spacing={1}
            align={"flex-end"}
            justifyContent={"space-between"}
          >
            <Heading fontSize={"sm"} color={"lightText.800"}>
              $100.00 USD
            </Heading>
            <QuantityCard />
          </VStack>
        </Box>
      </Box>
      <Divider borderColor={"lightText.700"} />
    </Box>
  );
};
