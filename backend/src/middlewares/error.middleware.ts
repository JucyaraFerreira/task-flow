import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/http-error.js";

export function errorMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Erro interno do servidor" });
}
