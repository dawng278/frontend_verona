import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        // Xử lý lỗi từ backend (401, 409, 500, ...)
        if (!res.ok) {
            let errorData;
            try {
                errorData = await res.json();
            } catch {
                errorData = { message: "Unexpected error from backend" };
            }
            return NextResponse.json(errorData, { status: res.status });
        }

        // Thành công
        const data = await res.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error("FE register API error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
