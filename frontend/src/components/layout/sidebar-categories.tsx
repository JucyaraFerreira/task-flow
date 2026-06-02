import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/features/categories/category.api";
import { useCategories, useDeleteCategory } from "@/features/categories/use-categories";
import { CategoryDialog } from "@/features/categories/category-dialog";
import { Button } from "@/components/ui/button";

export function SidebarCategories() {
  const { data: categories, isLoading } = useCategories();
  const remove = useDeleteCategory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }
  function openEdit(category: Category) {
    setEditing(category);
    setDialogOpen(true);
  }

  return (
    <div className="mt-8 flex min-h-0 flex-col">
      <div className="mb-2 flex items-center justify-between px-3">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Categorias
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-6"
          onClick={openCreate}
          aria-label="Nova categoria"
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-0.5 overflow-y-auto">
        {isLoading ? (
          <p className="px-3 py-1 text-sm text-muted-foreground">Carregando…</p>
        ) : categories && categories.length > 0 ? (
          categories.map((c) => (
            <div
              key={c.id}
              className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm hover:bg-accent"
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: c.color }}
              />
              <span className="min-w-0 flex-1 truncate">{c.name}</span>
              <span className="text-xs text-muted-foreground group-hover:hidden">
                {c._count?.tasks ?? 0}
              </span>
              <div className="hidden group-hover:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6"
                  onClick={() => openEdit(c)}
                  aria-label={`Editar ${c.name}`}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 text-destructive hover:text-destructive"
                  onClick={() => remove.mutate(c.id)}
                  aria-label={`Excluir ${c.name}`}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="px-3 py-1 text-sm text-muted-foreground">Nenhuma categoria ainda</p>
        )}
      </div>

      <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editing} />
    </div>
  );
}
