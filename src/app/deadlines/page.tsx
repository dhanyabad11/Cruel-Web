"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { DeadlineList } from "@/components/Dashboard/DeadlineList";
import { Plus, Search } from "lucide-react";
import { apiService } from "@/services/api";
import type { Deadline } from "@/types";

export default function DeadlinesPage() {
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");
    const [error, setError] = useState("");

    // Fetch deadlines on component mount
    useEffect(() => {
        const fetchDeadlines = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await apiService.deadlines.getAll();
                setDeadlines(response.data);
            } catch (error) {
                setError("Failed to load deadlines. Please try again later.");
                console.error("Error fetching deadlines:", error);
                // Use mock data for demo
                setDeadlines(mockDeadlines);
            } finally {
                setLoading(false);
            }
        };

        fetchDeadlines();
    }, []);

    // Filter deadlines based on search and filters
    const filteredDeadlines = deadlines.filter((deadline) => {
        const matchesSearch =
            deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (deadline.description &&
                deadline.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === "all" || deadline.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || deadline.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleEditDeadline = (deadline: Deadline) => {
        // TODO: Implement edit functionality
        console.log("Edit deadline:", deadline);
    };

    const handleDeleteDeadline = (id: number) => {
        // TODO: Implement delete functionality
        console.log("Delete deadline:", id);
    };

    const handleToggleStatus = (id: number, status: Deadline["status"]) => {
        // TODO: Implement status toggle
        console.log("Toggle status:", id, status);
    };

    return (
        <DashboardLayout title="Deadlines">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Deadlines</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Manage and track all your important deadlines.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Deadline
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search deadlines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="overdue">Overdue</option>
                        </select>
                        <select
                            value={priorityFilter}
                            onChange={(e) => setPriorityFilter(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="all">All Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Deadline List */}
                <div className="mt-8">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                            <span className="ml-2 text-gray-600">Loading deadlines...</span>
                        </div>
                    ) : (
                        <DeadlineList
                            deadlines={filteredDeadlines}
                            onEdit={handleEditDeadline}
                            onDelete={handleDeleteDeadline}
                            onToggleStatus={handleToggleStatus}
                        />
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

// Mock data for development
const mockDeadlines: Deadline[] = [
    {
        id: 1,
        title: "Complete project proposal",
        description: "Write and submit the Q1 project proposal to stakeholders",
        due_date: "2024-01-15T10:00:00Z",
        priority: "high",
        status: "pending",
        user_id: 1,
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
    },
    {
        id: 2,
        title: "Review code changes",
        description: "Review pull request #123 for the authentication module",
        due_date: "2024-01-10T15:30:00Z",
        priority: "medium",
        status: "in_progress",
        portal_id: 1,
        user_id: 1,
        created_at: "2024-01-05T00:00:00Z",
        updated_at: "2024-01-05T00:00:00Z",
    },
];
