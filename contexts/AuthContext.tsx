'use client'; // This directive must be on the first line

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
// --- Sửa đổi dòng này ---
// Thay vì import từ thư mục backend cục bộ,
// hãy import các hàm login và register từ file service của frontend
import { login as loginFrontendService, register as registerFrontendService } from '@/app/services/authService';
// --- Kết thúc sửa đổi ---

// Định nghĩa kiểu dữ liệu cho User
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    token?: string;
}

// Định nghĩa kiểu dữ liệu cho AuthContext
interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}

// Tạo AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Load user từ localStorage khi app khởi động
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('token');
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        } catch (e) {
            console.error("Failed to load user/token from localStorage", e);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng nhập
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            // --- Sửa đổi dòng này ---
            const data = await loginFrontendService(email, password);
            // --- Kết thúc sửa đổi ---
            if (data?.token && data?.user) {
                setUser(data.user as User);
                setToken(data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                return true;
            } else {
                setError(data?.message || 'Đăng nhập thất bại.');
                return false;
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Lỗi đăng nhập:', err.message);
                setError(err.message);
            } else {
                console.error('Lỗi đăng nhập không xác định:', err);
                setError('Lỗi mạng hoặc server không phản hồi.');
            }
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
            // --- Sửa đổi dòng này ---
            const data = await registerFrontendService(name, email, password);
            // --- Kết thúc sửa đổi ---
            if (data?.token && data?.user) {
                setUser(data.user as User);
                setToken(data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('token', data.token);
                return true;
            } else {
                setError(data?.message || 'Đăng ký thất bại.');
                return false;
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Lỗi đăng ký:', err.message);
                setError(err.message);
            } else {
                console.error('Lỗi đăng ký không xác định:', err);
                setError('Lỗi mạng hoặc server không phản hồi.');
            }
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Đăng xuất
    const logout = useCallback(async () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    }, [router]);

    const value = {
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