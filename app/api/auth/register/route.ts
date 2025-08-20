import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// You'll need to configure your database connection
// import User from '@backend/models/User'; // Adjust import based on your setup

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Please enter all fields" },
                { status: 400 }
            );
        }

        // Database operations would go here
        // const existingUser = await User.findOne({ email });
        // if (existingUser) {
        //     return NextResponse.json(
        //         { message: "User already exists" },
        //         { status: 400 }
        //     );
        // }

        // const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = new User({
        //     name,
        //     email,
        //     password: hashedPassword,
        // });

        // await newUser.save();

        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                // id: newUser._id.toString(),
                name,
                email,
            },
        }, { status: 201 });

    } catch (error) {
        console.error("Register error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error during register" },
            { status: 500 }
        );
    }
}