import { apiFetch } from "../../../shared/api/client";
import { Product } from "../model/types";

export function getProducts(token: string) {
  return apiFetch<Product[]>("/products", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
