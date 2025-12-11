import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';

// GET - Fetch all subscribers (admin only)
export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const subscribers = await Subscriber.find({})
            .sort({ subscribedAt: -1 })
            .select('-__v');

        return NextResponse.json({
            subscribers,
            total: subscribers.length,
        });
    } catch (error: any) {
        console.error('[API GET /subscribers]', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscribers' },
            { status: 500 }
        );
    }
}

// POST - Add new subscriber (public)
export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const body = await req.json();
        const { email, name, preferences } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Check if subscriber already exists
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            if (existingSubscriber.isActive) {
                return NextResponse.json(
                    { error: 'Email is already subscribed' },
                    { status: 400 }
                );
            } else {
                // Reactivate inactive subscriber
                existingSubscriber.isActive = true;
                existingSubscriber.subscribedAt = new Date();
                if (preferences) {
                    existingSubscriber.preferences = preferences;
                }
                await existingSubscriber.save();
                return NextResponse.json({
                    message: 'Successfully resubscribed!',
                    subscriber: existingSubscriber,
                });
            }
        }

        // Create new subscriber
        const subscriber = new Subscriber({
            email,
            name,
            preferences: preferences || {
                housingUpdates: true,
                localNews: true,
                incentives: true,
                allUpdates: true,
            },
        });

        await subscriber.save();

        return NextResponse.json(
            {
                message: 'Successfully subscribed!',
                subscriber,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('[API POST /subscribers]', error);
        return NextResponse.json(
            { error: error.message || 'Failed to subscribe' },
            { status: 500 }
        );
    }
}
