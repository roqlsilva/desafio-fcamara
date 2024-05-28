package br.com.roqlsilva.todolist.api.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private Long id;

    @Getter
    @Setter
    @Column(nullable = false, length = 150)
    private String description;

    @Getter
    @Setter
    private boolean completed;

    @Getter
    @Setter
    private Date completedAt;

    @Getter
    @Setter
    @Column(nullable = false)
    private Date createdAt;
}
