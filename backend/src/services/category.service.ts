import { categoryRepository } from "../repositories/category.repository.js";
import { conflict, notFound } from "../utils/http-error.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../validations/category.validation.js";

export const categoryService = {
  list: (userId: string) => categoryRepository.listByUser(userId),

  async create(userId: string, input: CreateCategoryInput) {
    try {
      return await categoryRepository.create({ ...input, userId });
    } catch (e: unknown) {
      if (typeof e === "object" && e && "code" in e && (e as { code: string }).code === "P2002") {
        throw conflict("Já existe uma categoria com esse nome");
      }
      throw e;
    }
  },

  async update(userId: string, id: string, input: UpdateCategoryInput) {
    const existing = await categoryRepository.findById(id, userId);
    if (!existing) throw notFound("Categoria não encontrada");
    return categoryRepository.update(id, input);
  },

  async remove(userId: string, id: string) {
    const existing = await categoryRepository.findById(id, userId);
    if (!existing) throw notFound("Categoria não encontrada");
    await categoryRepository.remove(id);
  },
};
