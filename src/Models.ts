export type Task = {
  _id: string;
  taskTitle: string;
  taskNote?: string;
  isCompleted: boolean;
};

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function saveCompletedTasks(tasks: Task[]): void {
  localStorage.setItem("completedTasks", JSON.stringify(tasks));
}
