import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    getNotificationPreferences,
    createNotificationPreferences,
    updateNotificationPreferences,
    deleteNotificationPreferences,
} from "../services/notificationPreferences";

interface Props {
    token: string;
}

const NotificationPreferencesForm: React.FC<Props> = ({ token }) => {
    const [loading, setLoading] = useState(false);
    const [preferences, setPreferences] = useState<NotificationPreferenceResponse | null>(null);
    const [form, setForm] = useState({
        preferred_method: "email",
        phone_number: "",
        email: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        setLoading(true);
        getNotificationPreferences(token)
            .then((res) => {
                setPreferences(res.data);
                setForm({
                    preferred_method: res.data.preferred_method || "email",
                    phone_number: res.data.phone_number || "",
                    email: res.data.email || "",
                });
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (preferences) {
                await updateNotificationPreferences(form, token);
                setSuccess("Preferences updated!");
            } else {
                await createNotificationPreferences(form, token);
                setSuccess("Preferences saved!");
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || "Error saving preferences");
            } else {
                setError("Error saving preferences");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await deleteNotificationPreferences(token);
            setPreferences(null);
            setForm({ preferred_method: "email", phone_number: "", email: "" });
            setSuccess("Preferences deleted.");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || "Error deleting preferences");
            } else {
                setError("Error deleting preferences");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
            <h2>Notification Preferences</h2>
            <label>
                Preferred Method:
                <select
                    name="preferred_method"
                    value={form.preferred_method}
                    onChange={handleChange}
                >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="whatsapp">WhatsApp</option>
                </select>
            </label>
            <br />
            <label>
                Phone Number:
                <input
                    type="text"
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter email address"
                />
            </label>
            <br />
            <button type="submit" disabled={loading}>
                {preferences ? "Update Preferences" : "Save Preferences"}
            </button>
            {preferences && (
                <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    style={{ marginLeft: 8 }}
                >
                    Delete Preferences
                </button>
            )}
            <br />
            {loading && <span>Loading...</span>}
            {error && <span style={{ color: "red" }}>{error}</span>}
            {success && <span style={{ color: "green" }}>{success}</span>}
        </form>
    );
};

// Type for NotificationPreferenceResponse
interface NotificationPreferenceResponse {
    id: number;
    user_id: number;
    preferred_method: string;
    phone_number?: string;
    email?: string;
    created_at?: string;
    updated_at?: string;
}

export default NotificationPreferencesForm;
