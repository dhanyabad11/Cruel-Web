"use client";

import { useState } from "react";
import {
    Globe,
    Plus,
    Settings,
    RefreshCw,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import type { Portal } from "@/types";

interface PortalCardProps {
    portal: Portal;
    onEdit?: (portal: Portal) => void;
    onDelete?: (id: number) => void;
    onSync?: (id: number) => void;
    onToggleActive?: (id: number, isActive: boolean) => void;
}

export function PortalCard({ portal, onEdit, onDelete, onSync, onToggleActive }: PortalCardProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSync = async () => {
        if (!onSync) return;
        setIsLoading(true);
        try {
            await onSync(portal.id);
        } finally {
            setIsLoading(false);
        }
    };

    const getPortalTypeIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case "github":
                return "🐙"; // GitHub octopus
            case "jira":
                return "🔷"; // Jira blue diamond
            case "trello":
                return "📋"; // Trello board
            default:
                return "🌐"; // Generic globe
        }
    };

    const getPortalTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "github":
                return "bg-gray-900 text-white";
            case "jira":
                return "bg-blue-600 text-white";
            case "trello":
                return "bg-blue-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const getStatusColor = (isActive: boolean, lastSync: string | null | undefined) => {
        if (!isActive) return "text-gray-400";
        if (!lastSync) return "text-yellow-500";

        const syncDate = parseISO(lastSync);
        const now = new Date();
        const hoursAgo = (now.getTime() - syncDate.getTime()) / (1000 * 60 * 60);

        if (hoursAgo < 2) return "text-green-500";
        if (hoursAgo < 24) return "text-yellow-500";
        return "text-red-500";
    };

    const getStatusIcon = (isActive: boolean, lastSync: string | null | undefined) => {
        if (!isActive) return <XCircle className="h-4 w-4" />;
        if (!lastSync) return <Clock className="h-4 w-4" />;

        const syncDate = parseISO(lastSync);
        const now = new Date();
        const hoursAgo = (now.getTime() - syncDate.getTime()) / (1000 * 60 * 60);

        if (hoursAgo < 2) return <CheckCircle className="h-4 w-4" />;
        if (hoursAgo < 24) return <Clock className="h-4 w-4" />;
        return <AlertTriangle className="h-4 w-4" />;
    };

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                    {/* Portal Type Icon */}
                    <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${getPortalTypeColor(
                            portal.type
                        )}`}
                    >
                        {getPortalTypeIcon(portal.type)}
                    </div>

                    {/* Portal Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                                {portal.name}
                            </h3>
                            <span
                                className={`inline-flex items-center space-x-1 text-sm ${getStatusColor(
                                    portal.is_active,
                                    portal.last_sync
                                )}`}
                            >
                                {getStatusIcon(portal.is_active, portal.last_sync)}
                                <span>
                                    {!portal.is_active
                                        ? "Inactive"
                                        : !portal.last_sync
                                        ? "Never synced"
                                        : "Active"}
                                </span>
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 truncate mt-1">{portal.url}</p>

                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            <span className="capitalize">{portal.type}</span>
                            {portal.last_sync && (
                                <span>
                                    Last sync: {format(parseISO(portal.last_sync), "MMM d, HH:mm")}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                    <button
                        onClick={handleSync}
                        disabled={isLoading || !portal.is_active}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Sync portal"
                    >
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </button>

                    <button
                        onClick={() => onEdit?.(portal)}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                        title="Edit portal"
                    >
                        <Settings className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => onDelete?.(portal.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete portal"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Toggle Active */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                        {portal.is_active ? "Portal is active" : "Portal is inactive"}
                    </span>
                    <button
                        onClick={() => onToggleActive?.(portal.id, !portal.is_active)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            portal.is_active ? "bg-blue-600" : "bg-gray-200"
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                portal.is_active ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}

interface PortalListProps {
    portals: Portal[];
    onEdit?: (portal: Portal) => void;
    onDelete?: (id: number) => void;
    onSync?: (id: number) => void;
    onToggleActive?: (id: number, isActive: boolean) => void;
}

export function PortalList({ portals, onEdit, onDelete, onSync, onToggleActive }: PortalListProps) {
    if (portals.length === 0) {
        return (
            <div className="text-center py-12">
                <Globe className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No portals</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by connecting your first portal.
                </p>
                <div className="mt-6">
                    <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Connect Portal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portals.map((portal) => (
                <PortalCard
                    key={portal.id}
                    portal={portal}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSync={onSync}
                    onToggleActive={onToggleActive}
                />
            ))}
        </div>
    );
}
