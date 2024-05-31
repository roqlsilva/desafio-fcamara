package br.com.roqlsilva.todolist.api.controllers;

import br.com.roqlsilva.todolist.api.dto.CreateTaskDTO;
import br.com.roqlsilva.todolist.api.dto.GetAllTasksResponseDTO;
import br.com.roqlsilva.todolist.api.exceptions.BusinessException;
import br.com.roqlsilva.todolist.api.models.Task;
import br.com.roqlsilva.todolist.api.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/api/v1/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    @GetMapping
    public ResponseEntity<GetAllTasksResponseDTO> getAllTasks() {
        GetAllTasksResponseDTO response = new GetAllTasksResponseDTO();
        response.setPendingTasks(service.getAllNotCompletedTasks());
        response.setCompletedTasks(service.getAllCompletedTasks());
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Task> createNewTask(@RequestBody CreateTaskDTO createTaskDTO) {
        try {
            Task task = new Task();
            task.setCreatedAt(new Date());
            task.setDescription(createTaskDTO.getDescription());
            return ResponseEntity.ok(service.createNewTask(task));
        } catch (BusinessException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(service.loadTaskById(id));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        try {
            service.deleteTask(service.loadTaskById(id));

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
        }
    }

    @PostMapping("/{id}/done")
    public ResponseEntity<Task> markTaskAsDone(@PathVariable Long id) {
        try {
            Task task = service.loadTaskById(id);
            task.setCompleted(true);
            task.setCompletedAt(new Date());
            return ResponseEntity.ok(service.updateTask(task));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody CreateTaskDTO dto) {
        try {
            Task task = service.loadTaskById(id);
            task.setDescription(dto.getDescription());
            return ResponseEntity.ok(service.updateTask(task));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entity not found");
        }
    }
}
