// frontend/src/services/authService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://backend-beka.onrender.com/api";

export async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        throw new Error("Đăng nhập thất bại");
    }

    return res.json(); // { user, token }
}

export async function register(name: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
        throw new Error("Đăng ký thất bại");
    }

    return res.json(); // { user, token }
}
