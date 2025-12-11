import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import mongoose from 'mongoose';

// Helper function to extract ID from URL
function getIdFromReq(req: NextRequest): string | null {
    try {
        const url = new URL(req.url);
        const pathParts = url.pathname.split('/');
        const id = pathParts[pathParts.length - 1];
        return id;
    } catch (error) {
        console.error('Failed to parse ID from request URL', error);
        return null;
    }
}

// DELETE - Unsubscribe (admin or user with token)
export async function DELETE(req: NextRequest) {
    try {
        const id = getIdFromReq(req);
        if (!id) {
            return NextResponse.json(
                { error: 'Could not determine subscriber ID from URL' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid subscriber ID format' },
                { status: 400 }
            );
        }

        await connectDB();

        // Instead of deleting, mark as inactive
        const subscriber = await Subscriber.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!subscriber) {
            return NextResponse.json(
                { error: 'Subscriber not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Successfully unsubscribed',
        });
    } catch (error: any) {
        console.error('[API DELETE /subscribers/[id]]', error);
        return NextResponse.json(
            { error: 'Failed to unsubscribe' },
            { status: 500 }
        );
    }
}
