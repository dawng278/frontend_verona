// frontend/app/api/order/route.ts
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const res = await fetch(`${BACKEND_URL}/api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to create order", details: error.message },
            { status: 500 }
        );
    }
}
