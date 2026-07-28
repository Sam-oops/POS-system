import { apiFetch } from "../../../shared/api/client";

export interface AuthPayload {
  userId: string;
  tenantId: string;
  role: "cashier" | "admin";
}

export function getMe() {
  return apiFetch<AuthPayload>("/auth/me");
}
