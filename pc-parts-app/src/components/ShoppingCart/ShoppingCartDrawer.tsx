import { useQuery } from "@tanstack/react-query";
import { AuthenticatedShoppingCart, LocalShoppingCart } from ".";
import { getCart } from "../../api/cart";
import { CustomSpinner } from "../CustomSpinner";
import { useAuth } from "../context/AuthContext";

export const ShoppingCartDrawer = () => {
  const { authenticated } = useAuth();

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

  if (!authenticated) return <LocalShoppingCart />;

  if (query.isLoading) return <CustomSpinner />;

  if (query.isSuccess) return <AuthenticatedShoppingCart cart={query.data} />;
};
