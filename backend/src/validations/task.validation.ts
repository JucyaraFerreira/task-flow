import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Título obrigatório").max(120),
  description: z.string().max(2000).optional().nullable(),
  categoryId: z.string().uuid("Categoria inválida").optional().nullable(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(120).optional(),
  description: z.string().max(2000).optional().nullable(),
  categoryId: z.string().uuid().optional().nullable(),
  completed: z.boolean().optional(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
