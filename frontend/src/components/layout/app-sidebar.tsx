import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarCategories } from "./sidebar-categories";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/tasks", label: "Tarefas", icon: ListTodo, end: false },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 overflow-y-auto border-r bg-card/50 p-4 md:flex md:flex-col">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <CheckCircle2 className="size-5" />
        </div>
        <span className="text-lg font-semibold tracking-tight">TaskFlow</span>
      </div>
      <nav className="flex flex-col gap-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <SidebarCategories />
    </aside>
  );
}
