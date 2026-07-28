import { env } from "../config/env";
import { Request, Response, NextFunction } from "express";
import { AuthPayload } from "../types/auth";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const payload = jwt.verify(token, env.jwtSecret) as AuthPayload;
    req.auth = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
}
