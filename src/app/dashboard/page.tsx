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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navigation />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {user.email?.split("@")[0]}!
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Here&apos;s what&apos;s happening with your deadlines
                    </p>
                </div>

                {/* Stats Grid - Compact & Clean */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total
                                </p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                    {stats.totalDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Upcoming
                                </p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-1">
                                    {stats.upcomingDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Completed
                                </p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                                    {stats.completedDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Overdue
                                </p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                                    {stats.overdueDeadlines}
                                </p>
                            </div>
                            <div className="h-12 w-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions - Compact */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/deadlines"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                        >
                            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50">
                                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                Deadlines
                            </span>
                        </Link>
                        <Link
                            href="/whatsapp"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group"
                        >
                            <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-green-200 dark:group-hover:bg-green-900/50">
                                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                WhatsApp
                            </span>
                        </Link>
                        <Link
                            href="/settings/notifications"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all group"
                        >
                            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50">
                                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                Settings
                            </span>
                        </Link>
                        <Link
                            href="/portals"
                            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all group"
                        >
                            <div className="h-10 w-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/50">
                                <LinkIcon className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                Portals
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Upcoming Deadlines & Tips */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Upcoming Deadlines - Takes 2 columns */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Upcoming Deadlines
                            </h2>
                            <Link
                                href="/deadlines"
                                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            >
                                View all →
                            </Link>
                        </div>
                        {recentDeadlines.length === 0 ? (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>No upcoming deadlines</p>
                                <Link
                                    href="/deadlines"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline mt-2 inline-block"
                                >
                                    Add your first deadline
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {recentDeadlines.map((deadline) => (
                                    <div
                                        key={deadline.id}
                                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                                    >
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900 dark:text-white">
                                                {deadline.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
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
                                            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                                {getTimeUntil(deadline.due_date)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            💡 Quick Tips
                        </h2>
                        <div className="space-y-4">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Set reminders at multiple intervals to stay ahead of deadlines
                                </p>
                            </div>
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Use WhatsApp analysis to extract deadlines from group chats
                                </p>
                            </div>
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
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
