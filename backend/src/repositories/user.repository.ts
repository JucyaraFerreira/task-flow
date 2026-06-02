import { prisma } from "../config/prisma.js";

export const userRepository = {
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  findById: (id: string) =>
    prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    }),

  create: (data: { name: string; email: string; password: string }) =>
    prisma.user.create({
      data,
      select: { id: true, name: true, email: true, createdAt: true },
    }),
};
