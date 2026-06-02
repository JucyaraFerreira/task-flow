import { Outlet } from "react-router-dom";
import { LogOut } from "lucide-react";
import { AppSidebar } from "./app-sidebar";
import { ThemeToggle } from "./theme-toggle";
import { useAuth } from "@/features/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppShell() {
  const { user, logout } = useAuth();
  const initials = user?.name?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="text-sm text-muted-foreground">
            Olá, <span className="font-medium text-foreground">{user?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">{initials}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Sair">
              <LogOut className="size-5" />
            </Button>
          </div>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
