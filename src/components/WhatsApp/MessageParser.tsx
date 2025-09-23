"use client";

import { useState } from "react";
import { MessageSquare, Sparkles, AlertCircle, CheckCircle } from "lucide-react";
import {
    whatsappAPI,
    type ExtractedDeadline,
    type WhatsAppParseResponse,
} from "@/services/whatsapp";

interface MessageParserProps {
    onDeadlinesExtracted?: (deadlines: ExtractedDeadline[]) => void;
}

export function MessageParser({ onDeadlinesExtracted }: MessageParserProps) {
    const [message, setMessage] = useState("");
    const [sender, setSender] = useState("You");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<WhatsAppParseResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [autoCreate, setAutoCreate] = useState(false);

    const parseMessage = async () => {
        if (!message.trim()) {
            setError("Please enter a message to parse");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await whatsappAPI.parseMessage({
                message: message.trim(),
                sender: sender.trim() || "You",
                auto_create: autoCreate,
            });

            setResult(response);
            onDeadlinesExtracted?.(response.extracted_deadlines);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to parse message");
        } finally {
            setLoading(false);
        }
    };

    const clearMessage = () => {
        setMessage("");
        setResult(null);
        setError(null);
    };

    const exampleMessages = [
        "Don't forget the physics assignment is due tomorrow at 11:59 PM",
        "Math quiz next Monday at 2 PM in room 301",
        "Submit your research paper by Friday 5 PM",
        "Group presentation scheduled for Wednesday morning",
        "Final exam is December 15th at 9 AM",
    ];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Parse Single Message</h2>
                    <p className="text-gray-600">
                        Test deadline extraction from individual messages
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Message Input */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter a message that might contain a deadline..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                        rows={3}
                    />
                </div>

                {/* Sender Input */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label
                            htmlFor="sender"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Sender
                        </label>
                        <input
                            id="sender"
                            type="text"
                            value={sender}
                            onChange={(e) => setSender(e.target.value)}
                            placeholder="Who sent this message?"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-2 p-3">
                            <input
                                type="checkbox"
                                checked={autoCreate}
                                onChange={(e) => setAutoCreate(e.target.checked)}
                                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">Auto-create</span>
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={parseMessage}
                        disabled={loading || !message.trim()}
                        className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Parsing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-4 w-4" />
                                Parse Message
                            </>
                        )}
                    </button>
                    {(message || result) && (
                        <button
                            onClick={clearMessage}
                            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Clear
                        </button>
                    )}
                </div>

                {/* Example Messages */}
                {!message && !result && (
                    <div className="border-t pt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Try these examples:
                        </p>
                        <div className="space-y-2">
                            {exampleMessages.map((example, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMessage(example)}
                                    className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                                >
                                    " {example}"
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 rounded-lg">
                        <AlertCircle className="h-5 w-5" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Results Display */}
                {result && (
                    <div className="border-t pt-4">
                        {result.extracted_deadlines.length > 0 ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                                    <CheckCircle className="h-5 w-5" />
                                    <span>
                                        Found {result.extracted_deadlines.length} deadline(s)
                                        {result.created_count > 0 &&
                                            ` - Created ${result.created_count} in your account`}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <h3 className="font-medium text-gray-900">
                                        Extracted Deadlines:
                                    </h3>
                                    {result.extracted_deadlines.map((deadline, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {deadline.title}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        Due:{" "}
                                                        {new Date(
                                                            deadline.due_date
                                                        ).toLocaleString()}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Confidence:{" "}
                                                        {(deadline.confidence * 100).toFixed(0)}% •
                                                        Priority: {deadline.priority}
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
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                                <p>No deadlines detected in this message.</p>
                                <p className="text-sm mt-1">
                                    Try messages with words like &ldquo;due&rdquo;,
                                    &ldquo;deadline&rdquo;, &ldquo;assignment&rdquo;, or specific
                                    dates.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
