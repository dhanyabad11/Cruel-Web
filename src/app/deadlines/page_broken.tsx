"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Clock, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { apiClient } from "@/lib/api";
import { Deadline } from "@/types/api";

export default function DeadlinesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    
    // Test if component is mounting
    useEffect(() => {
        console.log("DeadlinesPage component mounted - JavaScript is working");
    }, []);
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        priority: "medium" as "low" | "medium" | "high",
    });

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
            const response = await apiClient.createDeadline({
                title: formData.title,
                description: formData.description,
                due_date: formData.due_date,
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

    const handleCompleteDeadline = async (id: number) => {
        try {
            // Update local state immediately for better UX
            setDeadlines((prev) =>
                prev.map((deadline) =>
                    deadline.id === id ? { ...deadline, status: "completed" as const } : deadline
                )
            );
        } catch (error) {
            console.error("Error completing deadline:", error);
        }
    };
    const handleDeleteDeadline = async (id: number) => {
        try {
            const response = await apiClient.deleteDeadline(id);
            if (!response.error) {
                setDeadlines((prev) => prev.filter((deadline) => deadline.id !== id));
            }
        } catch (error) {
            console.error("Error deleting deadline:", error);
        }
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "text-green-600 bg-green-50";
            case "overdue":
                return "text-red-600 bg-red-50";
            default:
                return "text-orange-600 bg-orange-50";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "text-red-600 bg-red-50";
            case "medium":
                return "text-orange-600 bg-orange-50";
            default:
                return "text-gray-600 bg-gray-50";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-600" />;
            case "overdue":
                return <AlertCircle className="h-4 w-4 text-red-600" />;
            default:
                return <Clock className="h-4 w-4 text-orange-600" />;
        }
    };

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
                                className="input min-w-[120px]"
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

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="card">
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-blue-600 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-xl font-semibold">{deadlines.length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="flex items-center">
                            <Clock className="h-8 w-8 text-orange-600 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-xl font-semibold">
                                    {deadlines.filter((d) => d.status === "pending").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="flex items-center">
                            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Completed</p>
                                <p className="text-xl font-semibold">
                                    {deadlines.filter((d) => d.status === "completed").length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="flex items-center">
                            <AlertCircle className="h-8 w-8 text-red-600 mr-3" />
                            <div>
                                <p className="text-sm text-gray-600">Overdue</p>
                                <p className="text-xl font-semibold">
                                    {deadlines.filter((d) => d.status === "overdue").length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Deadlines List */}
                <div className="space-y-4">
                    {filteredDeadlines.length === 0 ? (
                        <div className="card text-center py-12">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No deadlines found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {searchTerm || statusFilter !== "all"
                                    ? "Try adjusting your search or filters"
                                    : "Get started by adding your first deadline"}
                            </p>
                            {!searchTerm && statusFilter === "all" && (
                                <button className="btn btn-primary">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Deadline
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredDeadlines.map((deadline) => (
                            <div
                                key={deadline.id}
                                className="card hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {getStatusIcon(deadline.status)}
                                            <h3 className="font-semibold text-lg">
                                                {deadline.title}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    deadline.status
                                                )}`}
                                            >
                                                {deadline.status}
                                            </span>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                                    deadline.priority
                                                )}`}
                                            >
                                                {deadline.priority} priority
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-3">{deadline.description}</p>
                                        <div className="flex items-center gap-6 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                Due:{" "}
                                                {new Date(deadline.due_date).toLocaleDateString()}
                                            </div>
                                            {deadline.tags && deadline.tags.length > 0 && (
                                                <div className="flex items-center gap-1">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                    {deadline.tags[0]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        {deadline.status === "pending" && (
                                            <button
                                                onClick={() => handleCompleteDeadline(deadline.id)}
                                                className="btn btn-success text-sm"
                                            >
                                                Complete
                                            </button>
                                        )}
                                        <button className="btn btn-ghost text-sm">Edit</button>
                                        <button
                                            onClick={() => handleDeleteDeadline(deadline.id)}
                                            className="btn btn-danger text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Debug State */}
                <div className="p-4 bg-red-100 text-red-800">
                    DEBUG: showAddModal = {showAddModal ? "TRUE" : "FALSE"}
                </div>

                {/* Simple Modal Test */}
                {showAddModal && (
                    <div style={{
                        position: 'fixed',
                        top: '50px',
                        left: '50px',
                        width: '400px',
                        height: '300px',
                        backgroundColor: 'white',
                        border: '2px solid red',
                        zIndex: 9999,
                        padding: '20px'
                    }}>
                        <h2>MODAL IS WORKING!</h2>
                        <p>Title: {formData.title}</p>
                        <input 
                            type="text" 
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="Enter title"
                            style={{width: '100%', padding: '10px', margin: '10px 0'}}
                        />
                        <button 
                            onClick={() => setShowAddModal(false)}
                            style={{padding: '10px', background: 'red', color: 'white'}}
                        >
                            Close
                        </button>
                    </div>
                )}

                {/* Add Deadline Modal */}
                {showAddModal && (
                    <div 
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 9999,
                            padding: '1rem'
                        }}
                        onClick={() => console.log("Modal backdrop clicked")}
                    >
                        <div 
                            style={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                padding: '2rem',
                                maxWidth: '500px',
                                width: '100%',
                                maxHeight: '90vh',
                                overflow: 'auto'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-foreground">
                                        Add New Deadline
                                    </h2>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="text-foreground-secondary hover:text-foreground"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={handleAddDeadline} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({ ...formData, title: e.target.value })
                                            }
                                            className="input w-full"
                                            placeholder="e.g., Mathematics Assignment"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                            className="input w-full"
                                            placeholder="Optional description..."
                                            rows={3}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            Due Date
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
                                            className="input w-full"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
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
                                            className="input w-full"
                                        >
                                            <option value="low">Low Priority</option>
                                            <option value="medium">Medium Priority</option>
                                            <option value="high">High Priority</option>
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
                                            {isSubmitting ? "Adding..." : "Add Deadline"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
