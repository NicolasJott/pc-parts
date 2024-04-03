import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Heading,
  IconButton,
  Image,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QuantityCard } from ".";
import { CartItem, deleteCartItem } from "../../api/cart";
import { getProduct } from "../../api/products";

interface ICartItemProps {
  cartItem: CartItem;
}

export const CartItemCard = ({ cartItem }: ICartItemProps) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["cartProduct", cartItem.product_id],
    queryFn: () => getProduct(cartItem.product_id),
  });

  const removeFromCart = useMutation({
    mutationFn: (id: string | number) => deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  if (query.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (query.isError) {
    return <Box>Error...</Box>;
  }

  if (query.isSuccess && query.data) {
    const product = query.data;
    return (
      <Box w={"100%"} p={2}>
        <Box mb={4} p={2} display={"flex"}>
          <Box
            bg="#FFFFFF"
            border={"1px solid  #404040"}
            alignItems={"center"}
            borderRadius={4}
            justifyContent={"center"}
            display={"flex"}
            w={20}
            h={20}
            aspectRatio={1}
            p={2}
            pos={"relative"}
          >
            <IconButton
              pos={"absolute"}
              top={-3}
              right={-3}
              minW={1}
              width={6}
              height={6}
              rounded={"full"}
              fontSize={"8px"}
              aria-label="close-icon"
              colorScheme="blue"
              bg={"primary.900"}
              onClick={() => removeFromCart.mutate(cartItem.id)}
              icon={
                removeFromCart.isPending ? (
                  <Spinner size={"xs"} />
                ) : (
                  <CloseIcon />
                )
              }
            />

            <Image
              src={product.product_image}
              alt={product.name}
              color="white"
            />
          </Box>
          <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
            <VStack ml={4} spacing={1} align={"flex-start"}>
              <Heading fontSize={"xs"} color={"lightText.800"}>
                {product.name}
              </Heading>
              <Text fontSize={"sm"} color={"lightText.700"}>
                {product.category}
              </Text>
            </VStack>
            <VStack
              ml={4}
              spacing={1}
              align={"flex-end"}
              justifyContent={"space-between"}
            >
              <Heading fontSize={"sm"} color={"lightText.800"}>
                ${product.price.toFixed(2)} USD
              </Heading>
              <QuantityCard cartItemId={cartItem.id} />
            </VStack>
          </Box>
        </Box>
        <Divider borderColor={"lightText.700"} />
      </Box>
    );
  }
};
