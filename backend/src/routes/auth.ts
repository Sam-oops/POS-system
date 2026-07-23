import { Router } from "express";
import { login } from "../services/authService";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.get("/me", requireAuth, (req, res) => {
  res.json(req.auth);
});

router.post("/login", async (req, res) => {
  const { tenantSlug, email, password } = req.body;
  const token = await login(tenantSlug, email, password);
  if (!token) return res.status(401).json({ error: "Invalid credentials" });
  return res.json({ token });
});
export default router;
