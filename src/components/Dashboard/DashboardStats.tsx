"use client";

import {
    Calendar,
    Clock,
    CheckCircle,
    AlertTriangle,
    TrendingUp,
    Target,
    Globe,
    Bell,
} from "lucide-react";
import type { Deadline, Portal } from "@/types";

interface DashboardStatsProps {
    deadlines: Deadline[];
    portals: Portal[];
}

export function DashboardStats({ deadlines, portals }: DashboardStatsProps) {
    // Calculate statistics
    const totalDeadlines = deadlines.length;
    const completedDeadlines = deadlines.filter((d) => d.status === "completed").length;
    const overdueDeadlines = deadlines.filter((d) => d.status === "overdue").length;
    const upcomingDeadlines = deadlines.filter((d) => {
        const dueDate = new Date(d.due_date);
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return dueDate <= nextWeek && d.status !== "completed" && d.status !== "overdue";
    }).length;

    const completionRate = totalDeadlines > 0 ? (completedDeadlines / totalDeadlines) * 100 : 0;
    const activePortals = portals.filter((p) => p.is_active).length;

    const stats = [
        {
            name: "Total Deadlines",
            value: totalDeadlines,
            icon: Target,
            color: "text-blue-600",
            bgColor: "bg-blue-100",
            change: "+12%",
            changeType: "positive",
        },
        {
            name: "Completed",
            value: completedDeadlines,
            icon: CheckCircle,
            color: "text-green-600",
            bgColor: "bg-green-100",
            change: `${completionRate.toFixed(1)}%`,
            changeType: "neutral",
        },
        {
            name: "Overdue",
            value: overdueDeadlines,
            icon: AlertTriangle,
            color: "text-red-600",
            bgColor: "bg-red-100",
            change: overdueDeadlines > 0 ? "Action needed" : "All good",
            changeType: overdueDeadlines > 0 ? "negative" : "positive",
        },
        {
            name: "Due This Week",
            value: upcomingDeadlines,
            icon: Clock,
            color: "text-yellow-600",
            bgColor: "bg-yellow-100",
            change: upcomingDeadlines > 0 ? "Focus required" : "Clear ahead",
            changeType: upcomingDeadlines > 3 ? "negative" : "positive",
        },
    ];

    const recentActivity = [
        {
            action: "Deadline completed",
            item: "Fix authentication bug",
            time: "2 hours ago",
            type: "success",
        },
        {
            action: "New deadline added",
            item: "Review pull request #42",
            time: "4 hours ago",
            type: "info",
        },
        {
            action: "Portal synced",
            item: "GitHub - Project Alpha",
            time: "6 hours ago",
            type: "info",
        },
        {
            action: "Deadline overdue",
            item: "Update documentation",
            time: "1 day ago",
            type: "warning",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Key Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={stat.name}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                        >
                            <div className="flex items-center">
                                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span
                                    className={`text-sm font-medium ${
                                        stat.changeType === "positive"
                                            ? "text-green-600"
                                            : stat.changeType === "negative"
                                            ? "text-red-600"
                                            : "text-gray-600"
                                    }`}
                                >
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                            <Calendar className="h-4 w-4 mr-2" />
                            Add New Deadline
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <Globe className="h-4 w-4 mr-2" />
                            Connect Portal
                        </button>
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
                            <Bell className="h-4 w-4 mr-2" />
                            Setup Notifications
                        </button>
                    </div>
                </div>

                {/* Portal Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Portals</h3>
                    <div className="space-y-3">
                        {portals.length === 0 ? (
                            <p className="text-gray-600 text-sm">No portals connected yet</p>
                        ) : (
                            portals.map((portal) => (
                                <div key={portal.id} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div
                                            className={`h-2 w-2 rounded-full mr-3 ${
                                                portal.is_active ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                        />
                                        <span className="text-sm font-medium text-gray-900">
                                            {portal.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-500 capitalize">
                                        {portal.type}
                                    </span>
                                </div>
                            ))
                        )}
                        <div className="pt-2 border-t border-gray-200">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Active Portals:</span>
                                <span className="font-medium text-gray-900">
                                    {activePortals} / {portals.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div
                                    className={`mt-1 h-2 w-2 rounded-full ${
                                        activity.type === "success"
                                            ? "bg-green-500"
                                            : activity.type === "warning"
                                            ? "bg-yellow-500"
                                            : "bg-blue-500"
                                    }`}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-medium">{activity.action}:</span>{" "}
                                        {activity.item}
                                    </p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Progress Chart Placeholder */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Completion Trends</h3>
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                </div>
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                            Chart will be implemented with Chart.js or Recharts
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
