"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { MessageSquare, FileText, Calendar, Bell } from "lucide-react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {user.full_name || user.email}!
                        </h1>
                        <p className="mt-2 text-gray-600">
                            Manage your deadlines and stay on top of your tasks.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* WhatsApp Integration Card */}
                        <Link href="/whatsapp" className="group">
                            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-200">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <MessageSquare className="h-8 w-8 text-green-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600">
                                                WhatsApp Parser
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Extract deadlines from chat messages
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600">
                                            Upload WhatsApp chat exports or parse individual
                                            messages to automatically detect important deadlines.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Deadlines Card */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Calendar className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            My Deadlines
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            View and manage upcoming deadlines
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Track all your important deadlines in one place. Get
                                        reminders before they&apos;re due.
                                    </p>
                                    <p className="mt-2 text-sm text-indigo-600">Coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Portal Scraping Card */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <FileText className="h-8 w-8 text-purple-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Portal Scraping
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Auto-detect from course portals
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Connect your course portals to automatically detect
                                        assignments and deadlines.
                                    </p>
                                    <p className="mt-2 text-sm text-indigo-600">Coming soon...</p>
                                </div>
                            </div>
                        </div>

                        {/* Notifications Card */}
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Bell className="h-8 w-8 text-yellow-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Notifications
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Smart reminders and alerts
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Get timely notifications via WhatsApp, email, or SMS before
                                        deadlines.
                                    </p>
                                    <p className="mt-2 text-sm text-indigo-600">Coming soon...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white shadow rounded-lg">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                        </div>
                        <div className="p-6">
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/whatsapp"
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Parse WhatsApp Messages
                                </Link>
                                <button
                                    disabled
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
                                >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Add Manual Deadline
                                </button>
                                <button
                                    disabled
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-500 bg-gray-100 cursor-not-allowed"
                                >
                                    <FileText className="mr-2 h-4 w-4" />
                                    Connect Portal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
