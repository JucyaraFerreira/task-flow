import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [dark, setDark] = useState(
    () => localStorage.getItem("todo.theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("todo.theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Button variant="ghost" size="icon" onClick={() => setDark((d) => !d)} aria-label="Alternar tema">
      {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
    </Button>
  );
}
