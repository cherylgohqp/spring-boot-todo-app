package com.example.backendapplication.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class TaskAdvice {

    @ExceptionHandler(TaskNotFoundException.class)
    public final ResponseEntity<String> handleTaskNotFoundException(TaskNotFoundException exception) {
        log.warn("Task not found: {}", exception.getTaskId());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.toString());
    }

    @ExceptionHandler(SubtaskNotFoundException.class)
    public final ResponseEntity<String> handlesubTaskNotFoundException(SubtaskNotFoundException exception) {
        log.warn("Subtask not found: {}", exception.getSubtaskId());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.toString());
    }

    @ExceptionHandler(RuntimeException.class)
public final ResponseEntity<String> handleRuntimeException(RuntimeException exception) {
        log.error("An unexpected error occurred: {}", exception.getMessage());

        String error = "An unexpected error occurred";
        if (exception.getMessage().equals("Not implemented")) {
            error = "Please implement this endpoint";
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
