'use client';

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";

const AccountOverlay = () => {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div className="absolute top-14 right-0 w-80 shadow-md rounded-md p-6 z-50">
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
