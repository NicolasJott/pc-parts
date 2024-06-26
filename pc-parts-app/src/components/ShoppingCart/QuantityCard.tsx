import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Box, HStack, Spinner, Text } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCartItem, getCartItem, updateCartItem } from "../../api/cart";
import {
  deleteSessionCartItem,
  getSessionCartItem,
  updateSessionCartItem,
} from "../../api/cartSession";
import { useAuth } from "../context/AuthContext";

interface IQuantityCardProps {
  cartItemId: number;
}

export const QuantityCard = ({ cartItemId }: IQuantityCardProps) => {
  const { authenticated } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cartItemQuantity", cartItemId],
    queryFn: () =>
      authenticated ? getCartItem(cartItemId) : getSessionCartItem(cartItemId),
  });

  const mutation = useMutation({
    mutationFn: (method: "add" | "remove") =>
      authenticated
        ? updateCartItem(cartItemId, method)
        : updateSessionCartItem(cartItemId, method),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cartItemQuantity", cartItemId],
      });
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unAuthenticatedCart"],
      });
    },
  });

  const removeFromCart = useMutation({
    mutationFn: (id: string | number) =>
      authenticated ? deleteCartItem(id) : deleteSessionCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unAuthenticatedCart"],
      });
    },
  });

  if (query.isLoading) {
    return (
      <Box
        border={"1px solid  #404040"}
        px={4}
        py={2}
        color="white"
        borderRadius={32}
      >
        <HStack spacing={5}>
          <MinusIcon
            fontSize={"10px"}
            color={"lightText.700"}
            cursor={"pointer"}
          />
          <Spinner size="xs" color="lightText.700" />
          <AddIcon
            fontSize={"10px"}
            color={"lightText.700"}
            justifySelf={"flex-end"}
            cursor={"pointer"}
          />
        </HStack>
      </Box>
    );
  }

  if (query.isError) {
    return <Box>Error...</Box>;
  }

  return (
    <Box
      border={"1px solid  #404040"}
      px={4}
      py={2}
      color="white"
      borderRadius={32}
    >
      <HStack spacing={5}>
        <MinusIcon
          fontSize={"10px"}
          color={"lightText.700"}
          cursor={"pointer"}
          onClick={() => {
            if (query.data?.quantity === 1) {
              removeFromCart.mutate(cartItemId);
              return;
            }
            mutation.mutate("remove");
          }}
        />
        {removeFromCart.isPending || mutation.isPending || query.isLoading ? (
          <Spinner size="sm" color="lightText.700" />
        ) : (
          <Text>{query.data?.quantity}</Text>
        )}

        <AddIcon
          fontSize={"10px"}
          color={"lightText.700"}
          justifySelf={"flex-end"}
          cursor={"pointer"}
          onClick={() => {
            mutation.mutate("add");
          }}
        />
      </HStack>
    </Box>
  );
};
