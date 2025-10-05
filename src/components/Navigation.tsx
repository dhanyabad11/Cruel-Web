"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export function Navigation() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        console.log("Logout button clicked");
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
        <nav className="border-b border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center space-x-12">
                        <Link href="/" className="text-xl font-light text-black">
                            Cruel
                        </Link>
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/deadlines"
                                className="text-sm font-light text-gray-500 hover:text-black transition-colors"
                            >
                                Deadlines
                            </Link>
                            <Link
                                href="/settings/notifications"
                                className="text-sm font-light text-gray-500 hover:text-black transition-colors"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <span className="text-sm font-light text-gray-400">{user.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-light text-gray-500 hover:text-black transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
