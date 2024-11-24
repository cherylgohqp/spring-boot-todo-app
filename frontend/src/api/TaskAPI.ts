import { CreateTask } from "../types/Task";
import { Get, Post, Delete, Put } from "./API";

const fetchAllTasks = async () => {
  const response = await Get("/tasks/", {});
  console.log(response);
  return response;
};

const createTask = async (task: CreateTask) => {
  const response = await Post("/tasks/task", task);
  return response;
};

//Integrate api call for delete task by id
const deleteTask = async (taskId: string) => {
  const response = await Delete(`/tasks/task/${taskId}`, {});
  return response;
};

//Integrate api call for toggle task completion
const toggleTaskCompletion = async (taskId: string) => {
  const response = await Put(`/tasks/task/${taskId}`, {});
  return response;
};

//Integrate api call for update task
const updateTask = async (taskId: string, task: CreateTask) => {
  const response = await Post(`/tasks/task/${taskId}`, task);
  return response;
};

//Integrate api call for get task by id
const getTask = async (taskId: string) => {
  const response = await Get(`/tasks/task/${taskId}`, {});
  return response;
};

export {
  fetchAllTasks,
  createTask,
  deleteTask,
  toggleTaskCompletion,
  updateTask,
  getTask,
};
