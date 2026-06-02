import { api } from "@/lib/api";
import type { Category } from "@/features/categories/category.api";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  categoryId: string | null;
  category: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFilters {
  completed?: boolean;
  categoryId?: string;
}

export const taskApi = {
  list: (filters: TaskFilters = {}) =>
    api
      .get<Task[]>("/tasks", {
        params: {
          completed: filters.completed,
          categoryId: filters.categoryId,
        },
      })
      .then((r) => r.data),

  create: (data: { title: string; description?: string | null; categoryId?: string | null }) =>
    api.post<Task>("/tasks", data).then((r) => r.data),

  update: (
    id: string,
    data: { title?: string; description?: string | null; categoryId?: string | null },
  ) => api.put<Task>(`/tasks/${id}`, data).then((r) => r.data),

  toggle: (id: string) => api.patch<Task>(`/tasks/${id}/complete`).then((r) => r.data),

  remove: (id: string) => api.delete(`/tasks/${id}`).then(() => undefined),
};
