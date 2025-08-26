'use client';

import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight } from 'lucide-react';

interface LoginFormProps {
    onSuccess?: (email: string, password: string) => Promise<void>;
    onSwitchToRegister?: () => void;
    onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = 'auto';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setIsLoading(true);

        try {
            if (onSuccess) await onSuccess(email, password);
            setFormMessage('Đăng nhập thành công!');
            setTimeout(() => { if (onClose) onClose(); }, 1000);
        } catch (err: unknown) {
            if (err instanceof Error) setFormMessage(err.message);
            else setFormMessage('Đăng nhập thất bại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div
            className="w-full max-w-md mx-auto"
            onClick={handleFormClick}
        >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">

                {/* Success/Error Message */}
                {formMessage && (
                    <div className={`px-6 py-3 text-center text-sm font-medium ${
                        formMessage.includes('thành công')
                            ? 'bg-green-50 text-green-700 border-b border-green-100'
                            : 'bg-red-50 text-[#FFA301] border-b border-red-100'
                    }`}>
                        {formMessage}
                    </div>
                )}

                {/* Form Content */}
                <div className="p-6 space-y-6">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold sm:text-3xl text-gray-800 mb-2 font-extrabold">Chào mừng trở lại</h2>
                        <p className="text-gray-600 text-sm">Đăng nhập để tiếp tục</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Địa chỉ Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className={`h-5 w-5 transition-colors ${
                                        focusedField === 'email' || email
                                            ? 'text-[#FFA301]'
                                            : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FFA301] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    placeholder="Nhập email của bạn"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Mật khẩu
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className={`h-5 w-5 transition-colors ${
                                        focusedField === 'password' || password
                                            ? 'text-[#FFA301]'
                                            : 'text-gray-400'
                                    }`} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FFA301] focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                    placeholder="Nhập mật khẩu của bạn"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FFA301] transition-colors p-1"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="text-sm text-[#FFA301] hover:text-red-700 font-medium transition-colors"
                            >
                                Quên mật khẩu?
                            </button>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full group relative bg-gradient-to-r from-[#FFA302] to-[#FFA301] text-white font-semibold py-3 px-4 rounded-xl hover:from-amber-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-[#FFA301] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Đang đăng nhập...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Đăng nhập</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                                    </>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-xl"></div>
                        </button>

                        {/* Social Login Options */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-3 text-gray-500 font-medium">Hoặc tiếp tục với</span>
                            </div>
                        </div>

                        {/* Social Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>
                        </div>

                        {/* Switch to Register */}
                        <div className="text-center pt-2">
                            <p className="text-gray-600 text-sm">
                                Bạn chưa có tài khoản?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className="text-[#FFA301] font-semibold hover:text-red-700 transition-colors"
                                >
                                    Tạo ngay
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
