import { Subtask } from "./SubTask";

export type Task = {
  id: string;
  details?: string;
  completed: boolean;
  createdDate?: string;
  updatedDate?: string;
  subtasks?: Subtask[];
} & CreateTask;
export type CreateTask = {
  name: string;
};
