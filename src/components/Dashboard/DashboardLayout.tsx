"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
    Calendar,
    Clock,
    Settings,
    Bell,
    Plus,
    Menu,
    X,
    BarChart3,
    Users,
    Globe,
    MessageSquare,
} from "lucide-react";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

const navigation = [
    { name: "Dashboard", href: "/", icon: BarChart3, current: true },
    { name: "Deadlines", href: "/deadlines", icon: Calendar, current: false },
    { name: "WhatsApp", href: "/whatsapp", icon: MessageSquare, current: false },
    { name: "Portals", href: "/portals", icon: Globe, current: false },
    { name: "Notifications", href: "/notifications", icon: Bell, current: false },
    { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = useAuth();

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between h-16 px-4 bg-indigo-600">
                    <div className="flex items-center">
                        <Clock className="h-8 w-8 text-white" />
                        <span className="ml-2 text-xl font-bold text-white">AI Cruel</span>
                    </div>
                    <button className="lg:hidden text-white" onClick={() => setSidebarOpen(false)}>
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="mt-8 px-4">
                    <div className="space-y-2">
                        {navigation.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        item.current
                                            ? "bg-indigo-100 text-indigo-700"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    <IconComponent className="mr-3 h-5 w-5" />
                                    {item.name}
                                </a>
                            );
                        })}
                    </div>
                </nav>

                {/* User section */}
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-indigo-500 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700">
                                {user?.email || "User"}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top bar */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <button
                                className="lg:hidden text-gray-500 hover:text-gray-700"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <Menu className="h-6 w-6" />
                            </button>
                            <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-gray-900">
                                {title}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition-colors">
                                <Plus className="h-4 w-4" />
                                <span>Add Deadline</span>
                            </button>

                            <button className="relative p-2 text-gray-400 hover:text-gray-500">
                                <Bell className="h-6 w-6" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main content area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
