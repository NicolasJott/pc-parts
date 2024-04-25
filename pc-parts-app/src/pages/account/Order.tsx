import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getOrder } from "../../api/orders";
import { AccountOrderDetails } from "../../components";
import { CustomSpinner } from "../../components/CustomSpinner";

const Order = () => {
  const { orderId } = useParams();

  const orderQuery = useQuery({
    queryKey: ["accountOrders", orderId],
    queryFn: () => getOrder(orderId ? orderId : ""),
  });

  if (orderQuery.isLoading) {
    return <CustomSpinner />;
  }

  if (orderQuery.isSuccess && orderQuery.data) {
    return <AccountOrderDetails order={orderQuery.data} />;
  }
};

export default Order;
