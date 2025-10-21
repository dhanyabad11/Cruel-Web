"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { Bell, Mail, MessageSquare, Smartphone, Save } from "lucide-react";

interface NotificationSettings {
    id?: number;
    email?: string;
    phone_number?: string;
    whatsapp_number?: string;
    email_enabled: boolean;
    sms_enabled: boolean;
    whatsapp_enabled: boolean;
    push_enabled: boolean;
}

interface NotificationReminder {
    id?: number;
    reminder_time: string;
    email_enabled: boolean;
    sms_enabled: boolean;
    whatsapp_enabled: boolean;
    push_enabled: boolean;
}

const REMINDER_OPTIONS = [
    { value: "1_hour", label: "1 Hour" },
    { value: "6_hours", label: "6 Hours" },
    { value: "1_day", label: "1 Day" },
    { value: "3_days", label: "3 Days" },
    { value: "1_week", label: "1 Week" },
];

export default function NotificationSettingsPage() {
    const [settings, setSettings] = useState<NotificationSettings>({
        email: "",
        phone_number: "",
        whatsapp_number: "",
        email_enabled: true,
        sms_enabled: false,
        whatsapp_enabled: false,
        push_enabled: true,
    });
    const [reminders, setReminders] = useState<NotificationReminder[]>([
        {
            reminder_time: "1_day",
            email_enabled: true,
            sms_enabled: false,
            whatsapp_enabled: false,
            push_enabled: true,
        },
    ]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                toast.error("Please login to view settings");
                return;
            }

            const response = await fetch("http://localhost:8000/api/settings/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSettings(data.settings);
                setReminders(data.reminders || []);
            }
        } catch (error) {
            console.error("Error fetching settings:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("auth_token");
            if (!token) {
                toast.error("Please login to save settings");
                return;
            }

            const settingsResponse = await fetch(
                "http://localhost:8000/api/settings/notifications",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(settings),
                }
            );

            const remindersResponse = await fetch(
                "http://localhost:8000/api/settings/reminders/bulk",
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ reminders }),
                }
            );

            if (settingsResponse.ok && remindersResponse.ok) {
                toast.success("Settings saved!");
                await fetchSettings();
            } else {
                toast.error("Failed to save settings");
            }
        } catch (error) {
            console.error("Error saving:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const toggleReminder = (
        time: string,
        platform: keyof Pick<
            NotificationReminder,
            "email_enabled" | "sms_enabled" | "whatsapp_enabled" | "push_enabled"
        >
    ) => {
        const existingIndex = reminders.findIndex((r) => r.reminder_time === time);

        if (existingIndex >= 0) {
            const updated = [...reminders];
            updated[existingIndex] = {
                ...updated[existingIndex],
                [platform]: !updated[existingIndex][platform],
            };

            // Remove reminder if all platforms are disabled
            const allDisabled =
                !updated[existingIndex].email_enabled &&
                !updated[existingIndex].sms_enabled &&
                !updated[existingIndex].whatsapp_enabled &&
                !updated[existingIndex].push_enabled;

            if (allDisabled) {
                updated.splice(existingIndex, 1);
            }

            setReminders(updated);
        } else {
            // Add new reminder
            setReminders([
                ...reminders,
                {
                    reminder_time: time,
                    email_enabled: platform === "email_enabled",
                    sms_enabled: platform === "sms_enabled",
                    whatsapp_enabled: platform === "whatsapp_enabled",
                    push_enabled: platform === "push_enabled",
                },
            ]);
        }
    };

    const isReminderEnabled = (
        time: string,
        platform: keyof Pick<
            NotificationReminder,
            "email_enabled" | "sms_enabled" | "whatsapp_enabled" | "push_enabled"
        >
    ) => {
        const reminder = reminders.find((r) => r.reminder_time === time);
        return reminder ? reminder[platform] : false;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navigation />
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Notification Settings
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Configure how you receive deadline reminders
                    </p>
                </div>

                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={settings.email || ""}
                                onChange={(e) =>
                                    setSettings({ ...settings, email: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone (SMS)
                            </label>
                            <input
                                type="tel"
                                value={settings.phone_number || ""}
                                onChange={(e) =>
                                    setSettings({ ...settings, phone_number: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+91XXXXXXXXXX"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                WhatsApp Number
                            </label>
                            <input
                                type="tel"
                                value={settings.whatsapp_number || ""}
                                onChange={(e) =>
                                    setSettings({ ...settings, whatsapp_number: e.target.value })
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="+91XXXXXXXXXX"
                            />
                        </div>
                    </div>
                </div>

                {/* Reminder Schedule - Compact Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Reminder Schedule
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Select when and how you want to be reminded before deadlines
                    </p>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Time Before
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <Mail className="h-4 w-4 mx-auto" aria-label="Email" />
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <Smartphone className="h-4 w-4 mx-auto" aria-label="SMS" />
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <MessageSquare
                                            className="h-4 w-4 mx-auto"
                                            aria-label="WhatsApp"
                                        />
                                    </th>
                                    <th className="text-center py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        <Bell className="h-4 w-4 mx-auto" aria-label="Push" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {REMINDER_OPTIONS.map((option) => (
                                    <tr
                                        key={option.value}
                                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                    >
                                        <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-300">
                                            {option.label}
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isReminderEnabled(
                                                    option.value,
                                                    "email_enabled"
                                                )}
                                                onChange={() =>
                                                    toggleReminder(option.value, "email_enabled")
                                                }
                                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isReminderEnabled(
                                                    option.value,
                                                    "sms_enabled"
                                                )}
                                                onChange={() =>
                                                    toggleReminder(option.value, "sms_enabled")
                                                }
                                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isReminderEnabled(
                                                    option.value,
                                                    "whatsapp_enabled"
                                                )}
                                                onChange={() =>
                                                    toggleReminder(option.value, "whatsapp_enabled")
                                                }
                                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={isReminderEnabled(
                                                    option.value,
                                                    "push_enabled"
                                                )}
                                                onChange={() =>
                                                    toggleReminder(option.value, "push_enabled")
                                                }
                                                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={saveSettings}
                        disabled={saving}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        <Save className="h-4 w-4" />
                        {saving ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </div>
        </div>
    );
}
