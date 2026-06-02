import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { categoryApi } from "./category.api";
import { apiErrorMessage } from "@/lib/api";

export function useCategories() {
  return useQuery({ queryKey: ["categories"], queryFn: categoryApi.list });
}

export function useCreateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Categoria criada");
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });
}

export function useUpdateCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name?: string; color?: string } }) =>
      categoryApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Categoria atualizada");
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["categories"] });
      qc.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Categoria removida");
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });
}
