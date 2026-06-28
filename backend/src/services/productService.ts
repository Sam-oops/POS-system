import { ProductModel } from "../models/product";

export async function listProducts(
  tenantId: string,
  role: "admin" | "cashier",
) {
  const query = ProductModel.find({ tenantId });
  if (role !== "admin") {
    query.select("-costPrice");
  }
  return query;
}
