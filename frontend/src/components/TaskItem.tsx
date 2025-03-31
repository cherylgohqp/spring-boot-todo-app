import React, { useState } from "react";
import { Checkbox, Form, Input, Row, Col } from "antd";
import { DeleteTwoTone, BranchesOutlined } from "@ant-design/icons";
import { Task } from "../types/Task";
import styles from "../styles/TaskItem.module.css";
import { SubTaskItem } from "./SubTaskItem";
import { ConfigProvider } from 'antd';

export type TaskItemProps = {
  task: Task;
  onDeleteTask: (taskId: string) => void; //to delete a task by id
  onToggleComplete: (taskId: string) => void; //to toggle the completion status of a task
  onAddSubTask: (taskId: string, subTaskTitle: string) => void; //add a subtask
  onDeleteSubTask: (taskId: string, subTaskId: string) => void; //delete a subtask
  onToggleSubTaskCompletion: (taskId: string, subTaskId: string) => void; //toggle the completion status of a subtask
};

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onDeleteTask,
  onToggleComplete,
  onAddSubTask,
  onDeleteSubTask,
  onToggleSubTaskCompletion,
}) => {
  const [form] = Form.useForm();
  const [isOpenSubtasks, setIsOpenSubtasks] = useState<boolean>(false);

  return (
    <div style={{ width: "100%" }}>
      <div
        data-testid={`task-item-${task.id}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)} // Call onToggleComplete when checkbox is toggled to update the complete status of the task
        >
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.name}
          </span>
        </Checkbox>

        <div
          data-testid={`add-subtask-${task.id}`}
          className={`${styles["add-subtask-button"]}`}
          onClick={(e) => {
            // prevent propagation to parent element
            e.stopPropagation();
            setIsOpenSubtasks(!isOpenSubtasks);
          }}
        >
          {task.subtasks && task.subtasks.length > 0 && (
            <span className={styles["subtask-count"]}>
              {task.subtasks.length}
            </span>
          )}
          <BranchesOutlined rotate={isOpenSubtasks ? 180 : 90} />
        </div>

        {/* Added delete icon for Task 2 */}
        <div
          data-testid={`delete-task-${task.id}`}
          className={styles["delete-button"]}
          onClick={() => onDeleteTask(task.id)}
        >
          <DeleteTwoTone />
        </div>
      </div>

      {
        //Implemented the Subtasks functions below
      }

      {isOpenSubtasks &&
        task.subtasks &&
        task.subtasks.length > 0 &&
        task.subtasks.map((subtask) => (
          <SubTaskItem
            key={subtask.id}
            subtask={subtask}
            onDeleteSubTask={() => onDeleteSubTask(task.id, subtask.id)}
            onToggleSubTaskCompletion={() =>
              onToggleSubTaskCompletion(task.id, subtask.id)
            }
          />
        ))}

      {isOpenSubtasks && (
        <div className={styles["subtasks-container"]}>
          <div>
            <div className={styles["divider"]}></div>
            <div className={styles["divider-horizontal"]}></div>
            <div className={styles["divider"]}></div>
          </div>
          <Form
            className={styles["add-subtask-form"]}
            form={form}
            layout="horizontal"
            onFinish={(values) => {
              onAddSubTask(task.id, values.subtaskName);
              form.resetFields();
            }}
          >
            <Form.Item
              name={"subtaskName"}
              className={styles["add-subtask-input"]}
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                className={styles["add-subtask-input"]}
                placeholder="Add Subtask..."
              />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};
