import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../entities/order/api/getOrders";

export function OrderList() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    refetchInterval: 5000,
  });

  if (isLoading) return <p>Загрузка...</p>;
  return (
    <>
      <h3>Мои заказы</h3>
      <ul>
        {orders!.map((order) => (
          <li key={order._id}>
            {" "}
            №{order._id.slice(-6)} — {order.total} — {order.status}
          </li>
        ))}
      </ul>
    </>
  );
}
