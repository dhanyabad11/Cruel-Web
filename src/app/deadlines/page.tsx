"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Clock, Calendar, AlertCircle, CheckCircle } from "lucide-react";

interface Deadline {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: "pending" | "completed" | "overdue";
    subject: string;
    priority: "low" | "medium" | "high";
}

export default function DeadlinesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        // Mock data - replace with API call
        setDeadlines([
            {
                id: "1",
                title: "Math Assignment 1",
                description: "Complete chapters 1-3 exercises",
                dueDate: "2024-12-15",
                status: "pending",
                subject: "Mathematics",
                priority: "high",
            },
            {
                id: "2",
                title: "Physics Lab Report",
                description: "Submit lab report on thermodynamics",
                dueDate: "2024-12-10",
                status: "overdue",
                subject: "Physics",
                priority: "medium",
            },
            {
                id: "3",
                title: "English Essay",
                description: "Write 1000 word essay on modern literature",
                dueDate: "2024-12-20",
                status: "completed",
                subject: "English",
                priority: "medium",
            },
            {
                id: "4",
                title: "Computer Science Project",
                description: "Build a web application using React",
                dueDate: "2024-12-25",
                status: "pending",
                subject: "Computer Science",
                priority: "high",
            },
        ]);
    }, []);

    const filteredDeadlines = deadlines.filter((deadline) => {
        const matchesSearch =
            deadline.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deadline.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            deadline.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || deadline.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleCompleteDeadline = (id: string) => {
        setDeadlines((prev) =>
            prev.map((deadline) =>
                deadline.id === id ? { ...deadline, status: "completed" as const } : deadline
            )
        );
    };

    const handleDeleteDeadline = (id: string) => {
        setDeadlines((prev) => prev.filter((deadline) => deadline.id !== id));
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
                    <button className="btn btn-primary">
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
                                                {new Date(deadline.dueDate).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                                {deadline.subject}
                                            </div>
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
            </div>
        </div>
    );
}
