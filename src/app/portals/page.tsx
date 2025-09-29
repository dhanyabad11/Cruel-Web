"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Globe, CheckCircle, AlertCircle, Settings, Trash2, ExternalLink } from "lucide-react";

interface Portal {
    id: string;
    name: string;
  "blackboard" | "moodle" | "google-classroom" | "other";
    url: string;
    status: "connected" | "disconnected" | "error";
    lastSync: string;
    credentials?: {
        username?: string;
        apiKey?: string;
    };
}

export default function PortalsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [portals, setPortals] = useState<Portal[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [syncing, setSyncing] = useState<string | null>(null);
    const [newPortal, setNewPortal] = useState({
        name: "",
        type: "canvas" as Portal["type"],
        url: "",
        username: "",
        apiKey: ""
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        // Mock data - replace with API call
        setPortals([
            {
                id: "1",
                name: "University Canvas",
                type: "canvas",
                url: "https://university.instructure.com",
                status: "connected",
                lastSync: "2024-12-10T10:30:00Z"
            },
            {
                id: "2",
                name: "Department Blackboard",
                type: "blackboard",
                url: "https://dept.blackboard.com",
                status: "error",
                lastSync: "2024-12-09T14:20:00Z"
            }
        ]);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "connected": return "text-green-600 bg-green-50";
            case "error": return "text-red-600 bg-red-50";
            default: return "text-gray-600 bg-gray-50";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "connected": return <CheckCircle className="h-5 w-5 text-green-600" />;
            case "error": return <AlertCircle className="h-5 w-5 text-red-600" />;
            default: return <Globe className="h-5 w-5 text-gray-600" />;
        }
    };

    const getPortalIcon = (type: string) => {
        // You could add specific icons for each platform
        return <Globe className="h-8 w-8 text-blue-600" />;
    };

    const handleAddPortal = async () => {
        if (!newPortal.name || !newPortal.url) return;

        const portal: Portal = {
            id: Date.now().toString(),
            name: newPortal.name,
            type: newPortal.type,
            url: newPortal.url,
            status: "disconnected",
            lastSync: new Date().toISOString(),
            credentials: {
                username: newPortal.username,
                apiKey: newPortal.apiKey
            }
        };

        setPortals(prev => [...prev, portal]);
        setNewPortal({
            name: "",
            type: "canvas",
            url: "",
            username: "",
            apiKey: ""
        });
        setShowAddForm(false);
    };

    const handleSyncPortal = async (portalId: string) => {
        setSyncing(portalId);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setPortals(prev => prev.map(portal => 
                portal.id === portalId 
                    ? { ...portal, status: "connected" as const, lastSync: new Date().toISOString() }
                    : portal
            ));
        } catch (error) {
            console.error("Sync failed:", error);
            setPortals(prev => prev.map(portal => 
                portal.id === portalId 
                    ? { ...portal, status: "error" as const }
                    : portal
            ));
        } finally {
            setSyncing(null);
        }
    };

    const handleDeletePortal = (portalId: string) => {
        setPortals(prev => prev.filter(portal => portal.id !== portalId));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Connected Portals</h1>
                        <p className="text-gray-600">Connect to your course management systems to automatically sync deadlines</p>
                    </div>
                    <button 
                        onClick={() => setShowAddForm(true)}
                        className="btn btn-primary"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Portal
                    </button>
                </div>

                {/* Supported Platforms */}
                <div className="card mb-8">
                    <h2 className="text-lg font-semibold mb-4">Supported Platforms</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 border rounded-lg">
                            <Globe className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                            <p className="font-medium">Canvas</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <Globe className="h-8 w-8 mx-auto mb-2 text-black" />
                            <p className="font-medium">Blackboard</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                            <p className="font-medium">Moodle</p>
                        </div>
                        <div className="text-center p-4 border rounded-lg">
                            <Globe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                            <p className="font-medium">Google Classroom</p>
                        </div>
                    </div>
                </div>

                {/* Connected Portals */}
                <div className="space-y-4 mb-8">
                    {portals.length === 0 ? (
                        <div className="card text-center py-12">
                            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No portals connected</h3>
                            <p className="text-gray-600 mb-6">
                                Connect to your course management systems to automatically sync deadlines and assignments
                            </p>
                            <button 
                                onClick={() => setShowAddForm(true)}
                                className="btn btn-primary"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Your First Portal
                            </button>
                        </div>
                    ) : (
                        portals.map((portal) => (
                            <div key={portal.id} className="card">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {getPortalIcon(portal.type)}
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="font-semibold text-lg">{portal.name}</h3>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(portal.status)}`}>
                                                    {getStatusIcon(portal.status)}
                                                    {portal.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <a 
                                                    href={portal.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 hover:text-blue-600"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    {portal.url}
                                                </a>
                                                <span>•</span>
                                                <span>Last sync: {new Date(portal.lastSync).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {portal.status === "error" && (
                                            <button 
                                                onClick={() => handleSyncPortal(portal.id)}
                                                disabled={syncing === portal.id}
                                                className="btn btn-secondary text-sm"
                                            >
                                                {syncing === portal.id ? (
                                                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600 mr-1"></div>
                                                ) : null}
                                                Retry
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleSyncPortal(portal.id)}
                                            disabled={syncing === portal.id}
                                            className="btn btn-primary text-sm"
                                        >
                                            {syncing === portal.id ? (
                                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                                            ) : null}
                                            Sync Now
                                        </button>
                                        <button className="btn btn-ghost text-sm">
                                            <Settings className="h-4 w-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeletePortal(portal.id)}
                                            className="btn btn-ghost text-sm text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Add Portal Form */}
                {showAddForm && (
                    <div className="card">
                        <h2 className="text-xl font-semibold mb-6">Add New Portal</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Platform Type</label>
                                <select
                                    value={newPortal.type}
                                    onChange={(e) => setNewPortal(prev => ({ ...prev, type: e.target.value as Portal["type"] }))}
                                    className="input w-full"
                                >
                                    <option value="canvas">Canvas</option>
                                    <option value="blackboard">Blackboard</option>
                                    <option value="moodle">Moodle</option>
                                    <option value="google-classroom">Google Classroom</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Portal Name</label>
                                <input
                                    type="text"
                                    value={newPortal.name}
                                    onChange={(e) => setNewPortal(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., University Canvas"
                                    className="input w-full"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium mb-2">Portal URL</label>
                                <input
                                    type="url"
                                    value={newPortal.url}
                                    onChange={(e) => setNewPortal(prev => ({ ...prev, url: e.target.value }))}
                                    placeholder="https://your-school.instructure.com"
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Username (optional)</label>
                                <input
                                    type="text"
                                    value={newPortal.username}
                                    onChange={(e) => setNewPortal(prev => ({ ...prev, username: e.target.value }))}
                                    placeholder="Your username"
                                    className="input w-full"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">API Key (optional)</label>
                                <input
                                    type="password"
                                    value={newPortal.apiKey}
                                    onChange={(e) => setNewPortal(prev => ({ ...prev, apiKey: e.target.value }))}
                                    placeholder="Your API key"
                                    className="input w-full"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t">
                            <p className="text-sm text-gray-600">
                                We&apos;ll securely store your credentials and only use them to sync your deadlines.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="btn btn-ghost"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddPortal}
                                    disabled={!newPortal.name || !newPortal.url}
                                    className="btn btn-primary"
                                >
                                    Add Portal
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
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
            {error && (
                <div className="bg-red-100 text-red-800 p-3 rounded mb-4 text-center">{error}</div>
            )}
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
