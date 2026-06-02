import { Router } from "express";
import { taskController } from "../controllers/task.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createTaskSchema, updateTaskSchema } from "../validations/task.validation.js";

export const taskRoutes = Router();

taskRoutes.use(authMiddleware);
taskRoutes.get("/", taskController.list);
taskRoutes.get("/:id", taskController.get);
taskRoutes.post("/", validate(createTaskSchema), taskController.create);
taskRoutes.put("/:id", validate(updateTaskSchema), taskController.update);
taskRoutes.patch("/:id/complete", taskController.toggle);
taskRoutes.delete("/:id", taskController.remove);
