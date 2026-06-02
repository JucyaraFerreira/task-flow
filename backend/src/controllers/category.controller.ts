import type { Request, Response } from "express";
import { categoryService } from "../services/category.service.js";
import { asyncHandler } from "../utils/async-handler.js";

export const categoryController = {
  list: asyncHandler(async (req: Request, res: Response) => {
    res.json(await categoryService.list(req.userId!));
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(await categoryService.create(req.userId!, req.body));
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    res.json(await categoryService.update(req.userId!, req.params["id"] as string, req.body));
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await categoryService.remove(req.userId!, req.params["id"] as string);
    res.status(204).send();
  }),
};
