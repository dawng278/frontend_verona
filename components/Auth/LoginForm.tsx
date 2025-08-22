'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginFormProps {
    onSuccess: (email: string, password: string) => Promise<void>;
    onSwitchToRegister?: () => void;
    onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setIsLoading(true);
        try {
            await onSuccess(email, password);
            setFormMessage('Login successful!');
            setTimeout(() => { if (onClose) onClose(); }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) setFormMessage(err.message);
            else setFormMessage('Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-4 font-sans">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-[#5C3A21]">Sign In</h2>
            {formMessage && <p className="text-center mb-2 text-red-500">{formMessage}</p>}

            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-[#5C3A21] mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA500] placeholder-gray-400"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#5C3A21] mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFA500] placeholder-gray-400"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] flex items-center justify-center disabled:opacity-50"
                >
                    {isLoading ? <><Loader2 className="animate-spin mr-2" size={18} />Signing In...</> : 'Sign In'}
                </button>

                <div className="text-center text-sm pt-4 border-t border-gray-100">
                    <p className="text-gray-600">
                        Don&#39;t have an account?{' '}
                        <button type="button" onClick={onSwitchToRegister} className="text-[#E63946] font-semibold hover:text-[#B8151F]">
                            Sign up here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
