"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { apiClient } from "@/lib/api";

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic';

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("Processing authentication...");

    useEffect(() => {
        const handleAuthCallback = async () => {
            try {
                // Check for error parameters first
                const error = searchParams.get("error");
                const errorDescription = searchParams.get("error_description");

                if (error) {
                    console.error("OAuth error:", error, errorDescription);
                    setStatus("error");
                    setMessage(`Authentication failed: ${errorDescription || error}`);
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                // Handle the OAuth callback
                const { data, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error("Session error:", sessionError);
                    setStatus("error");
                    setMessage("Failed to establish session. Please try again.");
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                if (!data.session) {
                    console.error("No session found");
                    setStatus("error");
                    setMessage("Authentication session not found. Please try again.");
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                // Store authentication data
                const { session } = data;
                const user = {
                    id: session.user.id,
                    email: session.user.email || "",
                    full_name: session.user.user_metadata?.full_name ||
                             session.user.user_metadata?.name || "",
                    avatar_url: session.user.user_metadata?.avatar_url || "",
                    email_confirmed: !!session.user.email_confirmed_at,
                    is_active: true,
                    created_at: session.user.created_at,
                    updated_at: session.user.updated_at,
                };

                // Store in localStorage for persistence
                localStorage.setItem("auth_token", session.access_token);
                localStorage.setItem("refresh_token", session.refresh_token || "");
                localStorage.setItem("user", JSON.stringify(user));

                // Configure API client with token
                apiClient.setToken(session.access_token);

                // Verify backend connectivity (optional)
                try {
                    // You can add a backend health check here if needed
                    console.log("Authentication successful, user:", user.email);
                } catch (backendError) {
                    console.warn("Backend verification failed, but continuing:", backendError);
                }

                setStatus("success");
                setMessage("Authentication successful! Redirecting...");

                // Redirect to dashboard after successful authentication
                setTimeout(() => {
                    router.push("/dashboard");
                }, 1500);

            } catch (error) {
                console.error("Unexpected error during authentication:", error);
                setStatus("error");
                setMessage("An unexpected error occurred. Please try again.");
                setTimeout(() => router.push("/login"), 3000);
            }
        };

        handleAuthCallback();
    }, [router, searchParams]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                {status === "loading" && (
                    <>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Completing Sign In
                        </h1>
                        <p className="text-gray-600">{message}</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Welcome Back!
                        </h1>
                        <p className="text-gray-600">{message}</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Authentication Failed
                        </h1>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">
                            Redirecting to login page...
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
