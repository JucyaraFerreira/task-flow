import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ListTodo, FolderOpen } from "lucide-react";
import { useTasks } from "@/features/tasks/use-tasks";
import { useCategories } from "@/features/categories/use-categories";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

function StatCard({ icon: Icon, label, value }: { icon: typeof ListTodo; label: string; value: number }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export function DashboardPage() {
  const { data: tasks } = useTasks({});
  const { data: categories } = useCategories();

  const total = tasks?.length ?? 0;
  const done = tasks?.filter((t) => t.completed).length ?? 0;
  const open = total - done;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Visão geral das suas tarefas</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ListTodo} label="Total" value={total} />
        <StatCard icon={Circle} label="Pendentes" value={open} />
        <StatCard icon={CheckCircle2} label="Concluídas" value={done} />
        <StatCard icon={FolderOpen} label="Categorias" value={categories?.length ?? 0} />
      </div>

      <Card>
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <p className="font-medium">Pronto para produzir?</p>
            <p className="text-sm text-muted-foreground">Veja e gerencie todas as suas tarefas.</p>
          </div>
          <Link to="/tasks" className={buttonVariants()}>Ir para tarefas</Link>
        </CardContent>
      </Card>
    </div>
  );
}
