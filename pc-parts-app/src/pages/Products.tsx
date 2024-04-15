import { Box, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { CustomSpinner } from "../components/CustomSpinner";
import { GridTileImage } from "../components/landing/HeroProducts";

const sortOptions = [
  { name: "Price: Low to high", value: "lowToHigh" },
  { name: "Price: High to low", value: "highToLow" },
];

const Products = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const query = useQuery({ queryKey: ["storeProducts"], queryFn: getProducts });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const uniqueCategories = Array.from(
        new Set(query.data.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [query.isSuccess, query.data]);

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  if (query.isLoading) {
    return <CustomSpinner height="100vh" />;
  }

  if (query.data) {
    let filteredProducts = query.data;
    if (selectedCategory) {
      filteredProducts = query.data.filter(
        (product) => product.category === selectedCategory
      );
    }

    return (
      <Box minH={"100vh"} m={4}>
        <Box
          maxW={"1800px"}
          mx={"auto"}
          display={"flex"}
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"center"}
        >
          <VStack spacing={1} alignItems={"flex-start"} mx={8}>
            <Text fontSize={"xs"} color={"lightText.600"}>
              Categories
            </Text>
            <Text
              _hover={{ cursor: "pointer" }}
              fontSize={"sm"}
              textDecoration={selectedCategory === null ? "underline" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Text>

            {categories.map((category) => (
              <Text
                _hover={{ cursor: "pointer" }}
                fontSize={"sm"}
                textDecoration={
                  selectedCategory === category ? "underline" : ""
                }
                key={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Text>
            ))}
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {filteredProducts.map((product) => (
              <Box width={{ md: "400px", base: "auto" }}>
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
            ))}
          </SimpleGrid>
          <VStack spacing={1} alignItems={"flex-start"} mx={8}>
            <Text fontSize={"xs"} color={"lightText.600"}>
              Sort By
            </Text>

            {sortOptions.map(({ name }) => (
              <Text _hover={{ cursor: "pointer" }} fontSize={"sm"} key={name}>
                {name}
              </Text>
            ))}
          </VStack>
        </Box>
      </Box>
    );
  }
};

export default Products;
