import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { getCart } from "../api/cart";
import { getSessionCart } from "../api/cartSession";
import { CreateOrderRequest, createOrder } from "../api/orders";
import { CheckoutBreadCrumbs } from "../components";
import { CustomSpinner } from "../components/CustomSpinner";
import { OrderSummary } from "../components/checkout/OrderSummary";
import { useAuth } from "../components/context/AuthContext";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
}

type ContextType = {
  register: UseFormRegister<CheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData, undefined>;
  errors: FieldErrors<CheckoutFormData>;
  getValues: UseFormGetValues<CheckoutFormData>;
  submitOrder: () => void;
  isLoading: boolean;
};

const Checkout = () => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const checkoutQuery = useQuery({
    queryKey: ["checkout"],
    queryFn: authenticated ? getCart : getSessionCart,
  });

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      navigate("/checkout/confirm-order");
    },
  });

  if (checkoutQuery.isLoading) {
    return <CustomSpinner />;
  }

  if (checkoutQuery.data) {
    const submitOrder = handleSubmit((data) => {
      const orderData: CreateOrderRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        products: checkoutQuery.data.cartItems.map((item) => ({
          id: item.product_id,
          quantity: item.quantity,
        })),
        deliveryAddress: {
          address1: data.address1,
          address2: data.address2,
          city: data.city,
          state: data.state,
          zipCode: parseInt(data.zip),
        },
      };

      createOrderMutation.mutate(orderData);
    });

    createOrderMutation.isPending;

    return (
      <Container maxW={"6xl"} centerContent>
        <SimpleGrid columns={2}>
          <Box py={4} pr={8}>
            <Heading as="h1" size="lg" mb={2}>
              PC PARTS
            </Heading>
            <CheckoutBreadCrumbs />
            <Outlet
              context={
                {
                  register,
                  handleSubmit,
                  errors,
                  getValues,
                  submitOrder,
                  isLoading: createOrderMutation.isPending,
                } satisfies ContextType
              }
            />
          </Box>
          <OrderSummary cart={checkoutQuery.data} />
        </SimpleGrid>
      </Container>
    );
  }
};

export default Checkout;

export function useCheckout() {
  return useOutletContext<ContextType>();
}
