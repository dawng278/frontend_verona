// login/page.tsx
import LoginForm from '@/components/Auth/LoginForm';

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <section className="w-full max-w-md">
                <LoginForm />
            </section>
        </main>
    );
}
