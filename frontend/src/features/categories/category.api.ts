import { api } from "@/lib/api";

export interface Category {
  id: string;
  name: string;
  color: string;
  _count?: { tasks: number };
}

export const categoryApi = {
  list: () => api.get<Category[]>("/categories").then((r) => r.data),
  create: (data: { name: string; color: string }) =>
    api.post<Category>("/categories", data).then((r) => r.data),
  update: (id: string, data: { name?: string; color?: string }) =>
    api.put<Category>(`/categories/${id}`, data).then((r) => r.data),
  remove: (id: string) => api.delete(`/categories/${id}`).then(() => undefined),
};
