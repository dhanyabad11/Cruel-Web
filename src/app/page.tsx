"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { DashboardStats } from "@/components/Dashboard/DashboardStats";
import { DeadlineList } from "@/components/Dashboard/DeadlineList";
import { Plus, Search } from "lucide-react";
import { apiService } from "@/services/api";
import type { Deadline, Portal } from "@/types";

export default function DashboardPage() {
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [portals, setPortals] = useState<Portal[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [priorityFilter, setPriorityFilter] = useState<string>("all");

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [deadlinesRes, portalsRes] = await Promise.all([
                    apiService.deadlines.getAll(),
                    apiService.portals.getAll(),
                ]);
                setDeadlines(deadlinesRes.data);
                setPortals(portalsRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Use mock data for demo purposes
                setDeadlines(mockDeadlines);
                setPortals(mockPortals);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter deadlines based on search and filters
    const filteredDeadlines = deadlines.filter((deadline) => {
        const matchesSearch = deadline.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || deadline.status === statusFilter;
        const matchesPriority = priorityFilter === "all" || deadline.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    const handleDeadlineEdit = (deadline: Deadline) => {
        // TODO: Implement edit functionality
        console.log("Edit deadline:", deadline);
    };

    const handleDeadlineDelete = async (id: number) => {
        try {
            await apiService.deadlines.delete(id);
            setDeadlines(deadlines.filter((d) => d.id !== id));
        } catch (error) {
            console.error("Error deleting deadline:", error);
        }
    };

    const handleStatusToggle = async (id: number, status: Deadline["status"]) => {
        try {
            await apiService.deadlines.update(id, { status });
            setDeadlines(deadlines.map((d) => (d.id === id ? { ...d, status } : d)));
        } catch (error) {
            console.error("Error updating deadline status:", error);
        }
    };

    if (loading) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Dashboard">
            <div className="space-y-6">
                {/* Dashboard Stats */}
                <DashboardStats deadlines={deadlines} portals={portals} />

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                            <Plus className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="text-gray-600">Add Deadline</span>
                        </button>
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
                            <Plus className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="text-gray-600">Add Portal</span>
                        </button>
                        <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors">
                            <Plus className="h-5 w-5 mr-2 text-gray-400" />
                            <span className="text-gray-600">Sync All Portals</span>
                        </button>
                    </div>
                </div>

                {/* Recent Deadlines */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                                Recent Deadlines
                            </h2>

                            {/* Search and Filters */}
                            <div className="flex space-x-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        placeholder="Search deadlines..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>

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
                                    <option value="urgent">Urgent</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {filteredDeadlines.length > 0 ? (
                            <DeadlineList
                                deadlines={filteredDeadlines.slice(0, 10)}
                                onEdit={handleDeadlineEdit}
                                onDelete={handleDeadlineDelete}
                                onToggleStatus={handleStatusToggle}
                            />
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No deadlines found.</p>
                                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Create Your First Deadline
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Mock data for demo purposes
const mockDeadlines: Deadline[] = [
    {
        id: 1,
        title: "Complete project proposal",
        description: "Finish the Q4 project proposal for the new feature",
        due_date: "2025-09-25T10:00:00Z",
        priority: "high",
        status: "in_progress",
        portal_id: 1,
        user_id: 1,
        created_at: "2025-09-20T08:00:00Z",
        updated_at: "2025-09-21T12:00:00Z",
    },
    {
        id: 2,
        title: "Code review for authentication module",
        description: "Review the new OAuth implementation",
        due_date: "2025-09-23T15:30:00Z",
        priority: "medium",
        status: "pending",
        portal_id: 2,
        user_id: 1,
        created_at: "2025-09-19T14:00:00Z",
        updated_at: "2025-09-21T09:00:00Z",
    },
    {
        id: 3,
        title: "Deploy to production",
        description: "Deploy the latest release to production environment",
        due_date: "2025-09-22T18:00:00Z",
        priority: "urgent",
        status: "overdue",
        portal_id: 1,
        user_id: 1,
        created_at: "2025-09-18T10:00:00Z",
        updated_at: "2025-09-21T16:00:00Z",
    },
];

const mockPortals: Portal[] = [
    {
        id: 1,
        name: "GitHub - Main Project",
        type: "github",
        url: "https://github.com/company/main-project",
        is_active: true,
        last_sync: "2025-09-21T12:00:00Z",
        user_id: 1,
        created_at: "2025-09-15T08:00:00Z",
        updated_at: "2025-09-21T12:00:00Z",
    },
    {
        id: 2,
        name: "Jira - Development Board",
        type: "jira",
        url: "https://company.atlassian.net",
        is_active: true,
        last_sync: "2025-09-21T11:30:00Z",
        user_id: 1,
        created_at: "2025-09-16T09:00:00Z",
        updated_at: "2025-09-21T11:30:00Z",
    },
];
