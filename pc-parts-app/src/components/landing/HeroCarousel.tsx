import { Box, Link } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import { IProduct } from "../../api/products";
import { GridTileImage } from "./HeroProducts";

interface HeroCarouselProps {
  products: IProduct[] | undefined;
}

export const HeroCarousel = ({ products }: HeroCarouselProps) => {
  if (!products) {
    return null;
  }

  return (
    <Marquee>
      {products.map((product) => {
        return (
          <Box w={"400px"} h={"275px"} mx={4}>
            <Link
              position={"relative"}
              display={"block"}
              w={"full"}
              h={"full"}
              href={`product/${product.id}`}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.price.toString(),
                  currencyCode: "USD",
                }}
                src={product.product_image}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </Box>
        );
      })}
    </Marquee>
  );
};
