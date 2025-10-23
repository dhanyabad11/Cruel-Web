"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MessageSquare, Save, Send, CheckCircle, XCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://198.211.106.97";

export default function NotificationsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        } else if (user) {
            // Redirect to the proper notification settings page
            router.replace("/settings/notifications");
        }
    }, [user, loading, router]);

    // Legacy states for compatibility (not used anymore)
    const [isSaving, setIsSaving] = useState(false);
    const [testResults, setTestResults] = useState({
        email: null as boolean | null,
        push: null as boolean | null,
        whatsapp: null as boolean | null,
        sms: null as boolean | null,
    });
    const [testing, setTesting] = useState({
        email: false,
        push: false,
        whatsapp: false,
        sms: false,
    });
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSave = async () => {
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setIsSaving(false);
    };

    const testNotification = async (type: "email" | "push" | "whatsapp" | "sms") => {
        // Validate phone number for SMS/WhatsApp
        if (type === "whatsapp" || type === "sms") {
            if (!phoneNumber) {
                alert("Please enter your phone number to test SMS/WhatsApp notifications");
                return;
            }
            if (!phoneNumber.startsWith("+")) {
                alert("Phone number must start with + (e.g., +1234567890)");
                return;
            }
            if (phoneNumber.length < 10) {
                alert(
                    "Please enter a valid phone number (at least 10 digits after country code, e.g., +91XXXXXXXXXX)"
                );
                return;
            }
        }

        setTesting((prev) => ({ ...prev, [type]: true }));
        setTestResults((prev) => ({ ...prev, [type]: null }));

        try {
            const token = localStorage.getItem("auth_token");
            let url = `${API_URL}/api/notifications/test-notifications`;

            // For SMS and WhatsApp, we need phone number
            if ((type === "whatsapp" || type === "sms") && phoneNumber) {
                url = `${API_URL}/api/notifications/test-notifications-public?phone_number=${encodeURIComponent(
                    phoneNumber
                )}`;
            } else if (token) {
                // Use authenticated endpoint for email and push
                // (no-op, use the default URL)
            } else {
                // Fallback to public endpoint for email/push if no token
                url = `${API_URL}/api/notifications/test-notifications-public`;
            }

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (token && (type === "email" || type === "push")) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const response = await fetch(url, {
                method: "POST",
                headers,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const result = data.tests[type];

            setTestResults((prev) => ({
                ...prev,
                [type]: result && result.success === true,
            }));

            if (result && result.success) {
                alert(
                    `${type.toUpperCase()} notification sent successfully! Check your ${
                        type === "email"
                            ? "email"
                            : type === "push"
                            ? "browser"
                            : type === "sms"
                            ? "phone"
                            : "WhatsApp"
                    }`
                );
            } else {
                alert(
                    `${type.toUpperCase()} notification failed: ${result?.error || "Unknown error"}`
                );
            }
        } catch (error) {
            console.error(`Error testing ${type} notification:`, error);
            setTestResults((prev) => ({ ...prev, [type]: false }));
            alert(
                `Failed to test ${type} notification: ${
                    error instanceof Error ? error.message : "Unknown error"
                }`
            );
        } finally {
            setTesting((prev) => ({ ...prev, [type]: false }));
        }
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
                    {/* Phone Number Input for SMS/WhatsApp Testing */}
                    <div className="card">
                        <div className="card-content">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">
                                Test Phone Number
                            </h2>
                            <p className="text-slate-600 mb-4">
                                Enter your phone number to test SMS and WhatsApp notifications
                            </p>
                            <div className="flex items-center space-x-3">
                                <input
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+91XXXXXXXXXX or +1XXXXXXXXXX"
                                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <span className="text-sm text-slate-500">
                                    Format: +91XXXXXXXXXX (India) or +1XXXXXXXXXX (US)
                                </span>
                            </div>
                            <p className="text-xs text-amber-600 mt-2">
                                ⚠️ SMS and WhatsApp require a real phone number. Use your actual
                                phone number for testing (e.g., +91XXXXXXXXXX for India).
                            </p>
                        </div>
                    </div>
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
                            <p className="text-slate-600 mb-4">
                                Test email notifications using your registered email address.
                            </p>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => testNotification("email")}
                                    disabled={testing.email}
                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {testing.email ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    <span>{testing.email ? "Testing..." : "Test Email"}</span>
                                </button>
                                {testResults.email !== null && (
                                    <div className="flex items-center space-x-1">
                                        {testResults.email ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span
                                            className={`text-sm ${
                                                testResults.email
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {testResults.email ? "Success" : "Failed"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-content">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-slate-900">
                                        SMS Notifications
                                    </h2>
                                    <p className="text-slate-600">Receive text message reminders</p>
                                </div>
                            </div>
                            <p className="text-slate-600 mb-4">
                                Get deadline reminders via SMS to your phone.
                            </p>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => testNotification("sms")}
                                    disabled={testing.sms || !phoneNumber}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {testing.sms ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    <span>{testing.sms ? "Testing..." : "Test SMS"}</span>
                                </button>
                                {testResults.sms !== null && (
                                    <div className="flex items-center space-x-1">
                                        {testResults.sms ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span
                                            className={`text-sm ${
                                                testResults.sms ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {testResults.sms ? "Success" : "Failed"}
                                        </span>
                                    </div>
                                )}
                            </div>
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
                            <p className="text-slate-600 mb-4">
                                Connect WhatsApp for deadline reminders.
                            </p>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => testNotification("whatsapp")}
                                    disabled={testing.whatsapp}
                                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {testing.whatsapp ? (
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                    <span>{testing.whatsapp ? "Testing..." : "Test WhatsApp"}</span>
                                </button>
                                {testResults.whatsapp !== null && (
                                    <div className="flex items-center space-x-1">
                                        {testResults.whatsapp ? (
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <XCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span
                                            className={`text-sm ${
                                                testResults.whatsapp
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {testResults.whatsapp ? "Success" : "Failed"}
                                        </span>
                                    </div>
                                )}
                            </div>
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
