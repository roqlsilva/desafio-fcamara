package br.com.roqlsilva.todolist.api.dto;

import lombok.Getter;
import lombok.Setter;

public class CreateTaskDTO {
    private String description;

    public CreateTaskDTO() {
    }

    public CreateTaskDTO(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
