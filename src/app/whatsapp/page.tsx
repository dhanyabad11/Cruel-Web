"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { useRouter } from "next/navigation";
import { MessageSquare, Upload, Sparkles, Book, HelpCircle } from "lucide-react";
import { WhatsAppUploader } from "@/components/WhatsApp/WhatsAppUploader";
import { MessageParser } from "@/components/WhatsApp/MessageParser";
import type { ExtractedDeadline } from "@/services/whatsapp";

export default function WhatsAppPage() {
    const [activeTab, setActiveTab] = useState<"upload" | "parse">("upload");
    const [extractedDeadlines, setExtractedDeadlines] = useState<ExtractedDeadline[]>([]);
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const handleDeadlinesExtracted = (deadlines: ExtractedDeadline[]) => {
        setExtractedDeadlines((prev) => [...prev, ...deadlines]);
    };

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

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />

            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="bg-green-100 p-2 rounded-lg">
                                <MessageSquare className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-xl font-semibold text-gray-900">
                                    WhatsApp Integration
                                </h1>
                                <p className="text-sm text-gray-600">
                                    AI-powered deadline extraction from group chats
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">
                                {extractedDeadlines.length} deadlines extracted
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tab Navigation */}
                        <div className="bg-white rounded-lg shadow-sm p-1 flex">
                            <button
                                onClick={() => setActiveTab("upload")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === "upload"
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <Upload className="h-4 w-4" />
                                Upload Chat File
                            </button>
                            <button
                                onClick={() => setActiveTab("parse")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                                    activeTab === "parse"
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                }`}
                            >
                                <Sparkles className="h-4 w-4" />
                                Parse Message
                            </button>
                        </div>

                        {/* Tab Content */}
                        {activeTab === "upload" && (
                            <WhatsAppUploader onDeadlinesExtracted={handleDeadlinesExtracted} />
                        )}

                        {activeTab === "parse" && (
                            <MessageParser onDeadlinesExtracted={handleDeadlinesExtracted} />
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* How it Works */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <HelpCircle className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-gray-900">How It Works</h3>
                            </div>
                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex gap-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Export WhatsApp Chat
                                        </p>
                                        <p>
                                            Go to your group chat → More → Export chat → Without
                                            media
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            Upload & Extract
                                        </p>
                                        <p>
                                            Upload the .txt file and let AI find all deadlines
                                            automatically
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="bg-blue-100 text-blue-600 rounded-full w-6 h-6 flex items-center justify-center font-medium">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Review & Save</p>
                                        <p>
                                            Check extracted deadlines and add them to your dashboard
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Example Messages */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Book className="h-5 w-5 text-green-600" />
                                <h3 className="font-semibold text-gray-900">Example Messages</h3>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-gray-900">
                                        &ldquo;Assignment due tomorrow 11:59 PM&rdquo;
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        → High priority, specific time
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-gray-900">
                                        &ldquo;Math quiz next Monday&rdquo;
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        → Medium priority, relative date
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-gray-900">
                                        &ldquo;Final exam December 15th 9 AM&rdquo;
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        → High priority, absolute date
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Extractions */}
                        {extractedDeadlines.length > 0 && (
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">
                                    Recent Extractions
                                </h3>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {extractedDeadlines
                                        .slice(-5)
                                        .reverse()
                                        .map((deadline, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-50 p-3 rounded-lg border-l-2 border-blue-500"
                                            >
                                                <p className="font-medium text-gray-900 text-sm">
                                                    {deadline.title}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {new Date(
                                                        deadline.due_date
                                                    ).toLocaleDateString()}{" "}
                                                    • {deadline.sender}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {(deadline.confidence * 100).toFixed(0)}%
                                                    confidence
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
