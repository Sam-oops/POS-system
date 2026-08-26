import { Router } from "express";
import { login, refreshAccessToken } from "../services/authService";
import { requireAuth } from "../middleware/auth";

const router = Router();
router.get("/me", requireAuth, (req, res) => {
  res.json(req.auth);
});

router.post("/login", async (req, res) => {
  const { tenantSlug, email, password } = req.body;
  const token = await login(tenantSlug, email, password);
  if (!token) return res.status(401).json({ error: "Invalid credentials" });
  const { accessToken, refreshToken } = token;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
  return res.json({ accessToken });
});

router.post("/logout", async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  })
  res.json({});
})

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  const objectToken = refreshAccessToken(refreshToken);
  if (!objectToken?.accessToken)
    return res.status(401).json({ error: "No access token" });
  const accessToken = objectToken.accessToken;
  return res.json({ accessToken });
});
export default router;
