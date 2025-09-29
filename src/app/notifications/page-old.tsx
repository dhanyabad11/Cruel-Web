"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Mail, MessageSquare, Clock, Save, CheckCircle } from "lucide-react";

interface NotificationSettings {
    email: {
        deadlineReminders: boolean;
        weeklyDigest: boolean;
        newDeadlines: boolean;
        overdueAlerts: boolean;
    };
    whatsapp: {
        deadlineReminders: boolean;
        dailyDigest: boolean;
        urgentAlerts: boolean;
    };
    inApp: {
        allNotifications: boolean;
        deadlineReminders: boolean;
        systemUpdates: boolean;
    };
    timing: {
        reminderDays: number;
        digestTime: string;
        urgentThreshold: number;
    };
}

export default function NotificationsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [settings, setSettings] = useState<NotificationSettings>({
        email: {
            deadlineReminders: true,
            weeklyDigest: true,
            newDeadlines: false,
            overdueAlerts: true
        },
        whatsapp: {
            deadlineReminders: false,
            dailyDigest: false,
            urgentAlerts: true
        },
        inApp: {
            allNotifications: true,
            deadlineReminders: true,
            systemUpdates: true
        },
        timing: {
            reminderDays: 3,
            digestTime: "09:00",
            urgentThreshold: 24
        }
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleToggle = (category: keyof NotificationSettings, key: string) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: !prev[category][key as keyof typeof prev[typeof category]]
            }
        }));
    };

    const handleTimingChange = (key: keyof NotificationSettings['timing'], value: string | number) => {
        setSettings(prev => ({
            ...prev,
            timing: {
                ...prev.timing,
                [key]: value
            }
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // TODO: Call API to save settings
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error("Error saving settings:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Notification Settings</h1>
                    <p className="text-gray-600">Manage how and when you receive notifications about your deadlines</p>
                </div>

                <div className="space-y-8">
                    {/* Email Notifications */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-6">
                            <Mail className="h-6 w-6 text-blue-600" />
                            <h2 className="text-xl font-semibold">Email Notifications</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Deadline Reminders</h3>
                                    <p className="text-sm text-gray-600">Get reminded about upcoming deadlines via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.email.deadlineReminders}
                                        onChange={() => handleToggle('email', 'deadlineReminders')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Weekly Digest</h3>
                                    <p className="text-sm text-gray-600">Receive a weekly summary of all your deadlines</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.email.weeklyDigest}
                                        onChange={() => handleToggle('email', 'weeklyDigest')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">New Deadline Alerts</h3>
                                    <p className="text-sm text-gray-600">Get notified when new deadlines are added</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.email.newDeadlines}
                                        onChange={() => handleToggle('email', 'newDeadlines')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Overdue Alerts</h3>
                                    <p className="text-sm text-gray-600">Get notified about overdue assignments</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.email.overdueAlerts}
                                        onChange={() => handleToggle('email', 'overdueAlerts')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* WhatsApp Notifications */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="h-6 w-6 text-green-600" />
                            <h2 className="text-xl font-semibold">WhatsApp Notifications</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Deadline Reminders</h3>
                                    <p className="text-sm text-gray-600">Get WhatsApp messages for upcoming deadlines</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.whatsapp.deadlineReminders}
                                        onChange={() => handleToggle('whatsapp', 'deadlineReminders')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Daily Digest</h3>
                                    <p className="text-sm text-gray-600">Daily summary of today&apos;s deadlines and tasks</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.whatsapp.dailyDigest}
                                        onChange={() => handleToggle('whatsapp', 'dailyDigest')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Urgent Alerts</h3>
                                    <p className="text-sm text-gray-600">Critical notifications for urgent deadlines</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.whatsapp.urgentAlerts}
                                        onChange={() => handleToggle('whatsapp', 'urgentAlerts')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* In-App Notifications */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="h-6 w-6 text-purple-600" />
                            <h2 className="text-xl font-semibold">In-App Notifications</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">All Notifications</h3>
                                    <p className="text-sm text-gray-600">Enable all in-app notifications</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.inApp.allNotifications}
                                        onChange={() => handleToggle('inApp', 'allNotifications')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">Deadline Reminders</h3>
                                    <p className="text-sm text-gray-600">Show deadline reminders in the app</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.inApp.deadlineReminders}
                                        onChange={() => handleToggle('inApp', 'deadlineReminders')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <h3 className="font-medium">System Updates</h3>
                                    <p className="text-sm text-gray-600">Notifications about app updates and features</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.inApp.systemUpdates}
                                        onChange={() => handleToggle('inApp', 'systemUpdates')}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Timing Settings */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="h-6 w-6 text-orange-600" />
                            <h2 className="text-xl font-semibold">Timing & Frequency</h2>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Reminder Days Before Deadline
                                </label>
                                <select
                                    value={settings.timing.reminderDays}
                                    onChange={(e) => handleTimingChange('reminderDays', parseInt(e.target.value))}
                                    className="input w-full max-w-xs"
                                >
                                    <option value={1}>1 day before</option>
                                    <option value={2}>2 days before</option>
                                    <option value={3}>3 days before</option>
                                    <option value={5}>5 days before</option>
                                    <option value={7}>1 week before</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Daily Digest Time
                                </label>
                                <input
                                    type="time"
                                    value={settings.timing.digestTime}
                                    onChange={(e) => handleTimingChange('digestTime', e.target.value)}
                                    className="input w-full max-w-xs"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Urgent Alert Threshold (hours before deadline)
                                </label>
                                <select
                                    value={settings.timing.urgentThreshold}
                                    onChange={(e) => handleTimingChange('urgentThreshold', parseInt(e.target.value))}
                                    className="input w-full max-w-xs"
                                >
                                    <option value={6}>6 hours</option>
                                    <option value={12}>12 hours</option>
                                    <option value={24}>24 hours</option>
                                    <option value={48}>2 days</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center pt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className={`btn ${saved ? 'btn-success' : 'btn-primary'} min-w-[200px]`}
                        >
                            {saving ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            ) : saved ? (
                                <CheckCircle className="h-4 w-4 mr-2" />
                            ) : (
                                <Save className="h-4 w-4 mr-2" />
                            )}
                            {saving ? "Saving..." : saved ? "Settings Saved!" : "Save Settings"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}