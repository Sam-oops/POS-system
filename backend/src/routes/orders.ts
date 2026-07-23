import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/errors";
import { createOrder } from "../services/orderService";

const router = Router();

router.post(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const order = await createOrder(
      req.auth!.tenantId,
      req.auth!.userId,
      req.body.items,
    );
    res.status(201).json(order);
  }),
);

export default router;
