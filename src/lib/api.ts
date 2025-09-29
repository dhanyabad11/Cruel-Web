/**
 * API Client for connecting frontend to backend
 */

import {
    User,
    AuthResponse,
    Portal,
    Deadline,
    Notification,
    NotificationPreferences,
    WhatsAppParseResult,
    SyncResult,
    DashboardStats,
} from "@/types/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

class ApiClient {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
        // Get token from localStorage if available
        if (typeof window !== "undefined") {
            this.token = localStorage.getItem("auth_token");
        }
    }

    private getHeaders(): Record<string, string> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        return headers;
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config: RequestInit = {
                headers: this.getHeaders(),
                ...options,
            };

            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            console.error(`API Error - ${endpoint}:`, error);
            return { error: error instanceof Error ? error.message : "Unknown error" };
        }
    }

    // Auth methods
    async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
        try {
            const response = await fetch(`${this.baseURL}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                this.token = data.access_token;
                if (typeof window !== "undefined") {
                    localStorage.setItem("auth_token", data.access_token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
                return { data };
            } else {
                const errorData = await response.json().catch(() => ({}));
                return { error: errorData.detail || "Login failed" };
            }
        } catch (error) {
            return { error: error instanceof Error ? error.message : "Network error" };
        }
    }

    async register(userData: {
        email: string;
        password: string;
        full_name: string;
    }): Promise<ApiResponse<AuthResponse>> {
        return this.request("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    }

    async logout(): Promise<void> {
        this.token = null;
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user");
        }
    }

    async getCurrentUser(): Promise<ApiResponse<User>> {
        return this.request("/api/auth/me");
    }

    // Portal methods
    async getPortals(): Promise<ApiResponse<Portal[]>> {
        return this.request("/api/portals");
    }

    async createPortal(portalData: {
        name: string;
        type: string;
        url: string;
        credentials?: Record<string, unknown>;
        config?: Record<string, unknown>;
    }): Promise<ApiResponse<Portal>> {
        return this.request("/api/portals", {
            method: "POST",
            body: JSON.stringify(portalData),
        });
    }

    async syncPortal(portalId: number): Promise<ApiResponse<SyncResult>> {
        return this.request(`/api/portals/${portalId}/sync`, {
            method: "POST",
        });
    }

    async deletePortal(portalId: number): Promise<ApiResponse<void>> {
        return this.request(`/api/portals/${portalId}`, {
            method: "DELETE",
        });
    }

    // Deadline methods
    async getDeadlines(): Promise<ApiResponse<Deadline[]>> {
        return this.request("/api/deadlines");
    }

    async createDeadline(deadlineData: {
        title: string;
        description?: string;
        due_date: string;
        priority: string;
    }): Promise<ApiResponse<Deadline>> {
        return this.request("/api/deadlines", {
            method: "POST",
            body: JSON.stringify(deadlineData),
        });
    }

    async updateDeadline(
        deadlineId: number,
        updates: Partial<Deadline>
    ): Promise<ApiResponse<Deadline>> {
        return this.request(`/api/deadlines/${deadlineId}`, {
            method: "PUT",
            body: JSON.stringify(updates),
        });
    }

    async deleteDeadline(deadlineId: number): Promise<ApiResponse<void>> {
        return this.request(`/api/deadlines/${deadlineId}`, {
            method: "DELETE",
        });
    }

    // Notification methods
    async getNotifications(): Promise<ApiResponse<Notification[]>> {
        return this.request("/api/notifications");
    }

    async updateNotificationPreferences(
        preferences: NotificationPreferences
    ): Promise<ApiResponse<NotificationPreferences>> {
        return this.request("/api/notifications/preferences", {
            method: "PUT",
            body: JSON.stringify(preferences),
        });
    }

    // WhatsApp methods
    async parseWhatsAppMessage(message: string): Promise<ApiResponse<WhatsAppParseResult>> {
        return this.request("/parse_whatsapp", {
            method: "POST",
            body: JSON.stringify({ message }),
        });
    }

    // Health check
    async healthCheck(): Promise<ApiResponse<{ status: string }>> {
        return this.request("/health");
    }

    // Dashboard stats
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        return this.request("/api/dashboard/stats");
    }
}

export const apiClient = new ApiClient();
export default apiClient;
