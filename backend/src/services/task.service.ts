import { taskRepository } from "../repositories/task.repository.js";
import { notFound } from "../utils/http-error.js";
import type { CreateTaskInput, UpdateTaskInput } from "../validations/task.validation.js";

export const taskService = {
  list: (userId: string, filters: { completed?: boolean; categoryId?: string }) =>
    taskRepository.listByUser(userId, filters),

  async get(userId: string, id: string) {
    const task = await taskRepository.findById(id, userId);
    if (!task) throw notFound("Tarefa não encontrada");
    return task;
  },

  create: (userId: string, input: CreateTaskInput) =>
    taskRepository.create({
      title: input.title,
      description: input.description ?? null,
      categoryId: input.categoryId ?? null,
      userId,
    }),

  async update(userId: string, id: string, input: UpdateTaskInput) {
    await this.get(userId, id); // ownership guard
    return taskRepository.update(id, input);
  },

  async toggleComplete(userId: string, id: string) {
    const task = await this.get(userId, id);
    return taskRepository.update(id, { completed: !task.completed });
  },

  async remove(userId: string, id: string) {
    await this.get(userId, id);
    await taskRepository.remove(id);
  },
};
