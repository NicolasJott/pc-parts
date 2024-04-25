import { ShippingForm } from "../../components";
import { useCheckout } from "./Checkout";

const Shipping = () => {
  const { getValues } = useCheckout();

  const contact = getValues("email");
  const address = [
    getValues("address1"),
    getValues("address2") === "" ? null : getValues("address2"),
    getValues("city"),
    getValues("state"),
    getValues("zip"),
  ]
    .filter(Boolean)
    .join(", ");

  return <ShippingForm contact={contact} address={address} />;
};

export default Shipping;
