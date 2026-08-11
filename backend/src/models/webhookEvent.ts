import { model, Schema } from "mongoose";

interface WebhookEvent {
  eventId: string;
}

const webhookEventSchema = new Schema<WebhookEvent>(
  {
    eventId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const WebhookEventModel = model<WebhookEvent>(
  "WebhookEvent",
  webhookEventSchema,
);
