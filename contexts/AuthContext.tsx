'use client'; // phải nằm trên cùng

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// --- service API call frontend ---
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function loginService(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    return res.json();
}

async function registerService(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    return res.json();
}
// --- end service ---

// Kiểu User
interface User {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    token?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;

    // Quản lý Account Modal
    isAccountOpen: boolean;
    openAccount: () => void;
    closeAccount: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const openAccount = () => setIsAccountOpen(true);
    const closeAccount = () => setIsAccountOpen(false);

    // Load user/token từ localStorage
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        } finally {
            setLoading(false);
        }
    }, []);

    // --- Login ---
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginService(email, password);
            if (data?.user && data?.token) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                closeAccount();
                router.push("/");
                return true;
            } else {
                setError(data?.message || "Login failed.");
                return false;
            }
        } catch {
            setError("Network or server error.");
            return false;
        } finally {
            setLoading(false);
        }
    }, [router]);

    // --- Register ---
    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerService(name, email, password);
            if (data?.user && data?.token) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                closeAccount();
                return true;
            } else {
                setError(data?.message || "Registration failed.");
                return false;
            }
        } catch {
            setError("Network or server error.");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // --- Logout ---
    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
    }, [router]);

    const value: AuthContextType = {
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAccountOpen,
        openAccount,
        closeAccount,
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen"><p>Loading...</p></div>;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
