"use client";

import { useState } from "react";
import { Upload, FileText, MessageSquare, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import {
    whatsappAPI,
    type ExtractedDeadline,
    type WhatsAppUploadResponse,
} from "@/services/whatsapp";

interface WhatsAppUploaderProps {
    onDeadlinesExtracted?: (deadlines: ExtractedDeadline[]) => void;
    onUploadComplete?: (response: WhatsAppUploadResponse) => void;
}

export function WhatsAppUploader({
    onDeadlinesExtracted,
    onUploadComplete,
}: WhatsAppUploaderProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WhatsAppUploadResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [autoCreate, setAutoCreate] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleFileSelect = (selectedFile: File) => {
        if (selectedFile.type !== "text/plain" && !selectedFile.name.endsWith(".txt")) {
            setError("Please select a .txt file (WhatsApp chat export)");
            return;
        }

        if (selectedFile.size > 10 * 1024 * 1024) {
            // 10MB limit
            setError("File size too large. Maximum 10MB allowed.");
            return;
        }

        setFile(selectedFile);
        setError(null);
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const uploadFile = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);

        try {
            const response = await whatsappAPI.uploadChat({
                file,
                auto_create: autoCreate,
            });

            setResult(response);
            onDeadlinesExtracted?.(response.deadlines);
            onUploadComplete?.(response);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const resetUpload = () => {
        setFile(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">WhatsApp Chat Upload</h2>
                    <p className="text-gray-600">Extract deadlines from your group chat exports</p>
                </div>
            </div>

            {!file && !result && (
                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                        dragActive
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <div className="space-y-2">
                        <p className="text-lg font-medium text-gray-900">
                            Drop your WhatsApp chat export here
                        </p>
                        <p className="text-gray-600">
                            or{" "}
                            <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                                browse to upload
                                <input
                                    type="file"
                                    accept=".txt"
                                    onChange={(e) =>
                                        e.target.files?.[0] && handleFileSelect(e.target.files[0])
                                    }
                                    className="hidden"
                                />
                            </label>
                        </p>
                        <p className="text-sm text-gray-500">Supports .txt files up to 10MB</p>
                    </div>
                </div>
            )}

            {file && !result && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div className="flex-1">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">
                                {(file.size / 1024).toFixed(1)} KB
                            </p>
                        </div>
                        <button onClick={resetUpload} className="text-gray-400 hover:text-gray-600">
                            ×
                        </button>
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="autoCreate"
                            checked={autoCreate}
                            onChange={(e) => setAutoCreate(e.target.checked)}
                            className="h-4 w-4 text-blue-600 rounded border-gray-300"
                        />
                        <label htmlFor="autoCreate" className="text-sm text-gray-700">
                            Automatically create deadlines in your account
                        </label>
                    </div>

                    <button
                        onClick={uploadFile}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Processing Chat...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                Extract Deadlines
                            </>
                        )}
                    </button>
                </div>
            )}

            {error && (
                <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
            )}

            {result && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                        <CheckCircle className="h-5 w-5" />
                        <span>
                            Successfully processed {result.file_name} - Found{" "}
                            {result.total_extracted} deadlines
                            {result.auto_created > 0 &&
                                `, created ${result.auto_created} in your account`}
                        </span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-medium text-gray-900 mb-3">Extracted Deadlines:</h3>
                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {result.deadlines.slice(0, 10).map((deadline, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-3 rounded border-l-4 border-blue-500"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900">
                                                {deadline.title}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Due: {new Date(deadline.due_date).toLocaleString()}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                From: {deadline.sender} • Confidence:{" "}
                                                {(deadline.confidence * 100).toFixed(0)}%
                                            </p>
                                        </div>
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                deadline.priority === "high"
                                                    ? "bg-red-100 text-red-700"
                                                    : deadline.priority === "medium"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-green-100 text-green-700"
                                            }`}
                                        >
                                            {deadline.priority}
                                        </span>
                                    </div>
                                </div>
                            ))}
                            {result.deadlines.length > 10 && (
                                <p className="text-sm text-gray-500 text-center">
                                    ... and {result.deadlines.length - 10} more
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={resetUpload}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    >
                        Upload Another Chat
                    </button>
                </div>
            )}
        </div>
    );
}
