// app/api/products/route.ts
import connectDB from '@backend/config/db';
import Product from '@backend/models/Product';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    await connectDB();

    try {
        const { name, price, image } = await req.json();

        const newProduct = await Product.create({ name, price, image });

        return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    } catch (err) {
        console.error('Error creating product:', err);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
