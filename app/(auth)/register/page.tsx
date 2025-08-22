'use client';

import RegisterForm from '@/components/Auth/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
    const { register } = useAuth();

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <RegisterForm
                onSuccess={async (name, email, password) => {
                    await register(name, email, password);
                }}
            />
        </div>
    );
}
