import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';
import User from '@/models/User';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id: conversationId } = await params;

        // Verify user has access to this conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        if (user.role !== 'admin' && conversation.client.toString() !== user._id.toString()) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Fetch messages
        const messages = await Message.find({ conversation: conversationId })
            .populate('sender', 'name email image role')
            .sort({ createdAt: 1 });

        // Mark messages as read
        if (user.role === 'admin') {
            await Message.updateMany(
                { conversation: conversationId, senderRole: 'client', isRead: false },
                { isRead: true, readAt: new Date() }
            );
            conversation.adminUnreadCount = 0;
        } else {
            await Message.updateMany(
                { conversation: conversationId, senderRole: 'admin', isRead: false },
                { isRead: true, readAt: new Date() }
            );
            conversation.clientUnreadCount = 0;
        }
        await conversation.save();

        return NextResponse.json({ messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id: conversationId } = await params;
        const { content } = await request.json();

        if (!content || content.trim() === '') {
            return NextResponse.json({ error: 'Message content is required' }, { status: 400 });
        }

        // Verify conversation exists and user has access
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        if (user.role !== 'admin' && conversation.client.toString() !== user._id.toString()) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Create message
        const message = await Message.create({
            conversation: conversationId,
            sender: user._id,
            senderRole: user.role,
            content: content.trim(),
            isRead: false,
        });

        // Update conversation
        conversation.lastMessageAt = new Date();
        if (user.role === 'admin') {
            conversation.clientUnreadCount += 1;
        } else {
            conversation.adminUnreadCount += 1;
        }
        await conversation.save();

        const populatedMessage = await Message.findById(message._id)
            .populate('sender', 'name email image role');

        return NextResponse.json({ message: populatedMessage }, { status: 201 });
    } catch (error) {
        console.error('Error creating message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        // Only admin can delete all messages
        if (user.role !== 'admin') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        const { id: conversationId } = await params;

        // Verify conversation exists
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
        }

        // Delete all messages in the conversation
        const result = await Message.deleteMany({ conversation: conversationId });

        // Reset conversation metadata
        conversation.lastMessageAt = conversation.createdAt;
        conversation.clientUnreadCount = 0;
        conversation.adminUnreadCount = 0;
        await conversation.save();

        return NextResponse.json({
            success: true,
            deletedCount: result.deletedCount,
            message: 'All messages deleted from conversation'
        });
    } catch (error) {
        console.error('Error deleting messages:', error);
        return NextResponse.json(
            { error: 'Failed to delete messages' },
            { status: 500 }
        );
    }
}
