"use client";
import Link from "next/link";
import {
    ArrowRight,
    MessageSquare,
    Bell,
    Zap,
    Calendar,
    Globe,
    Shield,
    Users,
    CheckCircle,
    Star,
} from "lucide-react";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            {/* Navigation */}
            <nav className="backdrop-blur-md bg-white/90 border-b border-gray-200/50 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                            Cruel
                        </span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link
                            href="#features"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            href="#pricing"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/dashboard"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/login"
                            className="btn btn-primary shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                            Get Started Free
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="py-24 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
                <div className="max-w-6xl mx-auto text-center relative">
                    <div className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-blue-200">
                        <Star className="w-4 h-4 mr-2" />
                        Trusted by 10,000+ students worldwide
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
                        Never Miss a Deadline
                        <br />
                        <span className="text-4xl md:text-6xl">Ever Again</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        AI-powered deadline management with WhatsApp integration, university portal
                        scraping, and smart notifications. Built for students who want to stay
                        ahead.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                        <Link
                            href="/login"
                            className="btn btn-primary btn-xl group shadow-xl hover:shadow-2xl transition-all duration-300"
                        >
                            Start for Free Today
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/dashboard"
                            className="btn btn-outline btn-xl hover:bg-gray-50 transition-all duration-200"
                        >
                            See Live Demo
                        </Link>
                    </div>

                    {/* Social Proof */}
                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            10K+ Users
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            99.9% Uptime
                        </div>
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-2" />
                            Enterprise Security
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Everything You Need to Stay Organized
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Powerful automation meets intelligent organization. Built for the modern
                            student.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 transition-all duration-300 border border-blue-200/50">
                            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <MessageSquare className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                WhatsApp AI Integration
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Advanced NLP extracts deadlines from WhatsApp chats automatically.
                                Just forward messages and let AI handle the rest.
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50 hover:from-green-100 hover:to-green-200/50 transition-all duration-300 border border-green-200/50">
                            <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Globe className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                University Portal Scraping
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Connect Canvas, Blackboard, Moodle, and 50+ university portals.
                                Automatic deadline sync with real-time updates.
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100/50 hover:from-purple-100 hover:to-purple-200/50 transition-all duration-300 border border-purple-200/50">
                            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Bell className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                Smart Notifications
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Multi-channel alerts via email, SMS, and push notifications.
                                Intelligent timing based on your habits.
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100/50 hover:from-orange-100 hover:to-orange-200/50 transition-all duration-300 border border-orange-200/50">
                            <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Calendar className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                Advanced Scheduling
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                AI-powered deadline prioritization with calendar integration. Google
                                Calendar, Outlook, and Apple Calendar sync.
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100/50 hover:from-pink-100 hover:to-pink-200/50 transition-all duration-300 border border-pink-200/50">
                            <div className="w-14 h-14 bg-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                Real-time Analytics
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Track completion rates, productivity patterns, and stress levels.
                                Personalized insights to improve your workflow.
                            </p>
                        </div>

                        <div className="group p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/50 hover:from-indigo-100 hover:to-indigo-200/50 transition-all duration-300 border border-indigo-200/50">
                            <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                <Shield className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-gray-900">
                                Enterprise Security
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                End-to-end encryption, GDPR compliance, and SOC 2 certification.
                                Your data is always protected.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 px-6 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">How It Works</h2>
                        <p className="text-xl text-gray-600">Get started in minutes, not hours</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <span className="text-2xl font-bold text-white">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Connect Your Accounts</h3>
                            <p className="text-gray-600">
                                Link WhatsApp, university portals, and calendars in one click.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <span className="text-2xl font-bold text-white">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">AI Extracts Deadlines</h3>
                            <p className="text-gray-600">
                                Our AI automatically finds and organizes all your deadlines.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                                <span className="text-2xl font-bold text-white">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-4">Never Miss Anything</h3>
                            <p className="text-gray-600">
                                Get smart reminders and stay on top of everything.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Never Miss Another Deadline?
                    </h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join thousands of students who&apos;ve transformed their academic life
                    </p>
                    <Link
                        href="/login"
                        className="btn bg-white text-blue-600 hover:bg-blue-50 btn-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                    >
                        Get Started Free - No Credit Card Required
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">C</span>
                                </div>
                                <span className="text-2xl font-bold">Cruel</span>
                            </div>
                            <p className="text-gray-300 mb-6 max-w-md">
                                The most advanced deadline management platform for students.
                                AI-powered automation meets intelligent organization.
                            </p>
                            <div className="flex space-x-4">
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    Twitter
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    LinkedIn
                                </Link>
                                <Link
                                    href="#"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    GitHub
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Product</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/features"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Features
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Pricing
                                </Link>
                                <Link
                                    href="/integrations"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Integrations
                                </Link>
                                <Link
                                    href="/api"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    API
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-4">Support</h3>
                            <div className="space-y-3">
                                <Link
                                    href="/help"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Help Center
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Contact Us
                                </Link>
                                <Link
                                    href="/status"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Status
                                </Link>
                                <Link
                                    href="/security"
                                    className="block text-gray-300 hover:text-white transition-colors"
                                >
                                    Security
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 text-sm">
                            © 2024 Cruel Technologies Inc. All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/cookies"
                                className="text-gray-400 hover:text-white text-sm transition-colors"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
