'use client';

import React, { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho người dùng nhận được từ API
interface UserApiResponse {
    id: string;
    name: string;
    email: string;
}

interface LoginFormProps {
    onSuccess?: (user: UserApiResponse, token: string) => void;
    onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: { email?: string; password?: string } = {};
        let isValid = true;

        if (!email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setErrors({});

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            console.log('Attempting to log in with:', { email, password });
            // Gửi yêu cầu đăng nhập đến Next.js API Route
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });


            const data = await response.json();

            if (response.ok) {
                setFormMessage('Login successful! Redirecting...');
                console.log('Login successful!', data);
                if (onSuccess) {
                    // Truyền dữ liệu người dùng và token nhận được từ backend
                    onSuccess(data.user, data.token);
                }
            } else {
                // Xử lý lỗi từ backend
                setFormMessage(data.message || 'Login failed. Please check your credentials and try again.');
                console.error('Login failed:', data.message);
            }
        } catch (error: unknown) { // Thay 'any' bằng 'unknown'
            console.error('Login failed (network error or server issue):', error);
            // Kiểm tra kiểu của error để truy cập message
            if (error instanceof Error) {
                setFormMessage(`Login failed. Could not connect to the server: ${error.message}`);
            } else {
                setFormMessage('Login failed. An unknown error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-8 font-sans">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-[#5C3A21]">Welcome Back!</h2>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                    ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={errors.email ? "true" : "false"}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                            {errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#5C3A21] mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                                    ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        aria-invalid={errors.password ? "true" : "false"}
                        aria-describedby={errors.password ? "password-error" : undefined}
                    />
                    {errors.password && (
                        <p id="password-error" className="text-red-500 text-xs mt-1" role="alert">
                            {errors.password}
                        </p>
                    )}
                </div>

                {formMessage && (
                    <div className={`text-center text-sm p-2 rounded-md ${formMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="status">
                        {formMessage}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                    aria-live="polite"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>

                <div className="text-center text-sm mt-4">
                    <p className="text-gray-600">
                        Don&#39;t have an account?{' '}
                        <span
                            className="text-[#E63946] font-semibold hover:text-[#D62828] cursor-pointer transition duration-200"
                            onClick={onSwitchToRegister}
                        >
                            Register here.
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
