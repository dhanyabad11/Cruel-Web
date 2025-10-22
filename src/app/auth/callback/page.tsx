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
                const errorParam = searchParams.get("error");
                const errorDescription = searchParams.get("error_description");

                if (errorParam) {
                    setError(errorDescription || errorParam);
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                // Exchange the code for a session using Supabase
                const { supabase } = await import("@/lib/supabase");
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    setError(error.message);
                    setTimeout(() => router.push("/login"), 3000);
                    return;
                }

                if (data.session) {
                    // Store the token and user
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

                    // Redirect to dashboard
                    window.location.href = "/dashboard";
                } else {
                    setError("No session found");
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
