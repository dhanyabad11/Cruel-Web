import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

export async function getNotificationPreferences(token: string) {
    return axios.get(`${API_BASE}/notifications/preferences`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function createNotificationPreferences(
    data: {
        preferred_method: string;
        phone_number?: string;
        email?: string;
    },
    token: string
) {
    return axios.post(`${API_BASE}/notifications/preferences`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function updateNotificationPreferences(
    data: {
        preferred_method?: string;
        phone_number?: string;
        email?: string;
    },
    token: string
) {
    return axios.put(`${API_BASE}/notifications/preferences`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function deleteNotificationPreferences(token: string) {
    return axios.delete(`${API_BASE}/notifications/preferences`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}
