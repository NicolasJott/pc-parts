import { Container, SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { getCart } from "../api/cart";
import { getSessionCart } from "../api/cartSession";
import { CustomSpinner } from "../components/CustomSpinner";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { useAuth } from "../components/context/AuthContext";

const Checkout = () => {
  const { authenticated } = useAuth();

  const checkoutQuery = useQuery({
    queryKey: ["checkout"],
    queryFn: authenticated ? getCart : getSessionCart,
  });

  if (checkoutQuery.isLoading) {
    return <CustomSpinner />;
  }

  if (checkoutQuery.data) {
    return (
      <Container maxW={"6xl"} centerContent>
        <SimpleGrid columns={2}>
          <Outlet />
          <OrderSummary cart={checkoutQuery.data} />
        </SimpleGrid>
      </Container>
    );
  }
};

export default Checkout;
