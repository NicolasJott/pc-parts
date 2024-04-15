import { CheckCircleIcon } from "@chakra-ui/icons";
import { Container, Heading, Link } from "@chakra-ui/react";

const ConfirmOrder = () => {
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
