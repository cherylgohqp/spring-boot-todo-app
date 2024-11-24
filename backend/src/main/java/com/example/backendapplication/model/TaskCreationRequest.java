package com.example.backendapplication.model;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TaskCreationRequest {

    @NotNull(message = "Task name is required")
    private String name;

    private String details;

}
