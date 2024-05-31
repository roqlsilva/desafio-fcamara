package br.com.roqlsilva.todolist.api.services;

import br.com.roqlsilva.todolist.api.exceptions.BusinessException;
import br.com.roqlsilva.todolist.api.models.Task;
import br.com.roqlsilva.todolist.api.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TaskServiceTest {

    @InjectMocks
    TaskService service;

    @Mock
    TaskRepository repository;

    Task task;

    @BeforeEach
    public void setUp() {
        task = new Task();
        task.setDescription("This is a test task.");
        task.setCompleted(false);
        task.setCreatedAt(new Date());
    }

    @Test
    void shouldCreateNewTask() throws BusinessException {
        when(repository.save(task)).thenReturn(task);

        Task newTask = service.createNewTask(task);

        assertEquals(newTask.getDescription(), task.getDescription());
        verify(repository).save(task);
        verifyNoMoreInteractions(repository);
    }

    @Test
    void shouldNotCreateNewTaskWithEmptyDescription() {
        final BusinessException e = assertThrows(BusinessException.class, () -> {
            task.setDescription(null);
            service.createNewTask(task);
        });

        assertThat(e, notNullValue());
        assertThat(e.getMessage(), is("Erro ao criar tarefa com a descrição: null"));
        verifyNoInteractions(repository);
    }

    @Test
    void shouldRetrieveAllNotCompletedTasks() {
        when(repository.getAllNotCompletedTasks())
                .thenReturn(Collections.singletonList(task));

        List<Task> tasks = service.getAllNotCompletedTasks();

        assertEquals(tasks, Collections.singletonList(task));
        verify(repository).getAllNotCompletedTasks();
        verifyNoMoreInteractions(repository);
    }

    @Test
    void shouldRetrieveAllCompletedTasks() {
        when(repository.getAllCompletedTasks())
                .thenReturn(Collections.singletonList(task));

        List<Task> tasks = service.getAllCompletedTasks();

        assertEquals(tasks, Collections.singletonList(task));
        verify(repository).getAllCompletedTasks();
        verifyNoMoreInteractions(repository);
    }
}
