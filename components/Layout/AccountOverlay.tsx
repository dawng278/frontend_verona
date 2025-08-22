'use client';

import { useState, useEffect, useRef } from "react";
import { User, LogOut, Settings, ShoppingBag, X } from "lucide-react";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";

interface AccountOverlayProps {
    onClose: () => void;
}

const AccountOverlay = ({ onClose }: AccountOverlayProps) => {
    const { user, login, register, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [onClose]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "unset"; };
    }, []);

    // Logout
    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            onClose();
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setIsLoggingOut(false);
        }
    };

    // Show success message after login/register
    const handleAuthSuccess = () => {
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
        setShowLogin(true); // show menu
    };

    // Backdrop click
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleBackdropClick} />
            <div ref={overlayRef} className="relative w-full max-w-md bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden">

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={18} />
                </button>

                {/* Success message */}
                {showSuccessMessage && (
                    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2 z-10">
                        Welcome, {user?.name || 'User'}! Login successful ✓
                    </div>
                )}

                {user ? (
                    // Authenticated menu
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
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                <ShoppingBag size={18} />
                                <span>Order History</span>
                            </button>
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                <Settings size={18} />
                                <span>Account Settings</span>
                            </button>
                        </div>

                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LogOut size={18} />
                            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
                        </button>
                    </div>
                ) : (
                    <div className="p-2">
                        {showLogin ? (
                            <LoginForm
                                onSuccess={async (email, password) => {
                                    const success = await login(email, password);
                                    if (success) handleAuthSuccess();
                                }}
                                onSwitchToRegister={() => setShowLogin(false)}
                                onClose={onClose}
                            />
                        ) : (
                            <RegisterForm
                                onSuccess={async (name, email, password) => {
                                    const success = await register(name, email, password);
                                    if (success) handleAuthSuccess();
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
