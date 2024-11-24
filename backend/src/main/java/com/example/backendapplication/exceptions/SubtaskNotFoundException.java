package com.example.backendapplication.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@AllArgsConstructor
@Getter
public class SubtaskNotFoundException extends Exception {

    private final UUID subtaskId;

    @Override
    public String toString() {
        return "Subtask with id " + subtaskId + " not found";
    }
}
