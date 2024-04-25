import { VStack } from "@chakra-ui/react";
import { Order } from "../../api/orders";
import { AccountOrderCard } from "./AccountOrderCard";

interface IAccountOrdersProps {
  orders: Order[];
}

export const AccountOrders = ({ orders }: IAccountOrdersProps) => {
  return (
    <VStack w={"100%"}>
      {orders.map((order) => (
        <AccountOrderCard key={order.id} order={order} />
      ))}
    </VStack>
  );
};
