"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api";

export const dynamic = "force-dynamic";

function AuthCallbackContent() {
    console.log("AuthCallbackContent component rendering");
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState<string>("Loading...");

    console.log("useSearchParams result:", searchParams);
    console.log("Current location:", typeof window !== "undefined" ? window.location.href : "SSR");

    useEffect(() => {
        console.log("useEffect running in AuthCallbackContent");
        setStatus("Processing authentication...");

        const handleCallback = async () => {
            try {
                console.log("Callback handler started");
                console.log("Current URL:", window.location.href);
                console.log("Hash:", window.location.hash);

                // Check for errors in URL params
                const errorParam = searchParams.get("error");
                const errorDescription = searchParams.get("error_description");

                if (errorParam) {
                    console.log("Error found in params:", errorParam);
                    setError(errorDescription || errorParam);
                    setStatus("Error");
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                // Supabase automatically handles the hash fragment and sets the session
                // Just need to get the current session
                const { supabase } = await import("@/lib/supabase");
                console.log("Supabase client loaded");

                // Wait a moment for Supabase to process the hash
                await new Promise((resolve) => setTimeout(resolve, 500));

                const { data, error } = await supabase.auth.getSession();
                console.log("Session result:", { data: !!data, session: !!data?.session, error });

                if (error) {
                    console.error("Session error:", error);
                    setError(error.message);
                    setStatus("Error");
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                if (data.session) {
                    console.log("Session found, user:", data.session.user.email);
                    setStatus("Authentication successful, redirecting...");
                    
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

                    // Redirect to dashboard
                    window.location.href = "/dashboard";
                } else {
                    console.error("No session found");
                    setError("Authentication failed. Please try again.");
                    setStatus("Error");
                    setTimeout(() => router.push("/login"), 3000);
                }
            } catch (error) {
                console.error("Callback error:", error);
                setError("An unexpected error occurred");
                setStatus("Error");
                setTimeout(() => router.push("/login"), 3000);
            }
        };

        handleCallback();
    }, [searchParams, router]);

    console.log("Rendering AuthCallbackContent with status:", status, "error:", error);

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="text-[#1A1A1A] dark:text-white font-light text-lg">
                    {status}
                </div>
                {error && (
                    <div className="text-[#EF4444] font-light">
                        {error}
                    </div>
                )}
                {!error && (
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
                )}
                <div className="text-[#6B7280] dark:text-gray-400 text-xs font-light">
                    Check console for debug logs
                </div>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    console.log("AuthCallbackPage component rendering");
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
                        <div className="text-[#1A1A1A] dark:text-white font-light">Suspense Loading...</div>
                    </div>
                </div>
            }
        >
            <AuthCallbackContent />
        </Suspense>
    );
}
