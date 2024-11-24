package com.example.backendapplication.controller;

import com.example.backendapplication.exceptions.SubtaskNotFoundException;
import com.example.backendapplication.exceptions.TaskNotFoundException;
import com.example.backendapplication.model.Subtask;
import com.example.backendapplication.model.TaskCreationRequest;
import com.example.backendapplication.service.ISubtaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Tag(name = "Subtasks", description = "Subtask management")
@RequestMapping("/task")
@RequiredArgsConstructor
@RestController
@Slf4j
@CrossOrigin(origins = "*")
public class SubtaskController {
    private final ISubtaskService subtaskService;

    @Operation(summary = "Get all subtasks for a specific task")
    @GetMapping("/{id}/subtasks")
    public ResponseEntity<List<Subtask>> getSubtasks(@PathVariable UUID id) throws TaskNotFoundException {
        log.info("Getting all sub-tasks for task with ID {}", id);
        return ResponseEntity.ok(subtaskService.getSubtasksForTask(id));
    }

    @Operation(summary = "Create a new sub-task for a specific task")
    @PostMapping("/{id}/subtasks")
    public ResponseEntity<Subtask> createSubtask(@PathVariable UUID id, @RequestBody @Valid TaskCreationRequest request)
            throws TaskNotFoundException {
        log.info("Creating new sub-task for task with ID {}", id);
        return ResponseEntity.ok(subtaskService.createSubtask(id, request.getName(), request.getDetails()));
    }

    @Operation(summary = "Get a subtask by ID")
    @GetMapping("/{id}/subtasks/{subtaskId}")
    public ResponseEntity<Subtask> getSubtaskById(@PathVariable UUID id, @PathVariable UUID subtaskId)
            throws SubtaskNotFoundException, TaskNotFoundException {
        // Added implementation get subtask by ID
        log.info("Getting sub-task with ID {} for task with ID {}", subtaskId, id);
        return ResponseEntity.ok(subtaskService.getSubtaskById(id, subtaskId));
    }

    @Operation(summary = "Delete a sub-task for a specific task")
    @DeleteMapping("/{id}/subtasks/{subtaskId}")
    public ResponseEntity<Boolean> deleteSubtask(@PathVariable UUID id, @PathVariable UUID subtaskId)
            throws SubtaskNotFoundException, TaskNotFoundException {
        // Added implementation delete subtask by ID
        log.info("Deleting sub-task with ID {} for task with ID {}", subtaskId, id);
        return ResponseEntity.ok(subtaskService.deleteSubtask(id, subtaskId));
    }

    @Operation(summary = "Toggle Subtask Completion")
    @PutMapping("/{id}/subtasks/{subtaskId}")
    public ResponseEntity<Subtask> toggleSubtaskCompletion(@PathVariable UUID id, @PathVariable UUID subtaskId)
            throws SubtaskNotFoundException, TaskNotFoundException {
        // Added implementation toggle subtask completion
        log.info("Toggling subtask completion for sub-task with ID {}", subtaskId);
        return ResponseEntity.ok(subtaskService.toggleSubtaskCompletion(id, subtaskId));
    }
}
