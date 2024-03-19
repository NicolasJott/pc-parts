import { Box, Spinner } from "@chakra-ui/react";

interface ICustomSpinnerProps {
  height?: string;
}

export const CustomSpinner = ({ height = "40vh" }: ICustomSpinnerProps) => {
  return (
    <Box
      display={"flex"}
      w={"100vw"}
      h={height}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"xl"} color="primary.900" />
    </Box>
  );
};
