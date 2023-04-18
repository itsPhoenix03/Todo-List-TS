export type Task = {
  _id: Date;
  taskTitle: string;
  taskNote?: string;
  isCompleted: boolean;
};

export function saveTasks(tasks: Task[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
