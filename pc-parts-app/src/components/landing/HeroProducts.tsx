import {
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { IProduct } from "../../api/products";
import Label from "../products/Label";

type GridTileImageProps = {
  src: string | undefined;
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>;

export const GridTileImage = ({
  isInteractive = true,
  active,
  src,
  label,
  ...props
}: GridTileImageProps) => {
  const borderColor = useColorModeValue("neutral.200", "neutral.800");
  const activeBorderColor = "primary.900";
  const hoverBorderColor = "primary.900";

  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      borderRadius="lg"
      aspectRatio={1 / 1}
      borderWidth={active ? "4px" : "2px"}
      borderColor={active ? activeBorderColor : borderColor}
      bg={"white"}
      _hover={{ borderColor: hoverBorderColor }}
      position={label ? "relative" : "initial"}
    >
      {src && (
        <Image
          src={src}
          objectFit="contain"
          aspectRatio={1 / 1}
          transition={isInteractive ? "transform 0.3s ease-in-out" : "none"}
          _groupHover={{ transform: isInteractive ? "scale(1.05)" : "none" }}
          {...props} // spread the rest of the props onto the Image component
        />
      )}

      {label && (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      )}
    </Box>
  );
};

interface IHeroProductsGridItemProps {
  product: IProduct | undefined;
  size: "full" | "half";
  priority?: boolean;
}

export const HeroProductsGridItem = ({
  product,
  size,
  priority,
}: IHeroProductsGridItemProps) => {
  return (
    <GridItem
      colSpan={{ md: size === "full" ? 4 : 2 }}
      rowSpan={{ md: size === "full" ? 2 : 1 }}
    >
      <Link
        position={"relative"}
        display={"block"}
        w={"full"}
        h={"full"}
        aspectRatio={1 / 1}
        href={`product/${product?.id}`}
      >
        <GridTileImage
          src={product?.product_image}
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={product?.name}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: product ? product.name : "",
            amount: product?.price.toString() || "0",
            currencyCode: "USD",
          }}
        />
      </Link>
    </GridItem>
  );
};

interface IHeroProductsProps {
  products: IProduct[] | undefined;
}

export const HeroProducts = ({ products }: IHeroProductsProps) => {
  return (
    <Grid
      templateRows={{ md: "repeat(2, 1fr)", base: "repeat(3, 1fr)" }}
      templateColumns={{ md: "repeat(6, 1fr)", base: "repeat(1, 1fr)" }}
      gap={6}
      padding={4}
      maxW="6xl"
      mx="auto"
    >
      <HeroProductsGridItem
        product={products?.[0]}
        size="full"
        priority={true}
      />
      <HeroProductsGridItem
        product={products?.[1]}
        size="half"
        priority={true}
      />
      <HeroProductsGridItem product={products?.[2]} size="half" />
    </Grid>
  );
};
