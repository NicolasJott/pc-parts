import { CloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Icon,
  IconButton,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRef } from "react";

export const ShoppingCart = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        variant={"outline"}
        borderColor={"lightText.600"}
        borderRadius={"4px"}
        justifySelf={"flex-end"}
        aria-label="Shopping Cart"
        _hover={{ bg: "primary.900" }}
        size="md"
        icon={
          <ShoppingCartOutlinedIcon
            fontSize="inherit"
            sx={{ color: "#f5f6f5" }}
          />
        }
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="whiteAlpha"
        size={"sm"}
      >
        <DrawerOverlay
          backdropFilter={"auto"}
          backdropBlur={".5px"}
          backdropInvert={"5%"}
        />
        <DrawerContent
          bgColor="rgba(0, 0, 0, 0.8)"
          backdropFilter={"auto"}
          backdropBlur={"24px"}
          borderLeft={"1px solid rgb(64 64 64 / 1)"}
        >
          <DrawerHeader
            color={"lightText.800"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Heading size={"md"}>My Cart</Heading>
            <IconButton
              onClick={onClose}
              variant={"outline"}
              borderColor={"lightText.600"}
              borderRadius={"4px"}
              justifySelf={"flex-end"}
              aria-label="Shopping Cart"
              _hover={{ bg: "primary.900" }}
              size="md"
              icon={<CloseIcon fontSize="12px" sx={{ color: "#f5f6f5" }} />}
            />
          </DrawerHeader>

          <DrawerBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <VStack alignItems={"center"} justifyContent={"center"}>
              <Icon
                color={"lightText.800"}
                fontSize={"48px"}
                as={ShoppingCartOutlinedIcon}
              />
              <Heading color={"lightText.800"} size={"lg"}>
                Your cart is empty.
              </Heading>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
