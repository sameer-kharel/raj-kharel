import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Incentive from '@/models/Incentive';

// GET - Fetch active incentives (public)
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const includeInactive = searchParams.get('includeInactive') === 'true';

        const query: any = {};
        if (!includeInactive) {
            query.isActive = true;
            // Only show incentives that haven't ended
            query.$or = [
                { endDate: { $exists: false } },
                { endDate: { $gte: new Date() } },
            ];
        }

        const incentives = await Incentive.find(query)
            .sort({ displayOrder: 1, createdAt: -1 })
            .select('-__v');

        return NextResponse.json(incentives);
    } catch (error: any) {
        console.error('[API GET /incentives]', error);
        return NextResponse.json(
            { error: 'Failed to fetch incentives' },
            { status: 500 }
        );
    }
}

// POST - Create incentive (admin only)
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const {
            title,
            description,
            type,
            amount,
            isActive,
            startDate,
            endDate,
            termsAndConditions,
            displayOrder,
        } = body;

        if (!title || !description || !type) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const incentive = new Incentive({
            title,
            description,
            type,
            amount,
            isActive: isActive !== undefined ? isActive : true,
            startDate: startDate || new Date(),
            endDate,
            termsAndConditions: termsAndConditions || '',
            displayOrder: displayOrder || 0,
        });

        await incentive.save();

        return NextResponse.json(incentive, { status: 201 });
    } catch (error: any) {
        console.error('[API POST /incentives]', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create incentive' },
            { status: 500 }
        );
    }
}
