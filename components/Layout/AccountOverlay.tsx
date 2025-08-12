// frontend/components/Layout/AccountOverlay.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const AccountOverlay = () => {
    const { user, logout } = useAuth();

    return (
        <div className="absolute top-14 right-0 w-48 bg-white shadow-md rounded-md p-4 z-50">
            {user ? (
                <>
                    <p className="mb-2">Hello, {user.name}</p>
                    <button
                        onClick={logout}
                        className="block w-full text-left text-red-600 hover:underline"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link href="/login" className="block text-[#B61E01] hover:underline mb-2">Login</Link>
                    <Link href="/register" className="block text-[#B61E01] hover:underline">Register</Link>
                </>
            )}
        </div>
    );
};

export default AccountOverlay;
