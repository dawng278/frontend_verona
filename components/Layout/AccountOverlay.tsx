'use client';

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

const AccountOverlay = () => {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {user ? (
                <>
                    <p className="mb-2">Hello, {user.name}</p>
                    <button
                        onClick={logout}
                        className="block w-full text-left text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    {showLogin ? (
                        <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
                    ) : (
                        <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
                    )}
                </>
            )}
        </div>
    );
};

export default AccountOverlay;
