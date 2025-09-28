"use client";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageSquare, Calendar, Bell, Zap, Shield, Clock } from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-6xl font-bold text-gray-900 mb-6 tracking-tight">
                            Never Miss a
                            <span className="text-black"> Deadline</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            AI-powered deadline extraction from WhatsApp chats and course portals.
                            Get automated reminders and stay organized with smart notifications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                            <Link
                                href="/login"
                                className="btn-primary inline-flex items-center justify-center text-lg"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="/login"
                                className="btn-secondary inline-flex items-center justify-center text-lg"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Feature highlights */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            <div className="flex items-center justify-center space-x-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="text-gray-700 font-medium">Free to Use</span>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="text-gray-700 font-medium">AI-Powered</span>
                            </div>
                            <div className="flex items-center justify-center space-x-3">
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="text-gray-700 font-medium">Instant Setup</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Powerful Features for Students
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to stay on top of your academic deadlines
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* WhatsApp Integration */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="h-8 w-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                WhatsApp Integration
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Upload your WhatsApp chats and let AI extract important deadlines automatically.
                                No manual entry required.
                            </p>
                        </div>

                        {/* Smart Reminders */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bell className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Smart Notifications
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get timely reminders via WhatsApp, email, or SMS. Never miss an important deadline again.
                            </p>
                        </div>

                        {/* Portal Scraping */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Zap className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Portal Integration
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connect your course portals and automatically detect assignments and deadlines.
                            </p>
                        </div>

                        {/* Deadline Management */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Calendar className="h-8 w-8 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Deadline Management
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Organize all your deadlines in one place with priority levels and status tracking.
                            </p>
                        </div>

                        {/* Real-time Updates */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Clock className="h-8 w-8 text-red-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Real-time Updates
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get instant notifications when new deadlines are detected or updated.
                            </p>
                        </div>

                        {/* Secure & Private */}
                        <div className="card p-8 text-center">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Secure & Private
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Your data is encrypted and secure. We never share your personal information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-black text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        Ready to Never Miss Another Deadline?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of students who stay organized with AI Cruel
                    </p>
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 text-lg"
                    >
                        Start Managing Deadlines
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-2xl font-bold mb-4">AI Cruel</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Smart deadline management for students. Never miss an important date again.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Features</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">WhatsApp Integration</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Smart Reminders</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Portal Scraping</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Deadline Management</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 AI Cruel. Built for students, by students.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
