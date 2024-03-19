import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { Price } from "./Price";

interface ILabelProps {
  title: string;
  amount: string;
  currencyCode: string;
  position?: "bottom" | "center";
}

export const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
}: ILabelProps) => {
  const bgColor = useColorModeValue("whiteAlpha.70", "blackAlpha.70");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("black", "white");

  return (
    <Flex
      position="absolute"
      bottom={0}
      left={0}
      w="full"
      px={position === "center" ? { base: 4, lg: 20 } : 4}
      pb={position === "center" ? { base: 4, lg: "35%" } : 4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex
        alignItems="center"
        borderRadius="full"
        border="2px solid"
        borderColor={borderColor}
        bg={bgColor}
        p={1}
        fontSize="xs"
        fontWeight="semibold"
        textColor={textColor}
        backdropFilter="blur(10px)"
      >
        <Text mr={4} flex="1" pl={2} noOfLines={2}>
          {title}
        </Text>
        <Price
          amount={amount}
          currencyCode={currencyCode}
          borderRadius="full"
          bg={"primary.900"}
          p={2}
          textColor="white"
          display={{ md: "inline-flex" }}
        />
      </Flex>
    </Flex>
  );
};

export default Label;
