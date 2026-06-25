import { Types, Schema, model } from "mongoose";

interface User {
  tenantId: Types.ObjectId;
  email: string;
  passwordHash: string;
  role: "admin" | "cashier";
}

const userSchema = new Schema<User>({
  tenantId: { type: Schema.Types.ObjectId, ref: "Tenant", required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, required: true, enum: ["admin", "cashier"] },
});

userSchema.index({ tenantId: 1, email: 1 }, { unique: true });
export const UserModel = model<User>("User", userSchema);
