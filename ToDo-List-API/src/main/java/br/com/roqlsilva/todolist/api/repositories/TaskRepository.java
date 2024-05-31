package br.com.roqlsilva.todolist.api.repositories;

import br.com.roqlsilva.todolist.api.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.completed = false")
    public List<Task> getAllNotCompletedTasks();

    @Query("SELECT t FROM Task t WHERE t.completed = true")
    public List<Task> getAllCompletedTasks();
}
