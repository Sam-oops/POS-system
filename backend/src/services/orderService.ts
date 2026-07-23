import mongoose from "mongoose";
import { HttpError } from "../middleware/errors";
import { OrderModel } from "../models/order";
import { ProductModel } from "../models/product";

export async function createOrder(
  tenantId: string,
  createdBy: string,
  items: { productId: string; quantity: number }[],
) {
  const session = await mongoose.startSession();
  let order;

  await session.withTransaction(async () => {
    let orderItems = [];
    let total = 0;

    for (const { productId, quantity } of items) {
      const product = await ProductModel.findOneAndUpdate(
        { _id: productId, tenantId, stock: { $gte: quantity } },
        { $inc: { stock: -quantity } },
        { session },
      );
      if (!product) {
        throw new HttpError(409, "Product unavailable or out of stock");
      }
      const lineTotal = product.price * quantity;
      orderItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        costPrice: product.costPrice,
        quantity,
        lineTotal,
      });
      total += lineTotal;
    }

    const created = await OrderModel.create(
      [
        {
          tenantId,
          items: orderItems,
          total,
          status: "pending_payment",
          createdBy,
        },
      ],
      { session },
    );
    order = created[0];
  });

  session.endSession();
  return order;
}
