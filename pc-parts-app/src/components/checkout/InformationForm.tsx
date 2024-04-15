import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CheckoutFormData } from "../../pages/Checkout";

interface IInformationFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
  handleSubmit: UseFormHandleSubmit<CheckoutFormData, undefined>;
}

export const InformationForm = ({
  register,
  errors,
  handleSubmit,
}: IInformationFormProps) => {
  const navigate = useNavigate();

  const onSubmit = handleSubmit(() => {
    navigate("/checkout/shipping");
  });

  return (
    <Box>
      <Heading as={"h4"} size={"md"} mb={4}>
        Contact
      </Heading>
      <VStack spacing={4}>
        <FormControl isInvalid={!!errors.email} isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            placeholder="Email Address"
            {...register("email", { required: true })}
          />
          {errors.email && <Heading>{errors.email.message}</Heading>}
        </FormControl>

        <FormControl isInvalid={!!errors.phoneNumber} isRequired>
          <FormLabel>Phone Number</FormLabel>
          <Input
            placeholder="Phone Number"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <FormErrorMessage>{errors.phoneNumber.message}</FormErrorMessage>
          )}
        </FormControl>
      </VStack>
      <Heading as={"h4"} size={"md"} my={4}>
        Shipping Information
      </Heading>
      <VStack spacing={4}>
        <HStack w={"100%"}>
          <FormControl isInvalid={!!errors.firstName} isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.lastName} isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <FormControl isInvalid={!!errors.address1} isRequired>
          <FormLabel>Address</FormLabel>
          <Input
            placeholder="Address"
            {...register("address1", { required: true })}
          />
          {errors.address1 && (
            <FormErrorMessage>{errors.address1.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.address2}>
          <FormLabel>Apartment, suite, etc. (optional)</FormLabel>
          <Input
            placeholder="Apartment, suite, etc. (optional)"
            {...register("address2")}
          />
          {errors.address2 && (
            <FormErrorMessage>{errors.address2.message}</FormErrorMessage>
          )}
        </FormControl>
        <HStack w={"100%"}>
          <FormControl isInvalid={!!errors.city} isRequired>
            <FormLabel>City</FormLabel>
            <Input
              placeholder="City"
              {...register("city", { required: true })}
            />
            {errors.city && (
              <FormErrorMessage>{errors.city.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.state}>
            <FormLabel>State</FormLabel>
            <Input
              placeholder="State"
              {...register("state", { required: true })}
            />
            {errors.state && (
              <FormErrorMessage>{errors.state.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.zip}>
            <FormLabel>Zip code</FormLabel>
            <Input
              placeholder="Zip code"
              {...register("zip", { required: true })}
            />
            {errors.zip && (
              <FormErrorMessage>{errors.zip.message}</FormErrorMessage>
            )}
          </FormControl>
        </HStack>
        <Button
          alignSelf={"flex-end"}
          colorScheme="blue"
          bg={"primary.900"}
          mt={8}
          size={"lg"}
          onClick={onSubmit}
        >
          Continue to Shipping
        </Button>
      </VStack>
    </Box>
  );
};
