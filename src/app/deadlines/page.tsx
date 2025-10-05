"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Calendar, AlertCircle, CheckCircle } from "lucide-react";
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
            router.push("/login");
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
                return "bg-gradient-to-r from-red-500 to-pink-600 text-white";
            case "medium":
                return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white";
            case "low":
                return "bg-gradient-to-r from-green-500 to-emerald-600 text-white";
            default:
                return "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-white">
            <Navigation />
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Deadlines</h1>
                        <p className="text-gray-600">Manage your assignments and deadlines</p>
                    </div>
                    <button
                        onClick={() => {
                            console.log("Add Deadline button clicked");
                            console.log("Setting showAddModal to true");
                            setShowAddModal(true);
                            console.log("showAddModal should now be:", true);
                        }}
                        className="btn btn-primary"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Deadline
                    </button>
                </div>

                {/* Debug State */}
                <div className="p-4 bg-red-100 text-red-800 mb-4">
                    DEBUG: showAddModal = {showAddModal ? "TRUE" : "FALSE"}
                </div>

                {/* Filters */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search deadlines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="input"
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
                                className="btn btn-ghost text-sm"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                {/* Deadlines List */}
                <div className="space-y-4">
                    {filteredDeadlines.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Calendar className="mx-auto h-12 w-12 mb-4" />
                            <p>No deadlines found. Add your first deadline to get started!</p>
                        </div>
                    ) : (
                        filteredDeadlines.map((deadline) => (
                            <div
                                key={deadline.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative z-10">
                                    {/* Header with Title and Priority */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4">
                                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                {deadline.title}
                                            </h3>
                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${getPriorityColor(
                                                    deadline.priority
                                                )} shadow-lg`}
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
                                                    className="btn btn-success text-sm px-4 py-2 shadow-lg hover:scale-105 transition-all duration-200"
                                                >
                                                    <CheckCircle className="w-4 h-4 mr-2" />
                                                    Complete
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleEditDeadline(deadline)}
                                                className="btn btn-secondary text-sm px-4 py-2 shadow-lg hover:scale-105 transition-all duration-200"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDeadline(deadline.id)}
                                                className="btn btn-danger text-sm px-4 py-2 shadow-lg hover:scale-105 transition-all duration-200"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    {deadline.description && (
                                        <div className="mb-8">
                                            <p className="text-gray-600 text-lg leading-relaxed">
                                                {deadline.description}
                                            </p>
                                        </div>
                                    )}

                                    {/* Date and Status in Clean Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                                <Calendar className="h-7 w-7 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                                    Due Date
                                                </p>
                                                <p className="text-xl font-bold text-gray-800">
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
                                                <p className="text-sm text-gray-500 font-medium">
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

                                        <div className="flex items-center space-x-4">
                                            <div
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center shadow-lg ${
                                                    deadline.status === "completed"
                                                        ? "bg-gradient-to-br from-green-500 to-emerald-600"
                                                        : deadline.status === "overdue"
                                                        ? "bg-gradient-to-br from-red-500 to-pink-600"
                                                        : "bg-gradient-to-br from-yellow-500 to-orange-600"
                                                }`}
                                            >
                                                {deadline.status === "completed" ? (
                                                    <CheckCircle className="h-7 w-7 text-white" />
                                                ) : (
                                                    <AlertCircle className="h-7 w-7 text-white" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                                                    Status
                                                </p>
                                                <p className="text-xl font-bold text-gray-800 capitalize">
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
                                    Add New Deadline
                                </h2>
                                <button
                                    onClick={() => {
                                        console.log("Close button clicked");
                                        setShowAddModal(false);
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
                                onSubmit={handleAddDeadline}
                                style={{ display: "flex", flexDirection: "column", gap: "15px" }}
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
                                            setFormData({ ...formData, due_date: e.target.value })
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
                                            console.log("Cancel button clicked");
                                            setShowAddModal(false);
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
