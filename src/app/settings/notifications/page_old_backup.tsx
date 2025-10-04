"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";

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

interface NotificationSettingsWithReminders {
    settings: NotificationSettings;
    reminders: NotificationReminder[];
}

const REMINDER_FREQUENCIES = [
    { value: "1_hour", label: "1 Hour Before" },
    { value: "6_hours", label: "6 Hours Before" },
    { value: "1_day", label: "1 Day Before" },
    { value: "3_days", label: "3 Days Before" },
    { value: "1_week", label: "1 Week Before" },
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
                toast.error("Please login to view notification settings");
                return;
            }

            const response = await fetch("http://localhost:8000/api/settings/notifications", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data: NotificationSettingsWithReminders = await response.json();
                setSettings(data.settings);
                setReminders(data.reminders || []);
            } else {
                console.error("Failed to fetch settings");
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

            // Save basic settings
            const settingsResponse = await fetch("http://localhost:8000/api/settings/notifications", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(settings),
            });

            // Save reminders
            const remindersResponse = await fetch("http://localhost:8000/api/settings/reminders/bulk", {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reminders }),
            });

            if (settingsResponse.ok && remindersResponse.ok) {
                toast.success("Notification settings saved successfully!");
                const updatedSettings = await settingsResponse.json();
                const updatedReminders = await remindersResponse.json();
                setSettings(updatedSettings);
                setReminders(updatedReminders);
            } else {
                const error = await settingsResponse.json().catch(() => ({}));
                toast.error(error.detail || "Failed to save settings");
            }
        } catch (error) {
            console.error("Error saving settings:", error);
            toast.error("Failed to save settings");
        } finally {
            setSaving(false);
        }
    };

    const validatePhoneNumber = (phone: string) => {
        if (!phone) return true;
        const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\s|-/g, ""));
    };

    const formatPhoneNumber = (phone: string) => {
        if (!phone) return "";
        // Remove all non-digits
        const digits = phone.replace(/\D/g, "");
        // If it's 10 digits, add +91
        if (digits.length === 10) {
            return `+91${digits}`;
        }
        // If it starts with 91 and has 12 digits, add +
        if (digits.length === 12 && digits.startsWith("91")) {
            return `+${digits}`;
        }
        return phone;
    };

    const addReminder = () => {
        const newReminder: NotificationReminder = {
            reminder_time: "1_day",
            email_enabled: false,
            sms_enabled: false,
            whatsapp_enabled: false,
            push_enabled: false,
        };
        setReminders([...reminders, newReminder]);
    };

    const updateReminder = (index: number, updatedReminder: NotificationReminder) => {
        const newReminders = [...reminders];
        newReminders[index] = updatedReminder;
        setReminders(newReminders);
    };

    const removeReminder = (index: number) => {
        if (reminders.length > 1) {
            const newReminders = reminders.filter((_, i) => i !== index);
            setReminders(newReminders);
        }
    };

    // Utility function for reminder time labels (if needed for future use)
    // const getReminderTimeLabel = (time: string) => {
    //     const labels: Record<string, string> = {
    //         "1_hour": "1 Hour Before",
    //         "6_hours": "6 Hours Before",
    //         "1_day": "1 Day Before",
    //         "3_days": "3 Days Before",
    //         "1_week": "1 Week Before",
    //     };
    //     return labels[time] || time;
    // };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-700 rounded w-1/3 mb-6"></div>
                        <div className="space-y-4">
                            <div className="h-20 bg-gray-800 rounded"></div>
                            <div className="h-20 bg-gray-800 rounded"></div>
                            <div className="h-20 bg-gray-800 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            <Navigation />
            <div className="p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Notification Settings
                        </h1>
                        <p className="text-gray-400">
                            Configure how you want to receive deadline reminders
                        </p>
                    </div>

                    {/* Settings Form */}
                    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
                        {/* Contact Information */}
                        <div className="border-b border-gray-700 pb-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={settings.email || ""}
                                        onChange={(e) =>
                                            setSettings({ ...settings, email: e.target.value })
                                        }
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                {/* Phone Number for SMS */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Phone Number (SMS)
                                    </label>
                                    <input
                                        type="tel"
                                        value={settings.phone_number || ""}
                                        onChange={(e) => {
                                            const phone = formatPhoneNumber(e.target.value);
                                            setSettings({ ...settings, phone_number: phone });
                                        }}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+91XXXXXXXXXX"
                                    />
                                    {settings.phone_number &&
                                        !validatePhoneNumber(settings.phone_number) && (
                                            <p className="text-red-400 text-sm mt-1">
                                                Please enter a valid Indian phone number
                                            </p>
                                        )}
                                </div>

                                {/* WhatsApp Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        WhatsApp Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={settings.whatsapp_number || ""}
                                        onChange={(e) => {
                                            const phone = formatPhoneNumber(e.target.value);
                                            setSettings({ ...settings, whatsapp_number: phone });
                                        }}
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="+91XXXXXXXXXX"
                                    />
                                    {settings.whatsapp_number &&
                                        !validatePhoneNumber(settings.whatsapp_number) && (
                                            <p className="text-red-400 text-sm mt-1">
                                                Please enter a valid Indian phone number
                                            </p>
                                        )}
                                </div>
                            </div>
                        </div>

                        {/* Notification Channels */}
                        <div className="border-b border-gray-700 pb-6">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                Notification Channels
                            </h2>

                            <div className="space-y-4">
                                {/* Email Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-white">
                                            Email Notifications
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Receive deadline reminders via email
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.email_enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    email_enabled: e.target.checked,
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* SMS Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-white">
                                            SMS Notifications
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Receive deadline reminders via SMS
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.sms_enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    sms_enabled: e.target.checked,
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* WhatsApp Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-white">
                                            WhatsApp Notifications
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Receive deadline reminders via WhatsApp
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.whatsapp_enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    whatsapp_enabled: e.target.checked,
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>

                                {/* Push Notifications */}
                                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div>
                                        <h3 className="font-medium text-white">
                                            Push Notifications
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            Receive browser push notifications
                                        </p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.push_enabled}
                                            onChange={(e) =>
                                                setSettings({
                                                    ...settings,
                                                    push_enabled: e.target.checked,
                                                })
                                            }
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Multiple Reminders */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Reminder Schedule
                                </h2>
                                <button
                                    onClick={addReminder}
                                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    + Add Reminder
                                </button>
                            </div>

                            <div className="space-y-4">
                                {reminders.map((reminder, index) => (
                                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-medium text-white">
                                                Reminder {index + 1}
                                            </h3>
                                            {reminders.length > 1 && (
                                                <button
                                                    onClick={() => removeReminder(index)}
                                                    className="text-red-400 hover:text-red-300 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </div>

                                        {/* Reminder Time */}
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Send reminder
                                            </label>
                                            <select
                                                value={reminder.reminder_time}
                                                onChange={(e) =>
                                                    updateReminder(index, {
                                                        ...reminder,
                                                        reminder_time: e.target.value,
                                                    })
                                                }
                                                className="w-full bg-gray-600 border border-gray-500 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {REMINDER_FREQUENCIES.map((freq) => (
                                                    <option key={freq.value} value={freq.value}>
                                                        {freq.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Platform Selection for this Reminder */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Send via
                                            </label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {/* Email */}
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reminder.email_enabled}
                                                        onChange={(e) =>
                                                            updateReminder(index, {
                                                                ...reminder,
                                                                email_enabled: e.target.checked,
                                                            })
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        📧 Email
                                                    </span>
                                                </label>

                                                {/* SMS */}
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reminder.sms_enabled}
                                                        onChange={(e) =>
                                                            updateReminder(index, {
                                                                ...reminder,
                                                                sms_enabled: e.target.checked,
                                                            })
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        📱 SMS
                                                    </span>
                                                </label>

                                                {/* WhatsApp */}
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reminder.whatsapp_enabled}
                                                        onChange={(e) =>
                                                            updateReminder(index, {
                                                                ...reminder,
                                                                whatsapp_enabled: e.target.checked,
                                                            })
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        💬 WhatsApp
                                                    </span>
                                                </label>

                                                {/* Push */}
                                                <label className="flex items-center space-x-2 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={reminder.push_enabled}
                                                        onChange={(e) =>
                                                            updateReminder(index, {
                                                                ...reminder,
                                                                push_enabled: e.target.checked,
                                                            })
                                                        }
                                                        className="w-4 h-4 text-blue-600 bg-gray-600 border-gray-500 rounded focus:ring-blue-500"
                                                    />
                                                    <span className="text-sm text-gray-300">
                                                        🔔 Push
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end pt-6">
                            <button
                                onClick={saveSettings}
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors"
                            >
                                {saving ? "Saving..." : "Save Settings"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
