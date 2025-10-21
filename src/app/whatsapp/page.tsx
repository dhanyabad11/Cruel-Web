"use client";

import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Upload, FileText, AlertCircle, CheckCircle, Download, MessageSquare } from "lucide-react";

interface ExtractedDeadline {
    id: string;
    title: string;
    extractedFrom: string;
    dueDate: string;
    confidence: number;
    originalMessage: string;
}

export default function WhatsAppPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [extractedDeadlines, setExtractedDeadlines] = useState<ExtractedDeadline[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login");
        }
    }, [user, loading, router]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }
    };

    const handleFiles = async (files: File[]) => {
        // Filter for text files
        const textFiles = files.filter(
            (file) => file.type === "text/plain" || file.name.endsWith(".txt")
        );

        if (textFiles.length === 0) {
            setError("Please upload WhatsApp chat export files (.txt format)");
            return;
        }

        setError("");
        setUploading(true);
        setUploadedFiles(textFiles);

        try {
            // Process files with the backend API
            const formData = new FormData();
            textFiles.forEach((file) => {
                formData.append(`files`, file);
            });

            // For now, show a message that WhatsApp parsing will be implemented
            // In production, this would parse the files and extract deadlines
            setExtractedDeadlines([]);
            setError(
                "WhatsApp message parsing is not yet implemented. Please add deadlines manually."
            );
        } catch (err) {
            console.error("Error processing files:", err);
            setError("Failed to process WhatsApp files. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleSaveDeadline = (deadline: ExtractedDeadline) => {
        console.log("Save deadline:", deadline);
        // TODO: Implement saving to database
    };

    const handleDiscardDeadline = (id: string) => {
        setExtractedDeadlines((prev) => prev.filter((d) => d.id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-gray-900">
                <div className="text-[#6B7280] dark:text-gray-400 font-light">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 transition-colors">
            <Navigation />
            <div className="max-w-6xl mx-auto px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-light text-[#1A1A1A] dark:text-white mb-2">WhatsApp Chat Analysis</h1>
                    <p className="text-[#6B7280] dark:text-gray-400 font-light">
                        Upload WhatsApp chat exports to automatically extract deadlines and
                        assignments
                    </p>
                </div>

                {/* Instructions */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-6 mb-8">
                    <h2 className="text-lg font-light text-[#1A1A1A] dark:text-white mb-4">How to export WhatsApp chats:</h2>
                    <div className="space-y-3 text-sm font-light text-[#6B7280] dark:text-gray-400">
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center text-xs font-light">
                                1
                            </span>
                            <span>Open the WhatsApp chat you want to analyze</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center text-xs font-light">
                                2
                            </span>
                            <span>Tap the three dots menu → More → Export chat</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center text-xs font-light">
                                3
                            </span>
                            <span>Choose &quot;Without Media&quot; and save the .txt file</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-[#1A1A1A] dark:bg-white text-white dark:text-[#1A1A1A] flex items-center justify-center text-xs font-light">
                                4
                            </span>
                            <span>Upload the file here to extract deadlines</span>
                        </div>
                    </div>
                </div>

                {/* Upload Area */}
                <div
                    className={`bg-white dark:bg-gray-800 border-2 border-dashed transition-colors p-6 ${
                        dragOver ? "border-[#2563EB] dark:border-blue-400 bg-[#F5F5F5] dark:bg-gray-700" : "border-[#D1D5DB] dark:border-gray-700"
                    } ${uploading ? "pointer-events-none opacity-50" : ""}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <div className="text-center py-12">
                        {uploading ? (
                            <div className="space-y-4">
                                <MessageSquare className="h-12 w-12 text-[#2563EB] dark:text-blue-400 mx-auto animate-pulse" strokeWidth={1.5} />
                                <p className="text-lg font-light text-[#1A1A1A] dark:text-white">
                                    Processing your WhatsApp chats...
                                </p>
                                <p className="text-[#6B7280] dark:text-gray-400 font-light">
                                    Extracting deadlines and assignments
                                </p>
                            </div>
                        ) : (
                            <>
                                <Upload className="h-12 w-12 text-[#6B7280] dark:text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                                <h3 className="text-lg font-light text-[#1A1A1A] dark:text-white mb-2">
                                    Upload WhatsApp Chat Files
                                </h3>
                                <p className="text-[#6B7280] dark:text-gray-400 font-light mb-6">
                                    Drag and drop your .txt files here, or click to browse
                                </p>
                                <input
                                    type="file"
                                    multiple
                                    accept=".txt"
                                    onChange={handleFileInput}
                                    className="hidden"
                                    id="file-upload"
                                />
                                <label
                                    htmlFor="file-upload"
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-[#2563EB] text-white hover:bg-[#1E40AF] transition-colors font-light cursor-pointer"
                                >
                                    <FileText className="h-4 w-4" strokeWidth={1.5} />
                                    Choose Files
                                </label>
                                <p className="text-xs text-[#6B7280] dark:text-gray-400 font-light mt-4">
                                    Supports: .txt files (WhatsApp chat exports)
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-white dark:bg-gray-800 border border-red-600 dark:border-red-400 p-4 mt-6">
                        <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2" strokeWidth={1.5} />
                            <p className="text-red-600 dark:text-red-400 font-light">{error}</p>
                        </div>
                    </div>
                )}

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-light text-[#1A1A1A] dark:text-white mb-4">Uploaded Files</h2>
                        <div className="space-y-2">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-4"
                                >
                                    <div className="flex items-center">
                                        <FileText className="h-5 w-5 text-[#2563EB] dark:text-blue-400 mr-3" strokeWidth={1.5} />
                                        <div>
                                            <p className="font-light text-[#1A1A1A] dark:text-white">{file.name}</p>
                                            <p className="text-sm font-light text-[#6B7280] dark:text-gray-400">
                                                {(file.size / 1024).toFixed(1)} KB
                                            </p>
                                        </div>
                                    </div>
                                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" strokeWidth={1.5} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Extracted Deadlines */}
                {extractedDeadlines.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-lg font-light text-[#1A1A1A] dark:text-white mb-4">Extracted Deadlines</h2>
                        <div className="space-y-4">
                            {extractedDeadlines.map((deadline) => (
                                <div
                                    key={deadline.id}
                                    className="card border-l-4 border-l-blue-500"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                                <h3 className="font-semibold">{deadline.title}</h3>
                                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                                    {deadline.confidence}% confidence
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-2">
                                                From: {deadline.extractedFrom}
                                            </p>
                                            <p className="text-sm text-gray-500 italic mb-3">
                                                &quot;{deadline.originalMessage}&quot;
                                            </p>
                                            <p className="text-sm font-medium">
                                                Due:{" "}
                                                {new Date(deadline.dueDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <button
                                                onClick={() => handleSaveDeadline(deadline)}
                                                className="btn btn-success text-sm"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => handleDiscardDeadline(deadline.id)}
                                                className="btn btn-ghost text-sm"
                                            >
                                                Discard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {extractedDeadlines.length > 0 && (
                            <div className="mt-6 text-center">
                                <button className="btn btn-primary">
                                    <Download className="h-4 w-4 mr-2" />
                                    Save All Deadlines
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
