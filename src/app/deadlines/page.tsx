"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Plus,
    Calendar,
    AlertCircle,
    CheckCircle,
    X,
    FileText,
    AlignLeft,
    Flag,
} from "lucide-react";
import { apiClient } from "@/lib/api";
import { Deadline } from "@/types/api";

export default function DeadlinesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "medium" as "low" | "medium" | "high",
    });

    // Test if component is mounting
    useEffect(() => {
        console.log("DeadlinesPage component mounted - JavaScript is working");
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    // Load deadlines from API
    useEffect(() => {
        const loadDeadlines = async () => {
            if (!user) return;

            try {
                const response = await apiClient.getDeadlines();
                if (response.data) {
                    setDeadlines(response.data);
                }
            } catch (err) {
                console.error("Error loading deadlines:", err);
            }
        };

        loadDeadlines();
    }, [user]);

    const filteredDeadlines = deadlines.filter((deadline) => {
        const matchesSearch =
            deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (deadline.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
        const matchesStatus = statusFilter === "all" || deadline.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddDeadline = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Add deadline form submitted", formData);
        setIsSubmitting(true);

        try {
            console.log("Creating deadline through API...");
            // Convert datetime-local to ISO string (keeps local timezone)
            const localDate = new Date(formData.due_date);
            const isoDate = localDate.toISOString();

            const response = await apiClient.createDeadline({
                title: formData.title,
                description: formData.description,
                due_date: isoDate,
                priority: formData.priority,
            });

            if (response.data) {
                // Add to local state immediately for better UX
                setDeadlines((prev) => [...prev, response.data!]);
            }

            setFormData({ title: "", description: "", due_date: "", priority: "medium" });
            setShowAddModal(false);
        } catch (error) {
            console.error("Error adding deadline:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditDeadline = (deadline: Deadline) => {
        console.log("Edit deadline clicked", deadline);
        setEditingDeadline(deadline);
        // Format the date properly for datetime-local input
        // Convert UTC date from backend to local datetime-local format
        const utcDate = new Date(deadline.due_date);
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        const formattedDate = localDate.toISOString().slice(0, 16);

        setFormData({
            title: deadline.title,
            description: deadline.description || "",
            due_date: formattedDate,
            priority:
                deadline.priority === "urgent"
                    ? "high"
                    : (deadline.priority as "low" | "medium" | "high"),
        });
        setShowEditModal(true);
    };

    const handleUpdateDeadline = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDeadline) return;

        console.log("Update deadline form submitted", formData);
        setIsSubmitting(true);

        try {
            console.log("Updating deadline through API...");

            // Convert datetime-local to ISO string (keeps local timezone)
            const localDate = new Date(formData.due_date);
            const isoDate = localDate.toISOString();

            // Call the actual update API
            const response = await apiClient.updateDeadline(editingDeadline.id, {
                title: formData.title,
                description: formData.description,
                due_date: isoDate,
                priority: formData.priority,
            });

            if (response.error) {
                throw new Error(response.error);
            }

            console.log("Deadline updated successfully:", response.data);

            // Update local state with the response from server
            if (response.data) {
                setDeadlines((prev) =>
                    prev.map((deadline) =>
                        deadline.id === editingDeadline.id ? response.data! : deadline
                    )
                );
            }

            setFormData({ title: "", description: "", due_date: "", priority: "medium" });
            setShowEditModal(false);
            setEditingDeadline(null);
        } catch (error) {
            console.error("Error updating deadline:", error);
            alert("Failed to update deadline. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleCompleteDeadline = async (id: number) => {
        try {
            console.log("Marking deadline as completed through API...", id);

            const response = await apiClient.updateDeadline(id, { status: "completed" });

            if (response.error) {
                throw new Error(response.error);
            }

            console.log("Deadline marked as completed successfully");

            // Update local state with the response from server
            if (response.data) {
                setDeadlines((prev) =>
                    prev.map((deadline) => (deadline.id === id ? response.data! : deadline))
                );
            }
        } catch (error) {
            console.error("Error completing deadline:", error);
            alert("Failed to update deadline status. Please try again.");
        }
    };

    const handleDeleteDeadline = async (id: number) => {
        if (
            !confirm("Are you sure you want to delete this deadline? This action cannot be undone.")
        ) {
            return;
        }

        try {
            console.log("Deleting deadline through API...", id);

            const response = await apiClient.deleteDeadline(id);

            if (response.error) {
                throw new Error(response.error);
            }

            console.log("Deadline deleted successfully");

            // Remove from local state after successful API call
            setDeadlines((prev) => prev.filter((deadline) => deadline.id !== id));
        } catch (error) {
            console.error("Error deleting deadline:", error);
            alert("Failed to delete deadline. Please try again.");
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
            case "urgent":
                return "text-red-600 dark:text-red-400";
            case "medium":
                return "text-[#2563EB] dark:text-blue-400";
            case "low":
                return "text-[#6B7280] dark:text-gray-400";
            default:
                return "text-[#6B7280] dark:text-gray-400";
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
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-light mb-2 text-[#1A1A1A] dark:text-white">
                            Deadlines
                        </h1>
                        <p className="text-[#6B7280] dark:text-gray-400 font-light">
                            Manage your assignments and deadlines
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            console.log("Add Deadline button clicked");
                            console.log("Setting showAddModal to true");
                            setShowAddModal(true);
                            console.log("showAddModal should now be:", true);
                        }}
                        className="px-6 py-2 bg-[#2563EB] text-white hover:bg-[#1E40AF] transition-colors font-light flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" strokeWidth={1.5} />
                        Add Deadline
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search deadlines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-[#D1D5DB] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white font-light focus:outline-none focus:border-[#2563EB] transition-colors"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-[#D1D5DB] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#1A1A1A] dark:text-white font-light focus:outline-none focus:border-[#2563EB] transition-colors"
                            >
                                <option value="all">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="overdue">Overdue</option>
                            </select>
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("all");
                                }}
                                className="px-4 py-2 text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors font-light"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Deadlines List */}
                <div className="space-y-4">
                    {filteredDeadlines.length === 0 ? (
                        <div className="text-center py-16 bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700">
                            <Calendar
                                className="mx-auto h-12 w-12 mb-4 text-[#6B7280] dark:text-gray-400"
                                strokeWidth={1.5}
                            />
                            <p className="text-[#6B7280] dark:text-gray-400 font-light">
                                No deadlines found. Add your first deadline to get started!
                            </p>
                        </div>
                    ) : (
                        filteredDeadlines.map((deadline) => (
                            <div
                                key={deadline.id}
                                className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 hover:border-[#2563EB] dark:hover:border-blue-400 transition-colors"
                            >
                                <div>
                                    {/* Header with Title and Priority */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-light text-[#1A1A1A] dark:text-white">
                                                {deadline.title}
                                            </h3>
                                            <span
                                                className={`px-3 py-1 border text-sm font-light ${getPriorityColor(
                                                    deadline.priority
                                                )} border-current`}
                                            >
                                                {deadline.priority}
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            {deadline.status === "pending" && (
                                                <button
                                                    onClick={() =>
                                                        handleCompleteDeadline(deadline.id)
                                                    }
                                                    className="px-4 py-2 text-sm font-light text-[#2563EB] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 transition-colors flex items-center gap-2"
                                                >
                                                    <CheckCircle
                                                        className="w-4 h-4"
                                                        strokeWidth={1.5}
                                                    />
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleEditDeadline(deadline)}
                                                className="px-4 py-2 text-sm font-light text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDeadline(deadline.id)}
                                                className="px-4 py-2 text-sm font-light text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {deadline.description && (
                                        <div className="mb-6">
                                            <p className="text-[#6B7280] dark:text-gray-400 font-light leading-relaxed">
                                                {deadline.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Date and Status */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#D1D5DB] dark:border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Calendar
                                                className="h-5 w-5 text-[#2563EB] dark:text-blue-400"
                                                strokeWidth={1.5}
                                            />
                                            <div>
                                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                                    Due Date
                                                </p>
                                                <p className="text-base font-light text-[#1A1A1A] dark:text-white">
                                                    {new Date(deadline.due_date).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            weekday: "short",
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </p>
                                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400">
                                                    {new Date(deadline.due_date).toLocaleTimeString(
                                                        "en-US",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-5 w-5 flex items-center justify-center`}
                                            >
                                                {deadline.status === "completed" ? (
                                                    <CheckCircle
                                                        className="h-5 w-5 text-green-600 dark:text-green-400"
                                                        strokeWidth={1.5}
                                                    />
                                                ) : (
                                                    <AlertCircle
                                                        className="h-5 w-5 text-[#2563EB] dark:text-blue-400"
                                                        strokeWidth={1.5}
                                                    />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 mb-1">
                                                    Status
                                                </p>
                                                <p className="text-base font-light text-[#1A1A1A] dark:text-white capitalize">
                                                    {deadline.status}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Simple Modal Test */}
                {showAddModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999,
                            padding: "20px",
                        }}
                    >
                        <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-8 max-w-md w-full">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-light text-[#1A1A1A] dark:text-white mb-1">
                                        Add Deadline
                                    </h2>
                                    <p className="text-xs text-[#6B7280] dark:text-gray-400 font-light">
                                        Create a new deadline to track
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        console.log("Close button clicked");
                                        setShowAddModal(false);
                                    }}
                                    className="text-[#6B7280] hover:text-[#1A1A1A] dark:hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" strokeWidth={1.5} />
                                </button>
                            </div>

                            <form onSubmit={handleAddDeadline} className="space-y-4">
                                {/* Title Field */}
                                <div>
                                    <label className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5">
                                        Title *
                                    </label>
                                    <div className="relative">
                                        <FileText
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                            strokeWidth={1.5}
                                        />
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            placeholder="e.g., Mathematics Assignment"
                                            required
                                            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#1A1A1A] dark:text-white placeholder-[#9CA3AF] dark:placeholder-gray-500 text-sm font-light focus:outline-none focus:border-[#1A1A1A] dark:focus:border-gray-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Description Field */}
                                <div>
                                    <label className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <AlignLeft
                                            className="absolute left-3 top-3 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                            strokeWidth={1.5}
                                        />
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    description: e.target.value,
                                                })
                                            }
                                            placeholder="Optional description..."
                                            rows={3}
                                            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#1A1A1A] dark:text-white placeholder-[#9CA3AF] dark:placeholder-gray-500 text-sm font-light focus:outline-none focus:border-[#1A1A1A] dark:focus:border-gray-400 transition-colors resize-none"
                                        />
                                    </div>
                                </div>

                                {/* Due Date Field */}
                                <div>
                                    <label className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5">
                                        Due Date *
                                    </label>
                                    <div className="relative">
                                        <Calendar
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                            strokeWidth={1.5}
                                        />
                                        <input
                                            type="datetime-local"
                                            value={formData.due_date}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    due_date: e.target.value,
                                                })
                                            }
                                            required
                                            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#1A1A1A] dark:text-white text-sm font-light focus:outline-none focus:border-[#1A1A1A] dark:focus:border-gray-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Priority Field */}
                                <div>
                                    <label className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5">
                                        Priority
                                    </label>
                                    <div className="relative">
                                        <Flag
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                            strokeWidth={1.5}
                                        />
                                        <select
                                            value={formData.priority}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    priority: e.target.value as
                                                        | "low"
                                                        | "medium"
                                                        | "high",
                                                })
                                            }
                                            className="w-full pl-10 pr-3 py-2.5 bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#1A1A1A] dark:text-white text-sm font-light focus:outline-none focus:border-[#1A1A1A] dark:focus:border-gray-400 transition-colors appearance-none"
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log("Cancel button clicked");
                                            setShowAddModal(false);
                                        }}
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2.5 bg-white dark:bg-gray-700 border border-[#D1D5DB] dark:border-gray-600 text-[#1A1A1A] dark:text-white text-sm font-light hover:bg-[#F9FAFB] dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2.5 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] text-sm font-light hover:bg-[#000000] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? "Adding..." : "Add Deadline"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Deadline Modal */}
                {showEditModal && (
                    <div
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 9999,
                            padding: "20px",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                padding: "30px",
                                maxWidth: "500px",
                                width: "100%",
                                maxHeight: "90vh",
                                overflow: "auto",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    marginBottom: "20px",
                                }}
                            >
                                <h2
                                    style={{
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        margin: 0,
                                        color: "black",
                                    }}
                                >
                                    Edit Deadline
                                </h2>
                                <button
                                    onClick={() => {
                                        console.log("Close edit modal clicked");
                                        setShowEditModal(false);
                                        setEditingDeadline(null);
                                        setFormData({
                                            title: "",
                                            description: "",
                                            due_date: "",
                                            priority: "medium",
                                        });
                                    }}
                                    style={{
                                        background: "none",
                                        border: "none",
                                        fontSize: "24px",
                                        cursor: "pointer",
                                        padding: "5px",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>

                            <form
                                onSubmit={handleUpdateDeadline}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "15px",
                                }}
                            >
                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        placeholder="e.g., Mathematics Assignment"
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            fontSize: "16px",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Optional description..."
                                        rows={3}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            fontSize: "16px",
                                            resize: "vertical",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Due Date *
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={formData.due_date}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                due_date: e.target.value,
                                            })
                                        }
                                        required
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            fontSize: "16px",
                                            boxSizing: "border-box",
                                        }}
                                    />
                                </div>

                                <div>
                                    <label
                                        style={{
                                            display: "block",
                                            marginBottom: "5px",
                                            fontWeight: "bold",
                                            color: "black",
                                        }}
                                    >
                                        Priority
                                    </label>
                                    <select
                                        value={formData.priority}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                priority: e.target.value as
                                                    | "low"
                                                    | "medium"
                                                    | "high",
                                            })
                                        }
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            fontSize: "16px",
                                            boxSizing: "border-box",
                                        }}
                                    >
                                        <option value="low">Low Priority</option>
                                        <option value="medium">Medium Priority</option>
                                        <option value="high">High Priority</option>
                                    </select>
                                </div>

                                <div style={{ display: "flex", gap: "10px", paddingTop: "20px" }}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log("Cancel edit clicked");
                                            setShowEditModal(false);
                                            setEditingDeadline(null);
                                            setFormData({
                                                title: "",
                                                description: "",
                                                due_date: "",
                                                priority: "medium",
                                            });
                                        }}
                                        disabled={isSubmitting}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "1px solid #ccc",
                                            borderRadius: "4px",
                                            background: "white",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{
                                            flex: 1,
                                            padding: "12px",
                                            border: "none",
                                            borderRadius: "4px",
                                            background: "#6366f1",
                                            color: "white",
                                            cursor: "pointer",
                                            fontSize: "16px",
                                        }}
                                    >
                                        {isSubmitting ? "Updating..." : "Update Deadline"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
