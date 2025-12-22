import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import Conversation from '@/models/Conversation';
import Listing from '@/models/Listing';
import User from '@/models/User';

export async function GET(request: NextRequest) {
    try {
        // Try to get session for client access
        const session = await getServerSession(authOptions);

        await dbConnect();

        let conversations;

        if (session && session.user) {
            // Client is logged in with NextAuth
            const user = await User.findOne({ email: session.user.email });
            if (!user) {
                return NextResponse.json({ error: 'User not found' }, { status: 404 });
            }

            if (user.role === 'admin') {
                // Admin sees all conversations
                conversations = await Conversation.find({ status: 'active' })
                    .populate('client', 'name email image')
                    .populate('listing', 'title address featuredImage')
                    .sort({ lastMessageAt: -1 });
            } else {
                // Client sees only their conversations
                conversations = await Conversation.find({ client: user._id, status: 'active' })
                    .populate('listing', 'title address featuredImage')
                    .sort({ lastMessageAt: -1 });
            }
        } else {
            // No session - assume admin panel access (already authenticated by admin panel)
            conversations = await Conversation.find({ status: 'active' })
                .populate('client', 'name email image')
                .populate('listing', 'title address featuredImage')
                .sort({ lastMessageAt: -1 });
        }

        return NextResponse.json({ conversations });
    } catch (error) {
        console.error('Error fetching conversations:', error);
        return NextResponse.json(
            { error: 'Failed to fetch conversations' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            console.error('POST /api/conversations - No session');
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            console.error('POST /api/conversations - User not found:', session.user.email);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const body = await request.json();
        const { listingId } = body;

        // If no listingId provided, create/get direct conversation with admin
        if (!listingId) {
            console.log('Creating/getting direct conversation for user:', user.email);

            try {
                // Check if direct conversation already exists
                let conversation = await Conversation.findOne({
                    client: user._id,
                    listing: { $exists: false }
                });

                if (conversation) {
                    console.log('Found existing direct conversation:', conversation._id);
                    return NextResponse.json({ conversation, existing: true });
                }

                // Create new direct conversation with admin
                console.log('Creating new direct conversation...');
                conversation = await Conversation.create({
                    client: user._id,
                    lastMessageAt: new Date(),
                    clientUnreadCount: 0,
                    adminUnreadCount: 0,
                    status: 'active',
                });

                console.log('Direct conversation created:', conversation._id);
                return NextResponse.json({ conversation, existing: false }, { status: 201 });
            } catch (directError: any) {
                console.error('Error creating direct conversation:', directError);

                // Check if it's a duplicate key error
                if (directError.code === 11000) {
                    console.log('Duplicate key error - finding existing conversation...');
                    const existingConv = await Conversation.findOne({
                        client: user._id,
                        listing: { $exists: false }
                    });
                    if (existingConv) {
                        return NextResponse.json({ conversation: existingConv, existing: true });
                    }
                }

                throw directError;
            }
        }

        // Handle property-specific conversation
        console.log('Creating/getting property-specific conversation for listing:', listingId);

        // Check if listing exists
        const listing = await Listing.findById(listingId);
        if (!listing) {
            console.error('Listing not found:', listingId);
            return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
        }

        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            client: user._id,
            listing: listingId,
        });

        if (conversation) {
            console.log('Found existing property conversation:', conversation._id);
            conversation = await Conversation.findById(conversation._id)
                .populate('listing', 'title address featuredImage');
            return NextResponse.json({ conversation, existing: true });
        }

        // Create new property-specific conversation
        console.log('Creating new property-specific conversation...');
        conversation = await Conversation.create({
            client: user._id,
            listing: listingId,
            lastMessageAt: new Date(),
            clientUnreadCount: 0,
            adminUnreadCount: 0,
            status: 'active',
        });

        conversation = await Conversation.findById(conversation._id)
            .populate('listing', 'title address featuredImage');

        console.log('Property conversation created:', conversation._id);
        return NextResponse.json({ conversation, existing: false }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating conversation:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            code: error.code,
            stack: error.stack
        });

        return NextResponse.json(
            {
                error: 'Failed to create conversation',
                details: error.message,
                code: error.code
            },
            { status: 500 }
        );
    }
}
