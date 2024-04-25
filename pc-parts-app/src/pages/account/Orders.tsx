import { useQuery } from "@tanstack/react-query";
import { getMyOrders } from "../../api/profile";
import { AccountOrders } from "../../components";
import { CustomSpinner } from "../../components/CustomSpinner";

const Orders = () => {
  const ordersQuery = useQuery({
    queryKey: ["accountOrders"],
    queryFn: getMyOrders,
  });

  if (ordersQuery.isLoading) {
    return <CustomSpinner />;
  }

  if (ordersQuery.isSuccess && ordersQuery.data) {
    return <AccountOrders orders={ordersQuery.data} />;
  }
};

export default Orders;
