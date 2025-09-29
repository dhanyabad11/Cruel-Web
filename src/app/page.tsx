"use client";
import Link from "next/link";
import { ArrowRight, MessageSquare, Bell, Zap, Star, Users, Clock, Shield } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Navigation */}
            <nav className="nav fixed top-0 w-full z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-2xl font-bold text-gradient">Cruel</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link href="/login" className="btn btn-outline btn-sm">
                            Sign in
                        </Link>
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Get started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="animate-fade-in">
                        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
                            <Star className="w-4 h-4 mr-2" />
                            Trusted by 10,000+ Students Worldwide
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight">
                            Never miss a deadline
                            <span className="text-gradient block mt-2">ever again</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                            AI-powered deadline extraction from WhatsApp and course portals. Get
                            smart notifications and stay organized effortlessly.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                            <Link href="/login" className="btn btn-primary btn-lg group shadow-xl">
                                Start for free
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link href="#features" className="btn btn-secondary btn-lg">
                                Learn more
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex items-center justify-center space-x-8 text-sm text-slate-500">
                            <div className="flex items-center">
                                <Users className="w-4 h-4 mr-2" />
                                10K+ Users
                            </div>
                            <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-2" />
                                99.9% Uptime
                            </div>
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2" />
                                Enterprise Grade
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            Everything you need to stay organized
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            Simple, powerful tools designed for modern students and professionals
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card group">
                            <div className="card-content text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    <MessageSquare className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="card-title mb-4">WhatsApp Integration</h3>
                                <p className="card-description leading-relaxed">
                                    Upload chats and automatically extract deadlines with advanced
                                    AI. Never miss important dates buried in conversations.
                                </p>
                            </div>
                        </div>

                        <div className="card group">
                            <div className="card-content text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Bell className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="card-title mb-4">Smart Notifications</h3>
                                <p className="card-description leading-relaxed">
                                    Get personalized reminders via WhatsApp, email, or SMS.
                                    Intelligent timing ensures you&apos;re always prepared.
                                </p>
                            </div>
                        </div>

                        <div className="card group">
                            <div className="card-content text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                                    <Zap className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="card-title mb-4">Portal Monitoring</h3>
                                <p className="card-description leading-relaxed">
                                    Connect course portals to automatically detect new assignments.
                                    Stay ahead with real-time updates and monitoring.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                50K+
                            </div>
                            <div className="text-slate-600 font-medium">Deadlines Tracked</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                99.9%
                            </div>
                            <div className="text-slate-600 font-medium">Accuracy Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                10K+
                            </div>
                            <div className="text-slate-600 font-medium">Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
                                24/7
                            </div>
                            <div className="text-slate-600 font-medium">Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to get organized?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of students and professionals who never miss deadlines. Start
                        your journey today.
                    </p>
                    <Link
                        href="/login"
                        className="btn bg-white text-slate-900 hover:bg-gray-100 btn-lg font-semibold shadow-xl"
                    >
                        Get started for free
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">C</span>
                                </div>
                                <span className="text-2xl font-bold">Cruel</span>
                            </div>
                            <p className="text-slate-400 leading-relaxed max-w-md">
                                AI-powered deadline management platform trusted by students and
                                professionals worldwide.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <div className="space-y-3">
                                <Link
                                    href="/features"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/integrations"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Integrations
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <div className="space-y-3">
                                <Link
                                    href="/help"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Help Center
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="#"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Privacy
                                </Link>
                                <Link
                                    href="#"
                                    className="block text-slate-400 hover:text-white transition-colors"
                                >
                                    Terms
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
                        <p>&copy; 2025 Cruel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
