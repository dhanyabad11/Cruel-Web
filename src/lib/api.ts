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
    private isRefreshing: boolean = false;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
        this.initializeAuth();
    }

    private initializeAuth(): void {
        if (typeof window !== "undefined") {
            this.token = localStorage.getItem("auth_token");
            // Listen for storage changes across tabs
            window.addEventListener("storage", (e) => {
                if (e.key === "auth_token") {
                    this.token = e.newValue;
                }
            });
        }
    }

    public setToken(token: string): void {
        this.token = token;
        if (typeof window !== "undefined") {
            localStorage.setItem("auth_token", token);
        }
    }

    public clearToken(): void {
        this.token = null;
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("user");
        }
    }

    private getHeaders(requireAuth: boolean = false): Record<string, string> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (this.token) {
            headers["Authorization"] = `Bearer ${this.token}`;
        } else if (requireAuth) {
            console.warn("No auth token available for API request that requires authentication");
        }

        return headers;
    }

    async request<T>(
        endpoint: string,
        options: RequestInit = {},
        requireAuth: boolean = true
    ): Promise<ApiResponse<T>> {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config: RequestInit = {
                headers: this.getHeaders(requireAuth),
                ...options,
            };

            const response = await fetch(url, config);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                // Handle auth errors
                if (response.status === 401) {
                    console.warn("Authentication failed, clearing stored token");
                    this.clearToken();

                    // Redirect to login page
                    if (typeof window !== "undefined" && window.location.pathname !== "/login") {
                        window.location.href = "/login";
                    }
                }

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

                // Properly set the token using our method
                this.setToken(data.access_token);

                // Store user data
                if (typeof window !== "undefined") {
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
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            const response = await fetch(`${this.baseURL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (response.ok) {
                const data = await response.json();

                // Set the token if provided
                if (data.session) {
                    this.setToken(data.session);
                }

                return { data };
            } else {
                const errorData = await response.json().catch(() => ({}));
                return { error: errorData.detail || "Registration failed" };
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === "AbortError") {
                    return {
                        error: "Registration is taking longer than expected. Please try again or check your email for verification.",
                    };
                }
                return { error: error.message };
            }
            return { error: "Registration failed" };
        }
    }

    async logout(): Promise<void> {
        // Call backend logout endpoint if token exists
        if (this.token) {
            try {
                await this.request("/api/auth/signout", { method: "POST" });
            } catch (error) {
                console.warn("Logout request failed:", error);
            }
        }

        // Clear local authentication
        this.clearToken();
    }

    async getCurrentUser(): Promise<ApiResponse<User>> {
        // Fallback to test endpoint if token validation fails
        const response = await this.request<User>("/api/auth/me");
        if (response.error && response.error.includes("Could not validate credentials")) {
            console.warn("Using fallback test endpoint for user info");
            return this.request<User>("/api/auth/me-test");
        }
        return response;
    }

    // Portal methods
    async getPortals(): Promise<ApiResponse<Portal[]>> {
        return this.request("/api/portals/");
    }

    async createPortal(portalData: {
        name: string;
        type: string;
        url: string;
        credentials?: Record<string, unknown>;
        config?: Record<string, unknown>;
    }): Promise<ApiResponse<Portal>> {
        return this.request("/api/portals/", {
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
        return this.request("/api/deadlines/");
    }

    async createDeadline(deadlineData: {
        title: string;
        description?: string;
        due_date: string;
        portal_id?: number;
        course_id?: string;
        priority?: "low" | "medium" | "high";
    }): Promise<ApiResponse<Deadline>> {
        return this.request("/api/deadlines/", {
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

    // Dashboard methods - using existing endpoints to calculate stats
    async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
        // This method can aggregate data from other endpoints if needed
        // For now, dashboard calculates stats from deadlines directly
        throw new Error("Use getDeadlines() and calculate stats in component");
    }
}

export const apiClient = new ApiClient();
export default apiClient;
