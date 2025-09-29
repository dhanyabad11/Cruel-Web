"use client";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Github, Chrome, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await apiClient.login(formData.email, formData.password);

            if (response.error) {
                setError(response.error);
                return;
            }

            if (response.data) {
                // Store remember me preference
                if (formData.rememberMe) {
                    localStorage.setItem("remember_me", "true");
                }

                // Redirect to dashboard
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        // For now, redirect to backend OAuth endpoints
        if (provider === "google") {
            window.location.href = `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            }/api/auth/google`;
        } else if (provider === "github") {
            window.location.href = `${
                process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            }/api/auth/github`;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4">
            <div className="max-w-md w-full">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 border border-gray-200/50">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-6">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-2xl">C</span>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
                        <p className="text-gray-600">Sign in to your account to continue</p>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="space-y-3 mb-6">
                        <button
                            onClick={() => handleSocialLogin("google")}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            <Chrome className="w-5 h-5 mr-3" />
                            Continue with Google
                        </button>
                        <button
                            onClick={() => handleSocialLogin("github")}
                            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                        >
                            <Github className="w-5 h-5 mr-3" />
                            Continue with GitHub
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">
                                Or continue with email
                            </span>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                            <div className="flex items-center">
                                <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={formData.rememberMe}
                                    onChange={(e) =>
                                        setFormData({ ...formData, rememberMe: e.target.checked })
                                    }
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>
                            <Link
                                href="/forgot-password"
                                className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-medium"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Signing in...
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </form>

                    {/* Sign up Link */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/register"
                                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
