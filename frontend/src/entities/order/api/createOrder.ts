import { apiFetch } from "../../../shared/api/client";

interface СreateOrderItem {
  productId: string;
  quantity: number;
}

export function createOrder(items: СreateOrderItem[]) {
  return apiFetch("/orders", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}
