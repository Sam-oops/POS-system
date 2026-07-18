import { connectDb } from "./config/db";
import { TenantModel } from "./models/tenant";
import { UserModel } from "./models/user";
import { CategoryModel } from "./models/category";
import { ProductModel } from "./models/product";
import bcrypt from "bcryptjs";

async function seed(): Promise<void> {
  await connectDb();
  await TenantModel.deleteMany({});
  await UserModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await ProductModel.deleteMany({});

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

  // --- Stage 2: категории и товары на каждый магазин ---
  // price/costPrice — целые в "копейках" (250 = 2.50), деньги как целые числа.
  const [coffeeDrinks, coffeePastries] = await CategoryModel.create([
    { tenantId: coffee._id, name: "Drinks" },
    { tenantId: coffee._id, name: "Pastries" },
  ]);
  const [booksFiction, booksNonfiction] = await CategoryModel.create([
    { tenantId: books._id, name: "Fiction" },
    { tenantId: books._id, name: "Non-fiction" },
  ]);

  await ProductModel.create([
    // Coffee Corner
    { tenantId: coffee._id, categoryId: coffeeDrinks._id, name: "Espresso", price: 250, costPrice: 80, stock: 100 },
    { tenantId: coffee._id, categoryId: coffeeDrinks._id, name: "Cappuccino", price: 350, costPrice: 120, stock: 80 },
    { tenantId: coffee._id, categoryId: coffeePastries._id, name: "Croissant", price: 300, costPrice: 110, stock: 40 },
    // Book Nook
    { tenantId: books._id, categoryId: booksFiction._id, name: "Dune", price: 1200, costPrice: 700, stock: 15 },
    { tenantId: books._id, categoryId: booksFiction._id, name: "1984", price: 900, costPrice: 500, stock: 20 },
    { tenantId: books._id, categoryId: booksNonfiction._id, name: "Sapiens", price: 1500, costPrice: 850, stock: 10 },
  ]);

  console.log("seeded: tenants, users, categories, products");
  process.exit(0);
}

seed().catch((err) => {
  console.error(`Ошибка ${err}`);
  process.exit(1);
});
