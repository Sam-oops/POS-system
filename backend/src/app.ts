import express from "express";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";
import orderRouter from "./routes/orders";
import { errorHandler } from "./middleware/errors";
import cookieParser from "cookie-parser";
import { webhookHandler } from "./routes/webhook";
import reportRouter from "./routes/reports";

export const app = express();

app.post(
  "/api/webhooks/payment",
  express.raw({ type: "application/json" }),
  webhookHandler,
);

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reports", reportRouter);
app.use(errorHandler);
