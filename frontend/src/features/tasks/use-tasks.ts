import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { taskApi, type TaskFilters } from "./task.api";
import { apiErrorMessage } from "@/lib/api";

export function useTasks(filters: TaskFilters) {
  return useQuery({
    queryKey: ["tasks", filters],
    queryFn: () => taskApi.list(filters),
  });
}

function useTaskMutation<TArgs>(
  fn: (args: TArgs) => Promise<unknown>,
  successMsg?: string,
) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
      qc.invalidateQueries({ queryKey: ["categories"] });
      if (successMsg) toast.success(successMsg);
    },
    onError: (e) => toast.error(apiErrorMessage(e)),
  });
}

export const useCreateTask = () =>
  useTaskMutation(taskApi.create, "Tarefa criada");

export const useUpdateTask = () =>
  useTaskMutation(
    (args: { id: string; data: Parameters<typeof taskApi.update>[1] }) =>
      taskApi.update(args.id, args.data),
    "Tarefa atualizada",
  );

export const useToggleTask = () => useTaskMutation((id: string) => taskApi.toggle(id));

export const useDeleteTask = () =>
  useTaskMutation((id: string) => taskApi.remove(id), "Tarefa removida");
