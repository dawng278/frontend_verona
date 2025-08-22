'use client';

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

interface AccountOverlayProps {
    onClose: () => void; // nhận callback từ Header
}

const AccountOverlay = ({ onClose }: AccountOverlayProps) => {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose} // bấm vào nền -> đóng
        >
            <div
                className="p-6 w-96 relative bg-white rounded-md shadow-lg"
                onClick={(e) => e.stopPropagation()} // chặn click trong form không đóng
            >
                {user ? (
                    <div className="text-center">
                        <p className="mb-4 font-medium">{user.name}</p>
                        <button
                            onClick={() => { logout(); onClose(); }}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        {showLogin ? (
                            <LoginForm onSwitchToRegister={() => setShowLogin(false)} onClose={onClose} />
                        ) : (
                            <RegisterForm onSwitchToLogin={() => setShowLogin(true)} onClose={onClose} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AccountOverlay;
