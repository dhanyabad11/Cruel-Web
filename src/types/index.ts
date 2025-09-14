export interface User {
    id: number;
    email: string;
    name: string;
    phone?: string;
    created_at: string;
    updated_at: string;
}

export interface Deadline {
    id: number;
    title: string;
    description?: string;
    due_date: string;
    priority: "low" | "medium" | "high" | "urgent";
    status: "pending" | "in_progress" | "completed" | "overdue";
    portal_id?: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface Portal {
    id: number;
    name: string;
    type: "github" | "jira" | "trello" | "asana" | "custom";
    url: string;
    credentials?: Record<string, string | number | boolean>;
    is_active: boolean;
    last_sync?: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export interface CreateDeadlineRequest {
    title: string;
    description?: string;
    due_date: string;
    priority: "low" | "medium" | "high" | "urgent";
    status?: "pending" | "in_progress" | "completed" | "overdue";
    portal_id?: number;
}

export type UpdateDeadlineRequest = Partial<CreateDeadlineRequest>;

export interface CreatePortalRequest {
    name: string;
    type: "github" | "jira" | "trello" | "asana" | "custom";
    url: string;
    credentials?: Record<string, string | number | boolean>;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}
