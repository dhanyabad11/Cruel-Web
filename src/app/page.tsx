"use client";
import Link from "next/link";
import { ArrowRight, Calendar, Bell, MessageSquare } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Simple Navigation */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold">C</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Cruel</span>
                    </div>
                    <Link
                        href="/login"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section - Clean & Simple */}
            <section className="max-w-5xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                    Never Miss a Deadline
                </h1>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Smart deadline management with WhatsApp integration and automatic reminders
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/login"
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg flex items-center justify-center"
                    >
                        Get Started Free
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 transition-colors font-medium text-lg"
                    >
                        View Demo
                    </Link>
                </div>
            </section>

            {/* Features - Simple Grid */}
            <section className="max-w-6xl mx-auto px-6 py-16 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            Smart Deadlines
                        </h3>
                        <p className="text-gray-600">
                            Track all your deadlines in one place with priority management
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <MessageSquare className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            WhatsApp Integration
                        </h3>
                        <p className="text-gray-600">
                            Extract deadlines from WhatsApp messages automatically
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg border border-gray-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Bell className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-gray-900">
                            Smart Reminders
                        </h3>
                        <p className="text-gray-600">
                            Get notified via email, SMS, and WhatsApp before deadlines
                        </p>
                    </div>
                </div>
            </section>

            {/* Simple CTA */}
            <section className="bg-blue-600 py-16">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-bold text-white mb-6">Ready to get organized?</h2>
                    <Link
                        href="/login"
                        className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg"
                    >
                        Start Free Today
                    </Link>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">C</span>
                            </div>
                            <span className="text-xl font-bold">Cruel</span>
                        </div>
                        <p className="text-gray-400 text-sm">© 2025 Cruel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
