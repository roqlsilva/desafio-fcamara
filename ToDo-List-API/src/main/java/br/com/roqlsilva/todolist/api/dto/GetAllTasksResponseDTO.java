package br.com.roqlsilva.todolist.api.dto;

import br.com.roqlsilva.todolist.api.models.Task;

import java.util.List;

public class GetAllTasksResponseDTO {
    private List<Task> pendingTasks;
    private List<Task> completedTasks;

    public GetAllTasksResponseDTO() {
    }

    public GetAllTasksResponseDTO(List<Task> pendingTasks, List<Task> completedTasks) {
        this.pendingTasks = pendingTasks;
        this.completedTasks = completedTasks;
    }

    public List<Task> getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(List<Task> pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public List<Task> getCompletedTasks() {
        return completedTasks;
    }

    public void setCompletedTasks(List<Task> completedTasks) {
        this.completedTasks = completedTasks;
    }
}
