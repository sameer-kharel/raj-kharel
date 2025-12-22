import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import TourBooking from '@/models/TourBooking';
import Listing from '@/models/Listing';
import User from '@/models/User';
import Checklist from '@/models/Checklist';

export async function GET(request: NextRequest) {
    try {
        // Try to get session for client access
        const session = await getServerSession(authOptions);

        await dbConnect();

        let bookings;

        if (session && session.user) {
            // Client is logged in with NextAuth
            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            if (user.role === 'admin') {
                // Admin sees all bookings
                bookings = await TourBooking.find()
                    .populate('client', 'name email image')
                    .populate('listing', 'title address featuredImage')
                    .sort({ createdAt: -1 });
            } else {
                // Client sees only their bookings
                bookings = await TourBooking.find({ client: user._id })
                    .populate('listing', 'title address featuredImage')
                    .sort({ createdAt: -1 });
            }
        } else {
            // No session - assume admin panel access
            bookings = await TourBooking.find()
                .populate('client', 'name email image')
                .populate('listing', 'title address featuredImage')
                .sort({ createdAt: -1 });
        }

        return NextResponse.json({ bookings });
    } catch (error) {
        console.error('Error fetching tour bookings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch tour bookings' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { listingId, preferredDate, preferredTime, alternateDate, alternateTime, clientNotes } = await request.json();

        if (!listingId || !preferredDate || !preferredTime) {
            return NextResponse.json(
                { error: 'Listing ID, preferred date, and time are required' },
                { status: 400 }
            );
        }

        // Check if listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        // Create tour booking
        const booking = await TourBooking.create({
            client: user._id,
            listing: listingId,
            preferredDate: new Date(preferredDate),
            preferredTime,
            alternateDate: alternateDate ? new Date(alternateDate) : undefined,
            alternateTime,
            clientNotes,
            status: 'pending',
        });

        const populatedBooking = await TourBooking.findById(booking._id)
            .populate('listing', 'title address featuredImage');

        return NextResponse.json({ booking: populatedBooking }, { status: 201 });
    } catch (error) {
        console.error('Error creating tour booking:', error);
        return NextResponse.json(
            { error: 'Failed to create tour booking' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const { bookingId, status, confirmedDate, confirmedTime, adminNotes } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ error: 'Booking ID is required' }, { status: 400 });
        }

        const booking = await TourBooking.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        // Only admin can update booking status
        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (status) booking.status = status;
        if (confirmedDate) booking.confirmedDate = new Date(confirmedDate);
        if (confirmedTime) booking.confirmedTime = confirmedTime;
        if (adminNotes !== undefined) booking.adminNotes = adminNotes;

        if (status === 'completed') {
            booking.completedAt = new Date();

            // Update checklist
            await Checklist.findOneAndUpdate(
                { client: booking.client, listing: booking.listing },
                {
                    tourCompleted: true,
                    tourCompletedAt: new Date(),
                },
                { upsert: true }
            );
        }

        await booking.save();

        const populatedBooking = await TourBooking.findById(booking._id)
            .populate('client', 'name email image')
            .populate('listing', 'title address featuredImage');

        return NextResponse.json({ booking: populatedBooking });
    } catch (error) {
        console.error('Error updating tour booking:', error);
        return NextResponse.json(
            { error: 'Failed to update tour booking' },
            { status: 500 }
        );
    }
}
