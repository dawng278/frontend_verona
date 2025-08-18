import { NextRequest, NextResponse } from "next/server";
import { register } from "@/../backend/src/services/authService";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

        const data = await register(name, email, password);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Register API error:", error);
        return NextResponse.json(
            { message: error.message || "Register failed" },
            { status: 500 }
        );
    }
}
