import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 15000,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const api = {
    get: (url: string) => axiosInstance.get(url).then(responseBody),
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
    patch: (url: string, body: {}) => axiosInstance.patch(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

export {
    api
};