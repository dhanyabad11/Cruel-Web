"use client";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Mail, Lock, Github, Chrome, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const router = useRouter();

    // Test basic JavaScript functionality
    useEffect(() => {
        console.log("LoginPage component mounted - JavaScript is working");
    }, []);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login form submitted", formData);
        setError("");
        setIsLoading(true);

        try {
            console.log("Attempting login...");
            await login(formData.email, formData.password);

            // Store remember me preference
            if (formData.rememberMe) {
                localStorage.setItem("remember_me", "true");
            }

            // Redirect to dashboard
            router.push("/dashboard");
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
        <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
            {/* Stunning Background Effects */}
            <div className="fixed inset-0 bg-gradient-mesh opacity-30"></div>
            <div className="fixed top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="fixed bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-md w-full relative z-10">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-foreground-secondary hover:text-foreground mb-8 transition-all group"
                >
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to home
                </Link>

                {/* Stunning Login Card */}
                <div className="card backdrop-blur-2xl border-2 border-border/50 shadow-2xl">
                    <div className="card-content">
                        <div className="text-center mb-12">
                            <div className="flex items-center justify-center mb-8">
                                <div className="w-20 h-20 bg-gradient-to-r from-primary via-accent to-warning rounded-3xl flex items-center justify-center shadow-2xl">
                                    <span className="text-white font-bold text-3xl">A</span>
                                </div>
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-warning bg-clip-text text-transparent mb-4">
                                Welcome Back
                            </h1>
                            <p className="text-foreground-secondary text-lg">
                                Sign in to continue your journey
                            </p>
                        </div>

                        {/* Stunning Social Login Buttons */}
                        <div className="space-y-4 mb-8">
                            <button
                                onClick={() => handleSocialLogin("google")}
                                className="btn btn-secondary w-full py-4 text-base font-semibold group relative overflow-hidden"
                            >
                                <Chrome className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                Continue with Google
                            </button>
                            <button
                                onClick={() => handleSocialLogin("github")}
                                className="btn btn-secondary w-full py-4 text-base font-semibold group relative overflow-hidden"
                            >
                                <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                Continue with GitHub
                            </button>
                        </div>

                        {/* Beautiful Divider */}
                        <div className="relative mb-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-6 bg-card text-foreground-muted font-medium">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Stunning Error Message */}
                        {error && (
                            <div className="mb-8 p-4 rounded-2xl bg-danger/10 border border-danger/20 backdrop-blur-sm">
                                <div className="flex items-center">
                                    <AlertCircle className="w-5 h-5 text-danger mr-3" />
                                    <p className="text-sm text-danger font-medium">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-foreground mb-3"
                                >
                                    Email address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="input w-full pl-12 pr-4 text-base"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-foreground mb-3"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="input w-full pl-12 pr-12 text-base"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
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
                                            setFormData({
                                                ...formData,
                                                rememberMe: e.target.checked,
                                            })
                                        }
                                        className="h-5 w-5 text-primary focus:ring-primary border-border rounded-lg bg-input"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-3 block text-sm font-medium text-foreground-secondary"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-primary hover:text-accent font-semibold transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn btn-primary w-full py-4 text-base font-bold shadow-2xl"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>

                        {/* Beautiful Sign up Link */}
                        <div className="mt-8 text-center">
                            <p className="text-sm text-foreground-secondary">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="text-primary hover:text-accent font-bold transition-colors"
                                >
                                    Sign up for free
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
