import { model, ObjectId, Schema } from "mongoose";

interface OrderItem {
  productId: ObjectId;
  name: string;
  price: number;
  costPrice: number;
  quantity: number;
  lineTotal: number;
}

interface Order {
  tenantId: ObjectId;
  items: OrderItem[];
  total: number;
  status: "pending_payment" | "paid";
  createdBy: ObjectId;
}

const orderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true },
  },
  { _id: false },
);

const orderSchema = new Schema<Order>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    items: { type: [orderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending_payment", "paid"],
      default: "pending_payment",
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

orderSchema.index({ tenantId: 1, createdAt: -1 });
export const OrderModel = model<Order>("Order", orderSchema);
