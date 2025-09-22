"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import {
    Bell,
    Smartphone,
    MessageSquare,
    Clock,
    Settings,
    CheckCircle,
    XCircle,
    AlertTriangle,
} from "lucide-react";
import { format, parseISO } from "date-fns";

interface NotificationPreference {
    id: number;
    type: "sms" | "whatsapp";
    enabled: boolean;
    phone_number: string;
    reminder_times: number[]; // minutes before deadline
    daily_summary: boolean;
    overdue_alerts: boolean;
}

interface NotificationHistory {
    id: number;
    type: "sms" | "whatsapp";
    phone_number: string;
    message: string;
    status: "pending" | "sent" | "delivered" | "failed";
    sent_at: string;
    delivered_at?: string;
    error_message?: string;
}

export default function NotificationsPage() {
    const [preferences, setPreferences] = useState<NotificationPreference[]>([]);
    const [history, setHistory] = useState<NotificationHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"preferences" | "history">("preferences");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // TODO: Fetch from API
                // const [prefsRes, historyRes] = await Promise.all([
                //   apiService.notifications.getPreferences(),
                //   apiService.notifications.getHistory(),
                // ]);
                // setPreferences(prefsRes.data);
                // setHistory(historyRes.data);

                // Mock data for demo
                setPreferences(mockPreferences);
                setHistory(mockHistory);
            } catch (error) {
                console.error("Error fetching notification data:", error);
                setPreferences(mockPreferences);
                setHistory(mockHistory);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "delivered":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "sent":
                return <Clock className="h-4 w-4 text-blue-500" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-500" />;
            case "pending":
                return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
            default:
                return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "delivered":
                return "bg-green-100 text-green-800";
            case "sent":
                return "bg-blue-100 text-blue-800";
            case "failed":
                return "bg-red-100 text-red-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    if (loading) {
        return (
            <DashboardLayout title="Notifications">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Notifications">
            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-md">
                                <Bell className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Sent</p>
                                <p className="text-2xl font-bold text-gray-900">{history.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-md">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Delivered</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {history.filter((h) => h.status === "delivered").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-red-100 rounded-md">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Failed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {history.filter((h) => h.status === "failed").length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-md">
                                <Settings className="h-6 w-6 text-purple-600" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Channels</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {preferences.filter((p) => p.enabled).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab("preferences")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "preferences"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                Preferences
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === "history"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            >
                                History
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === "preferences" ? (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Notification Preferences
                                    </h3>
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                        <Bell className="h-4 w-4 mr-2" />
                                        Add Channel
                                    </button>
                                </div>

                                {preferences.map((pref) => (
                                    <div
                                        key={pref.id}
                                        className="border border-gray-200 rounded-lg p-6"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <div className="p-2 bg-gray-100 rounded-md">
                                                    {pref.type === "sms" ? (
                                                        <Smartphone className="h-5 w-5 text-gray-600" />
                                                    ) : (
                                                        <MessageSquare className="h-5 w-5 text-green-600" />
                                                    )}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold text-gray-900 capitalize">
                                                        {pref.type} Notifications
                                                    </h4>
                                                    <p className="text-sm text-gray-600">
                                                        {pref.phone_number}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-4">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        pref.enabled
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {pref.enabled ? "Enabled" : "Disabled"}
                                                </span>
                                                <button
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                        pref.enabled
                                                            ? "bg-indigo-600"
                                                            : "bg-gray-200"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                            pref.enabled
                                                                ? "translate-x-6"
                                                                : "translate-x-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {pref.enabled && (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Reminder Times (minutes before)
                                                    </label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {pref.reminder_times.map((time) => (
                                                            <span
                                                                key={time}
                                                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                                            >
                                                                {time}m
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={pref.daily_summary}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        readOnly
                                                    />
                                                    <label className="ml-2 text-sm text-gray-700">
                                                        Daily Summary
                                                    </label>
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={pref.overdue_alerts}
                                                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                                        readOnly
                                                    />
                                                    <label className="ml-2 text-sm text-gray-700">
                                                        Overdue Alerts
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Notification History
                                </h3>

                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Type & Recipient
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Message
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Sent At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {history.map((notification) => (
                                                <tr key={notification.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="p-1 bg-gray-100 rounded">
                                                                {notification.type === "sms" ? (
                                                                    <Smartphone className="h-4 w-4 text-gray-600" />
                                                                ) : (
                                                                    <MessageSquare className="h-4 w-4 text-green-600" />
                                                                )}
                                                            </div>
                                                            <div className="ml-3">
                                                                <div className="text-sm font-medium text-gray-900 capitalize">
                                                                    {notification.type}
                                                                </div>
                                                                <div className="text-sm text-gray-500">
                                                                    {notification.phone_number}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                                            {notification.message}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {getStatusIcon(notification.status)}
                                                            <span
                                                                className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(
                                                                    notification.status
                                                                )}`}
                                                            >
                                                                {notification.status}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {format(
                                                            parseISO(notification.sent_at),
                                                            "MMM d, HH:mm"
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Mock data for demo purposes
const mockPreferences: NotificationPreference[] = [
    {
        id: 1,
        type: "sms",
        enabled: true,
        phone_number: "+1234567890",
        reminder_times: [60, 30, 15],
        daily_summary: true,
        overdue_alerts: true,
    },
    {
        id: 2,
        type: "whatsapp",
        enabled: false,
        phone_number: "+1234567890",
        reminder_times: [120, 60, 30],
        daily_summary: false,
        overdue_alerts: true,
    },
];

const mockHistory: NotificationHistory[] = [
    {
        id: 1,
        type: "sms",
        phone_number: "+1234567890",
        message: "Reminder: 'Complete project proposal' is due in 30 minutes",
        status: "delivered",
        sent_at: "2025-09-21T09:30:00Z",
        delivered_at: "2025-09-21T09:30:15Z",
    },
    {
        id: 2,
        type: "sms",
        phone_number: "+1234567890",
        message: "Daily Summary: You have 3 deadlines due today",
        status: "delivered",
        sent_at: "2025-09-21T09:00:00Z",
        delivered_at: "2025-09-21T09:00:08Z",
    },
    {
        id: 3,
        type: "whatsapp",
        phone_number: "+1234567890",
        message: "OVERDUE: 'Deploy to production' was due 2 hours ago",
        status: "failed",
        sent_at: "2025-09-21T08:00:00Z",
        error_message: "Invalid phone number format",
    },
];
