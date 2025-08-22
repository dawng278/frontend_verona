'use client';

import { useState, useEffect, useRef } from "react";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";

interface AccountOverlayProps {
    onClose: () => void;
}

const AccountOverlay = ({ onClose }: AccountOverlayProps) => {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Click ra ngoài dropdown sẽ đóng
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    return (
        <div
            ref={overlayRef}
            className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4"
        >
            {user ? (
                <div className="text-center">
                    <p className="mb-4 font-medium">{user.name}</p>
                    <button
                        onClick={() => { logout(); onClose(); }}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                    >
                        Logout
                    </button>
                </div>
            ) : showLogin ? (
                <LoginForm onSwitchToRegister={() => setShowLogin(false)} onClose={onClose} />
            ) : (
                <RegisterForm onSwitchToLogin={() => setShowLogin(true)} onClose={onClose} />
            )}
        </div>
    );
};

export default AccountOverlay;
