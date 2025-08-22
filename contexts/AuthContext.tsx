'use client'; // phải nằm trên cùng

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// --- CHỈNH LẠI: service API call frontend ---
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
// --- Hết phần service ---

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
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
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

    // Load từ localStorage
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

    // Đăng nhập
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginService(email, password);
            if (data?.token && data?.user) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                return true;
            } else {
                setError(data?.message || "Đăng nhập thất bại.");
                return false;
            }
        } catch (err) {
            setError("Lỗi mạng hoặc server không phản hồi.");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng ký
    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const data = await registerService(name, email, password);
            if (data?.token && data?.user) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                return true;
            } else {
                setError(data?.message || "Đăng ký thất bại.");
                return false;
            }
        } catch (err) {
            setError("Lỗi mạng hoặc server không phản hồi.");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng xuất
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
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Đang tải...</p>
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
