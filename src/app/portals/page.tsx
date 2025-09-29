"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Globe, CheckCircle, AlertCircle, Settings, RefreshCw, Trash2 } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Portal } from "@/types/api";

export default function PortalsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [portals, setPortals] = useState<Portal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [syncingPortals, setSyncingPortals] = useState<Set<number>>(new Set());
    const [error, setError] = useState<string>("");

    // Load portals from API
    useEffect(() => {
        const loadPortals = async () => {
            if (!user) return;

            setIsLoading(true);
            try {
                const response = await apiClient.getPortals();
                if (response.data) {
                    setPortals(response.data);
                } else if (response.error) {
                    setError(response.error);
                }
            } catch (err) {
                setError("Failed to load portals");
                console.error("Error loading portals:", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadPortals();
    }, [user]);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Handle portal sync
    const handleSyncPortal = async (portalId: number) => {
        setSyncingPortals((prev) => new Set(prev).add(portalId));
        try {
            const response = await apiClient.syncPortal(portalId);
            if (response.data) {
                // Show success message or update portal status
                console.log("Sync result:", response.data);
                // Refresh portals list
                const portalsResponse = await apiClient.getPortals();
                if (portalsResponse.data) {
                    setPortals(portalsResponse.data);
                }
            } else if (response.error) {
                setError(response.error);
            }
        } catch (err) {
            setError("Failed to sync portal");
            console.error("Error syncing portal:", err);
        } finally {
            setSyncingPortals((prev) => {
                const newSet = new Set(prev);
                newSet.delete(portalId);
                return newSet;
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <Navigation />
            <div className="max-w-6xl mx-auto p-6">
                <div className="mb-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-3">
                                Portal Management
                            </h1>
                            <p className="text-lg text-slate-600">
                                Connect your course portals to automatically sync deadlines
                            </p>
                        </div>
                        <button className="btn btn-primary flex items-center space-x-2 px-6 py-3">
                            <Plus className="w-5 h-5" />
                            <span>Add Portal</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {portals.map((portal) => (
                        <div key={portal.id} className="card">
                            <div className="card-content">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <Globe className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {portal.status === "connected" ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-500" />
                                        )}
                                        <span
                                            className={`text-sm capitalize ${
                                                portal.status === "connected"
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                            }`}
                                        >
                                            {portal.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                    {portal.name}
                                </h3>
                                <p className="text-sm text-slate-600 mb-4">{portal.url}</p>

                                <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                                    <span>Last sync: {portal.last_sync || "Never"}</span>
                                    <span className="capitalize">{portal.type}</span>
                                </div>

                                <div className="flex space-x-2">
                                    <button className="btn btn-secondary flex-1 text-sm px-3 py-2">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Configure
                                    </button>
                                    <button
                                        onClick={() => handleSyncPortal(portal.id)}
                                        disabled={syncingPortals.has(portal.id)}
                                        className="btn btn-primary text-sm px-4 py-2 disabled:opacity-50"
                                    >
                                        {syncingPortals.has(portal.id) ? (
                                            <RefreshCw className="w-4 h-4 animate-spin" />
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
        </div>
    );
}
