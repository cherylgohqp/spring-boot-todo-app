package com.example.backendapplication.service.impl;

import com.example.backendapplication.exceptions.TaskNotFoundException;
import com.example.backendapplication.model.Task;
import com.example.backendapplication.repository.TaskRepository;
import com.example.backendapplication.service.ITaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService implements ITaskService {

    private final TaskRepository taskRepository;

    @Override
    public Page<Task> getAllTasks(Pageable page) {
        return taskRepository.findAll(page);
    }

    @Override
    public Task createTask(String title, String description) {
        Date date = new Date();
        log.info("Creating task with title {} and description {} on {}", title, description, date);
        Task task = Task.builder().name(title).details(description).createdDate(date).updatedDate(date).build();

        return taskRepository.save(task);
    }

    @Override
    public Task toggleTaskCompletion(UUID taskId) throws TaskNotFoundException {
        Task task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            throw new TaskNotFoundException(taskId);
        }

        task.setCompleted(!task.isCompleted());
        return taskRepository.save(task);
    }

    // Added implementation get task by ID
    @Override
    public Task getTaskById(UUID taskId) throws TaskNotFoundException {
        log.info("Fetching task with ID: {}", taskId);
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));
        return task;
    }

    // Added implementation delete task by ID
    @Override
    public boolean deleteTaskById(UUID taskId) throws TaskNotFoundException {
        log.info("Deleting task with ID: {}", taskId);
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));
        taskRepository.deleteById(taskId);
        return true; // returns true upon successful deletion
    }

    // Added implementation update task
    @Override
    public Task updateTaskById(UUID taskId, String name, String details) throws TaskNotFoundException {
        log.info("Updating task with ID: {}", taskId);
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(taskId));
        task.setName(name);
        task.setDetails(details);
        return taskRepository.save(task);
    }
}
