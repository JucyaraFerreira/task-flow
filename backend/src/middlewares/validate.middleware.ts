import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { ZodTypeAny } from "zod";
import { badRequest } from "../utils/http-error.js";

export const validate =
  (schema: ZodTypeAny): RequestHandler =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(badRequest(result.error.issues.map((i) => i.message).join("; ")));
    }
    req.body = result.data;
    next();
  };
