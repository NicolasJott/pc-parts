import { Heading, Icon, VStack } from "@chakra-ui/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { CartItemCard } from ".";
import { Cart } from "../../api/cart";

interface ICartBodyProps {
  cart: Cart;
}

export const CartBody = ({ cart }: ICartBodyProps) => {
  const { cartItems } = cart;

  if (cartItems.length === 0) {
    return (
      <VStack alignItems={"center"} w={"100%"}>
        <Icon
          color={"lightText.800"}
          fontSize={"48px"}
          as={ShoppingCartOutlinedIcon}
        />
        <Heading color={"lightText.800"} size={"lg"}>
          Your cart is empty.
        </Heading>
      </VStack>
    );
  }

  return (
    <VStack alignItems={"center"} w={"100%"}>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} cartItem={item} />
      ))}
    </VStack>
  );
};
