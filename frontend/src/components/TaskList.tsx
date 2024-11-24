import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import { AddTaskForm } from "./AddTaskForm";
import { CreateTask, Task } from "../types/Task";
import {
  createTask,
  deleteTask,
  fetchAllTasks,
  toggleTaskCompletion
} from "../api/TaskAPI";
import { TaskItem } from "./TaskItem";
import { CreateSubtask, Subtask } from "../types/SubTask";
import {
  createSubTask,
  deleteSubTask,
  toggleSubTaskCompletion,
} from "../api/SubTaskAPI";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async (): Promise<Task[]> => {
    const tasks = await fetchAllTasks().then((response) => response.content);

    //filter to only display parent tasks and not subtask (since current api fetches all tasks including subtasks)
    const filteredTasks = tasks.filter(
      (task: Task) =>
        !tasks.some((t: Task) =>
          t.subtasks?.some((subtask: Subtask) => subtask.id === task.id)
        )
    );

    //tasks.some() checks if at least one of the task meets a condition (ie. task.id === subtask.id)
    //t.subtask?.some() checks if at least one of the subtask meets a condition
    // !tasks.some(...) returns all the parent tasks (ie. task.id !== subtask.id)

    setTasks(filteredTasks);
    return filteredTasks;
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (task: CreateTask) => {
    createTask(task).then((response) => {
      message.success("Task added!");
      fetchTasks();
    });
  };

  // Implemented delete task by ID functionality
  const handleDeleteTask = async (taskId: string) => {
    deleteTask(taskId)
      .then((response) => {
        message.success("Task deleted successfully");
        fetchTasks();
      })
      .catch((error) => {
        message.error("Failed to delete task");
      });
  };

  const handleToggleTaskCompletion = async (taskId: string) => {
    try {
      const updatedTask = await toggleTaskCompletion(taskId);
      message.success("Toggled task completion");

      if (updatedTask.subtasks && updatedTask.subtasks.length > 0) {
        const subtasksToToggle = updatedTask.subtasks.filter(
          //  filter the subtasks to find only those that need to be toggled
          // only toggle subtask if their complete status dont match the parent
          (subtask: Subtask) => subtask.completed !== updatedTask.completed
        );

        // only proceed to toggling if there are subtasks to toggle
        if (subtasksToToggle.length > 0) {
          await Promise.all(
            // to toggle all subtasks concurrently
            subtasksToToggle.map((subtask: Subtask) =>
              toggleSubTaskCompletion(taskId, subtask.id)
            )
          );
          message.success(`Toggled ${subtasksToToggle.length} subtask(s)`);
        }
      }

      await fetchTasks();
    } catch (error) {
      message.error("Failed to toggle task or subtasks completion");
    }
  };

  const handleAddSubTask = (taskId: string, subTaskTitle: string) => {
    const newSubTask: CreateSubtask = {
      name: subTaskTitle,
    };
    createSubTask(taskId, newSubTask)
      .then((response) => {
        message.success("Subtask added!");
        fetchTasks();
      })
      .catch((error) => {
        message.error("Failed to delete task");
      });
  };

  const handleDeleteSubTask = (taskId: string, subtaskId: string) => {
    deleteSubTask(taskId, subtaskId)
      .then((response) => {
        message.success("Subtask deleted successfully");
        fetchTasks();
      })
      .catch((error) => {
        message.error("Failed to delete subtask");
      });
  };

  const handleToggleSubTaskCompletion = (
    taskId: string,
    subtaskId: string
  ) => {
    toggleSubTaskCompletion(taskId, subtaskId)
      .then((response) => {
        message.success("Toggling subtask completion");
        fetchTasks().then((tasks) => {
          const task = tasks.find((t) => t.id === taskId);
          if (task && task.subtasks) {
            const allSubtasksCompleted = task.subtasks.every(
              (subtask: Subtask) => subtask.completed
            );
            if (allSubtasksCompleted && !task.completed) {
              toggleTaskCompletion(taskId).then((response) => {
                message.success("Toggling task completion");
                fetchTasks();
              });
            }
          }
        });
      })
      .catch((error) => {
        message.error("Failed to toggle subtask completion");
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <AddTaskForm onFormSubmit={addTask} buttonLabel="Add Task" />
      <List
        locale={{ emptyText: "No tasks" }}
        dataSource={tasks}
        renderItem={(task) => (
          <List.Item key={task.id}>
            <TaskItem
              task={task}
              onDeleteTask={handleDeleteTask} //Pass delete handler
              onToggleComplete={handleToggleTaskCompletion} // Pass toggle completion handler
              onAddSubTask={handleAddSubTask}
              onDeleteSubTask={handleDeleteSubTask}
              onToggleSubTaskCompletion={handleToggleSubTaskCompletion}
            />
          </List.Item>
        )}
        style={{ marginTop: "20px" }}
      />
    </div>
  );
};

export default TaskList;