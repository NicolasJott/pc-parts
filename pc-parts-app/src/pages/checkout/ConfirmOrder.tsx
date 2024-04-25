import { CheckCircleIcon } from "@chakra-ui/icons";
import { Container, Heading, Link } from "@chakra-ui/react";
import { useMountEffect } from "@react-hookz/web";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clearCart } from "../../api/cart";
import { clearSessionCart } from "../../api/cartSession";
import { useAuth } from "../../components/context/AuthContext";

const ConfirmOrder = () => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const clearCartMutation = useMutation({
    mutationFn: user ? clearCart : clearSessionCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unAuthenticatedCart"],
      });
    },
  });

  useMountEffect(() => {
    clearCartMutation.mutate();
  });

  return (
    <Container
      minH={"100vh"}
      display={"flex"}
      flexDir={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading as={"h1"} size={"2xl"}>
        Order Confirmed!
      </Heading>
      <CheckCircleIcon fontSize={128} mt={4} color={"green.500"} />
      <Link href={"/store/home"} mt={4}>
        Continue Shopping
      </Link>
    </Container>
  );
};

export default ConfirmOrder;
