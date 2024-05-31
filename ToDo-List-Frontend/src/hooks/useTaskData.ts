import { useEffect, useState } from "react";
import { GetAllTasksResponse, ITask } from "../@types";
import { endpointsUrls } from "../api/endpoints";
import { api } from "../api/api";

interface CreateTaskProps {
    description: string
    onSuccess?: () => void
}

interface UpdateTaskProps {
    id: number
    description: string
    onSuccess?: () => void
}

interface TaskDataHook {
    pendingTasks: ITask[] | undefined
    completedTasks: ITask[] | undefined
    createTask: (props: CreateTaskProps) => void
    updateTask: (props: UpdateTaskProps) => void
    findAllTasks: () => void
    markTaskAsDone: (id: number) => void
    deleteTask: (id: number) => void
}

export function useTaskData(): TaskDataHook {
    const [pendingTasks, setPendingTasks] = useState<ITask[]>();
    const [completedTasks, setCompletedTasks] = useState<ITask[]>();

    useEffect(() => {
        findAllTasks()
    }, [])

    function findAllTasks() {
        api.get(endpointsUrls.Task.getAll())
            .then((data: GetAllTasksResponse) => {
                setPendingTasks(data.pendingTasks)
                setCompletedTasks(data.completedTasks)
            })
    }

    async function createTask({
        description, 
        onSuccess
    }: CreateTaskProps) {
        const data = { "description": description }
        const newTask = await api.post(endpointsUrls.Task.create(), data)
        if (newTask && onSuccess) {
            onSuccess()
        }
    }

    async function updateTask({
        id,
        description,
        onSuccess,
    }: UpdateTaskProps) {
        const data = { "description": description }
        const updatedTask = await api.put(endpointsUrls.Task.update(id), data)
        if (updatedTask && onSuccess) {
            onSuccess()
        }
    }

    function markTaskAsDone(id: number) {
        api.post(endpointsUrls.Task.markAsDone(id), {})
            .then((data: ITask) => {
                findAllTasks()
            });
    }

    function deleteTask(id: number) {
        api.delete(endpointsUrls.Task.delete(id))
            .then(resp => {
                console.log(resp);
                findAllTasks()
            });
    }

    return {
        pendingTasks,
        completedTasks,
        createTask,
        findAllTasks,
        markTaskAsDone,
        deleteTask,
        updateTask
    }
}