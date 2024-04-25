import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, HStack, Heading, IconButton, Text } from "@chakra-ui/react";
import { formatDate } from "date-fns";

import { useNavigate } from "react-router-dom";
import { Order } from "../../api/orders";

interface IAccountOrderCardProps {
  order: Order;
}

export const AccountOrderCard = ({ order }: IAccountOrderCardProps) => {
  const { id, created_at, line_items } = order;
  const navigate = useNavigate();

  const total =
    line_items
      .map((item) => item.product.price * item.quantity)
      .reduce((a, b) => a + b, 0) * 1.07;

  return (
    <Box
      key={order.id}
      p={4}
      borderRadius={"lg"}
      borderWidth={1}
      bg={"white"}
      w={"100%"}
      _hover={{ bgColor: "gray.100", cursor: "pointer" }}
      onClick={() => navigate(`${id}`)}
    >
      <HStack justifyContent={"space-between"}>
        <Heading size={"md"}>Order #{id}</Heading>
        <IconButton
          size={"sm"}
          bg={"primary.900"}
          colorScheme="blue"
          aria-label={"View Order"}
          icon={<ChevronRightIcon />}
        />
      </HStack>
      <Text>{formatDate(created_at, "MMMM dd, yyyy 'at' h:mm a")}</Text>
      <Text>${total.toFixed(2)}</Text>
    </Box>
  );
};
