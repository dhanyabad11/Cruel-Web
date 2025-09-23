"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MessageSquare, Calendar, FileText, Zap } from "lucide-react";

export default function HomePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user) {
            router.push("/dashboard");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-indigo-600">AI Cruel</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/login"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                        Never Miss a<span className="text-indigo-600"> Deadline</span> Again
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        AI Cruel intelligently extracts deadlines from your WhatsApp chats, course
                        portals, and automatically sends you timely reminders.
                    </p>
                    <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                        <Link
                            href="/login"
                            className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                            Start Managing Deadlines
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-12 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                            Features
                        </h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            Smart deadline management
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Powered by AI to automatically detect and organize your important
                            deadlines.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    WhatsApp Integration
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Upload WhatsApp chat exports or paste individual messages to
                                    automatically extract deadlines and important dates.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    Portal Scraping
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Connect your course portals like Moodle, Canvas, or Blackboard
                                    to automatically sync assignment deadlines.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    Smart Reminders
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Get personalized reminders via WhatsApp, email, or SMS based on
                                    deadline importance and your schedule.
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                    AI-Powered
                                </p>
                                <p className="mt-2 ml-16 text-base text-gray-500">
                                    Advanced natural language processing to understand context and
                                    extract deadlines with high accuracy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to get organized?</span>
                        <span className="block">Start managing your deadlines today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        Join students who never miss deadlines anymore.
                    </p>
                    <Link
                        href="/login"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                    >
                        Get Started Free
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-500">
                        <p>&copy; 2024 AI Cruel. Built for students, by students.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
