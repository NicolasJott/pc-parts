import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export const CheckoutBreadCrumbs = () => {
  return (
    <Breadcrumb
      spacing="4px"
      separator={<ChevronRightIcon color="gray.500" />}
      mb={4}
    >
      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="cart">Cart</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="information">Information</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="shipping">Shipping</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink href="payment">Payment</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
