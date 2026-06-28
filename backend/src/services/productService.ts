import { ProductModel } from "../models/product";
import "../models/category";

export async function listProducts(
  tenantId: string,
  role: "admin" | "cashier",
) {
  const query = ProductModel.find({ tenantId }).populate("categoryId", "name");
  if (role !== "admin") {
    query.select("-costPrice");
  }
  return query;
}
