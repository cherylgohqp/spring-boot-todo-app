import { PropsWithChildren, useEffect, useState } from "react";

import { StoryFn } from "@storybook/react";
import { TaskItem, TaskItemProps } from "./TaskItem";

export default {
  title: "Components/TaskItem",
  component: TaskItem,
};

export const Default = () => (
  <TaskItem
    task={{
      id: "1",
      name: "Task",
      completed: false,
      subtasks: [{ id: "1", name: "SubTask", completed: false }],
    }}
    onDeleteSubTask={() => {}}
    onToggleSubTaskCompletion={() => {}}
    onDeleteTask={() => {}}
    onToggleComplete={() => {}}
    onAddSubTask={() => {}}
  />
);

export const Playground: StoryFn<PropsWithChildren<TaskItemProps>> = (args) => {
  const [task, setTask] = useState(args.task);

  const handleToggleSubTaskCompletion = (subtaskId: string) => {
    const updatedTask = { ...task };
    const updatedSubtasks = updatedTask.subtasks?.map((subtask) => {
      if (subtask.id === subtaskId) {
        return { ...subtask, completed: !subtask.completed };
      }
      return subtask;
    });
    updatedTask.subtasks = updatedSubtasks;
    setTask(updatedTask);
  };

  const handleToggleTaskCompletion = () => {
    // Toggle the completed status and update state
    setTask({ ...task, completed: !task.completed });
  };

  //useeffect to handle changes made to the subtask json in storybook
  useEffect(() => {
    setTask(args.task);
  }, [args.task]);

  return (
    <TaskItem
      task={task}
      onDeleteSubTask={args.onDeleteSubTask}
      onToggleSubTaskCompletion={() => {
        if (task.subtasks) {
          handleToggleSubTaskCompletion(task.subtasks[0].id);
        }
      }}
      onDeleteTask={args.onDeleteTask}
      onToggleComplete={handleToggleTaskCompletion}
      onAddSubTask={args.onAddSubTask}
    />
  );
};

Playground.args = {
  task: {
    id: "1",
    name: "Task",
    completed: false,
    subtasks: [{ id: "1", name: "SubTask", completed: false }],
  },
  onDeleteSubTask: () => {},
  onToggleSubTaskCompletion: () => {},
  onDeleteTask: () => {},
  onToggleComplete: () => {},
  onAddSubTask: () => {},
};

Playground.argTypes = {
  task: {
    control: { type: "object" },
  },
  onDeleteSubTask: {
    table: { disable: true },
  },
  onToggleSubTaskCompletion: {
    table: { disable: true },
  },
  onDeleteTask: {
    table: { disable: true },
  },
  onToggleComplete: {
    table: { disable: true },
  },
  onAddSubTask: {
    table: { disable: true },
  },
};
