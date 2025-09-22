"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { PortalList } from "@/components/Dashboard/PortalList";
import { Plus, Search } from "lucide-react";
import { apiService } from "@/services/api";
import type { Portal } from "@/types";

export default function PortalsPage() {
    const [portals, setPortals] = useState<Portal[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");

    // Fetch portals on component mount
    useEffect(() => {
        const fetchPortals = async () => {
            try {
                setLoading(true);
                const response = await apiService.portals.getAll();
                setPortals(response.data);
            } catch (error) {
                console.error("Error fetching portals:", error);
                // Use mock data for demo
                setPortals(mockPortals);
            } finally {
                setLoading(false);
            }
        };

        fetchPortals();
    }, []);

    // Filter portals based on search and filters
    const filteredPortals = portals.filter((portal) => {
        const matchesSearch = portal.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || portal.type === typeFilter;
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && portal.is_active) ||
            (statusFilter === "inactive" && !portal.is_active);

        return matchesSearch && matchesType && matchesStatus;
    });

    const handlePortalEdit = (portal: Portal) => {
        // TODO: Implement edit functionality
        console.log("Edit portal:", portal);
    };

    const handlePortalDelete = async (id: number) => {
        try {
            // await apiService.portals.delete(id);
            setPortals(portals.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error deleting portal:", error);
        }
    };

    const handlePortalSync = async (id: number) => {
        try {
            await apiService.portals.sync(id);
            // Update last_sync timestamp
            setPortals(
                portals.map((p) =>
                    p.id === id ? { ...p, last_sync: new Date().toISOString() } : p
                )
            );
        } catch (error) {
            console.error("Error syncing portal:", error);
        }
    };

    const handleToggleActive = async (id: number, isActive: boolean) => {
        try {
            // await apiService.portals.update(id, { is_active: isActive });
            setPortals(portals.map((p) => (p.id === id ? { ...p, is_active: isActive } : p)));
        } catch (error) {
            console.error("Error updating portal status:", error);
        }
    };

    const getPortalStats = () => {
        const total = portals.length;
        const active = portals.filter((p) => p.is_active).length;
        const inactive = total - active;
        const types = [...new Set(portals.map((p) => p.type))];

        return { total, active, inactive, types: types.length };
    };

    const stats = getPortalStats();

    if (loading) {
        return (
            <DashboardLayout title="Portals">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout title="Portals">
            <div className="space-y-6">
                {/* Portal Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-blue-100 rounded-md">
                                <div className="text-blue-600 text-lg font-bold">📊</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Portals</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-md">
                                <div className="text-green-600 text-lg font-bold">✅</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-gray-100 rounded-md">
                                <div className="text-gray-600 text-lg font-bold">⏸️</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Inactive</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="p-2 bg-purple-100 rounded-md">
                                <div className="text-purple-600 text-lg font-bold">🔌</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Types</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.types}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Portal Management */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
                                Manage Portals
                            </h2>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                                {/* Search and Filters */}
                                <div className="flex space-x-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <input
                                            type="text"
                                            placeholder="Search portals..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <select
                                        value={typeFilter}
                                        onChange={(e) => setTypeFilter(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="github">GitHub</option>
                                        <option value="jira">Jira</option>
                                        <option value="trello">Trello</option>
                                    </select>

                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Add Portal Button */}
                                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Connect Portal
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        <PortalList
                            portals={filteredPortals}
                            onEdit={handlePortalEdit}
                            onDelete={handlePortalDelete}
                            onSync={handlePortalSync}
                            onToggleActive={handleToggleActive}
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Mock data for demo purposes
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
    {
        id: 3,
        name: "Trello - Marketing Board",
        type: "trello",
        url: "https://trello.com/b/abc123/marketing",
        is_active: false,
        last_sync: "2025-09-20T10:00:00Z",
        user_id: 1,
        created_at: "2025-09-17T10:00:00Z",
        updated_at: "2025-09-20T10:00:00Z",
    },
    {
        id: 4,
        name: "GitHub - Secondary Repo",
        type: "github",
        url: "https://github.com/company/secondary-repo",
        is_active: true,
        last_sync: "2025-09-19T15:00:00Z",
        user_id: 1,
        created_at: "2025-09-18T14:00:00Z",
        updated_at: "2025-09-19T15:00:00Z",
    },
];
