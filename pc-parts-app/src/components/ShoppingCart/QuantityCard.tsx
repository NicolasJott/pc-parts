import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, HStack, Text } from "@chakra-ui/react";

export const QuantityCard = () => {
  return (
    <Box
      border={"1px solid  #404040"}
      px={4}
      py={2}
      color="white"
      borderRadius={32}
    >
      <HStack spacing={5}>
        <MinusIcon
          fontSize={"10px"}
          color={"lightText.700"}
          cursor={"pointer"}
        />
        <Text>1</Text>
        <AddIcon
          fontSize={"10px"}
          color={"lightText.700"}
          justifySelf={"flex-end"}
          cursor={"pointer"}
        />
      </HStack>
    </Box>
  );
};
