import { InformationForm } from "../components";
import { useCheckout } from "./Checkout";

const Information = () => {
  const { register, errors, handleSubmit } = useCheckout();

  return (
    <InformationForm
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
    />
  );
};

export default Information;
