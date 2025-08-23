import { NextResponse } from "next/server";

const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// định nghĩa type cho body order
interface OrderRequest {
    userId: string;
    items: {
        productId: string;
        quantity: number;
    }[];
    total: number;
    [key: string]: unknown; // fallback cho các field khác
}

export async function POST(req: Request) {
    try {
        const body: OrderRequest = await req.json();

        const res = await fetch(`${BACKEND_URL}/api/order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "Failed to create order", details: error.message },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { error: "Failed to create order", details: "Unknown error" },
            { status: 500 }
        );
    }
}
