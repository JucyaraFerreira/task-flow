import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Nome obrigatório").max(40),
  color: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, "Cor deve ser hex (#rrggbb)")
    .default("#6366f1"),
});

export const updateCategorySchema = createCategorySchema.partial();

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
