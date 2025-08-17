export interface TaskItem {
  id: number;
  title: string;
  status: string;
}

const API_URL = "http://localhost:5109/api/tasks";

export async function getTasks(): Promise<TaskItem[]> {
  const response = await fetch(API_URL);
  return response.json();
}

export async function createTask(
  task: Omit<TaskItem, "id">
): Promise<TaskItem> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return response.json();
}

export async function updateTask(task: TaskItem): Promise<void> {
  await fetch(`${API_URL}/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
