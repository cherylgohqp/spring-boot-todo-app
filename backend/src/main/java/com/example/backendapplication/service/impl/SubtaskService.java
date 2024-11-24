package com.example.backendapplication.service.impl;

import com.example.backendapplication.exceptions.SubtaskNotFoundException;
import com.example.backendapplication.exceptions.TaskNotFoundException;
import com.example.backendapplication.model.Subtask;
import com.example.backendapplication.model.Task;
import com.example.backendapplication.repository.SubtaskRepository;
import com.example.backendapplication.repository.TaskRepository;
import com.example.backendapplication.service.ISubtaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class SubtaskService implements ISubtaskService {

    private final SubtaskRepository subtaskRepository;
    private final TaskRepository taskRepository;

    @Override
    public List<Subtask> getSubtasksForTask(UUID taskId) throws TaskNotFoundException {
        // throws exception if parent task id is not found
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        return task.getSubtasks();
    }

    @Override
    public Subtask createSubtask(UUID taskId, String title, String description) throws TaskNotFoundException {
        // throw exception if parent task id is not found
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        // else create subtask
        Date date = new Date();
        Subtask subtask = Subtask.builder().name(title).task(task).details(description).createdDate(date)
                .updatedDate(date).build();

        // Save the subtask
        Subtask savedSubtask = subtaskRepository.save(subtask);

        // Update the task's subtasks list and save the task
        task.getSubtasks().add(subtask);
        taskRepository.save(task);
        log.info("Created subtask with title {} for task {} on {}", title, taskId, date);

        return savedSubtask;
    }

    @Override
    public Subtask toggleSubtaskCompletion(UUID taskId, UUID subtaskId)
            throws SubtaskNotFoundException, TaskNotFoundException {
        // throw exception if parent task id is not found
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));

        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new SubtaskNotFoundException(subtaskId));

        subtask.setCompleted(!subtask.isCompleted());
        return subtaskRepository.save(subtask);
    }

    @Override
    public Subtask getSubtaskById(UUID taskId, UUID subtaskId) throws SubtaskNotFoundException, TaskNotFoundException {

        if (!taskRepository.existsById(taskId)) {
            throw new TaskNotFoundException(taskId);
        }

        // check for subtask existence
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new SubtaskNotFoundException(subtaskId));

        // if subtask id exists, Check if the subtask is linked to the correct task
        if (subtask != null && !subtask.getTask().getId().equals(taskId)) {
            throw new SubtaskNotFoundException(subtaskId); // Subtask doesn't belong to this task
        }

        log.info("Fetching subtask with ID: {}", subtaskId);
        return subtask;
    }

    // Delete subtask functionality
    @Override
    public boolean deleteSubtask(UUID taskId, UUID subtaskId) throws SubtaskNotFoundException, TaskNotFoundException {
        // first check if the task exists before finding the subtask
        if (!taskRepository.existsById(taskId)) {
            throw new TaskNotFoundException(taskId);
        }

        // check for subtask existence
        Subtask subtask = subtaskRepository.findById(subtaskId)
                .orElseThrow(() -> new SubtaskNotFoundException(subtaskId));

        // if subtask id exists, Check if the subtask is linked to the correct task
        if (subtask != null && !subtask.getTask().getId().equals(taskId)) {
            throw new SubtaskNotFoundException(subtaskId); // Subtask doesn't belong to this task
        }

        // Delete the subtask if all checks pass
        subtaskRepository.deleteById(subtaskId);
        return true; // Indicate successful deletion
    }

}
