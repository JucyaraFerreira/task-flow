import { useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import type { Task, TaskFilters } from "@/features/tasks/task.api";
import { useTasks } from "@/features/tasks/use-tasks";
import { TaskCard } from "@/features/tasks/task-card";
import { TaskDialog } from "@/features/tasks/task-dialog";
import { TaskFiltersBar } from "@/features/tasks/task-filters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);
  const { data: tasks, isLoading } = useTasks(filters);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(task: Task) {
    setEditing(task);
    setDialogOpen(true);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-sm text-muted-foreground">Gerencie tudo que você precisa fazer</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Nova tarefa
        </Button>
      </div>

      <TaskFiltersBar filters={filters} onChange={setFilters} />

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : tasks && tasks.length > 0 ? (
        <div className="space-y-3">
          {tasks.map((t) => (
            <TaskCard key={t.id} task={t} onEdit={openEdit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center">
          <ListTodo className="size-10 text-muted-foreground/50" />
          <p className="mt-3 font-medium">Nenhuma tarefa por aqui</p>
          <p className="text-sm text-muted-foreground">Crie sua primeira tarefa para começar.</p>
        </div>
      )}

      <TaskDialog open={dialogOpen} onOpenChange={setDialogOpen} task={editing} />
    </div>
  );
}
