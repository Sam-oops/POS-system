import { model, ObjectId, Schema } from "mongoose";

interface Category {
  tenantId: ObjectId;
  name: string;
}

const CategorySchema = new Schema<Category>(
  {
    tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);
CategorySchema.index({ tenantId: 1, name: 1 });
export const CategoryModel = model<Category>("Category", CategorySchema);
