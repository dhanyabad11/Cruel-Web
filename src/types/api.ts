// API Types for the Cruel application

export interface User {
    id: string;
    email: string;
    full_name: string;
    created_at: string;
    is_active: boolean;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user: User;
}

export interface Portal {
    id: number;
    name: string;
    type: string;
    url: string;
    status: "connected" | "disconnected" | "error";
    last_sync: string | null;
    is_active: boolean;
    credentials?: Record<string, unknown>;
    config?: Record<string, unknown>;
    created_at: string;
    updated_at: string;
}

export interface Deadline {
    id: number;
    title: string;
    description?: string;
    due_date: string;
    priority: "low" | "medium" | "high" | "urgent";
    status: "pending" | "completed" | "overdue";
    portal_id?: number;
    portal_task_id?: string;
    tags?: string[];
    estimated_hours?: number;
    created_at: string;
    updated_at: string;
}

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: "deadline" | "reminder" | "portal_sync" | "system";
    status: "unread" | "read";
    created_at: string;
    deadline_id?: number;
}

export interface NotificationPreferences {
    email_enabled: boolean;
    sms_enabled: boolean;
    push_enabled: boolean;
    deadline_reminders: boolean;
    reminder_hours_before: number[];
    quiet_hours_start?: string;
    quiet_hours_end?: string;
}

export interface WhatsAppParseResult {
    deadlines: Array<{
        title: string;
        description?: string;
        due_date: string;
        priority: string;
        confidence: number;
    }>;
    message: string;
    success: boolean;
}

export interface SyncResult {
    success: boolean;
    deadlines_found: number;
    deadlines_added: number;
    deadlines_updated: number;
    message: string;
    errors?: string[];
}

export interface DashboardStats {
    total_deadlines: number;
    upcoming_deadlines: number;
    completed_deadlines: number;
    overdue_deadlines: number;
    active_portals: number;
}

// Form types
export interface LoginForm {
    email: string;
    password: string;
    remember_me: boolean;
}

export interface RegisterForm {
    email: string;
    password: string;
    confirm_password: string;
    full_name: string;
}

export interface PortalCreateForm {
    name: string;
    type: string;
    url: string;
    username?: string;
    password?: string;
    api_key?: string;
    additional_config?: Record<string, unknown>;
}

export interface DeadlineCreateForm {
    title: string;
    description?: string;
    due_date: string;
    priority: "low" | "medium" | "high" | "urgent";
    estimated_hours?: number;
    tags?: string[];
}
