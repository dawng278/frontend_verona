'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// --- API calls ---
async function loginService(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'Login failed');
    return data;
}

async function registerService(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.message || 'Registration failed');
    return data;
}
// --- end API ---

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
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
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
    const router = useRouter();

    const [isAccountOpen, setIsAccountOpen] = useState(false);
    const openAccount = () => setIsAccountOpen(true);
    const closeAccount = () => setIsAccountOpen(false);

    // Load user/token từ localStorage khi app load
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
        }
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const data = await loginService(email, password);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    }, []);

    const register = useCallback(async (name: string, email: string, password: string) => {
        const data = await registerService(name, email, password);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
    }, []);

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
        login,
        register,
        logout,
        isAccountOpen,
        openAccount,
        closeAccount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
