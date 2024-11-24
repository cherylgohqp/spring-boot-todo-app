import { render, fireEvent, screen } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { Task } from "../../types/Task";

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
  const mockTask: Task = {
    id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
    name: "Test Toggle Task Completion",
    completed: false,
  };

  const mockTaskWithSubtasks: Task = {
    id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
    name: "Test Toggle Task Completion",
    completed: false,
    subtasks: [
      {
        id: "d959de87-a7fc-4813-8712-557b4b757ea2",
        name: "test toggle subtask 1",
        details: "test subtask details",
        completed: false,
      },
    ],
  };

  const setUpTaskItem = () => {
    return render(
      <TaskItem
        task={mockTaskWithSubtasks}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTask={mockOnDelete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );
  };

  const mockOnToggleComplete = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnAddSubTask = jest.fn();
  const mockOnDeleteSubTask = jest.fn();
  const mockOnToggleSubTaskCompletion = jest.fn();

  it("calls onToggleComplete when checkbox is toggled", () => {
    // // Render TaskItem component with mock props

    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTask={mockOnDelete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );

    // Get the checkbox input (label is the task name, so we query by text)
    const checkbox = screen.getByLabelText("Test Toggle Task Completion");

    // Simulate checkbox click to toggle completion
    fireEvent.click(checkbox);

    // Assert that onToggleComplete was called with the correct task ID
    expect(mockOnToggleComplete).toHaveBeenCalledWith(mockTask.id);
  });

  it("renders checkbox with correct completion status", () => {
    // Render component with task marked as completed
    const completedTask = { ...mockTask, completed: true };

    render(
      <TaskItem
        task={completedTask}
        onToggleComplete={mockOnToggleComplete}
        onDeleteTask={mockOnDelete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );

    const checkbox = screen.getByLabelText(
      "Test Toggle Task Completion"
    ) as HTMLInputElement;

    // Assert that checkbox is checked when task is completed
    expect(checkbox.checked).toBe(true);
  });

  it("checks all subtasks when parent task is checked", () => {
    // Render component with task with subtasks
    const { rerender } = setUpTaskItem(); //extract the rerender function from the object returned by render() in setupTaskItem
    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button
    fireEvent.click(addSubtaskButton);
    const subtaskCheckbox = screen.getByLabelText(
      "test toggle subtask 1"
    ) as HTMLInputElement;
    const checkbox = screen.getByLabelText(
      "Test Toggle Task Completion"
    ) as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
    expect(subtaskCheckbox.checked).toBe(false);
    fireEvent.click(checkbox);

    const completedTask = {
      ...mockTaskWithSubtasks,
      completed: true,
      subtasks: [
        {
          ...mockTaskWithSubtasks.subtasks?.[0],
          id: mockTaskWithSubtasks.subtasks?.[0].id ?? "", // Ensure id is always a string,
          name: mockTaskWithSubtasks.subtasks?.[0].name ?? "", // Ensure name is always a string,
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
    expect(checkbox.checked).toBe(true);

    expect(subtaskCheckbox.checked).toBe(true);
  });
});
