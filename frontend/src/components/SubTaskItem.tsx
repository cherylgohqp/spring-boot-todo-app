import React from "react";
import { Checkbox } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import styles from "../styles/SubTaskItem.module.css";
import { Subtask } from "../types/SubTask";

export type SubTaskItemProps = {
  subtask: Subtask;
  onDeleteSubTask: () => void;
  onToggleSubTaskCompletion: () => void;
}

export const SubTaskItem: React.FC<SubTaskItemProps> = ({
  subtask,
  onDeleteSubTask,
  onToggleSubTaskCompletion,
}) => {
  return (
    <div className={styles["subtask-item-container"]}>
      <div className={styles["divider-container"]}>
        <div
          className={`${styles["divider"]} ${subtask.completed ? `${styles["completed-divider"]}` : ""}`}
        ></div>
        <div
          className={`${styles["divider-horizontal"]} ${subtask.completed ? `${styles["completed-divider-horizontal"]}` : ""}`}
        ></div>
        <div
          className={`${styles["divider"]} ${subtask.completed ? `${styles["completed-divider"]}` : ""}`}
        ></div>
      </div>
      <div className={styles["subtask-info-wrapper"]}>
        <Checkbox
          checked={subtask.completed}
          onChange={onToggleSubTaskCompletion} // Call onToggleComplete when checkbox is toggled to update the complete status of the task
        >
          <span
            style={{
              textDecoration: subtask.completed ? "line-through" : "none",
            }}
          >
            {subtask.name}
          </span>
        </Checkbox>

        <div
          data-testid={`delete-subtask-${subtask.id}`}
          className={styles["delete-button"]}
          onClick={onDeleteSubTask}
        >
          <DeleteTwoTone />
        </div>
      </div>
    </div>
  );
};
