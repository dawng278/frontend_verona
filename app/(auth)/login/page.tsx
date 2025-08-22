import LoginForm from '@/components/Auth/LoginForm';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
    const { login } = useAuth();

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <section className="w-full max-w-md">
                <LoginForm
                    onSuccess={async (email, password) => {
                        await login(email, password);
                    }}
                />
            </section>
        </main>
    );
}
