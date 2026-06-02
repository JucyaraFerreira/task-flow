import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { tokenStorage } from "@/lib/api";
import { authApi, type AuthUser } from "./auth.api";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const USER_KEY = "todo.user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  });

  function persist(token: string, u: AuthUser) {
    tokenStorage.set(token);
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      login: async (email, password) => {
        const res = await authApi.login({ email, password });
        persist(res.token, res.user);
      },
      register: async (name, email, password) => {
        const res = await authApi.register({ name, email, password });
        persist(res.token, res.user);
      },
      logout: () => {
        tokenStorage.clear();
        setUser(null);
        localStorage.removeItem(USER_KEY);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
