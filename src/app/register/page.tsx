"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, User, Mail, Lock, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { register, user, loading } = useAuth();
    const router = useRouter();

    // Redirect if already logged in
    useEffect(() => {
        if (!loading && user) {
            router.replace("/dashboard");
        }
    }, [user, loading, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setIsLoading(true);

        try {
            await register(email, password, fullName);
            // Show success message instead of redirecting immediately
            setError(""); // Clear any errors
            alert(
                "Registration successful! Please check your email to verify your account, then you can sign in."
            );
            router.replace("/login"); // Use replace instead of push
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-gray-900 p-6 transition-colors">
            <div className="w-full max-w-sm">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white mb-6 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    <span className="font-light">Back</span>
                </Link>

                {/* Register Card */}
                <div className="bg-white dark:bg-gray-800 border border-[#D1D5DB] dark:border-gray-700 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-light text-[#1A1A1A] dark:text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-[#6B7280] dark:text-gray-400 font-light text-sm">
                            Never miss a deadline
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-white dark:bg-gray-900 border border-[#EF4444]">
                            <p className="text-[#EF4444] text-xs font-light">{error}</p>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
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
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
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
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                                    ) : (
                                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-xs font-light text-[#1A1A1A] dark:text-gray-300 mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280] dark:text-gray-500"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#D1D5DB] dark:border-gray-600 focus:border-[#2563EB] dark:focus:border-blue-400 focus:outline-none font-light text-[#1A1A1A] dark:text-white dark:bg-gray-700 text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] dark:text-gray-400 hover:text-[#1A1A1A] dark:hover:text-white"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                                    ) : (
                                        <Eye className="w-4 h-4" strokeWidth={1.5} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Register Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-[#2563EB] text-white font-light text-sm hover:bg-[#1E40AF] transition-colors disabled:bg-[#9CA3AF] disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    <span className="font-light">Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
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

                    {/* Google Sign Up */}
                    <button
                        type="button"
                        onClick={async () => {
                            try {
                                setIsLoading(true);
                                const { supabase } = await import("@/lib/supabase");
                                const { error } = await supabase.auth.signInWithOAuth({
                                    provider: "google",
                                    options: {
                                        redirectTo: `${window.location.origin}/auth/callback`,
                                    },
                                });
                                if (error) {
                                    setError(error.message);
                                }
                            } catch (error) {
                                console.error("Google OAuth error:", error);
                                setError("Failed to initiate Google sign up");
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

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-[#6B7280] dark:text-gray-400 text-xs font-light">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[#2563EB] dark:text-blue-400 hover:text-[#1E40AF] dark:hover:text-blue-300 font-light"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
