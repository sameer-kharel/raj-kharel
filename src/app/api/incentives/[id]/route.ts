import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Incentive from '@/models/Incentive';
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

// PATCH - Update incentive (admin only)
export async function PATCH(req: NextRequest) {
    try {
        const id = getIdFromReq(req);
        if (!id) {
            return NextResponse.json(
                { error: 'Could not determine incentive ID from URL' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid incentive ID format' },
                { status: 400 }
            );
        }

        await connectDB();
        const body = await req.json();

        const updatedIncentive = await Incentive.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updatedIncentive) {
            return NextResponse.json(
                { error: 'Incentive not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedIncentive);
    } catch (error: any) {
        console.error('[API PATCH /incentives/[id]]', error);
        return NextResponse.json(
            { error: 'Failed to update incentive' },
            { status: 500 }
        );
    }
}

// DELETE - Delete incentive (admin only)
export async function DELETE(req: NextRequest) {
    try {
        const id = getIdFromReq(req);
        if (!id) {
            return NextResponse.json(
                { error: 'Could not determine incentive ID from URL' },
                { status: 400 }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { error: 'Invalid incentive ID format' },
                { status: 400 }
            );
        }

        await connectDB();
        const deletedIncentive = await Incentive.findByIdAndDelete(id);

        if (!deletedIncentive) {
            return NextResponse.json(
                { error: 'Incentive not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Incentive deleted successfully' });
    } catch (error: any) {
        console.error('[API DELETE /incentives/[id]]', error);
        return NextResponse.json(
            { error: 'Failed to delete incentive' },
            { status: 500 }
        );
    }
}
