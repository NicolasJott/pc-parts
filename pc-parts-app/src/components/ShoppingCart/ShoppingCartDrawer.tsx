import { CloseIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { CartBody } from ".";
import { getCart } from "../../api/cart";
import { CustomSpinner } from "../CustomSpinner";
import { CartFooter } from "./CartFooter";

export const ShoppingCartDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const query = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
  });

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
            {query.isLoading && <CustomSpinner height="100vh" />}
            {query.data && query.data.cartItems && (
              <CartBody cart={query.data} />
            )}
          </DrawerBody>
          {query.data && query.data.cartItems.length > 0 && (
            <DrawerFooter color={"lightText.800"} display={"block"}>
              <CartFooter cart={query.data} />
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
