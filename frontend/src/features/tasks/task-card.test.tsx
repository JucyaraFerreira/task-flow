import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TaskCard } from "./task-card";
import type { Task } from "./task.api";

vi.mock("./use-tasks", () => ({
  useToggleTask: () => ({ mutate: vi.fn() }),
  useDeleteTask: () => ({ mutate: vi.fn() }),
}));

const task: Task = {
  id: "1",
  title: "Estudar React",
  description: "Hooks e context",
  completed: false,
  categoryId: null,
  category: { id: "c1", name: "Estudos", color: "#6366f1" },
  createdAt: "",
  updatedAt: "",
};

function renderCard() {
  const qc = new QueryClient();
  return render(
    <QueryClientProvider client={qc}>
      <TaskCard task={task} onEdit={() => {}} />
    </QueryClientProvider>,
  );
}

describe("TaskCard", () => {
  it("renders title, description and category", () => {
    renderCard();
    expect(screen.getByText("Estudar React")).toBeInTheDocument();
    expect(screen.getByText("Hooks e context")).toBeInTheDocument();
    expect(screen.getByText("Estudos")).toBeInTheDocument();
  });
});
