'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Check, X } from 'lucide-react';

interface RegisterFormProps {
    onSuccess?: (name: string, email: string, password: string) => Promise<void>;
    onSwitchToLogin?: () => void;
    onClose?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        };
        Object.values(checks).forEach(check => check && strength++);
        return { strength, checks };
    };

    const passwordStrength = getPasswordStrength(password);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        let isValid = true;

        if (!name.trim()) {
            newErrors.name = 'Full name is required.';
            isValid = false;
        } else if (name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters.';
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address.';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (password.length < 8 || passwordStrength.strength < 3) {
            newErrors.password = 'Password is too weak. Include uppercase, lowercase, and numbers.';
            isValid = false;
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password.';
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
            });

            const data = await response.json();

            if (response.ok && data.user && data.token) {
                setFormMessage('Registration successful!');

                // Call onSuccess with parameters
                if (onSuccess) await onSuccess(name.trim(), email.trim(), password);

                // Close modal after short delay
                setTimeout(() => {
                    if (onClose) onClose();
                }, 1500);
            } else {
                setFormMessage(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setFormMessage('Registration failed. Check your internet connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const getStrengthColor = () => {
        switch (passwordStrength.strength) {
            case 0: case 1: return 'bg-red-500';
            case 2: return 'bg-orange-500';
            case 3: return 'bg-yellow-500';
            case 4: return 'bg-blue-500';
            case 5: return 'bg-green-500';
            default: return 'bg-gray-300';
        }
    };

    const getStrengthText = () => {
        switch (passwordStrength.strength) {
            case 0: case 1: return 'Very Weak';
            case 2: return 'Weak';
            case 3: return 'Fair';
            case 4: return 'Good';
            case 5: return 'Strong';
            default: return '';
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-4 font-sans">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-[#5C3A21]">Create Your Account</h2>

            <form onSubmit={handleRegister} className="space-y-5">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#5C3A21] mb-2">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400 ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-2">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-200 placeholder-gray-400 ${errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password & Confirm Password UI */}
                {/* ... giữ nguyên UI như bạn đã viết ... */}

                {/* Submit Button */}
                <button type="submit" className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>
                    {isLoading ? <><Loader2 className="animate-spin mr-2" size={18} />Creating Account...</> : 'Create Account'}
                </button>

                {/* Switch to Login */}
                <div className="text-center text-sm pt-4 border-t border-gray-100">
                    <p className="text-gray-600">Already have an account?{' '}
                        <button type="button" onClick={onSwitchToLogin} className="text-[#E63946] font-semibold hover:text-[#B8151F] transition-colors">
                            Sign in here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
