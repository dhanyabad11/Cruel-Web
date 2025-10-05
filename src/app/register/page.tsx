"use client";

import { useState } from "react";
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

    const { register } = useAuth();
    const router = useRouter();

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
            router.push("/login"); // Redirect to login page
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-6">
            <div className="w-full max-w-sm">
                {/* Back to home */}
                <Link
                    href="/"
                    className="inline-flex items-center text-[#6B7280] hover:text-[#1A1A1A] mb-6 transition-colors text-sm"
                >
                    <ArrowLeft className="w-4 h-4 mr-1.5" strokeWidth={1.5} />
                    <span className="font-light">Back</span>
                </Link>

                {/* Register Card */}
                <div className="bg-white border border-[#D1D5DB] p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-light text-[#1A1A1A] mb-2">Create Account</h1>
                        <p className="text-[#6B7280] font-light text-sm">
                            Never miss a deadline
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-3 bg-white border border-[#EF4444]">
                            <p className="text-[#EF4444] text-xs font-light">{error}</p>
                        </div>
                    )}

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-xs font-light text-[#1A1A1A] mb-1.5"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <User
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]"
                                    strokeWidth={1.5}
                                />
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] focus:border-[#2563EB] focus:outline-none font-light text-[#1A1A1A] text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-xs font-light text-[#1A1A1A] mb-1.5"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]"
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
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#D1D5DB] focus:border-[#2563EB] focus:outline-none font-light text-[#1A1A1A] text-sm"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-light text-[#1A1A1A] mb-1.5"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]"
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
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#D1D5DB] focus:border-[#2563EB] focus:outline-none font-light text-[#1A1A1A] text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A1A]"
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
                                className="block text-xs font-light text-[#1A1A1A] mb-1.5"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]"
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
                                    className="w-full pl-10 pr-10 py-2.5 border border-[#D1D5DB] focus:border-[#2563EB] focus:outline-none font-light text-[#1A1A1A] text-sm"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A1A]"
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

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-[#6B7280] text-xs font-light">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[#2563EB] hover:text-[#1E40AF] font-light"
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
