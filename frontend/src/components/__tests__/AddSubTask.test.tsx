import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { Task } from "../../types/Task";

// Mock task data
const mockTask: Task = {
  id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
  name: "Test Add Sub Task",
  completed: false,
};

const mockOnDelete = jest.fn();
const mockOnToggleComplete = jest.fn();
const mockOnAddSubTask = jest.fn();
const mockOnDeleteSubTask = jest.fn();
const mockOnToggleSubTaskCompletion = jest.fn();

// Setup function to render the component
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

  it("adds a new subtest to the parent task", async () => {
    // Render the TaskItem component with mock task and mock onDelete function
    setupTaskItem();

    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button
    fireEvent.click(addSubtaskButton);

    // Simulate typing a subtask name in the input field (assuming input has placeholder or label)
    const subtaskInput = screen.getByPlaceholderText("Add Subtask...");
    fireEvent.change(subtaskInput, { target: { value: "New Subtask" } });

    // Simulate  submitting the input form for adding a new subtask
    fireEvent.submit(subtaskInput, { key: "Enter", code: "Enter" });

    // Wait for the onAddSubTask function to be called before doing the assertion
    await waitFor(() => expect(mockOnAddSubTask).toHaveBeenCalledTimes(1));

    // Assert that onAddSubTask was called with the correct task ID and subtask name
    expect(mockOnAddSubTask).toHaveBeenCalledWith(mockTask.id, "New Subtask");
  });

  it("renders the newly added subtask correctly", async () => {
    // Render TaskItem component with mock props
    const { rerender } = setupTaskItem(); //extract the rerender function from the object returned by render() in setupTaskItem

    //get add subtask button
    const addSubtaskButton = screen.getByTestId(`add-subtask-${mockTask.id}`);

    // Simulate a click on the add subtask button
    fireEvent.click(addSubtaskButton);

    // Simulate typing a subtask name in the input field (assuming input has placeholder or label)
    const subtaskInput = screen.getByPlaceholderText("Add Subtask...");
    fireEvent.change(subtaskInput, { target: { value: "New Subtask" } });

    // Simulate  submitting the input form for adding a new subtask
    fireEvent.submit(subtaskInput, { key: "Enter", code: "Enter" });

    // Wait for the onAddSubTask function to be called before doing the assertion
    await waitFor(() => expect(mockOnAddSubTask).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockOnAddSubTask).toHaveBeenCalledWith(mockTask.id, "New Subtask")
    );

    // Mock the state update
    const updatedMockTask = {
      ...mockTask,
      subtasks: [
        ...(mockTask.subtasks || []),
        { id: "new-id", name: "New Subtask", completed: false },
      ],
    };

    // Re-render the component with updated props
    rerender(
      <TaskItem
        task={updatedMockTask}
        onDeleteTask={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        onAddSubTask={mockOnAddSubTask}
        onDeleteSubTask={mockOnDeleteSubTask}
        onToggleSubTaskCompletion={mockOnToggleSubTaskCompletion}
      />
    );
    // Check if task name is rendered
    expect(screen.getByText("New Subtask")).toBeInTheDocument();
  });
});
