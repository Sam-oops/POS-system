import { apiFetch } from "../../../shared/api/client";

interface LoginParams {
  tenantSlug: string;
  email: string;
  password: string;
}

export function login(params: LoginParams) {
  return apiFetch<void>("/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}
