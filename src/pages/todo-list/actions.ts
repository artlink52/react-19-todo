import { createTask, deleteTask, Task } from "../../shared/api";

type CreateActionState = {
  error?: string;
  title: string;
};

export type CreateTaskAction = (
  state: CreateActionState,
  formData: FormData
) => Promise<CreateActionState>;

export function createTaskAction({
  refetchTasks,
  userId,
}: {
  userId: string;
  refetchTasks: () => void;
}): CreateTaskAction {
  return async (_, formData) => {
    const title = formData.get("title") as string;

    try {
      const task: Task = {
        done: false,
        createdAt: Date.now(),
        title,
        userId,
        id: crypto.randomUUID(),
      };
      await createTask(task);
      refetchTasks();

      return { title: "" };
    } catch (e) {
      return {
        title,
        error: "Error while creating user",
      };
    }
  };
}

type DeleteTaskActionState = {
  error?: string;
};

export type DeleteTaskAction = (
  state: DeleteTaskActionState,
  formData: FormData
) => Promise<DeleteTaskActionState>;

export function deleteTaskAction({
  refetchTasks,
}: {
  refetchTasks: () => void;
}): DeleteTaskAction {
  return async (_, formData) => {
    const id = formData.get("id") as string;
    try {
      await deleteTask(id);
      refetchTasks();

      return {};
    } catch (e) {
      return {
        error: "Error while deleting user",
      };
    }
  };
}
