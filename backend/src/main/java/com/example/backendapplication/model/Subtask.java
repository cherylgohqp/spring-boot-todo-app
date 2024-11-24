package com.example.backendapplication.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Getter
@Setter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tasks")
public class Subtask {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String details;

    private boolean completed;

    private Date createdDate;

    private Date updatedDate;

    @JsonBackReference // to prevent infinite recursion when serializing the Task and Subtask objects

    // the ManyToOneannotation is used to indicate that 1 task can have multiple
    // subtasks but each subtask is associated with only 1 task
    @ManyToOne(fetch = FetchType.LAZY)
    // fetch = FetchType.LAZY => ie. the subtasks will not be fetched from the 
    //database until they are explicitly accessed 

    @JoinColumn(name = "task_id", nullable = true) // indicate that the rs is rep by the task_id in the subtask table
                                                
    private Task task;
}
