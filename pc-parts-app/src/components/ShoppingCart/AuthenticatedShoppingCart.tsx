import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useRef } from "react";
import { CartBody } from ".";
import { Cart } from "../../api/cart";
import { CartFooter } from "./CartFooter";

interface IAuthenticatedShoppingCartProps {
  cart: Cart;
}

export const AuthenticatedShoppingCart = ({
  cart,
}: IAuthenticatedShoppingCartProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Box pos={"relative"}>
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
          position={"relative"}
          icon={
            <ShoppingCartOutlinedIcon
              fontSize="inherit"
              sx={{ color: "#f5f6f5" }}
            />
          }
        />
        {cart.cartItems.length > 0 && (
          <Box
            pos={"absolute"}
            top={-2}
            right={-2}
            rounded={"full"}
            w={5}
            h={5}
            bg={"primary.900"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"xs"} color={"lightText.800"}>
              {cart.cartItems.length}
            </Text>
          </Box>
        )}
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="whiteAlpha"
        size={"md"}
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
            w={"100%"}
          >
            <CartBody cart={cart} />
          </DrawerBody>
          {cart.cartItems.length > 0 && (
            <DrawerFooter color={"lightText.800"} display={"block"}>
              <CartFooter cart={cart} />
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
