'use client';

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, ShoppingBag, X } from "lucide-react";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import OrderHistoryOverlay from "./OrderHistoryOverlay";
import { useAuth } from "@/contexts/AuthContext";

interface AccountOverlayProps {
    onClose: () => void;
}

const AccountOverlay = ({ onClose }: AccountOverlayProps) => {
    const { user, login, register, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !showOrderHistory) onClose();
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose, showOrderHistory]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            onClose();
        } finally {
            setIsLoggingOut(false);
        }
    };

    const handleAuthSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget && !showOrderHistory) onClose();
    };

    const handleOrderHistoryClick = () => {
        setShowOrderHistory(true);
    };

    const handleOrderHistoryClose = () => {
        setShowOrderHistory(false);
    };

    // Nếu đang hiển thị lịch sử đơn hàng, render component đó
    if (showOrderHistory && user) {
        return (
            <OrderHistoryOverlay
                onClose={handleOrderHistoryClose}
                userId={user.id || user.id || user.email}
            />
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick} />
            <div ref={overlayRef} className="relative w-full max-w-md bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden">

                <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Đóng cửa sổ">
                    <X size={18} />
                </button>

                {showSuccessMessage && (
                    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-10">
                        Xin chào, {user?.name || 'Người dùng'}! ✓
                    </div>
                )}

                {user ? (
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
                            <div className="w-12 h-12 bg-[#FFA500] rounded-full flex items-center justify-center">
                                <User className="text-white" size={20} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[#5C3A21] text-lg">{user.name}</h3>
                                <p className="text-gray-500 text-sm">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6">
                            <button
                                onClick={handleOrderHistoryClick}
                                className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <ShoppingBag size={18} />
                                <span>Lịch sử đơn hàng</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                <Settings size={18} />
                                <span>Cài đặt tài khoản</span>
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LogOut size={18} />
                            <span>{isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}</span>
                        </button>
                    </div>
                ) : (
                    <div className="p-2">
                        {showLogin ? (
                            <LoginForm
                                onSuccess={async (email, password) => {
                                    await login(email, password);
                                    handleAuthSuccess();
                                }}
                                onSwitchToRegister={() => setShowLogin(false)}
                                onClose={onClose}
                            />
                        ) : (
                            <RegisterForm
                                onSuccess={async (name, email, password) => {
                                    await register(name, email, password);
                                    handleAuthSuccess();
                                }}
                                onSwitchToLogin={() => setShowLogin(true)}
                                onClose={onClose}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountOverlay;
