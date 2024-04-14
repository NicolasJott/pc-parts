import { Container } from "@chakra-ui/react";
import { Cart } from "../../api/cart";
import { CheckoutItem } from "./CheckoutItem";
import { CheckoutPrice } from "./CheckoutPrice";

interface IOrderSummaryProps {
  cart: Cart;
}

export const OrderSummary = ({ cart }: IOrderSummaryProps) => {
  const { cartItems } = cart;
  return (
    <Container p={4}>
      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <CheckoutPrice cart={cart} />
    </Container>
  );
};
