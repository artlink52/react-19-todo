export type User = {
  id: string;
  email: string;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers() {
  await sleep(1000);
  return fetch("http://localhost:3001/users").then(
    (res) => res.json() as Promise<User[]>
  );
}

export function createUser(user: User) {
  return fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
}

export function deleteUser(id: string) {
  return fetch(`http://localhost:3001/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

export type Task = {
  id: string;
  userId: string;
  title: string;
  done: boolean;
  createdAt: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  page: number;
  pages: number;
  prev: number | null;
};

export function fetchTasks({
  page = 1,
  per_page = 10,
  sort = { createdAt: "asc" },
  filters,
}: {
  page?: number;
  per_page?: number;
  filters?: {
    userId?: string;
    title?: string;
  };
  sort?: { createdAt: "asc" | "desc" };
}) {
  return fetch(
    `http://localhost:3001/tasks?_page=${page}&_per_page=${per_page}&_sort=${
      sort.createdAt === "asc" ? "createdAt" : "-createdAt"
    }&_userId=${filters?.userId}&_title=${filters?.title}`
  )
    .then((res) => res.json() as Promise<PaginatedResponse<Task>>)
    .then((r) => ({ ...r, page }));
}

export function createTask(task: Task) {
  return fetch("http://localhost:3001/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  }).then((res) => res.json());
}

export function deleteTask(id: string) {
  return fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
