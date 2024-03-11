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
        <MinusIcon fontSize={"12px"} color={"lightText.700"} />
        <Text>1</Text>
        <AddIcon
          fontSize={"12px"}
          color={"lightText.700"}
          justifySelf={"flex-end"}
        />
      </HStack>
    </Box>
  );
};
