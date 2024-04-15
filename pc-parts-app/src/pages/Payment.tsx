import { PaymentForm } from "../components";
import { useCheckout } from "./Checkout";

const Payment = () => {
  const { getValues, submitOrder } = useCheckout();

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

  return (
    <PaymentForm
      contact={contact}
      address={address}
      submitOrder={submitOrder}
    />
  );
};

export default Payment;
