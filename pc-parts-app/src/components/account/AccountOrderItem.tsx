import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { LineItem } from "../../api/orders";

interface ICheckoutItemProps {
  lineItem: LineItem;
}

export const AccountOrderItem = ({ lineItem }: ICheckoutItemProps) => {
  return (
    <Box w={"100%"}>
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
              {lineItem.quantity}
            </Text>
          </Box>
          <Image
            maxH={"100%"}
            src={lineItem.product.product_image}
            alt={lineItem.product.name}
            color="white"
          />
        </Box>
        <Box w={"100%"} display={"flex"} justifyContent={"space-between"}>
          <VStack ml={4} spacing={1} align={"flex-start"}>
            <Heading fontSize={"xs"}>{lineItem.product.name}</Heading>
            <Text fontSize={"sm"} color={"lightText.500"}>
              {lineItem.product.category}
            </Text>
          </VStack>
          <VStack
            ml={4}
            spacing={1}
            align={"flex-end"}
            justifyContent={"space-between"}
          >
            <Heading fontSize={"sm"} color={"lightText.500"}>
              ${lineItem.product.price.toFixed(2)}
            </Heading>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
