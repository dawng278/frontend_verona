// app/(auth)/register/page.tsx
import RegisterForm from '@/components/Auth/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <RegisterForm />
        </div>
    );
}
