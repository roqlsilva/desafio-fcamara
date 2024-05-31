package br.com.roqlsilva.todolist.api.services;

import br.com.roqlsilva.todolist.api.models.Task;
import br.com.roqlsilva.todolist.api.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public Task createNewTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public void deleteTask(Task task) {
        taskRepository.delete(task);
    }

    public Task updateTask(Task task) {
        return taskRepository.save(task);
    }

    public List<Task> getAllNotCompletedTasks() {
        return taskRepository.getAllNotCompletedTasks();
    }

    public List<Task> getAllCompletedTasks() {
        return taskRepository.getAllCompletedTasks();
    }

    public Task loadTaskById(Long id) throws Exception {
        Optional<Task> task = this.findTaskById(id);

        if (!task.isPresent()) {
            throw new Exception("Entity not found.");
        }

        return task.get();
    }
}
