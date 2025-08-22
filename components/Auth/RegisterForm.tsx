'use client';

import React, { useState } from 'react';

interface RegisterFormProps {
    onSuccess?: () => void;
    onSwitchToLogin?: () => void;
    onClose?: () => void; // ✅ thêm onClose
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin, onClose }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string | null>(null);

    const validateForm = (): boolean => {
        const newErrors: typeof errors = {};
        let isValid = true;

        if (!name.trim()) { newErrors.name = 'Name is required.'; isValid = false; }
        if (!email.trim()) { newErrors.email = 'Email is required.'; isValid = false; }
        else if (!/\S+@\S+\.\S+/.test(email)) { newErrors.email = 'Email is invalid.'; isValid = false; }
        if (!password) { newErrors.password = 'Password is required.'; isValid = false; }
        else if (password.length < 8) { newErrors.password = 'Password must be at least 8 characters.'; isValid = false; }
        if (!confirmPassword) { newErrors.confirmPassword = 'Confirm password is required.'; isValid = false; }
        else if (password !== confirmPassword) { newErrors.confirmPassword = 'Passwords do not match.'; isValid = false; }

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                setFormMessage('Registration successful!');
                if (onSuccess) onSuccess();
                if (onClose) onClose(); // ✅ đóng modal khi đăng ký thành công
            } else {
                setFormMessage(data.message || 'Registration failed.');
            }
        } catch (err) {
            setFormMessage('Registration failed. Network or server error.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-xl bg-white border border-gray-200 mx-auto my-8 font-sans">
            <h2 className="text-3xl font-extrabold text-center mb-8 text-[#5C3A21]">Create Your Account</h2>
            <form onSubmit={handleRegister} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#5C3A21] mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                            ${errors.name ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

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

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5C3A21] mb-1">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition duration-200
                            ${errors.confirmPassword ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-[#FFA500]'}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>

                {formMessage && (
                    <div className={`text-center text-sm p-2 rounded-md ${formMessage.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {formMessage}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-[#FFA500] text-white font-semibold py-3 rounded-lg hover:bg-[#FF8C00] transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <div className="text-center text-sm mt-4">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <span className="text-[#E63946] font-semibold cursor-pointer" onClick={onSwitchToLogin}>
                            Login here.
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
