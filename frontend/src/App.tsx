import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoginForm } from "./features/auth/ui/LoginForm";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { getMe } from "./entities/session/api/getMe";
import { CartSummary } from "./entities/cart/ui/CartSummary";
import { OrderList } from "./widgets/orders/OrderList";
import { SalesReport } from "./widgets/report/SalesReport";
import { logout } from "./features/auth/api/logout";
import { useAuthStore } from "./entities/session/model/sessionStore";

export function App() {
  const queryClient = useQueryClient();
  const clearToken = useAuthStore((state) => state.clearToken)

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  const handleLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({queryKey: ["me"]})
      clearToken()
    }
  })

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
      <button onClick={() => handleLogout.mutate()}>Выйти</button>
    </>
  );
}
