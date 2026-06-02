import express from "express";
import cors from "cors";
import { apiRouter } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { env } from "./config/env.js";

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json());
  app.use("/api", apiRouter);
  app.use(errorMiddleware);
  return app;
}
