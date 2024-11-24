import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskItem } from "../TaskItem";
import { Task } from "../../types/Task";

// Mock task data
const mockTask: Task = {
  id: "bcc18a76-ec05-42d0-be1c-5e96eef5b2ab",
  name: "Test Delete Task",
  completed: false
};
// Mock the onDelete function
const mockOnDelete = jest.fn();
const mockOnToggleComplete = jest.fn();
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

  it("calls onDeleteTask with correct task ID when delete button is clicked", async() => {
    // Render the TaskItem component with mock task and mock onDelete function
    setupTaskItem();

    // Get the delete button
    const deleteButton = screen.getByTestId(`delete-task-${mockTask.id}`);

    // Simulate a click on the delete button
    fireEvent.click(deleteButton);

    await waitFor(() => expect(mockOnDelete).toHaveBeenCalledTimes(1));

    // Assert that the onDelete function is called with the correct task ID
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
    
  });
});
