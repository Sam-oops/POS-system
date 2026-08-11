import { apiFetch } from "../../../shared/api/client";
import { Product } from "../model/types";

export function getProducts() {
  return apiFetch<Product[]>("/products");
}
