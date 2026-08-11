import { Request, Response, NextFunction } from "express";

export function requireRole(...roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.auth || !roles.includes(req.auth.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next();
  };
}
