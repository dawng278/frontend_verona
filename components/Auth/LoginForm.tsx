'use client';

import React, { useState } from 'react';

interface UserApiResponse {
    id: string;
    name: string;
    email: string;
}

interface LoginFormProps {
    onSuccess?: (user: UserApiResponse, token: string) => void;
    onSwitchToRegister?: () => void;
    onClose?: () => void; // ✅ thêm onClose
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onClose }) => {
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

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setFormMessage('Login successful! Redirecting...');
                if (onSuccess) onSuccess(data.user, data.token);
                if (onClose) onClose(); // ✅ đóng modal khi login thành công
            } else {
                setFormMessage(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setFormMessage('Login failed. Network or server error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-8 font-sans">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-[#5C3A21]">Welcome Back!</h2>
            <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                            ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#5C3A21] mb-1">Password</label>
                    <input
                        type="password"
                        id="password"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                            ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Form Message */}
                {formMessage && (
                    <div className={`text-center text-sm p-2 rounded-md ${formMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {formMessage}
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                {/* Switch to Register */}
                <div className="text-center text-sm mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <span className="text-[#E63946] font-semibold cursor-pointer" onClick={onSwitchToRegister}>
                            Register here.
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
