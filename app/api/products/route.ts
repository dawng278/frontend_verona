import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const productData = await req.json();

        // Make an HTTP POST request to your deployed backend API
        const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        });

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            // Handle backend errors
            return NextResponse.json({ success: false, error: data.error || 'Backend error' }, { status: backendResponse.status });
        }

        return NextResponse.json({ success: true, product: data.product }, { status: 201 });

    } catch (err) {
        console.error('Error in Next.js API route:', err);
        return NextResponse.json({ success: false, error: 'Next.js server error' }, { status: 500 });
    }
}