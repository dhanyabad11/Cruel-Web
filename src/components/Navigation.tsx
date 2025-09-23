"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, FileText } from "lucide-react";

export function Navigation() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            AI Cruel
                        </Link>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                            >
                                <FileText className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/whatsapp"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                            >
                                <MessageSquare className="mr-2 h-4 w-4" />
                                WhatsApp
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Welcome, {user.email}</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="flex items-center"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
