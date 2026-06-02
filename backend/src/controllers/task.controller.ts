import type { Request, Response } from "express";
import { taskService } from "../services/task.service.js";
import { asyncHandler } from "../utils/async-handler.js";

const parseFilters = (req: Request) => ({
  completed:
    req.query.completed === undefined ? undefined : req.query.completed === "true",
  categoryId: typeof req.query.categoryId === "string" ? req.query.categoryId : undefined,
});

export const taskController = {
  list: asyncHandler(async (req, res) => {
    res.json(await taskService.list(req.userId!, parseFilters(req)));
  }),

  get: asyncHandler(async (req: Request, res: Response) => {
    res.json(await taskService.get(req.userId!, req.params["id"] as string));
  }),

  create: asyncHandler(async (req: Request, res: Response) => {
    res.status(201).json(await taskService.create(req.userId!, req.body));
  }),

  update: asyncHandler(async (req: Request, res: Response) => {
    res.json(await taskService.update(req.userId!, req.params["id"] as string, req.body));
  }),

  toggle: asyncHandler(async (req: Request, res: Response) => {
    res.json(await taskService.toggleComplete(req.userId!, req.params["id"] as string));
  }),

  remove: asyncHandler(async (req: Request, res: Response) => {
    await taskService.remove(req.userId!, req.params["id"] as string);
    res.status(204).send();
  }),
};
