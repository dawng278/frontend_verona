'use client';

import React, { useState } from 'react';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthContainer: React.FC = () => {
    const { login, register } = useAuth();
    const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login');

    // Async handler cho Login
    const handleLoginSuccess = async (email: string, password: string) => {
        const success = await login(email, password);
        if (success) {
            setCurrentForm('login'); // hoặc handleAuthSuccess nếu có modal
        }
    };

    // Async handler cho Register
    const handleRegisterSuccess = async (name: string, email: string, password: string) => {
        const success = await register(name, email, password);
        if (success) {
            setCurrentForm('login'); // chuyển sang login sau khi đăng ký
        }
    };

    return (
        <div className="w-full flex justify-center items-center min-h-screen">
            {currentForm === 'login' ? (
                <LoginForm
                    onSuccess={handleLoginSuccess}
                    onSwitchToRegister={() => setCurrentForm('register')}
                />
            ) : (
                <RegisterForm
                    onSuccess={handleRegisterSuccess}
                    onSwitchToLogin={() => setCurrentForm('login')}
                />
            )}
        </div>
    );
};

export default AuthContainer;
