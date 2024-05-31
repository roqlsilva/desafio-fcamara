export interface ITask {
    id: number
    description: string
    completed: boolean
    completedAt: Date
    createdAt: Date
}

export interface GetAllTasksResponse {
    pendingTasks: ITask[]
    completedTasks: ITask[]
}