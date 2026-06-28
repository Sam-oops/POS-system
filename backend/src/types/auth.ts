export interface AuthPayload {
  userId: string;
  tenantId: string;
  role: "admin" | "cashier";
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}
