import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export interface PaymentFormData {
  cardNumber: string;
  cardEmail: string;
  cardExpiration: string;
  cardCvc: string;
  cardZip: string;
}

interface IPaymentFormProps {
  contact: string;
  address: string;
  submitOrder: () => void;
  isLoading: boolean;
}

export const PaymentForm = ({
  contact,
  address,
  submitOrder,
  isLoading,
}: IPaymentFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({ defaultValues: { cardEmail: contact } });

  const onSubmit = handleSubmit(() => {
    submitOrder();
  });

  return (
    <Box>
      <Box
        px={4}
        py={2}
        border={"solid"}
        borderWidth={1}
        borderColor={"lightText.700"}
        borderRadius={8}
      >
        <HStack justifyContent={"space-between"}>
          <Text color={"lightText.700"}>Contact</Text>
          <Text color={"lightText.600"}>{contact}</Text>
        </HStack>
        <Divider my={2} />
        <HStack justifyContent={"space-between"}>
          <Text color={"lightText.700"}>Ship to</Text>
          <Text color={"lightText.600"}>{address}</Text>
        </HStack>
        <Divider my={2} />
        <HStack justifyContent={"space-between"}>
          <Text color={"lightText.700"}>Shipping Method</Text>
          <Text color={"lightText.600"}>Economy · Free</Text>
        </HStack>
      </Box>
      <VStack width={"100%"} my={8} gap={4}>
        <Heading size={"md"} alignSelf={"flex-start"}>
          Payment Information
        </Heading>
        <FormControl
          isInvalid={!!errors.cardEmail}
          isRequired
          isReadOnly
          isDisabled
        >
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Email"
            {...register("cardEmail", { required: true })}
          />
          {errors.cardEmail && (
            <FormErrorMessage>{errors.cardEmail.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.cardNumber} isRequired>
          <FormLabel>Card Number</FormLabel>
          <Input
            placeholder="XXXX-XXXX-XXXX-XXXX"
            {...register("cardNumber", { required: true })}
          />
          {errors.cardNumber && (
            <FormErrorMessage>{errors.cardNumber.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack>
          <FormControl isInvalid={!!errors.cardCvc} isRequired>
            <FormLabel>CVC</FormLabel>
            <Input
              placeholder="xxx"
              {...register("cardCvc", { required: true })}
            />
            {errors.cardCvc && (
              <FormErrorMessage>{errors.cardCvc.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.cardExpiration} isRequired>
            <FormLabel>Expiration</FormLabel>
            <Input
              placeholder="xx/xx"
              {...register("cardExpiration", { required: true })}
            />
            {errors.cardExpiration && (
              <FormErrorMessage>
                {errors.cardExpiration.message}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.cardZip} isRequired>
            <FormLabel>Zip Code</FormLabel>
            <Input
              placeholder="xxxxx"
              {...register("cardZip", { required: true })}
            />
            {errors.cardZip && (
              <FormErrorMessage>{errors.cardZip.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>

        <Button
          isLoading={isLoading}
          alignSelf={"flex-end"}
          colorScheme="blue"
          bg={"primary.900"}
          mt={8}
          size={"lg"}
          onClick={onSubmit}
        >
          Continue to Payment
        </Button>
      </VStack>
    </Box>
  );
};
