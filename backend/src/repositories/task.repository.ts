import { prisma } from "../config/prisma.js";
import type { Prisma } from "@prisma/client";

export const taskRepository = {
  listByUser: (userId: string, filters: { completed?: boolean; categoryId?: string }) => {
    const where: Prisma.TaskWhereInput = { userId };
    if (filters.completed !== undefined) where.completed = filters.completed;
    if (filters.categoryId) where.categoryId = filters.categoryId;
    return prisma.task.findMany({
      where,
      orderBy: [{ completed: "asc" }, { createdAt: "desc" }],
      include: { category: true },
    });
  },

  findById: (id: string, userId: string) =>
    prisma.task.findFirst({ where: { id, userId }, include: { category: true } }),

  create: (data: {
    title: string;
    description?: string | null;
    userId: string;
    categoryId?: string | null;
  }) => prisma.task.create({ data, include: { category: true } }),

  update: (
    id: string,
    data: { title?: string; description?: string | null; categoryId?: string | null; completed?: boolean },
  ) => prisma.task.update({ where: { id }, data, include: { category: true } }),

  remove: (id: string) => prisma.task.delete({ where: { id } }),
};
