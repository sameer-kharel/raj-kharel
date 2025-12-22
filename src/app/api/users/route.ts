import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
    try {
        // Note: This endpoint is accessed from the admin panel which uses its own authentication
        // The admin panel already checks authentication before allowing access to this page

        await dbConnect();

        // Fetch all users
        const users = await User.find().sort({ createdAt: -1 });

        return NextResponse.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}
