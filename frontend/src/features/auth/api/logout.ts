import { apiFetch } from "../../../shared/api/client";

export function logout() {
  return apiFetch<{ token: string }>("/auth/logout", {
    method: "POST",
  });
}
