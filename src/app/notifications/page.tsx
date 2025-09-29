"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, Mail, MessageSquare, Save } from "lucide-react";

export default function NotificationsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navigation />
            <div className="max-w-4xl mx-auto p-6">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-slate-900 mb-3">
                        Notification Settings
                    </h1>
                    <p className="text-lg text-slate-600">
                        Customize how and when you receive deadline reminders
                    </p>
                </div>

                <div className="space-y-8">
                    <div className="card">
                        <div className="card-content">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        Email Notifications
                                    </h2>
                                    <p className="text-slate-600">Receive updates via email</p>
                                </div>
                            </div>
                            <p className="text-slate-600">
                                Configure your email notification preferences here.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        Push Notifications
                                    </h2>
                                    <p className="text-slate-600">
                                        Browser and mobile notifications
                                    </p>
                                </div>
                            </div>
                            <p className="text-slate-600">
                                Set up push notifications for instant alerts.
                            </p>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        WhatsApp Notifications
                                    </h2>
                                    <p className="text-slate-600">Get reminders on WhatsApp</p>
                                </div>
                            </div>
                            <p className="text-slate-600">
                                Connect WhatsApp for deadline reminders.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-center">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn btn-primary flex items-center space-x-2 px-8 py-3"
                    >
                        {isSaving ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Saving...</span>
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                <span>Save Settings</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
