"use client";
import Link from "next/link";
import { ArrowRight, Calendar, Bell, MessageSquare } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
    // Immediate redirect for OAuth callback
    if (typeof window !== "undefined" && window.location.hash.includes("access_token")) {
        window.location.href = `/auth/callback${window.location.hash}`;
        return null;
    }

    return (
        <div className="min-h-screen bg-[#FFFFFF] dark:bg-gray-900 transition-colors">
            <nav className="border-b border-[#D1D5DB] dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
                    <div className="text-2xl font-light text-[#1A1A1A] dark:text-white">Cruel</div>
                    <div className="flex gap-8 items-center">
                        <ThemeToggle />
                        <Link
                            href="/login"
                            className="text-[#6B7280] hover:text-[#1A1A1A] dark:text-gray-400 dark:hover:text-white transition-colors font-light"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="px-6 py-2 bg-[#2563EB] text-white hover:bg-[#1E40AF] transition-colors font-light"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <section className="max-w-3xl mx-auto px-8 py-32 text-center">
                <h1 className="text-6xl font-light text-[#1A1A1A] dark:text-white mb-8 tracking-tight">
                    Never Miss a Deadline
                </h1>
                <p className="text-lg font-light text-[#6B7280] dark:text-gray-400 mb-16 max-w-xl mx-auto leading-relaxed">
                    Manage deadlines with automated reminders
                </p>
                <Link
                    href="/register"
                    className="inline-flex items-center px-8 py-3 text-sm font-light text-white bg-[#2563EB] hover:bg-[#1E40AF] transition-colors"
                >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
                </Link>
            </section>

            <section className="max-w-4xl mx-auto px-8 py-24 border-t border-[#D1D5DB] dark:border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <div className="text-center">
                        <Calendar
                            className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mx-auto mb-6"
                            strokeWidth={1.5}
                        />
                        <h3 className="text-lg font-light mb-3 text-[#1A1A1A] dark:text-white">
                            Track Deadlines
                        </h3>
                        <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 leading-relaxed">
                            Organize tasks by priority
                        </p>
                    </div>
                    <div className="text-center">
                        <MessageSquare
                            className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mx-auto mb-6"
                            strokeWidth={1.5}
                        />
                        <h3 className="text-lg font-light mb-3 text-[#1A1A1A] dark:text-white">
                            WhatsApp Sync
                        </h3>
                        <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 leading-relaxed">
                            Extract deadlines automatically
                        </p>
                    </div>
                    <div className="text-center">
                        <Bell
                            className="w-6 h-6 text-[#2563EB] dark:text-blue-400 mx-auto mb-6"
                            strokeWidth={1.5}
                        />
                        <h3 className="text-lg font-light mb-3 text-[#1A1A1A] dark:text-white">
                            Smart Alerts
                        </h3>
                        <p className="text-sm font-light text-[#6B7280] dark:text-gray-400 leading-relaxed">
                            Email and SMS notifications
                        </p>
                    </div>
                </div>
            </section>

            <section className="border-t border-[#D1D5DB] dark:border-gray-800 py-24">
                <div className="max-w-2xl mx-auto text-center px-8">
                    <h2 className="text-3xl font-light text-[#1A1A1A] dark:text-white mb-8">
                        Start organizing today
                    </h2>
                    <Link
                        href="/register"
                        className="inline-block px-8 py-3 text-sm font-light text-white bg-[#2563EB] hover:bg-[#1E40AF] transition-colors"
                    >
                        Create Account
                    </Link>
                </div>
            </section>

            <footer className="bg-[#1A1A1A] dark:bg-gray-950 text-white py-12 border-t dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-xl font-light mb-4 md:mb-0">Cruel</div>
                        <p className="text-[#9CA3AF] dark:text-gray-500 text-sm font-light">
                            © 2025 Cruel. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
