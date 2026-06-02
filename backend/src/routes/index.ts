import { Router } from "express";
import { authRoutes } from "./auth.routes.js";
import { categoryRoutes } from "./category.routes.js";
import { taskRoutes } from "./task.routes.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => res.json({ status: "ok" }));
apiRouter.use("/auth", authRoutes);
apiRouter.use("/categories", categoryRoutes);
apiRouter.use("/tasks", taskRoutes);
