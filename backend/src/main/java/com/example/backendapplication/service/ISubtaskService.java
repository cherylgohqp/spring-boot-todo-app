package com.example.backendapplication.service;

import com.example.backendapplication.exceptions.SubtaskNotFoundException;
import com.example.backendapplication.exceptions.TaskNotFoundException;
import com.example.backendapplication.model.Subtask;

import java.util.List;
import java.util.UUID;

public interface ISubtaskService {

    // Get all subtasks based on task id
    List<Subtask> getSubtasksForTask(UUID taskId) throws TaskNotFoundException;

    // Added implementation create subtask
    Subtask createSubtask(UUID taskId, String title, String description) throws TaskNotFoundException;

    Subtask getSubtaskById(UUID taskId, UUID subtaskIdid) throws SubtaskNotFoundException, TaskNotFoundException;

    // Added implementation delete subtask
    boolean deleteSubtask(UUID taskId, UUID subtaskId) throws SubtaskNotFoundException, TaskNotFoundException;

    // Added implementation to toggle subtask completion
    Subtask toggleSubtaskCompletion(UUID taskId, UUID subtaskId) throws SubtaskNotFoundException, TaskNotFoundException;

}
