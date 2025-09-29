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
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome back, {user.full_name || user.email?.split("@")[0]}
                    </h1>
                    <p className="text-gray-600">Here&apos;s your deadline overview</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="card text-center">
                        <div className="text-2xl font-bold mb-1">{stats.totalDeadlines}</div>
                        <div className="text-sm text-gray-600">Total deadlines</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-2xl font-bold mb-1 text-orange-600">
                            {stats.upcomingDeadlines}
                        </div>
                        <div className="text-sm text-gray-600">Upcoming</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-2xl font-bold mb-1 text-green-600">
                            {stats.completedDeadlines}
                        </div>
                        <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="card text-center">
                        <div className="text-2xl font-bold mb-1 text-red-600">
                            {stats.overdueDeadlines}
                        </div>
                        <div className="text-sm text-gray-600">Overdue</div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mb-12">
                    <h2 className="text-lg font-semibold mb-4">Quick actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/deadlines" className="card hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <Calendar className="h-5 w-5" />
                                <span className="font-medium">View deadlines</span>
                            </div>
                        </Link>
                        <Link href="/whatsapp" className="card hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <MessageSquare className="h-5 w-5" />
                                <span className="font-medium">Upload WhatsApp</span>
                            </div>
                        </Link>
                        <Link
                            href="/notifications"
                            className="card hover:shadow-md transition-shadow"
                        >
                            <div className="flex items-center gap-3">
                                <Bell className="h-5 w-5" />
                                <span className="font-medium">Notifications</span>
                            </div>
                        </Link>
                        <Link href="/portals" className="card hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5" />
                                <span className="font-medium">Connect portals</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
