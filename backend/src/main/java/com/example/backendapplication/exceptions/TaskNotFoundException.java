package com.example.backendapplication.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class TaskNotFoundException extends Exception {

    private final UUID taskId;

    @Override
    public String toString() {
        return "Task with id " + taskId + " not found";
    }
}
