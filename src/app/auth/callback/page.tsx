"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { apiClient } from "@/lib/api";

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Check for errors in URL params
                const errorParam = searchParams.get("error");
                const errorDescription = searchParams.get("error_description");

                if (errorParam) {
                    setError(errorDescription || errorParam);
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                // Supabase automatically handles the hash fragment and sets the session
                // Just need to get the current session
                const { supabase } = await import("@/lib/supabase");
                
                // Wait a moment for Supabase to process the hash
                await new Promise(resolve => setTimeout(resolve, 100));
                
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Session error:", error);
                    setError(error.message);
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                if (data.session) {
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
                    setTimeout(() => router.push("/login"), 3000);
                }
            } catch (error) {
                console.error("Callback error:", error);
                setError("An unexpected error occurred");
                setTimeout(() => router.push("/login"), 3000);
            }
        };

        handleCallback();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                {error ? (
                    <div className="space-y-4">
                        <div className="text-[#EF4444] font-light text-lg">
                            Authentication Failed
                        </div>
                        <div className="text-[#6B7280] dark:text-gray-400 text-sm font-light">
                            {error}
                        </div>
                        <div className="text-[#6B7280] dark:text-gray-400 text-xs font-light">
                            Redirecting to login...
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
                        <div className="text-[#1A1A1A] dark:text-white font-light">
                            Completing sign in...
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
                    <div className="space-y-4 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB] mx-auto"></div>
                        <div className="text-[#1A1A1A] dark:text-white font-light">Loading...</div>
                    </div>
                </div>
            }
        >
            <AuthCallbackContent />
        </Suspense>
    );
}
