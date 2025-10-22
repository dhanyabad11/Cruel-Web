"use client";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const { login, user, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Redirect if already logged in - use window.location for hard redirect
    useEffect(() => {
        if (!loading && user) {
            window.location.replace("/dashboard");
        }
    }, [user, loading]);

    // Immediate check on mount and pageshow events
    useEffect(() => {
        const checkAuth = () => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("auth_token");
                const storedUser = localStorage.getItem("user");
                if (token && storedUser) {
                    window.location.replace("/dashboard");
                }
            }
        };

        // Check immediately
        checkAuth();

        // Check on pageshow (handles back/forward navigation and bfcache)
        const handlePageShow = (event: PageTransitionEvent) => {
            // If page is restored from bfcache, check auth again
            if (event.persisted) {
                checkAuth();
            }
        };

        window.addEventListener("pageshow", handlePageShow);

        // Disable bfcache by adding unload handler
        const disableBfCache = () => {
            // Empty handler to disable bfcache
        };
        window.addEventListener("unload", disableBfCache);

        return () => {
            window.removeEventListener("pageshow", handlePageShow);
            window.removeEventListener("unload", disableBfCache);
        };
    }, []); // Don't render login form if already authenticated
    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center">
                <div className="text-[#6B7280] dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    if (user) {
        return null; // Don't render anything if user is logged in
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login form submitted", formData);
        setError("");
        setIsLoading(true);

        try {
            console.log("Attempting login...");
            await login(formData.email, formData.password);

            // Clear all history and navigate to dashboard
            window.history.pushState(null, "", "/dashboard");
            window.history.pushState(null, "", "/dashboard");
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Login error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5] dark:bg-gray-900 flex items-center justify-center p-6 transition-colors">
            <div className="max-w-sm w-full">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white mb-6 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    <span className="font-light">Back</span>
                </Link>

                {/* Login Card */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-light text-[#1A1A1A] dark:text-white mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-[#6B7280] dark:text-gray-400 font-light text-sm">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-white border border-[#EF4444]">
                            <div className="flex items-center">
                                <AlertCircle
                                    className="w-4 h-4 text-[#EF4444] mr-2"
                                    strokeWidth={1.5}
                                />
                                <p className="text-xs text-[#EF4444] font-light">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                                    ) : (
                                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-[#2563EB] text-white font-light text-sm hover:bg-[#1E40AF] transition-colors disabled:bg-[#9CA3AF] disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    <span className="font-light">Signing in...</span>
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#D1D5DB] dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-2 bg-white dark:bg-gray-800 text-[#6B7280] dark:text-gray-400 font-light">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                setIsLoading(true);
                                const response = await fetch("/api/proxy/api/auth/oauth/google", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        redirect_url: `${window.location.origin}/auth/callback`,
                                    }),
                                });
                                const data = await response.json();
                                if (data.url) {
                                    window.location.href = data.url;
                                }
                            } catch (error) {
                                console.error("Google OAuth error:", error);
                                setError("Failed to initiate Google sign in");
                            } finally {
                                setIsLoading(false);
                            }
                        }}
                        disabled={isLoading}
                        className="w-full py-2.5 border border-[#D1D5DB] dark:border-gray-600 bg-white dark:bg-gray-700 text-[#1A1A1A] dark:text-white font-light text-sm hover:bg-[#F5F5F5] dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                                fill="#4285F4"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="#34A853"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="#EA4335"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </button>

                    {/* Sign up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-[#6B7280] dark:text-gray-400 font-light">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-[#2563EB] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 font-light"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
