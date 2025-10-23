import axios from "axios";
import type {
    LoginRequest,
    RegisterRequest,
    CreateDeadlineRequest,
    UpdateDeadlineRequest,
    CreatePortalRequest,
} from "../types";
import { whatsappAPI } from "./whatsapp";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://198.211.106.97";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Auth endpoints
export const authAPI = {
    login: (credentials: LoginRequest) => api.post("/api/auth/signin", credentials),
    register: (userData: RegisterRequest) => api.post("/api/auth/signup", userData),
    me: () => api.get("/api/auth/me"),
    test: () => api.get("/api/auth/me-test"),
};

// Deadline endpoints
export const deadlineAPI = {
    getAll: () => api.get("/api/deadlines"),
    create: (deadline: CreateDeadlineRequest) => api.post("/api/deadlines", deadline),
    update: (id: number, deadline: UpdateDeadlineRequest) =>
        api.put(`/api/deadlines/${id}`, deadline),
    delete: (id: number) => api.delete(`/api/deadlines/${id}`),
};

// Portal endpoints
export const portalAPI = {
    getAll: () => api.get("/api/portals"),
    connect: (portal: CreatePortalRequest) => api.post("/api/portals", portal),
    sync: (id: number) => api.post(`/api/portals/${id}/sync`),
};

// Export API with organized structure
export const apiService = {
    auth: authAPI,
    deadlines: deadlineAPI,
    portals: portalAPI,
    whatsapp: whatsappAPI,
};
