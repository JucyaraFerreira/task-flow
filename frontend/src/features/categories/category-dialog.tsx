import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check } from "lucide-react";
import type { Category } from "./category.api";
import { useCreateCategory, useUpdateCategory } from "./use-categories";
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
import { cn } from "@/lib/utils";

const DEFAULT_COLOR = "#6366f1";
const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
];

const schema = z.object({ name: z.string().min(1, "Nome obrigatório").max(40) });
type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSaved?: (category: Category) => void;
}

export function CategoryDialog({ open, onOpenChange, category, onSaved }: Props) {
  const create = useCreateCategory();
  const update = useUpdateCategory();
  const isEdit = !!category;
  const [color, setColor] = useState<string>(DEFAULT_COLOR);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: category?.name ?? "" });
      setColor(category?.color ?? DEFAULT_COLOR);
    }
  }, [open, category, form]);

  async function onSubmit(data: FormData) {
    const saved =
      isEdit && category
        ? await update.mutateAsync({ id: category.id, data: { name: data.name, color } })
        : await create.mutateAsync({ name: data.name, color });
    onSaved?.(saved);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Editar categoria" : "Nova categoria"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Atualize o nome e a cor da categoria."
              : "Crie uma categoria para organizar suas tarefas."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category-name">Nome</Label>
            <Input id="category-name" {...form.register("name")} />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background transition",
                    color === c ? "ring-ring" : "ring-transparent",
                  )}
                  style={{ background: c }}
                  aria-label={`Cor ${c}`}
                >
                  {color === c && <Check className="size-4 text-white" />}
                </button>
              ))}
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
  );
}
