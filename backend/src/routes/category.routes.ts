import { Router } from "express";
import { categoryController } from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

export const categoryRoutes = Router();

categoryRoutes.use(authMiddleware);
categoryRoutes.get("/", categoryController.list);
categoryRoutes.post("/", validate(createCategorySchema), categoryController.create);
categoryRoutes.put("/:id", validate(updateCategorySchema), categoryController.update);
categoryRoutes.delete("/:id", categoryController.remove);
