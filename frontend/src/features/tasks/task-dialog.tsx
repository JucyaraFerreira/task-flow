import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus } from "lucide-react";
import type { Task } from "./task.api";
import { useCreateTask, useUpdateTask } from "./use-tasks";
import { useCategories } from "@/features/categories/use-categories";
import { CategoryDialog } from "@/features/categories/category-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  title: z.string().min(1, "Título obrigatório"),
  description: z.string().optional(),
  categoryId: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

const NONE = "__none__";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

export function TaskDialog({ open, onOpenChange, task }: Props) {
  const { data: categories } = useCategories();
  const create = useCreateTask();
  const update = useUpdateTask();
  const isEdit = !!task;
  const [catDialogOpen, setCatDialogOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "", categoryId: NONE },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        title: task?.title ?? "",
        description: task?.description ?? "",
        categoryId: task?.categoryId ?? NONE,
      });
    }
  }, [open, task, form]);

  async function onSubmit(data: FormData) {
    const payload = {
      title: data.title,
      description: data.description || null,
      categoryId: data.categoryId === NONE ? null : data.categoryId,
    };
    if (isEdit && task) {
      await update.mutateAsync({ id: task.id, data: payload });
    } else {
      await create.mutateAsync(payload);
    }
    onOpenChange(false);
  }

  return (
    <>
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Atualize os detalhes da tarefa." : "Adicione uma nova tarefa à sua lista."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...form.register("title")} />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" rows={3} {...form.register("description")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category-trigger">Categoria</Label>
            <div className="flex gap-2">
              <Select
                items={{
                  [NONE]: "Sem categoria",
                  ...Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
                }}
                value={form.watch("categoryId") ?? undefined}
                onValueChange={(v) => form.setValue("categoryId", v ?? undefined)}
              >
                <SelectTrigger id="category-trigger" className="w-full flex-1">
                  <SelectValue placeholder="Sem categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Sem categoria</SelectItem>
                  {categories?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setCatDialogOpen(true)}
                aria-label="Nova categoria"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {isEdit ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

      <CategoryDialog
        open={catDialogOpen}
        onOpenChange={setCatDialogOpen}
        onSaved={(c) => form.setValue("categoryId", c.id)}
      />
    </>
  );
}
