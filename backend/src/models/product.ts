import { model, ObjectId, Schema } from "mongoose";

interface Product {
  tenantId: ObjectId;
  categoryId: ObjectId;
  name: string;
  price: number;
  costPrice: number;
  stock: number;
}

const ProductSchema = new Schema<Product>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true },
);
ProductSchema.index({ tenantId: 1, categoryId: 1 });
export const ProductModel = model<Product>("Product", ProductSchema);
