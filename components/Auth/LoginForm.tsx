'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface UserApiResponse {
    id: string;
    name: string;
    email: string;
}

interface LoginFormProps {
    onSuccess?: (user: UserApiResponse, token: string) => void;
    onSwitchToRegister?: () => void;
    onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
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
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: email.trim(), password }),
            });

            const data = await response.json();

            if (response.ok && data.user && data.token) {
                setFormMessage('Login successful! Welcome back.');

                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // Call onSuccess immediately
                if (onSuccess) {
                    onSuccess(data.user, data.token);
                }

                // Close modal after a brief delay to show success message
                setTimeout(() => {
                    if (onClose) {
                        onClose();
                    }
                }, 1000);

            } else {
                setFormMessage(data.message || 'Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setFormMessage('Login failed. Please check your internet connection and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-4 font-sans">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-[#5C3A21]">
                Welcome Back!
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400
                            ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#5C3A21] mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400
                                ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Form Message */}
                {formMessage && (
                    <div className={`text-center text-sm p-3 rounded-md border ${
                        formMessage.includes('successful')
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-red-50 text-red-700 border-red-200'
                    }`}>
                        {formMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin mr-2" size={18} />
                            Signing in...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                    <button
                        type="button"
                        className="text-[#5C3A21] text-sm hover:text-[#FFA500] transition-colors"
                    >
                        Forgot your password?
                    </button>
                </div>

                {/* Switch to Register */}
                <div className="text-center text-sm pt-4 border-t border-gray-100">
                    <p className="text-gray-600">
                        Don&#39;t have an account?{' '}
                        <button
                            type="button"
                            onClick={onSwitchToRegister}
                            className="text-[#E63946] font-semibold hover:text-[#B8151F] transition-colors"
                        >
                            Create one here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;