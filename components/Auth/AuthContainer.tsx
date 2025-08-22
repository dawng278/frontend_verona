'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthContainer: React.FC = () => {
    const { user, logout, isAccountOpen, openAccount, closeAccount } = useAuth();
    const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login');

    if (user) {
        // Hiển thị tên user + nút logout
        return (
            <div className="flex items-center space-x-4">
                <span className="font-semibold text-[#5C3A21]">Hello, {user.name}</span>
                <button
                    className="bg-[#E63946] text-white px-3 py-1 rounded hover:bg-[#B8151F]"
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <>
            <button
                className="bg-[#FFA500] text-white px-3 py-1 rounded hover:bg-[#FF8C00]"
                onClick={openAccount}
            >
                Account
            </button>

            {isAccountOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl relative">
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={closeAccount}
                        >
                            ×
                        </button>

                        {currentForm === 'login' ? (
                            <LoginForm onSwitchToRegister={() => setCurrentForm('register')} />
                        ) : (
                            <RegisterForm onSwitchToLogin={() => setCurrentForm('login')} />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthContainer;
