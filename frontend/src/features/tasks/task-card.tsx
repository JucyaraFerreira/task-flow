import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "./task.api";
import { useToggleTask, useDeleteTask } from "./use-tasks";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TaskCard({ task, onEdit }: { task: Task; onEdit: (t: Task) => void }) {
  const toggle = useToggleTask();
  const remove = useDeleteTask();

  return (
    <Card className="flex items-start gap-3 p-4 transition-shadow hover:shadow-md">
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggle.mutate(task.id)}
        className="mt-1"
        aria-label="Concluir tarefa"
      />
      <div className="min-w-0 flex-1">
        <p className={cn("font-medium leading-tight", task.completed && "text-muted-foreground line-through")}>
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{task.description}</p>
        )}
        {task.category && (
          <Badge
            variant="secondary"
            className="mt-2 gap-1.5"
            style={{ borderColor: task.category.color }}
          >
            <span className="size-2 rounded-full" style={{ background: task.category.color }} />
            {task.category.name}
          </Badge>
        )}
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" className="size-8" onClick={() => onEdit(task)} aria-label="Editar">
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-destructive hover:text-destructive"
          onClick={() => remove.mutate(task.id)}
          aria-label="Excluir"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
