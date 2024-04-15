import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Cart } from "../../api/cart";

interface ICheckoutPriceProps {
  cart: Cart;
}

export const CheckoutPrice = ({ cart }: ICheckoutPriceProps) => {
  const [cartTotal] = useState(cart.total);

  return (
    <VStack p={4}>
      <Box display={"flex"} alignItems={"center"} w={"100%"}>
        <Text>Subtotal</Text>
        <Box flexGrow={1} />
        <Heading as="h5" size={"sm"}>
          ${cart.total}
        </Heading>
      </Box>
      <Box display={"flex"} alignItems={"center"} w={"100%"}>
        <Text>Shipping</Text>
        <Box flexGrow={1} />
        <Heading as="h5" size={"sm"}>
          Free
        </Heading>
      </Box>
      <Box display={"flex"} alignItems={"center"} w={"100%"}>
        <Heading as="h5" size={"lg"}>
          Total
        </Heading>
        <Box flexGrow={1} />
        <Heading as="h5" size={"md"}>
          ${(cartTotal * 1.07).toFixed(2)}
        </Heading>
      </Box>
    </VStack>
  );
};
