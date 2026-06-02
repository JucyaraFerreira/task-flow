import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface TokenPayload {
  userId: string;
}

export const signToken = (payload: TokenPayload): string =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });

export const verifyToken = (token: string): TokenPayload => {
  const decoded = jwt.verify(token, env.JWT_SECRET);
  if (typeof decoded !== "object" || decoded === null || !("userId" in decoded)) {
    throw new Error("Invalid token payload");
  }
  return decoded as TokenPayload;
};
