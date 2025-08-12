'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm'; // Đảm bảo đường dẫn chính xác
import RegisterForm from './RegisterForm'; // Đảm bảo đường dẫn chính xác

const AuthContainer: React.FC = () => {
    // State để xác định form nào đang được hiển thị: 'login' hoặc 'register'
    const [currentForm, setCurrentForm] = useState<'login' | 'register'>('login');

    // Hàm xử lý khi đăng nhập thành công
    const handleLoginSuccess = () => {
        console.log('Login successful! You can now redirect the user or close the form.');
        // Ví dụ: Đóng overlay hoặc chuyển hướng người dùng
        // setCurrentForm(null); // Nếu AuthContainer này là một phần của overlay
    };

    // Hàm xử lý khi đăng ký thành công
    const handleRegisterSuccess = () => {
        console.log('Registration successful! You can now redirect the user or prompt for login.');
        // Sau khi đăng ký thành công, thường sẽ chuyển về trang đăng nhập
        setCurrentForm('login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
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
