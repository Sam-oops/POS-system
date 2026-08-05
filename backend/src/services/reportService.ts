import mongoose from "mongoose";
import { OrderModel } from "../models/order";

export async function getSalesReport(tenantId: string) {
  return OrderModel.aggregate([
    {
      $match: {
        tenantId: new mongoose.Types.ObjectId(tenantId),
        status: "paid",
      },
    },
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.productId",
        name: { $first: "$items.name" },
        quantitySold: { $sum: "$items.quantity" },
        revenue: { $sum: "$items.lineTotal" },
        cost: { $sum: { $multiply: ["$items.costPrice", "$items.quantity"] } },
      },
    },
    { $addFields: { margin: { $subtract: ["$revenue", "$cost"] } } },
    { $sort: { revenue: -1 } },
  ]);
}
