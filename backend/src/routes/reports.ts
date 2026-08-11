import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { requireRole } from "../middleware/requireRole";
import { asyncHandler } from "../middleware/errors";
import { getSalesReport } from "../services/reportService";

const router = Router();

router.get(
  "/sales",
  requireAuth,
  requireRole("admin"),
  asyncHandler(async (req, res) => {
    const report = await getSalesReport(req.auth!.tenantId);
    res.json(report);
  }),
);

export default router;
