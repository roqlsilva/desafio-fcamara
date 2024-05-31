export const endpointsUrls = {
    Task: {
        getAll: () => "/api/v1/tasks",
        getById: (id: number) => `/api/v1/tasks/${id}`,
        create: () => "/api/v1/tasks",
        update: (id: number) => `/api/v1/tasks/${id}`,
        delete: (id: number) => `/api/v1/tasks/${id}`,
        markAsDone: (id: number) => `/api/v1/tasks/${id}/done`,
    }
}