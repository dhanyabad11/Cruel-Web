"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Calendar,
    Bell,
    MessageSquare,
    Link as LinkIcon,
    TrendingUp,
    CheckCircle2,
    Clock,
    AlertCircle,
} from "lucide-react";
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
    const [recentDeadlines, setRecentDeadlines] = useState<Deadline[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Fetch dashboard stats and recent deadlines
    useEffect(() => {
        const fetchData = async () => {
            if (!user || loading) return;

            try {
                const deadlinesResponse = await apiClient.getDeadlines();
                if (deadlinesResponse.data) {
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

                    // Get top 3 upcoming deadlines
                    const upcomingList = deadlines
                        .filter(
                            (d: Deadline) => new Date(d.due_date) >= now && d.status !== "completed"
                        )
                        .sort(
                            (a: Deadline, b: Deadline) =>
                                new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
                        )
                        .slice(0, 3);
                    setRecentDeadlines(upcomingList);
                } else {
                    setStats({
                        totalDeadlines: 0,
                        upcomingDeadlines: 0,
                        completedDeadlines: 0,
                        overdueDeadlines: 0,
                    });
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setStats({
                    totalDeadlines: 0,
                    upcomingDeadlines: 0,
                    completedDeadlines: 0,
                    overdueDeadlines: 0,
                });
            }
        };

        fetchData();
    }, [user, loading]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const getTimeUntil = (dueDate: string) => {
        const now = new Date();
        const due = new Date(dueDate);
        const diff = due.getTime() - now.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h`;
        return "Soon";
    };

    const getPriorityColor = (priority: string) => {
        switch (priority?.toLowerCase()) {
            case "high":
            case "urgent":
                return "text-red-600 bg-red-50 border-red-200";
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            default:
                return "text-blue-600 bg-blue-50 border-blue-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user.email?.split("@")[0]}!
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Here's what's happening with your deadlines
                    </p>
                </div>

                {/* Stats Grid - Compact & Clean */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {stats.totalDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">
                                    {stats.upcomingDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <Clock className="h-6 w-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">
                                    {stats.completedDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Overdue</p>
                                <p className="text-3xl font-bold text-red-600 mt-1">
                                    {stats.overdueDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions - Compact */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/deadlines"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
                        >
                            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-200">
                                <Calendar className="h-5 w-5 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">Deadlines</span>
                        </Link>
                        <Link
                            href="/whatsapp"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
                        >
                            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-200">
                                <MessageSquare className="h-5 w-5 text-green-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">WhatsApp</span>
                        </Link>
                        <Link
                            href="/settings/notifications"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
                        >
                            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-200">
                                <Bell className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">Settings</span>
                        </Link>
                        <Link
                            href="/portals"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
                        >
                            <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center mb-2 group-hover:bg-orange-200">
                                <LinkIcon className="h-5 w-5 text-orange-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">Portals</span>
                        </Link>
                    </div>
                </div>

                {/* Upcoming Deadlines & Tips */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Deadlines - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Upcoming Deadlines
                            </h2>
                            <Link
                                href="/deadlines"
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                        {recentDeadlines.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No upcoming deadlines</p>
                                <Link
                                    href="/deadlines"
                                    className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                                >
                                    Add your first deadline
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentDeadlines.map((deadline) => (
                                    <div
                                        key={deadline.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">
                                                {deadline.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-sm text-gray-600">
                                                    {new Date(deadline.due_date).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </p>
                                                <span
                                                    className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityColor(
                                                        deadline.priority
                                                    )}`}
                                                >
                                                    {deadline.priority}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-medium text-blue-600">
                                                {getTimeUntil(deadline.due_date)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">💡 Quick Tips</h2>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-sm text-gray-700">
                                    Set reminders at multiple intervals to stay ahead of deadlines
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                                <p className="text-sm text-gray-700">
                                    Use WhatsApp analysis to extract deadlines from group chats
                                </p>
                            </div>
                            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                                <p className="text-sm text-gray-700">
                                    Connect portals to auto-sync assignments from your courses
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
