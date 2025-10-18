"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        console.log("Logout button clicked");
        try {
            await logout();
            // Force a complete page reload to clear all state and cache
            window.location.href = "/login";
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return null;
    }

    return (
        <nav className="border-b border-[#D1D5DB] bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-12">
                        <Link
                            href="/"
                            className="text-xl font-light text-[#1A1A1A] dark:text-white"
                        >
                            Cruel
                        </Link>
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/deadlines"
                                className="text-sm font-light text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                Deadlines
                            </Link>
                            <Link
                                href="/settings/notifications"
                                className="text-sm font-light text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <ThemeToggle />
                        <span className="text-sm font-light text-[#6B7280] dark:text-gray-400">
                            {user.email}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-light text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
