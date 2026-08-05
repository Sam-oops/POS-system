import crypto from "crypto";
import { env } from "../config/env";
import { HttpError } from "../middleware/errors";
import { WebhookEventModel } from "../models/webhookEvent";
import { OrderModel } from "../models/order";

export async function processPaymentWebhook(
  rawBody: Buffer,
  signature: string,
) {
  const expected = crypto
    .createHmac("sha256", env.webhookSecret)
    .update(rawBody)
    .digest("hex");
  if (signature !== expected) {
    throw new HttpError(401, "Invalid signature");
  }

  const { eventId, orderId, tenantId } = JSON.parse(rawBody.toString());

  try {
    await WebhookEventModel.create({ eventId });
  } catch (err) {
    return;
  }

  const order = await OrderModel.findOneAndUpdate(
    { _id: orderId, tenantId, status: "pending_payment" },
    { status: "paid" },
  );

  if (!order) {
    console.warn(`Webhook for unknown/foreign/already-paid order: ${orderId}`);
  }
}
