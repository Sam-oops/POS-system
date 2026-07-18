import express from "express";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";
import { errorHandler } from "./middleware/errors";

export const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use(errorHandler);
