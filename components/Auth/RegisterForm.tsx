'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterFormProps {
    onSwitchToLogin?: () => void;
    onClose?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin, onClose }) => {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        let valid = true;
        if (!name.trim()) { newErrors.name = 'Name is required.'; valid = false; }
        if (!email.trim()) { newErrors.email = 'Email is required.'; valid = false; }
        if (!password) { newErrors.password = 'Password is required.'; valid = false; }
        setErrors(newErrors);
        return valid;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormMessage(null);
        setErrors({});
        if (!validateForm()) return;

        setIsLoading(true);
        const success = await register(name, email, password);
        if (success) {
            setFormMessage('Registration successful!');
            setTimeout(() => onClose && onClose(), 1000);
        } else {
            setFormMessage('Registration failed. Try again.');
        }
        setIsLoading(false);
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-4">
            <h2 className="text-2xl font-extrabold text-center mb-6 text-[#5C3A21]">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#5C3A21] mb-2">Full Name</label>
                    <input type="text" id="name" value={name} onChange={e=>setName(e.target.value)}
                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-300':'border-gray-300 focus:ring-[#FFA500]'}`}
                           required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#5C3A21] mb-2">Email Address</label>
                    <input type="email" id="email" value={email} onChange={e=>setEmail(e.target.value)}
                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-300':'border-gray-300 focus:ring-[#FFA500]'}`}
                           required
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#5C3A21] mb-2">Password</label>
                    <div className="relative">
                        <input type={showPassword?'text':'password'} id="password" value={password} onChange={e=>setPassword(e.target.value)}
                               className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 ${errors.password?'border-red-500 focus:ring-red-300':'border-gray-300 focus:ring-[#FFA500]'}`}
                               required
                        />
                        <button type="button" onClick={()=>setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                            {showPassword?<EyeOff size={18}/>:<Eye size={18}/>}
                        </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                {formMessage && (
                    <div className="text-center text-sm p-3 rounded-md border bg-green-50 text-green-700 border-green-200">{formMessage}</div>
                )}

                <button type="submit"
                        className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}>
                    {isLoading?<><Loader2 className="animate-spin mr-2" size={18}/> Creating Account...</>:'Create Account'}
                </button>

                <div className="text-center text-sm pt-4 border-t border-gray-100">
                    <p className="text-gray-600">Already have an account?{' '}
                        <button type="button" onClick={onSwitchToLogin} className="text-[#E63946] font-semibold hover:text-[#B8151F]">Sign in here</button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
