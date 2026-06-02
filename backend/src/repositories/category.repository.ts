import { prisma } from "../config/prisma.js";

export const categoryRepository = {
  listByUser: (userId: string) =>
    prisma.category.findMany({
      where: { userId },
      orderBy: { name: "asc" },
      include: { _count: { select: { tasks: true } } },
    }),

  findById: (id: string, userId: string) =>
    prisma.category.findFirst({ where: { id, userId } }),

  create: (data: { name: string; color: string; userId: string }) =>
    prisma.category.create({ data }),

  update: (id: string, data: { name?: string; color?: string }) =>
    prisma.category.update({ where: { id }, data }),

  remove: (id: string) => prisma.category.delete({ where: { id } }),
};
