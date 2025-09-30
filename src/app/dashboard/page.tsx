"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Calendar, Bell, MessageSquare } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Deadline } from "@/types/api";

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

    // Fetch dashboard stats only when authenticated
    useEffect(() => {
        const fetchStats = async () => {
            // Don't fetch if not authenticated
            if (!user || loading) return;

            try {
                // Fetch real deadlines from API
                const deadlinesResponse = await apiClient.getDeadlines();
                if (deadlinesResponse.data) {
                    // API now returns array directly
                    const deadlines = deadlinesResponse.data;
                    const now = new Date();

                    const completed = deadlines.filter(
                        (d: Deadline) => d.status === "completed"
                    ).length;
                    const overdue = deadlines.filter(
                        (d: Deadline) => new Date(d.due_date) < now && d.status !== "completed"
                    ).length;
                    const upcoming = deadlines.filter(
                        (d: Deadline) => new Date(d.due_date) >= now && d.status !== "completed"
                    ).length;

                    setStats({
                        totalDeadlines: deadlines.length,
                        upcomingDeadlines: upcoming,
                        completedDeadlines: completed,
                        overdueDeadlines: overdue,
                    });
                } else {
                    // If no data, show zeros
                    setStats({
                        totalDeadlines: 0,
                        upcomingDeadlines: 0,
                        completedDeadlines: 0,
                        overdueDeadlines: 0,
                    });
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
                // Show zeros on error
                setStats({
                    totalDeadlines: 0,
                    upcomingDeadlines: 0,
                    completedDeadlines: 0,
                    overdueDeadlines: 0,
                });
            }
        };

        fetchStats();
    }, [user, loading]);

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
        <div className="min-h-screen bg-background">
            <Navigation />
            <div className="container mx-auto px-6 py-12">
                {/* Stunning Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent">
                        Welcome back!
                    </h1>
                    <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
                        Your intelligent deadline management dashboard - stay ahead of everything
                        that matters
                    </p>
                </div>

                {/* Stunning Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="card group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-content text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                <FileText className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-4xl font-bold text-foreground mb-2 font-mono">
                                {stats.totalDeadlines}
                            </div>
                            <div className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider">
                                Total Deadlines
                            </div>
                        </div>
                    </div>
                    <div className="card group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-warning/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-content text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-warning to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                <Calendar className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-4xl font-bold text-warning mb-2 font-mono">
                                {stats.upcomingDeadlines}
                            </div>
                            <div className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider">
                                Upcoming
                            </div>
                        </div>
                    </div>
                    <div className="card group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-success/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-content text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-success to-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                <FileText className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-4xl font-bold text-success mb-2 font-mono">
                                {stats.completedDeadlines}
                            </div>
                            <div className="text-sm font-semibold text-foreground-secondary uppercase tracking-wider">
                                Completed
                            </div>
                        </div>
                    </div>
                    <div className="card group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-danger/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="card-content text-center relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-danger to-accent rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                                <Bell className="w-10 h-10 text-white" />
                            </div>
                            <div className="text-4xl font-bold text-danger mb-2 font-mono">
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
