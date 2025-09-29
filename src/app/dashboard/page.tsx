"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Calendar, Bell, MessageSquare } from "lucide-react";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalDeadlines: 0,
        upcomingDeadlines: 0,
        completedDeadlines: 0,
        overdueDeadlines: 0,
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
                    overdueDeadlines: 1,
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e0e7ff]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4f8cff] mx-auto"></div>
                    <p className="mt-4 text-[#6b7280]">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <div className="animate-fade-in">
                        <h1 className="text-4xl font-bold text-slate-900 mb-3">
                            Welcome back, {user.full_name || user.email?.split("@")[0]}
                        </h1>
                        <p className="text-xl text-slate-600">
                            Here&apos;s your deadline overview and productivity insights
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="card group">
                        <div className="card-content text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">
                                {stats.totalDeadlines}
                            </div>
                            <div className="text-sm font-medium text-slate-600">
                                Total deadlines
                            </div>
                        </div>
                    </div>
                    <div className="card group">
                        <div className="card-content text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-orange-600 mb-1">
                                {stats.upcomingDeadlines}
                            </div>
                            <div className="text-sm font-medium text-slate-600">Upcoming</div>
                        </div>
                    </div>
                    <div className="card group">
                        <div className="card-content text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {stats.completedDeadlines}
                            </div>
                            <div className="text-sm font-medium text-slate-600">Completed</div>
                        </div>
                    </div>
                    <div className="card group">
                        <div className="card-content text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <Bell className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-3xl font-bold text-red-600 mb-1">
                                {stats.overdueDeadlines}
                            </div>
                            <div className="text-sm font-medium text-slate-600">Overdue</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card mb-12">
                    <div className="card-header">
                        <h2 className="card-title text-2xl">Quick Actions</h2>
                        <p className="card-description">
                            Get started with these essential features
                        </p>
                    </div>
                    <div className="card-content">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link
                                href="/deadlines"
                                className="p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                    <Calendar className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">
                                    View Deadlines
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Manage all your upcoming tasks
                                </p>
                            </Link>
                            <Link
                                href="/whatsapp"
                                className="p-6 rounded-xl border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                                    <MessageSquare className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">
                                    WhatsApp Analysis
                                </h3>
                                <p className="text-sm text-slate-600">
                                    Extract deadlines from chats
                                </p>
                            </Link>
                            <Link
                                href="/notifications"
                                className="p-6 rounded-xl border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                    <Bell className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">Notifications</h3>
                                <p className="text-sm text-slate-600">Customize your alerts</p>
                            </Link>
                            <Link
                                href="/portals"
                                className="p-6 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all duration-200 group"
                            >
                                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                    <FileText className="w-6 h-6 text-orange-600" />
                                </div>
                                <h3 className="font-semibold text-slate-900 mb-2">
                                    Connect Portals
                                </h3>
                                <p className="text-sm text-slate-600">Link your course platforms</p>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Recent Activity</h2>
                            <p className="card-description">Your latest deadline updates</p>
                        </div>
                        <div className="card-content space-y-4">
                            <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-900">
                                        New deadline added
                                    </h4>
                                    <p className="text-sm text-slate-600">
                                        Mathematics Assignment - Due in 5 days
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-900">Task completed</h4>
                                    <p className="text-sm text-slate-600">
                                        Physics Lab Report submitted
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-slate-900">Reminder sent</h4>
                                    <p className="text-sm text-slate-600">
                                        Chemistry exam notification delivered
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Productivity Insights</h2>
                            <p className="card-description">Tips to stay organized</p>
                        </div>
                        <div className="card-content space-y-4">
                            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                <h4 className="font-medium text-slate-900 mb-2">💡 Pro Tip</h4>
                                <p className="text-sm text-slate-600">
                                    Upload your WhatsApp group chats weekly to catch any missed
                                    assignment announcements.
                                </p>
                            </div>

                            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                <h4 className="font-medium text-slate-900 mb-2">
                                    ✅ Best Practice
                                </h4>
                                <p className="text-sm text-slate-600">
                                    Set multiple reminders: 1 week, 3 days, and 1 day before each
                                    deadline for optimal preparation.
                                </p>
                            </div>

                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="font-medium text-slate-900 mb-2">🎯 Goal Setting</h4>
                                <p className="text-sm text-slate-600">
                                    Connect your university portal to automatically sync new
                                    assignments and never miss updates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
