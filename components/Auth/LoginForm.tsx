'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormProps {
    onSwitchToRegister?: () => void;
    onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister, onClose }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        let valid = true;
        if (!email) { newErrors.email = 'Email is required.'; valid = false; }
        if (!password) { newErrors.password = 'Password is required.'; valid = false; }
        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);
        const success = await login(email, password);
        if (success) {
            setFormMessage('Login successful!');
            setTimeout(() => onClose && onClose(), 1000);
        } else {
            setFormMessage('Login failed. Please check your credentials.');
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-4">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-[#5C3A21]">Welcome Back!</h2>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#5C3A21] mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
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

                {formMessage && (
                    <div className="text-center text-sm p-3 rounded-md border bg-red-50 text-red-700 border-red-200">
                        {formMessage}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? <><Loader2 className="animate-spin mr-2" size={18}/> Signing in...</> : 'Sign In'}
                </button>

                <div className="text-center text-sm pt-4 border-t border-gray-100">
                    <p className="text-gray-600">Don&#39;t have an account?{' '}
                        <button type="button" onClick={onSwitchToRegister} className="text-[#E63946] font-semibold hover:text-[#B8151F]">Create one here</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
