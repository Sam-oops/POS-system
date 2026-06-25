import { Schema, model } from "mongoose";

interface Tenant {
  name: string;
  slug: string;
}

const tenantSchema = new Schema<Tenant>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const TenantModel = model<Tenant>("Tenant", tenantSchema);
