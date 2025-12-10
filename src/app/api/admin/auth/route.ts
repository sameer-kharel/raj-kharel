import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json();

        // Get admin password from environment variable
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (!process.env.ADMIN_PASSWORD) {
            console.warn('⚠️  ADMIN_PASSWORD not set in environment variables. Using default password.');
        }

        // Verify password
        if (password === ADMIN_PASSWORD) {
            return NextResponse.json({ success: true }, { status: 200 });
        } else {
            return NextResponse.json({ success: false, error: 'Incorrect password' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
    }
}
