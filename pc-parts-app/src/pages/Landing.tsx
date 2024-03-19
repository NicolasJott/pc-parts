import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";
import { CustomSpinner } from "../components/CustomSpinner";
import { HeroProducts } from "../components/landing";
import { HeroCarousel } from "../components/landing/HeroCarousel";

export const Landing = () => {
  const query = useQuery({ queryKey: ["products"], queryFn: getProducts });

  if (query.isLoading) {
    return <CustomSpinner height="60vh" />;
  }

  return (
    <Box minH={"60vh"} minW={"100vw"}>
      <HeroProducts
        products={query.data?.sort(() => (Math.random() > 0.5 ? 1 : -1))}
      />
      <HeroCarousel products={query.data} />
    </Box>
  );
};
