"use client";

import { useState } from "react";
import { Calendar, Clock, AlertTriangle, CheckCircle, Circle, Edit, Trash2 } from "lucide-react";
import { format, isAfter, isBefore, parseISO } from "date-fns";
import type { Deadline } from "@/types";

interface DeadlineCardProps {
    deadline: Deadline;
    onEdit?: (deadline: Deadline) => void;
    onDelete?: (id: number) => void;
    onToggleStatus?: (id: number, status: Deadline["status"]) => void;
}

export function DeadlineCard({ deadline, onEdit, onDelete, onToggleStatus }: DeadlineCardProps) {
    const dueDate = parseISO(deadline.due_date);
    const isOverdue = isBefore(dueDate, new Date()) && deadline.status !== "completed";
    const isDueSoon =
        isAfter(dueDate, new Date()) &&
        isBefore(dueDate, new Date(Date.now() + 24 * 60 * 60 * 1000)); // Due within 24 hours

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "urgent":
                return "bg-red-100 text-red-800 border-red-200";
            case "high":
                return "bg-orange-100 text-orange-800 border-orange-200";
            case "medium":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "low":
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "in_progress":
                return <Circle className="h-5 w-5 text-blue-500" />;
            case "overdue":
                return <AlertTriangle className="h-5 w-5 text-red-500" />;
            default:
                return <Circle className="h-5 w-5 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-50 border-green-200";
            case "in_progress":
                return "bg-blue-50 border-blue-200";
            case "overdue":
                return "bg-red-50 border-red-200";
            default:
                return "bg-gray-50 border-gray-200";
        }
    };

    return (
        <div
            className={`bg-white rounded-lg border-2 p-6 shadow-sm hover:shadow-md transition-all ${
                isOverdue ? "border-red-300" : isDueSoon ? "border-yellow-300" : "border-gray-200"
            } ${getStatusColor(deadline.status)}`}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    {getStatusIcon(deadline.status)}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{deadline.title}</h3>
                        {deadline.description && (
                            <p className="text-sm text-gray-600 mt-1">{deadline.description}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(deadline)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Edit className="h-4 w-4" />
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(deadline.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Priority Badge */}
            <div className="flex items-center justify-between mb-4">
                <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(
                        deadline.priority
                    )}`}
                >
                    {deadline.priority.charAt(0).toUpperCase() + deadline.priority.slice(1)}
                </span>

                {isOverdue && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Overdue
                    </span>
                )}

                {isDueSoon && !isOverdue && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-700 bg-yellow-100 rounded-full">
                        <Clock className="h-3 w-3 mr-1" />
                        Due Soon
                    </span>
                )}
            </div>

            {/* Due Date */}
            <div className="flex items-center text-sm text-gray-600 mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Due: {format(dueDate, "PPp")}</span>
            </div>

            {/* Actions */}
            {onToggleStatus && (
                <div className="flex space-x-2">
                    {deadline.status !== "completed" && (
                        <button
                            onClick={() => onToggleStatus(deadline.id, "completed")}
                            className="flex-1 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                        >
                            Mark Complete
                        </button>
                    )}

                    {deadline.status === "pending" && (
                        <button
                            onClick={() => onToggleStatus(deadline.id, "in_progress")}
                            className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                            Start Working
                        </button>
                    )}

                    {deadline.status === "completed" && (
                        <button
                            onClick={() => onToggleStatus(deadline.id, "pending")}
                            className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                            Reopen
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

interface DeadlineListProps {
    deadlines: Deadline[];
    onEdit?: (deadline: Deadline) => void;
    onDelete?: (id: number) => void;
    onToggleStatus?: (id: number, status: Deadline["status"]) => void;
}

export function DeadlineList({ deadlines, onEdit, onDelete, onToggleStatus }: DeadlineListProps) {
    const [filter, setFilter] = useState<
        "all" | "pending" | "in_progress" | "completed" | "overdue"
    >("all");
    const [sortBy, setSortBy] = useState<"due_date" | "priority" | "created_at">("due_date");

    const filteredDeadlines = deadlines.filter((deadline) => {
        if (filter === "all") return true;
        return deadline.status === filter;
    });

    const sortedDeadlines = [...filteredDeadlines].sort((a, b) => {
        switch (sortBy) {
            case "due_date":
                return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
            case "priority":
                const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            case "created_at":
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            default:
                return 0;
        }
    });

    const getFilterCounts = () => {
        return {
            all: deadlines.length,
            pending: deadlines.filter((d) => d.status === "pending").length,
            in_progress: deadlines.filter((d) => d.status === "in_progress").length,
            completed: deadlines.filter((d) => d.status === "completed").length,
            overdue: deadlines.filter((d) => d.status === "overdue").length,
        };
    };

    const counts = getFilterCounts();

    return (
        <div className="space-y-6">
            {/* Filters and Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    {/* Status Filters */}
                    <div className="flex space-x-1">
                        {[
                            { key: "all", label: "All", count: counts.all },
                            { key: "pending", label: "Pending", count: counts.pending },
                            { key: "in_progress", label: "In Progress", count: counts.in_progress },
                            { key: "completed", label: "Completed", count: counts.completed },
                            { key: "overdue", label: "Overdue", count: counts.overdue },
                        ].map(({ key, label, count }) => (
                            <button
                                key={key}
                                onClick={() => setFilter(key as typeof filter)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                                    filter === key
                                        ? "bg-indigo-100 text-indigo-700"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                {label} ({count})
                            </button>
                        ))}
                    </div>

                    {/* Sort Options */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                        <option value="due_date">Sort by Due Date</option>
                        <option value="priority">Sort by Priority</option>
                        <option value="created_at">Sort by Created Date</option>
                    </select>
                </div>
            </div>

            {/* Deadline Grid */}
            {sortedDeadlines.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No deadlines found</h3>
                    <p className="text-gray-600">
                        {filter === "all"
                            ? "You don't have any deadlines yet. Create one to get started!"
                            : `No ${filter.replace("_", " ")} deadlines found.`}
                    </p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                    {sortedDeadlines.map((deadline) => (
                        <DeadlineCard
                            key={deadline.id}
                            deadline={deadline}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onToggleStatus={onToggleStatus}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
