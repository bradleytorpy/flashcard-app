import axios, { AxiosRequestConfig } from "axios";

export interface PaginationParams {
    page?: number;
    limit?: number;
    search?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const get = <T>(url: string, config?: AxiosRequestConfig) => api.get<T>(url, config).then((res) => res.data);

export const post = <T>(url: string, data: any, config?: AxiosRequestConfig) => api.post<T>(url, data, config).then((res) => res.data);

export const put = <T>(url: string, data: any, config?: AxiosRequestConfig) => api.put<T>(url, data, config).then((res) => res.data);

export const del = <T>(url: string, config?: AxiosRequestConfig) => api.delete<T>(url, config).then((res) => res.data);

export default api;