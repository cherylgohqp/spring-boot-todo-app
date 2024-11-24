import { render, fireEvent, screen } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { Task } from "../../types/Task";

const mockTask: Task = {
  id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
  name: "Test Toggle Task Completion",
  completed: false,
  subtasks: [
    {
      id: "d959de87-a7fc-4813-8712-557b4b757ea2",
      name: "test toggle subtask 1",
      details: "test subtask details",
      completed: false,
      createdDate: "2024-09-25T11:58:29.094+00:00",
      updatedDate: "2024-09-25T11:58:29.094+00:00",
    },
  ],
};

const mockOnToggleComplete = jest.fn();
const mockOnDelete = jest.fn();
const mockOnAddSubTask = jest.fn();
const mockOnDeleteSubTask = jest.fn();
const mockOnToggleSubTaskCompletion = jest.fn();
const setupTaskItem = () => {
  return render(
    <TaskItem
      task={mockTask}
      onDeleteTask={mockOnDelete}
      onToggleComplete={mockOnToggleComplete}
      onAddSubTask={mockOnAddSubTask}
      onDeleteSubTask={mockOnDeleteSubTask}
      onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
    />
  );
};

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
  it("calls onToggleSubTaskCompletion when checkbox is toggled", () => {
    // Render TaskItem component with mock props
    setupTaskItem();

    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button to open list of subtasks
    fireEvent.click(addSubtaskButton);

    // Get the checkbox input (label is the subtask name, so we query by text)
    const checkbox = screen.getByLabelText("test toggle subtask 1");

    // Simulate checkbox click to toggle completion
    fireEvent.click(checkbox);

    // Assert that onToggleComplete was called with the correct task ID
    expect(mockOnToggleSubTaskCompletion).toHaveBeenCalledWith(
      mockTask.id,
      mockTask.subtasks?.[0].id
    );
  });

  it("renders subtask checkbox with correct completion status", () => {
    const { rerender } = setupTaskItem(); //extract the rerender function from the object returned by render() in setupTaskItem
    // Render component with subtask marked as completed
    const completedTask = {
      ...mockTask,
      subtasks: [
        {
          ...mockTask.subtasks?.[0],
          id: mockTask.subtasks?.[0].id ?? "", // Ensure id is always a string,
          name: mockTask.subtasks?.[0].name ?? "", // Ensure name is always a string,
          completed: true,
        },
      ],
    };

    rerender(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTask={mockOnDelete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );

    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button to open list of subtasks
    fireEvent.click(addSubtaskButton);

    const checkbox = screen.getByLabelText(
      "test toggle subtask 1"
    ) as HTMLInputElement;

    // Assert that checkbox is checked when task is completed
    expect(checkbox.checked).toBe(true);
  });

  it("checks parent task checkbox when all subtasks are completed", () => {
    const { rerender } = setupTaskItem(); //extract the rerender function from the object returned by render() in setupTaskItem
    // Render component with subtask marked as completed

    const checkbox = screen.getByLabelText(
      "Test Toggle Task Completion"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button to open list of subtasks
    fireEvent.click(addSubtaskButton);

    const subtaskCheckbox = screen.getByLabelText(
      "test toggle subtask 1"
    ) as HTMLInputElement;

    fireEvent.click(subtaskCheckbox);

    const completedTask = {
      ...mockTask,
      completed: true,
      subtasks: [
        {
          ...mockTask.subtasks?.[0],
          id: mockTask.subtasks?.[0].id ?? "", // Ensure id is always a string,
          name: mockTask.subtasks?.[0].name ?? "", // Ensure name is always a string,
          completed: true,
        },
      ],
    };

    rerender(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTask={mockOnDelete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );

    // Assert that onToggleComplete was called with the correct task ID
    expect(mockOnToggleSubTaskCompletion).toHaveBeenCalledWith(
      mockTask.id,
      mockTask.subtasks?.[0].id
    );
    // Assert that checkbox is checked when task is completed
    expect(checkbox.checked).toBe(true);
    expect(subtaskCheckbox.checked).toBe(true);
  });
});
