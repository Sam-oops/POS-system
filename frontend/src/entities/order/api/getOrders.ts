import { apiFetch } from "../../../shared/api/client";
import { Order } from "../model/types";

export function getOrders() {
  return apiFetch<Order[]>("/orders");
}
