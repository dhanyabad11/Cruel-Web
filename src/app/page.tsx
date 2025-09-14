"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, AlertTriangle, Plus, Settings } from "lucide-react";
import { deadlineAPI } from "@/services/api";
import type { Deadline } from "@/types";

export default function Dashboard() {
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDeadlines = async () => {
            try {
                const response = await deadlineAPI.getAll();
                setDeadlines(response.data);
            } catch (error) {
                console.error("Failed to fetch deadlines:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeadlines();
    }, []);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "text-red-600 bg-red-100";
            case "high":
                return "text-orange-600 bg-orange-100";
            case "medium":
                return "text-yellow-600 bg-yellow-100";
            case "low":
                return "text-green-600 bg-green-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-100";
            case "in_progress":
                return "text-blue-600 bg-blue-100";
            case "overdue":
                return "text-red-600 bg-red-100";
            case "pending":
                return "text-gray-600 bg-gray-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                            <h1 className="text-3xl font-bold text-gray-900">AI Cruel</h1>
                            <span className="ml-2 text-sm text-gray-500">Deadline Manager</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Deadline
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                                <Settings className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Deadlines</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {deadlines.length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-yellow-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {deadlines.filter((d) => d.status === "pending").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Overdue</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {deadlines.filter((d) => d.status === "overdue").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Completed</p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {deadlines.filter((d) => d.status === "completed").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deadlines List */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900">Recent Deadlines</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {deadlines.length === 0 ? (
                            <div className="px-6 py-12 text-center">
                                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No deadlines yet
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Get started by adding your first deadline or connecting a
                                    portal.
                                </p>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                                    Add First Deadline
                                </button>
                            </div>
                        ) : (
                            deadlines.map((deadline) => (
                                <div key={deadline.id} className="px-6 py-4 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium text-gray-900">
                                                {deadline.title}
                                            </h3>
                                            {deadline.description && (
                                                <p className="text-gray-600 mt-1">
                                                    {deadline.description}
                                                </p>
                                            )}
                                            <div className="flex items-center mt-2 space-x-4">
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                                        deadline.priority
                                                    )}`}
                                                >
                                                    {deadline.priority.toUpperCase()}
                                                </span>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                        deadline.status
                                                    )}`}
                                                >
                                                    {deadline.status
                                                        .replace("_", " ")
                                                        .toUpperCase()}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    Due:{" "}
                                                    {new Date(
                                                        deadline.due_date
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
