import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/products";
import { CustomSpinner } from "../components/CustomSpinner";
import { ProductPageCard } from "../components/products/ProductPageCard";

export const ProductPage = () => {
  const { productId } = useParams<{ productId: string }>();

  const query = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProduct(productId || ""),
  });

  if (query.isLoading) {
    return <CustomSpinner />;
  }

  return (
    <Box mx={"auto"} px={4} mt={4} maxW={"8xl"}>
      {query.data && <ProductPageCard product={query.data} />}
    </Box>
  );
};
