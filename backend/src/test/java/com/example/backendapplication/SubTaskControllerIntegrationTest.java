package com.example.backendapplication;

import com.example.backendapplication.model.TaskCreationRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SubTaskControllerIntegrationTest {

    public static final String INVALID_ID = "00000000-0000-0000-0000-000000000000";
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String taskId;

    @BeforeEach
    void setUp() throws Exception {
        taskId = getTaskId();
    }

    // Method to help get task id
    private String getTaskId() throws Exception {
        TaskCreationRequest request = new TaskCreationRequest();
        request.setName("Test Parent Task");
        request.setDetails("Test Parent Details");

        MvcResult task = mockMvc.perform(post("/tasks/task")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()).andReturn();
        String response = task.getResponse().getContentAsString();
        String id = objectMapper.readTree(response).get("id").asText();
        assert id != null;
        return id;
    }

    // Test for creating subtasks
    @Test
    void testCreateSubtask() throws Exception {
        createSubtask();
    }

    private MvcResult createSubtask() throws Exception {
        TaskCreationRequest request = new TaskCreationRequest();
        request.setName("Test Subtask");
        request.setDetails("Test Subtask details");

        return mockMvc.perform(post("/task/{id}/subtasks", taskId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk()).andReturn();
    }

    // Method to help get subtask id
    private String getSubTaskId() throws Exception {
        MvcResult task = createSubtask();
        String response = task.getResponse().getContentAsString();
        String id = objectMapper.readTree(response).get("id").asText();
        assert id != null;
        return id;
    }

    // Test for getSubtask by Subtask id
    @Test
    void testGetSubtask() throws Exception {
        mockMvc.perform(get("/task/{id}/subtasks/{subtaskId}", taskId, getSubTaskId()))
                .andExpect(status().isOk());

        // If task id is invalid, throw error
        mockMvc.perform(get("/task/{id}/subtasks/{subtaskId}", taskId, INVALID_ID))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subtask with id 00000000-0000-0000-0000-000000000000 not found"));
    }

    // Test for get all Subtasks by taskid
    @Test
    void testGetSubtasks() throws Exception {
        mockMvc.perform(get("/task/{id}/subtasks", taskId))
                .andExpect(status().isOk())
                .andReturn();
    }

    // Test for delete subtask by subtask id
    @Test
    void testDeleteSubtask() throws Exception {
        mockMvc.perform(delete("/task/{id}/subtasks/{subtaskId}", taskId, getSubTaskId()))
                .andExpect(status().isOk());

        // If subtask id is invalid, throw error
        mockMvc.perform(delete("/task/{id}/subtasks/{subtaskId}", taskId, INVALID_ID))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subtask with id 00000000-0000-0000-0000-000000000000 not found"));
    }

    @Test
    void testToggleSubTaskCompletion() throws Exception {
        mockMvc.perform(put("/task/{id}/subtasks/{subtaskId}", taskId, getSubTaskId()))
                .andExpect(status().isOk());

        // If task id is invalid, throw error
        mockMvc.perform(put("/task/{id}/subtasks/{subtaskId}", INVALID_ID, getSubTaskId()))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Task with id 00000000-0000-0000-0000-000000000000 not found"));

        // If subtask id is invalid, throw error
        mockMvc.perform(put("/task/{id}/subtasks/{subtaskId}", taskId, INVALID_ID))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Subtask with id 00000000-0000-0000-0000-000000000000 not found"));
    }
}