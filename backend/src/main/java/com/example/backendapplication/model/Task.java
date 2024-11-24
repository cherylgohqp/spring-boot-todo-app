package com.example.backendapplication.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String details;

    private boolean completed;

    private Date createdDate;

    private Date updatedDate;

    // @OneToMany: a task can have multiple subtasks
    // CascadeType.ALL: Any changes to the task (eg. update, delete etc.) will be
    // propagated to its associated subtasks
    // orphanRemoval: true means that when a subtask is deleted, it will be deleted
    // from the db too
    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subtask> subtasks;
}
