import { useSessionStore } from "./entities/session/model/sessionStore";
import { LoginForm } from "./features/auth/ui/LoginForm";
import { CatalogPage } from "./pages/catalog/CatalogPage";

export function App() {
  const token = useSessionStore((state) => state.token);

  if (!token) {
    return <LoginForm />;
  }

  return <CatalogPage />;
}
