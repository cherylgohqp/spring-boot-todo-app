package com.example.backendapplication.service;

import com.example.backendapplication.exceptions.TaskNotFoundException;
import com.example.backendapplication.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ITaskService {
    Page<Task> getAllTasks(Pageable page);

    Task createTask(String title, String description);

    Task toggleTaskCompletion(UUID taskId) throws TaskNotFoundException;

    // Added implementation get task by ID
    Task getTaskById(UUID taskIdid) throws TaskNotFoundException;

    // Added implementation delete task by ID
    boolean deleteTaskById(UUID taskId) throws TaskNotFoundException;

    // Added implementation update task
    Task updateTaskById(UUID taskId, String name, String details) throws TaskNotFoundException;
}
