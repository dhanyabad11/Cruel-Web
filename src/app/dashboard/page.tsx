"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, FileText, Calendar, Bell, Plus, TrendingUp, Clock, CheckCircle } from "lucide-react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalDeadlines: 0,
        upcomingDeadlines: 0,
        completedDeadlines: 0,
        overdueDeadlines: 0
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Fetch dashboard stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                // This would normally fetch from the API
                // For now, we'll use mock data
                setStats({
                    totalDeadlines: 12,
                    upcomingDeadlines: 8,
                    completedDeadlines: 3,
                    overdueDeadlines: 1
                });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };

        if (user) {
            fetchStats();
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your dashboard...</p>
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

            <div className="page-container">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome back, {user.full_name || user.email?.split('@')[0]}! 👋
                    </h1>
                    <p className="text-lg text-gray-600">
                        Here&apos;s what&apos;s happening with your deadlines today.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Deadlines</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalDeadlines}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.upcomingDeadlines}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                <Clock className="h-6 w-6 text-orange-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-green-600">{stats.completedDeadlines}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Overdue</p>
                                <p className="text-3xl font-bold text-red-600">{stats.overdueDeadlines}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
                        <Link
                            href="/deadlines"
                            className="text-sm text-black font-medium hover:underline"
                        >
                            View all →
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link
                            href="/whatsapp"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                <MessageSquare className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Upload WhatsApp Chat</h3>
                                <p className="text-sm text-gray-600">Extract deadlines from messages</p>
                            </div>
                        </Link>

                        <Link
                            href="/deadlines"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                <Plus className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Add Manual Deadline</h3>
                                <p className="text-sm text-gray-600">Create a new deadline</p>
                            </div>
                        </Link>

                        <Link
                            href="/notifications"
                            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                <Bell className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">Notification Settings</h3>
                                <p className="text-sm text-gray-600">Configure reminders</p>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* WhatsApp Integration Card */}
                    <Link href="/whatsapp" className="group block">
                        <div className="card p-8 hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                                    <MessageSquare className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                                        WhatsApp Parser
                                    </h3>
                                    <p className="text-gray-600">Extract deadlines from chat messages</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Upload WhatsApp chat exports or parse individual messages to automatically detect important deadlines.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                                <span className="ml-2">Last used 2 hours ago</span>
                            </div>
                        </div>
                    </Link>

                    {/* Deadlines Card */}
                    <Link href="/deadlines" className="group block">
                        <div className="card p-8 hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                                        Deadline Management
                                    </h3>
                                    <p className="text-gray-600">View and manage upcoming deadlines</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Track all your important deadlines in one place. Get reminders before they&apos;re due.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {stats.upcomingDeadlines} upcoming
                                </span>
                                <span className="ml-2">Next: Assignment due tomorrow</span>
                            </div>
                        </div>
                    </Link>

                    {/* Portal Scraping Card */}
                    <div className="card p-8 opacity-75">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                                <FileText className="h-6 w-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Portal Scraping
                                </h3>
                                <p className="text-gray-600">Auto-detect from course portals</p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            Connect your course portals to automatically detect assignments and deadlines.
                        </p>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                Coming Soon
                            </span>
                        </div>
                    </div>

                    {/* Notifications Card */}
                    <Link href="/notifications" className="group block">
                        <div className="card p-8 hover:border-gray-300 transition-all duration-200">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                                    <Bell className="h-6 w-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                                        Smart Notifications
                                    </h3>
                                    <p className="text-gray-600">Configure reminder preferences</p>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Get timely notifications via WhatsApp, email, or SMS before deadlines.
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                    Enabled
                                </span>
                                <span className="ml-2">WhatsApp notifications active</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
