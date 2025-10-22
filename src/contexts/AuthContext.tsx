"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { apiClient } from "@/lib/api";

interface User {
    id: string;
    email: string;
    full_name?: string;
    is_active?: boolean;
    email_confirmed?: boolean;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, fullName?: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Production-level auth initialization
    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("auth_token");
            const storedUser = localStorage.getItem("user");

            if (token && storedUser) {
                try {
                    // Try to use stored user first for faster loading
                    const parsedData = JSON.parse(storedUser);
                    // Handle nested user object from /me endpoint
                    const parsedUser = parsedData.user || parsedData;
                    setUser(parsedUser);

                    // Validate token in background
                    const response = await apiClient.getCurrentUser();
                    if (response.data) {
                        // Update with fresh user data
                        // Handle if API returns {user: {...}} or just {...}
                        const freshUser = (response.data as any).user || response.data;
                        setUser(freshUser);
                        localStorage.setItem("user", JSON.stringify(freshUser));
                    } else if (response.error) {
                        // Token is invalid
                        console.warn("Token validation failed:", response.error);
                        setUser(null);
                        apiClient.clearToken();
                    }
                } catch (error) {
                    console.error("Auth initialization failed:", error);
                    setUser(null);
                    apiClient.clearToken();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await apiClient.login(email, password);
            if (response.data) {
                setUser(response.data.user);
            } else if (response.error) {
                throw new Error(response.error);
            }
        } catch (error) {
            throw error;
        }
    };

    const register = async (email: string, password: string, fullName?: string) => {
        try {
            const response = await apiClient.register({
                email,
                password,
                full_name: fullName || "",
            });
            if (response.data) {
                setUser(response.data.user);
                // Note: Supabase requires email verification, so user won't have session immediately
            } else if (response.error) {
                throw new Error(response.error);
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        await apiClient.logout();
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
