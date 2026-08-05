import { Request, Response } from "express";
import { asyncHandler } from "../middleware/errors";
import { processPaymentWebhook } from "../services/webhookService";

export const webhookHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const signature = req.headers["x-signature"] as string;
    await processPaymentWebhook(req.body, signature);
    res.json({ received: true });
  },
);
