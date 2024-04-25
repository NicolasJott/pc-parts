import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/layout";
import { FormErrorMessage } from "@chakra-ui/react";
import { useAsync } from "@react-hookz/web";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import { signUp } from "../../api/auth";
import { useAuth } from "../context/AuthContext";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const SignupForm = () => {
  const { session } = useAuth();
  const [status, setStatus] = useState<"not-executed" | "loading">(
    "not-executed"
  );

  const [signupState, signupActions] = useAsync(signUp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const formattedName = `${data.firstName} ${data.lastName}`;
    signupActions.execute(formattedName, data.email, data.password);
  };

  useEffect(() => {
    if (signupState.status === "success" && signupState.result) {
      if (status === "not-executed") {
        setStatus("loading");
        session.create(signupState.result.access_token);
      }
    }
  }, [signupState, session, status]);

  return (
    <Box
      minH={"60vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      maxWidth={"xl"}
      mx={"auto"}
    >
      <VStack
        spacing={16}
        mx={{ base: 8, md: 0 }}
        p={{ base: 8, md: 16 }}
        bg={"white"}
        borderRadius={"lg"}
        borderWidth={"2px"}
        borderColor={"neutral.200"}
      >
        <VStack alignItems={"flex-start"} spacing={0} w={"100%"}>
          <Heading textAlign={"left"}>Get Started Now!</Heading>
          <Text textAlign={"left"}>Create an account to continue.</Text>
        </VStack>

        <VStack spacing={8} w={"100%"}>
          <FormControl isRequired isInvalid={!!errors.firstName}>
            <FormLabel>First Name</FormLabel>
            <Input
              placeholder="First name"
              {...register("firstName", {
                required: "First name is required",
              })}
            />
            {!!errors.firstName && (
              <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.lastName}>
            <FormLabel>Last Name</FormLabel>
            <Input
              placeholder="Last name"
              {...register("lastName", {
                required: "Last name is required",
              })}
            />
            {!!errors.lastName && (
              <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address.",
                },
              })}
            />
            {!!errors.email && (
              <FormErrorMessage>{errors.email.message}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {!!errors.password && (
              <FormErrorMessage>{errors.password.message}</FormErrorMessage>
            )}
          </FormControl>
          <Button
            w={"100%"}
            colorScheme="blue"
            bg={"primary.900"}
            onClick={handleSubmit(onSubmit)}
          >
            Log In
          </Button>
        </VStack>
        <Text>
          Have an account?{" "}
          <Link as={ReactRouterLink} to="/store/login" color={"primary.900"}>
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
