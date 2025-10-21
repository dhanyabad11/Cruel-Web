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
import { usePreventBack } from "@/hooks/usePreventBack";

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    usePreventBack(); // Prevent back button navigation
    const [stats, setStats] = useState({
        totalDeadlines: 0,
        upcomingDeadlines: 0,
        completedDeadlines: 0,
        overdueDeadlines: 0,
    });
    const [recentDeadlines, setRecentDeadlines] = useState<Deadline[]>([]);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
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
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-gray-900">
                <div className="text-[#6B7280] dark:text-gray-400 font-light">Loading...</div>
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
                return "text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 border-red-600 dark:border-red-400";
            case "medium":
                return "text-[#2563EB] dark:text-blue-400 bg-white dark:bg-gray-800 border-[#2563EB] dark:border-blue-400";
            default:
                return "text-[#6B7280] dark:text-gray-400 bg-white dark:bg-gray-800 border-[#D1D5DB] dark:border-gray-600";
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 transition-colors">
            <Navigation />
            <div className="max-w-6xl mx-auto px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-light text-[#1A1A1A] dark:text-white mb-2">
                        Welcome back, {user.full_name || user.email?.split("@")[0]}
                    </h1>
                    <p className="text-[#6B7280] dark:text-gray-400 font-light">
                        Here&apos;s what&apos;s happening with your deadlines
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                    Total
                                </p>
                                <p className="text-3xl font-light text-[#1A1A1A] dark:text-white">
                                    {stats.totalDeadlines}
                                </p>
                            </div>
                            <Calendar
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                    Upcoming
                                </p>
                                <p className="text-3xl font-light text-[#1A1A1A] dark:text-white">
                                    {stats.upcomingDeadlines}
                                </p>
                            </div>
                            <Clock
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                    Completed
                                </p>
                                <p className="text-3xl font-light text-[#1A1A1A] dark:text-white">
                                    {stats.completedDeadlines}
                                </p>
                            </div>
                            <CheckCircle2
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 transition-colors">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                    Overdue
                                </p>
                                <p className="text-3xl font-light text-red-600 dark:text-red-400">
                                    {stats.overdueDeadlines}
                                </p>
                            </div>
                            <AlertCircle
                                className="w-6 h-6 text-red-600 dark:text-red-400"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 mb-12">
                    <h2 className="text-lg font-light text-[#1A1A1A] dark:text-white mb-6">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/deadlines"
                            className="flex flex-col items-center p-4 border border-[#D1D5DB] dark:border-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                        >
                            <Calendar
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mb-2"
                                strokeWidth={1.5}
                            />
                            <span className="text-sm font-light text-[#1A1A1A] dark:text-white">
                                Deadlines
                            </span>
                        </Link>
                        <Link
                            href="/whatsapp"
                            className="flex flex-col items-center p-4 border border-[#D1D5DB] dark:border-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                        >
                            <MessageSquare
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mb-2"
                                strokeWidth={1.5}
                            />
                            <span className="text-sm font-light text-[#1A1A1A] dark:text-white">
                                WhatsApp
                            </span>
                        </Link>
                        <Link
                            href="/settings/notifications"
                            className="flex flex-col items-center p-4 border border-[#D1D5DB] dark:border-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                        >
                            <Bell
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mb-2"
                                strokeWidth={1.5}
                            />
                            <span className="text-sm font-light text-[#1A1A1A] dark:text-white">
                                Settings
                            </span>
                        </Link>
                        <Link
                            href="/portals"
                            className="flex flex-col items-center p-4 border border-[#D1D5DB] dark:border-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                        >
                            <LinkIcon
                                className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mb-2"
                                strokeWidth={1.5}
                            />
                            <span className="text-sm font-light text-[#1A1A1A] dark:text-white">
                                Portals
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-light text-[#1A1A1A] dark:text-white">
                            Upcoming Deadlines
                        </h2>
                        <Link
                            href="/deadlines"
                            className="text-sm font-light text-[#2563EB] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300"
                        >
                            View all →
                        </Link>
                    </div>
                    {recentDeadlines.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar
                                className="w-12 h-12 mx-auto mb-3 text-[#6B7280] dark:text-gray-400"
                                strokeWidth={1.5}
                            />
                            <p className="text-[#6B7280] dark:text-gray-400 font-light mb-2">
                                No upcoming deadlines
                            </p>
                            <Link
                                href="/deadlines"
                                className="text-sm font-light text-[#2563EB] dark:text-blue-400 hover:text-[#1E40AF]"
                            >
                                Add your first deadline
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {recentDeadlines.map((deadline) => (
                                <div
                                    key={deadline.id}
                                    className="flex items-center justify-between p-4 border border-[#D1D5DB] dark:border-gray-700 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                                >
                                    <div className="flex-1">
                                        <h3 className="font-light text-[#1A1A1A] dark:text-white">
                                            {deadline.title}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <p className="text-sm font-light text-[#6B7280] dark:text-gray-400">
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
                                                className={`text-xs font-light px-2 py-0.5 border ${getPriorityColor(
                                                    deadline.priority
                                                )}`}
                                            >
                                                {deadline.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-sm font-light text-[#2563EB] dark:text-blue-400">
                                            {getTimeUntil(deadline.due_date)}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
