import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IShippingFormProps {
  contact: string;
  address: string;
}

export const ShippingForm = ({ contact, address }: IShippingFormProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box
        px={4}
        py={2}
        border={"solid"}
        borderWidth={1}
        borderColor={"lightText.700"}
        borderRadius={8}
      >
        <HStack justifyContent={"space-between"}>
          <Text color={"lightText.700"}>Contact</Text>
          <Text color={"lightText.600"}>{contact}</Text>
        </HStack>
        <Divider my={2} />
        <HStack justifyContent={"space-between"}>
          <Text color={"lightText.700"}>Ship to</Text>
          <Text color={"lightText.600"}>{address}</Text>
        </HStack>
      </Box>
      <VStack width={"100%"} my={8} gap={4}>
        <Heading size={"md"} alignSelf={"flex-start"}>
          Shipping Method
        </Heading>
        <Box
          px={4}
          py={2}
          border={"solid"}
          borderWidth={1}
          borderColor={"lightText.700"}
          borderRadius={8}
          w={"100%"}
        >
          <HStack justifyContent={"space-between"}>
            <Text color={"lightText.600"}>Economy</Text>
            <Text color={"lightText.500"}>Free</Text>
          </HStack>
          <Text color={"lightText.700"}>5 to 8 business days</Text>
        </Box>
        <Button
          alignSelf={"flex-end"}
          colorScheme="blue"
          bg={"primary.900"}
          mt={8}
          size={"lg"}
          onClick={() => navigate("/checkout/payment")}
        >
          Continue to Payment
        </Button>
      </VStack>
    </Box>
  );
};
