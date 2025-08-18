import { NextRequest, NextResponse } from "next/server";
import { login } from "@/../backend/src/services/authService";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const data = await login(email, password);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Login API error:", error);
        return NextResponse.json(
            { message: error.message || "Login failed" },
            { status: 500 }
        );
    }
}
