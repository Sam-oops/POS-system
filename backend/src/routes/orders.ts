import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../middleware/errors";
import { createOrder, listOrders } from "../services/orderService";

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

router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const orders = await listOrders(req.auth!.tenantId, req.auth!.userId);
    res.json(orders);
  }),
);

export default router;
