import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { CartItem } from "../../api/cart";
import { getProduct } from "../../api/products";

interface ICheckoutItemProps {
  cartItem: CartItem;
}

export const CheckoutItem = ({ cartItem }: ICheckoutItemProps) => {
  const query = useQuery({
    queryKey: ["checkoutItem", cartItem.product_id],
    queryFn: () => getProduct(cartItem.product_id),
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
            <Box
              pos={"absolute"}
              bgColor={"primary.900"}
              p={2}
              w={6}
              h={6}
              border={"solid"}
              borderColor={"lightText.800"}
              borderWidth={1}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"full"}
              top={-3}
              right={-3}
            >
              <Text fontSize={"xs"} color={"white"} p={0} m={0}>
                {cartItem.quantity}
              </Text>
            </Box>
            <Image
              maxH={"100%"}
              src={product.product_image}
              alt={product.name}
              color="white"
            />
          </Box>
          <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
            <VStack ml={4} spacing={1} align={"flex-start"}>
              <Heading fontSize={"xs"}>{product.name}</Heading>
              <Text fontSize={"sm"} color={"lightText.500"}>
                {product.category}
              </Text>
            </VStack>
            <VStack
              ml={4}
              spacing={1}
              align={"flex-end"}
              justifyContent={"space-between"}
            >
              <Heading fontSize={"sm"} color={"lightText.500"}>
                ${product.price.toFixed(2)}
              </Heading>
            </VStack>
          </Box>
        </Box>
      </Box>
    );
  }
};
