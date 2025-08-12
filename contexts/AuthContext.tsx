// frontend/contexts/AuthContext.tsx
'use client'; // Component này là Client Component

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Định nghĩa kiểu dữ liệu cho User
interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    token?: string; // Token có thể có hoặc không
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

// Custom hook để sử dụng AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true); // Bắt đầu với loading true
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // API Base URL cho các API Routes của Next.js
    const API_BASE_URL = '/api/auth';

    // Kiểm tra trạng thái đăng nhập khi component mount
    useEffect(() => {
        const loadUserFromStorage = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const storedToken = localStorage.getItem('token');
                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser));
                    setToken(storedToken);
                }
            } catch (e) {
                console.error("Failed to load user/token from localStorage", e);
                // Xóa dữ liệu lỗi nếu có
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } finally {
                setLoading(false); // Dừng loading sau khi kiểm tra
            }
        };
        loadUserFromStorage();
    }, []);

    // Hàm đăng nhập
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const loggedInUser: User = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                };
                setUser(loggedInUser);
                setToken(data.token);
                localStorage.setItem('user', JSON.stringify(loggedInUser));
                localStorage.setItem('token', data.token);
                return true;
            } else {
                setError(data.error || 'Đăng nhập thất bại.');
                return false;
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Lỗi đăng nhập:', error);
            setError(error.message || 'Lỗi mạng hoặc server không phản hồi.');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Hàm đăng ký
    const register = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role: 'user' }), // Mặc định role là user khi đăng ký
            });

            const data = await res.json();

            if (res.ok && data.success) {
                const registeredUser: User = {
                    id: data.user.id,
                    name: data.user.name,
                    email: data.user.email,
                    role: data.user.role,
                };
                setUser(registeredUser);
                setToken(data.token);
                localStorage.setItem('user', JSON.stringify(registeredUser));
                localStorage.setItem('token', data.token);
                return true;
            } else {
                setError(data.error || 'Đăng ký thất bại.');
                return false;
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Lỗi đăng ký:', error);
            setError(error.message || 'Lỗi mạng hoặc server không phản hồi.');
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    // Hàm đăng xuất
    const logout = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            // Gọi API đăng xuất nếu có (để xóa token trên server/cookie)
            // await fetch(`${API_BASE_URL}/logout`, { method: 'GET' });
        } catch (err) {
            console.error('Lỗi đăng xuất API:', err);
        } finally {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            setLoading(false);
            router.push('/login'); // Chuyển hướng về trang đăng nhập
        }
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

    // Chỉ render children khi trạng thái loading ban đầu đã hoàn tất
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Đang tải...</p> {/* Hoặc một spinner loading */}
            </div>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
