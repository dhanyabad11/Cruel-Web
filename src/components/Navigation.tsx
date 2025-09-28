"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

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
        <nav className="border-b border-gray-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-light text-gray-900">
                            AI Cruel
                        </Link>
                        <div className="ml-12 flex items-center space-x-8">
                            <Link
                                href="/dashboard"
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/whatsapp"
                                className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
                            >
                                WhatsApp
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-sm text-gray-600">{user.email}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
