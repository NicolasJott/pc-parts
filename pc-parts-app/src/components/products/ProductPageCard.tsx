import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Divider,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { IProduct } from "../../api/products";
import { Price } from "./Price";

interface IProductPageCard {
  product: IProduct;
}

export const ProductPageCard = ({ product }: IProductPageCard) => {
  return (
    <Box
      maxW={"1500px"}
      h={"auto"}
      bg={"white"}
      borderRadius={"lg"}
      borderWidth={"2px"}
      borderColor={"neutral.200"}
      display={"flex"}
      flexBasis={"50%"}
      p={"2rem"}
      flexDir={{ md: "row", base: "column" }}
    >
      <Box
        h={"auto"}
        w={"full"}
        p={8}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Image
          objectFit={"contain"}
          w={"300px"}
          aspectRatio={1 / 1}
          src={product.product_image}
          alt={product.name}
        />
      </Box>
      <Stack
        h={"full"}
        w={"full"}
        display={"flex"}
        flexDirection={"column"}
        flexBasis={"50%"}
      >
        <Box>
          <Heading as={"h1"}>{product.name}</Heading>
          <Text fontSize={"xs"}>Model #: {product.model}</Text>
          <Price
            amount={product.price.toString()}
            currencyCode={"USD"}
            borderRadius="full"
            w={"fit-content"}
            bg={"primary.900"}
            p={2}
            my={4}
            textColor="white"
            display={{ md: "inline-flex" }}
          />
          <Divider my={4} borderColor={"lightText.700"} />
          <Text fontSize={"sm"} my={8}>
            {product.description}
          </Text>
          <UnorderedList ml={12}>
            {product.specifications.map((spec, index) => (
              <ListItem fontSize={"sm"} key={index}>
                {spec}
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
        <Button
          borderRadius={"full"}
          size={"lg"}
          mt={8}
          colorScheme="blue"
          bg={"primary.900"}
          leftIcon={<AddIcon />}
        >
          Add to cart
        </Button>
      </Stack>
    </Box>
  );
};
