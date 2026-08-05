import { useQuery } from "@tanstack/react-query";
import { LoginForm } from "./features/auth/ui/LoginForm";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { getMe } from "./entities/session/api/getMe";
import { CartSummary } from "./entities/cart/ui/CartSummary";
import { OrderList } from "./widgets/orders/OrderList";
import { SalesReport } from "./widgets/report/SalesReport";

export function App() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) return <p>Загрузка...</p>;

  if (!user) {
    return <LoginForm />;
  }

  return (
    <>
      <CatalogPage />
      <CartSummary />
      <OrderList />
      {user.role === "admin" && <SalesReport />}
    </>
  );
}
