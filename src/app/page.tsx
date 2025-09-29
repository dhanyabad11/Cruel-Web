"use client";
import Link from "next/link";
import { ArrowRight, MessageSquare, Bell, Zap } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-xl font-semibold">AI Cruel</div>
                    <div className="flex gap-4">
                        <Link href="/login" className="btn btn-ghost">
                            Sign in
                        </Link>
                        <Link href="/login" className="btn btn-primary">
                            Get started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                        Never miss a deadline again
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
                        AI-powered deadline extraction from WhatsApp and course portals. Get smart
                        notifications and stay organized effortlessly.
                    </p>
                    <div className="flex gap-4 justify-center animate-fade-in">
                        <Link href="/login" className="btn btn-primary">
                            Start for free
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link href="#features" className="btn btn-secondary">
                            Learn more
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
                        <p className="text-lg text-gray-600">
                            Simple, powerful tools for deadline management
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card text-center animate-slide-up">
                            <MessageSquare className="h-8 w-8 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">WhatsApp Integration</h3>
                            <p className="text-gray-600">
                                Upload chats and automatically extract deadlines with AI
                            </p>
                        </div>

                        <div className="card text-center animate-slide-up">
                            <Bell className="h-8 w-8 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Smart Notifications</h3>
                            <p className="text-gray-600">
                                Get reminders via WhatsApp, email, or SMS at the right time
                            </p>
                        </div>

                        <div className="card text-center animate-slide-up">
                            <Zap className="h-8 w-8 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold mb-2">Portal Scraping</h3>
                            <p className="text-gray-600">
                                Connect course portals to auto-detect assignments
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to get organized?</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Join students who never miss deadlines
                    </p>
                    <Link href="/login" className="btn btn-primary">
                        Get started for free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-8">
                <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-500">
                    <div>© 2025 AI Cruel. All rights reserved.</div>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-gray-700">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-gray-700">
                            Terms
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
