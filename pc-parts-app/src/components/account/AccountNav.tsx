import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export const AccountNav = () => {
  const [selected, setSelected] = useState<string>();
  const navigate = useNavigate();

  const accountNavOptions = [
    {
      name: "Profile",
      value: "profile",
    },
    {
      name: "Orders",
      value: "orders",
    },
    {
      name: "Settings",
      value: "settings",
    },
  ];

  useEffect(() => {
    if (selected) navigate(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <VStack spacing={8} padding={4} maxW={"xs"}>
      <Box
        bgColor={"white"}
        borderWidth="1px"
        borderRadius="lg"
        overflow={"hidden"}
        w={"100%"}
      >
        {accountNavOptions.map((option) => (
          <Box
            key={option.value}
            p={4}
            onClick={() => setSelected(option.value)}
            bgColor={selected === option.value ? "gray.100" : "white"}
            _hover={{ bgColor: "gray.200", cursor: "pointer" }}
          >
            {option.name}
          </Box>
        ))}
      </Box>
      <Box w={"100%"}>
        <LogoutButton />
      </Box>
    </VStack>
  );
};
