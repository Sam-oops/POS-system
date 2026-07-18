import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { listProducts } from "../services/productService";
import { asyncHandler } from "../middleware/errors";

const router = Router();
router.get(
  "/",
  requireAuth,
  asyncHandler(async (req, res) => {
    const products = await listProducts(req.auth!.tenantId, req.auth!.role);
    res.json(products);
  }),
);

export default router;
