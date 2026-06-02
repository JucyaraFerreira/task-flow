import type { TaskFilters } from "./task.api";
import { useCategories } from "@/features/categories/use-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL = "__all__";

interface Props {
  filters: TaskFilters;
  onChange: (f: TaskFilters) => void;
}

export function TaskFiltersBar({ filters, onChange }: Props) {
  const { data: categories } = useCategories();

  const statusValue =
    filters.completed === undefined ? ALL : filters.completed ? "done" : "open";

  return (
    <div className="flex flex-wrap gap-3">
      <Select
        items={{ [ALL]: "Todas", open: "Pendentes", done: "Concluídas" }}
        value={statusValue}
        onValueChange={(v) =>
          onChange({ ...filters, completed: v == null || v === ALL ? undefined : v === "done" })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Todas</SelectItem>
          <SelectItem value="open">Pendentes</SelectItem>
          <SelectItem value="done">Concluídas</SelectItem>
        </SelectContent>
      </Select>

      <Select
        items={{
          [ALL]: "Todas as categorias",
          ...Object.fromEntries((categories ?? []).map((c) => [c.id, c.name])),
        }}
        value={filters.categoryId ?? ALL}
        onValueChange={(v) =>
          onChange({ ...filters, categoryId: v === ALL || v == null ? undefined : v })
        }
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>Todas as categorias</SelectItem>
          {categories?.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
