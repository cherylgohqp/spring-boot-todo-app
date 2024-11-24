import { render, screen, fireEvent } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { Task } from "../../types/Task";

// Mock task data
const mockTask: Task = {
  id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
  name: "Test Delete Sub Task",
  completed: false,
  subtasks: [
    {
      id: "d959de87-a7fc-4813-8712-557b4b757ea2",
      name: "test subtask 1",
      details: "test subtask details",
      completed: false,
      createdDate: "2024-09-25T11:58:29.094+00:00",
      updatedDate: "2024-09-25T11:58:29.094+00:00",
    },
  ],
};

const mockOnDelete = jest.fn();
const mockOnToggleComplete = jest.fn();
const mockOnAddSubTask = jest.fn();
const mockOnDeleteSubTask = jest.fn();
const mockOnToggleSubTaskCompletion = jest.fn();

describe("TaskItem Component", () => {
  //To mock matchMedia and fix TypeError: window.matchMedia is not a function (since match media is used by Antd lib for responsive layout)
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("calls onDeleteSubTask with correct subtask id when delete button is clicked", () => {
    // Render the TaskItem component with mock task and mock onDelete function
    render(
      <TaskItem
        task={mockTask}
        onDeleteTask={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );

    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button to open list of subtasks
    fireEvent.click(addSubtaskButton);

    // Get the delete subtask button
    const deleteSubtaskButton =
      mockTask.subtasks &&
      screen.getByTestId(`delete-subtask-${mockTask.subtasks[0].id}`);

    // Simulate a click on the delete button
    if (deleteSubtaskButton) {
      fireEvent.click(deleteSubtaskButton);
    }

    // Assert that the onDeleteSubtask function is called with the correct task ID
    expect(mockOnDeleteSubTask).toHaveBeenCalledWith(
      mockTask.id,
      mockTask.subtasks?.[0].id
    );
  });
});
