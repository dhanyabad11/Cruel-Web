"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Globe, CheckCircle, AlertCircle, Settings, RefreshCw } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Portal } from "@/types/api";

export default function PortalsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [portals, setPortals] = useState<Portal[]>([]);
    const [syncingPortals, setSyncingPortals] = useState<Set<number>>(new Set());
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        url: "",
        type: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load portals from API
    useEffect(() => {
        const loadPortals = async () => {
            if (!user) return;

            try {
                const response = await apiClient.getPortals();
                if (response.data) {
                    // API now returns array directly
                    setPortals(response.data);
                }
            } catch (err) {
                console.error("Error loading portals:", err);
            }
        };

        loadPortals();
    }, [user]);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    // Handle portal sync

    const handleSyncPortal = async (portalId: number) => {
        setSyncingPortals((prev) => new Set(prev).add(portalId));

        try {
            // Simulate sync process
            await new Promise((resolve) => setTimeout(resolve, 2000));

            // Update portal sync status
            setPortals((prev) =>
                prev.map((portal) =>
                    portal.id === portalId
                        ? { ...portal, last_sync: new Date().toISOString() }
                        : portal
                )
            );
        } catch (error) {
            console.error("Error syncing portal:", error);
        } finally {
            setSyncingPortals((prev) => {
                const newSet = new Set(prev);
                newSet.delete(portalId);
                return newSet;
            });
        }
    };

    const handleAddPortal = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Add portal form submitted", formData);
        setIsSubmitting(true);

        try {
            console.log("Creating portal through API...");
            // Create the portal through API
            const response = await apiClient.createPortal({
                name: formData.name,
                url: formData.url,
                type: formData.type,
            });

            if (response.data) {
                // Add to local state immediately for better UX
                setPortals((prev) => [...prev, response.data!]);
            }

            setFormData({ name: "", url: "", type: "" });
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding portal:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-gray-900">
                <div className="text-[#6B7280] dark:text-gray-400 font-light">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 transition-colors">
            <Navigation />
            <div className="max-w-6xl mx-auto px-8 py-12">
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-light text-[#1A1A1A] dark:text-white mb-2">
                                Portal Management
                            </h1>
                            <p className="text-[#6B7280] dark:text-gray-400 font-light">
                                Connect your course portals to automatically sync deadlines
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                console.log("Add Portal button clicked");
                                setShowAddModal(true);
                            }}
                            className="px-6 py-2 bg-[#2563EB] text-white hover:bg-[#1E40AF] transition-colors font-light flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" strokeWidth={1.5} />
                            <span>Add Portal</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portals.map((portal) => (
                        <div
                            key={portal.id}
                            className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <Globe
                                        className="w-6 h-6 text-[#2563EB] dark:text-blue-400"
                                        strokeWidth={1.5}
                                    />
                                    <div className="flex items-center space-x-2">
                                        {portal.status === "connected" ? (
                                            <CheckCircle
                                                className="w-5 h-5 text-green-600 dark:text-green-400"
                                                strokeWidth={1.5}
                                            />
                                        ) : (
                                            <AlertCircle
                                                className="w-5 h-5 text-red-600 dark:text-red-400"
                                                strokeWidth={1.5}
                                            />
                                        )}
                                        <span
                                            className={`text-sm font-light capitalize ${
                                                portal.status === "connected"
                                                    ? "text-green-600 dark:text-green-400"
                                                    : "text-red-600 dark:text-red-400"
                                            }`}
                                        >
                                            {portal.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-light text-[#1A1A1A] dark:text-white mb-2">
                                    {portal.name}
                                </h3>
                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-4">
                                    {portal.url}
                                </p>

                                <div className="flex items-center justify-between text-sm font-light text-[#6B7280] dark:text-gray-400 mb-4 pb-4 border-b border-[#D1D5DB] dark:border-gray-700">
                                    <span>Last sync: {portal.last_sync || "Never"}</span>
                                    <span className="capitalize">{portal.type}</span>
                                </div>

                                <div className="flex space-x-2">
                                    <button className="flex-1 px-3 py-2 text-sm font-light text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white border border-[#D1D5DB] dark:border-gray-700 transition-colors flex items-center justify-center gap-2">
                                        <Settings className="w-4 h-4" strokeWidth={1.5} />
                                        Configure
                                    </button>
                                    <button
                                        onClick={() => handleSyncPortal(portal.id)}
                                        disabled={syncingPortals.has(portal.id)}
                                        className="px-4 py-2 text-sm font-light bg-[#2563EB] text-white hover:bg-[#1E40AF] transition-colors disabled:opacity-50"
                                    >
                                        {syncingPortals.has(portal.id) ? (
                                            <RefreshCw
                                                className="w-4 h-4 animate-spin"
                                                strokeWidth={1.5}
                                            />
                                        ) : (
                                            "Sync Now"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Portal Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="card max-w-md w-full">
                        <div className="card-content">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-foreground">
                                    Add New Portal
                                </h2>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="text-foreground-secondary hover:text-foreground"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleAddPortal} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Portal Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="input w-full"
                                        placeholder="e.g., My University Portal"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Portal URL
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, url: e.target.value })
                                        }
                                        className="input w-full"
                                        placeholder="https://portal.university.edu"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-2">
                                        Portal Type
                                    </label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) =>
                                            setFormData({ ...formData, type: e.target.value })
                                        }
                                        className="input w-full"
                                        required
                                    >
                                        <option value="">Select portal type</option>
                                        <option value="moodle">Moodle</option>
                                        <option value="canvas">Canvas</option>
                                        <option value="blackboard">Blackboard</option>
                                        <option value="custom">Custom</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="btn btn-secondary flex-1"
                                        disabled={isSubmitting}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-1"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Adding..." : "Add Portal"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
