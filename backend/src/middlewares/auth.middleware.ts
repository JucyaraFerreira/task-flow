import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";
import { unauthorized } from "../utils/http-error.js";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    throw unauthorized("Token ausente");
  }
  try {
    const payload = verifyToken(header.slice(7));
    req.userId = payload.userId;
    next();
  } catch {
    throw unauthorized("Token inválido ou expirado");
  }
}
