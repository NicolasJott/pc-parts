import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { Order } from "../../api/orders";
import { BackButton } from "../BackButton";
import { AccountOrderItem } from "./AccountOrderItem";

interface IAccountOrderDetailsProps {
  order: Order;
}

export const AccountOrderDetails = ({ order }: IAccountOrderDetailsProps) => {
  const total = order.line_items
    .map((item) => item.product.price * item.quantity)
    .reduce((a, b) => a + b, 0);

  const taxPct = 0.07;

  const totalPrice = total * taxPct + total;

  const deliveryAddress = [
    order.delivery_address.address1,
    order.delivery_address.address2,
    order.delivery_address.city,
    order.delivery_address.state,
    order.delivery_address.zipCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <BackButton />
      <VStack w={"100%"}>
        <Box
          mt={4}
          bgColor={"white"}
          borderWidth="1px"
          borderRadius="lg"
          overflow={"hidden"}
          p={4}
          w={"100%"}
        >
          {order.line_items.map((item) => (
            <AccountOrderItem key={item.id} lineItem={item} />
          ))}
          <VStack borderTopWidth={1} mt={4} pt={4}>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Heading size={"sm"}>Subtotal</Heading>
              <Heading size={"sm"}> ${total.toFixed(2)}</Heading>
            </HStack>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Text>Tax</Text>
              <Text> ${(total * taxPct).toFixed(2)}</Text>
            </HStack>
            <HStack w={"100%"} justifyContent={"space-between"}>
              <Heading size={"md"}>Total</Heading>
              <Heading size={"md"}> ${totalPrice.toFixed(2)}</Heading>
            </HStack>
          </VStack>
        </Box>
        <Box
          mt={4}
          bgColor={"white"}
          borderWidth="1px"
          borderRadius="lg"
          overflow={"hidden"}
          p={4}
          w={"100%"}
        >
          <VStack w={"100%"} alignItems={"flex-start"}>
            <Heading size={"md"}>Customer</Heading>
            <Box mt={2}>
              <Heading size={"sm"}>Contact Info</Heading>
              <Text>
                {order.firstName} {order.lastName}
              </Text>
              <Text>{order.email}</Text>
              <Text>{order.phoneNumber}</Text>
            </Box>
            <Box mt={2}>
              <Heading size={"sm"}>Delivery Address</Heading>
              <Text>{deliveryAddress}</Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </>
  );
};
