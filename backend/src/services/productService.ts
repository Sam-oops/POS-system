import { ProductModel } from "../models/product";

export async function listProducts(tenantId: string) {
  return ProductModel.find({ tenantId });
}
