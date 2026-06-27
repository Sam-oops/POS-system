import jwt from "jsonwebtoken";
import { TenantModel } from "../models/tenant";
import { UserModel } from "../models/user";
import bcrypt from "bcryptjs";
import { env } from "../config/env";

export async function login(
  tenantSlug: string,
  email: string,
  password: string,
) {
  const tenant = await TenantModel.findOne({ slug: tenantSlug });
  if (!tenant) return null;

  const user = await UserModel.findOne({ tenantId: tenant._id, email }).select(
    "+passwordHash",
  );
  if (!user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) return null;

  const accessToken = jwt.sign(
    {
      userId: user._id.toString(),
      tenantId: user.tenantId.toString(),
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: "15m" },
  );
  return accessToken;
}
