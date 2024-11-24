import React, { PropsWithChildren, useEffect, useState } from "react";

import { StoryFn } from "@storybook/react";

import { SubTaskItem, SubTaskItemProps } from "./SubTaskItem";

export default {
  title: "Components/SubTaskItem",
  component: SubTaskItem,
};

export const Default = () => (
  <SubTaskItem
    subtask={{ id: "1", name: "SubTask", completed: false }}
    onDeleteSubTask={() => {}}
    onToggleSubTaskCompletion={() => {}}
  />
);

export const Playground: StoryFn<PropsWithChildren<SubTaskItemProps>> = (
  args
) => {
  const [subtask, setSubtask] = useState(args.subtask);

  const handleToggleSubTaskCompletion = () => {
    // Toggle the completed status and update state
    setSubtask({ ...subtask, completed: !subtask.completed });
  };

  //useeffect to handle changes made to the subtask json in storybook
  useEffect(() => {
    setSubtask(args.subtask);
  }, [args.subtask]);

  return (
    <SubTaskItem
      subtask={subtask}
      onDeleteSubTask={args.onDeleteSubTask}
      onToggleSubTaskCompletion={handleToggleSubTaskCompletion}
    />
  );
};

Playground.args = {
  subtask: { id: "1", name: "SubTask", completed: false },
  onDeleteSubTask: () => {},
  onToggleSubTaskCompletion: () => {},
};

Playground.argTypes = {
  subtask: {
    control: { type: "object" },
  },
  onDeleteSubTask: {
    table: { disable: true },
  },
  onToggleSubTaskCompletion: {
    table: { disable: true },
  },
};
