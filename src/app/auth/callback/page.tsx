"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export default function AuthCallbackPage() {
    const [status, setStatus] = useState("Processing authentication...");
    const [error, setError] = useState("");

    useEffect(() => {
        const handleCallback = async () => {
            try {
                console.log("Callback handler started");
                console.log("Current URL:", window.location.href);
                console.log("Hash:", window.location.hash);

                // Supabase automatically handles the hash fragment and sets the session
                const { supabase } = await import("@/lib/supabase");
                console.log("Supabase client loaded");

                // Wait a moment for Supabase to process the hash
                await new Promise((resolve) => setTimeout(resolve, 500));

                const { data, error } = await supabase.auth.getSession();
                console.log("Session result:", { data: !!data, session: !!data?.session, error });

                if (error) {
                    console.error("Session error:", error);
                    setError(error.message);
                    setStatus("Authentication failed");
                    setTimeout(() => window.location.href = "/login", 3000);
                    return;
                }

                if (data.session) {
                    console.log("Session found, user:", data.session.user.email);
                    setStatus("Authentication successful! Redirecting to dashboard...");

                    // Store the token and user for our backend API
                    apiClient.setToken(data.session.access_token);
                    const user = {
                        id: data.session.user.id,
                        email: data.session.user.email || "",
                        full_name:
                            data.session.user.user_metadata?.full_name ||
                            data.session.user.user_metadata?.name ||
                            "",
                        email_confirmed: !!data.session.user.email_confirmed_at,
                        is_active: true,
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("auth_token", data.session.access_token);

                    // Redirect to dashboard after a short delay
                    setTimeout(() => {
                        window.location.href = "/dashboard";
                    }, 1000);
                } else {
                    console.error("No session found");
                    setError("Authentication failed. Please try again.");
                    setStatus("No session found");
                    setTimeout(() => window.location.href = "/login", 3000);
                }
            } catch (error) {
                console.error("Callback error:", error);
                setError("An unexpected error occurred");
                setStatus("Error occurred");
                setTimeout(() => window.location.href = "/login", 3000);
            }
        };

        handleCallback();
    }, []);

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
                <div className="mb-6">
                    {!error && (
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    )}
                    <h1 className="text-2xl font-bold text-blue-600 mb-2">
                        {error ? "Authentication Failed" : "Completing Sign In"}
                    </h1>
                    <p className="text-gray-600 mb-4">
                        {status}
                    </p>
                    {error && (
                        <p className="text-red-600 text-sm mb-4">
                            {error}
                        </p>
                    )}
                </div>

                {!error && (
                    <div className="text-sm text-gray-500">
                        <p>This will only take a moment...</p>
                        <p className="mt-2">Check console for debug logs</p>
                    </div>
                )}

                {error && (
                    <div className="text-sm text-gray-500">
                        <p>Redirecting to login page...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
