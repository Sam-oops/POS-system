import { useQuery } from "@tanstack/react-query";
import { LoginForm } from "./features/auth/ui/LoginForm";
import { CatalogPage } from "./pages/catalog/CatalogPage";
import { getMe } from "./entities/session/api/getMe";

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

  return <CatalogPage />;
}
