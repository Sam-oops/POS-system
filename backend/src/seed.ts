import { connectDb } from "./config/db";
import { TenantModel } from "./models/tenant";
import { UserModel } from "./models/user";
import bcrypt from "bcryptjs";

async function seed(): Promise<void> {
  await connectDb();
  await TenantModel.deleteMany({});
  await UserModel.deleteMany({});
  const passwordHash = await bcrypt.hash("password123", 10);
  const [coffee, books] = await TenantModel.create([
    {
      name: "Coffee Corner",
      slug: "coffee",
    },
    {
      name: "Book Nook",
      slug: "books",
    },
  ]);
  await UserModel.create([
    {
      tenantId: coffee._id,
      email: "admin@coffee.test",
      passwordHash,
      role: "admin",
    },
    {
      tenantId: coffee._id,
      email: "cashier@coffee.test",
      passwordHash,
      role: "cashier",
    },
    {
      tenantId: books._id,
      email: "admin@books.test",
      passwordHash,
      role: "admin",
    },
    {
      tenantId: books._id,
      email: "cashier@books.test",
      passwordHash,
      role: "cashier",
    },
  ]);
  process.exit(0);
}

seed().catch((err) => {
  console.error(`Ошибка ${err}`);
  process.exit(1);
});
