import { Box, Button, Divider, HStack, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Cart } from "../../api/cart";

interface ICartFooterProps {
  cart: Cart;
  onClose: () => void;
}

export const CartFooter = ({ cart, onClose }: ICartFooterProps) => {
  const navigate = useNavigate();

  return (
    <Box>
      <HStack justifyContent={"space-between"}>
        <Heading size={"sm"} color={"lightText.700"}>
          Price
        </Heading>
        <Text fontSize={"md"} color={"lightText.800"}>
          ${cart.total.toFixed(2)}
        </Text>
      </HStack>
      <Divider my={4} mt={1} borderColor={"lightText.700"} />
      <HStack justifyContent={"space-between"}>
        <Heading size={"sm"} color={"lightText.700"}>
          Tax
        </Heading>
        <Text fontSize={"md"} color={"lightText.800"}>
          ${(cart.total * 1.07 - cart.total).toFixed(2)}
        </Text>
      </HStack>
      <Divider my={4} mt={1} borderColor={"lightText.700"} />
      <HStack justifyContent={"space-between"}>
        <Heading size={"sm"} color={"lightText.700"}>
          Shipping
        </Heading>
        <Text fontSize={"sm"} color={"lightText.700"}>
          Calculated at checkout
        </Text>
      </HStack>
      <Divider my={4} mt={1} borderColor={"lightText.700"} />
      <HStack justifyContent={"space-between"}>
        <Heading size={"sm"} color={"lightText.700"}>
          Total
        </Heading>
        <Text size={"md"} color={"lightText.800"}>
          ${(cart.total * 1.07).toFixed(2)}
        </Text>
      </HStack>
      <Divider mb={8} mt={1} borderColor={"lightText.700"} />
      <Button
        width={"100%"}
        colorScheme="blue"
        bg={"primary.900"}
        onClick={() => {
          onClose();
          navigate("/checkout/information");
        }}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
};
