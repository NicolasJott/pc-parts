import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/layout";
import { FormErrorMessage } from "@chakra-ui/react";
import { useAsync } from "@react-hookz/web";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as ReactRouterLink } from "react-router-dom";
import { login } from "../../api/auth";
import { useAuth } from "../context/AuthContext";

interface IFormInput {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { session } = useAuth();
  const [status, setStatus] = useState<"not-executed" | "loading">(
    "not-executed"
  );
  const [error, setError] = useState<boolean>(false);
  const [loginState, loginActions] = useAsync(login);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setError(false);
    loginActions.execute(data.email, data.password);
  };

  useEffect(() => {
    if (loginState.status === "success" && loginState.result) {
      if (status === "not-executed") {
        setStatus("loading");
        session.create(loginState.result.access_token);
      }
    }
    if (loginState.status === "error") {
      setError(true);
    }
  }, [loginState, session, status]);

  return (
    <Box
      minH={"80vh"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      pt={4}
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
          <Heading textAlign={"left"}>Welcome back!</Heading>
          <Text textAlign={"left"}>Log in to your account to continue.</Text>
        </VStack>

        <VStack spacing={8} w={"100%"}>
          <FormControl isRequired isInvalid={!!errors.email}>
            {error && (
              <Text color={"red"} mb={1}>
                Invalid email or password
              </Text>
            )}
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
          Don't have an account?{" "}
          <Link as={ReactRouterLink} to="/signup" color={"primary.900"}>
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
