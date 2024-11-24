import { Task } from "../types/Task";
import { CreateSubtask } from "../types/SubTask";
import { Get, Post, Delete, Put } from "./API";
import { fetchAllTasks } from "./TaskAPI";

//Integrate api call for fetching all subtasks based on task id
const fetchAllSubTasks = async (taskId: string) => {
  const response = await Get(`/task/{${taskId}}/subtasks`, {});
  return response;
};

//Integrate api call for creating subtask
const createSubTask = async (taskId: string, subtask: CreateSubtask) => {
  const response = await Post(`/task/${taskId}/subtasks`, subtask);
  const createdSubtask = response.data;
  const tasks = await fetchAllTasks().then((response) => response.content);

  // Update the parent task's subtask array
  const taskIndex = tasks.findIndex((task: Task) => task.id === taskId);
  tasks[taskIndex].subtasks.push(createdSubtask);

  return response;
};

//Integrate api call for getting specific subtask based on subtask id
const getSubTask = async (taskId: string, subtaskId: string) => {
  const response = await Get(`/task/${taskId}/subtasks/${subtaskId}`, {});
  return response;
};

//Integrate api call for delete subtask
const deleteSubTask = async (taskId: string, subtaskId: string) => {
  const response = await Delete(`/task/${taskId}/subtasks/${subtaskId}`, {});
  return response;
};

//Integrate api call for toggle subtask completion
const toggleSubTaskCompletion = async (taskId: string, subtaskId: string) => {
  const response = await Put(`/task/${taskId}/subtasks/${subtaskId}`, {});
  return response;
};

export {
  fetchAllSubTasks,
  createSubTask,
  getSubTask,
  deleteSubTask,
  toggleSubTaskCompletion,
};
