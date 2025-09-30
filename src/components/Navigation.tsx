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
        <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
                        >
                            AI Cruel
                        </Link>
                        <div className="ml-16 flex items-center space-x-12">
                            <Link
                                href="/dashboard"
                                className="text-foreground-secondary hover:text-foreground text-sm font-semibold transition-all duration-300 hover:scale-105"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/deadlines"
                                className="text-foreground-secondary hover:text-foreground text-sm font-semibold transition-all duration-300 hover:scale-105"
                            >
                                Deadlines
                            </Link>
                            <Link
                                href="/portals"
                                className="text-foreground-secondary hover:text-foreground text-sm font-semibold transition-all duration-300 hover:scale-105"
                            >
                                Portals
                            </Link>
                            <Link
                                href="/whatsapp"
                                className="text-foreground-secondary hover:text-foreground text-sm font-semibold transition-all duration-300 hover:scale-105"
                            >
                                WhatsApp
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    {user.email?.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <span className="text-sm text-foreground-secondary font-medium">
                                {user.email}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="btn btn-ghost text-foreground-secondary hover:text-foreground"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
