import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';
import dbConnect from '@/lib/mongodb';
import Message from '@/models/Message';
import Conversation from '@/models/Conversation';

export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const messageId = params.id;

        const session = await getServerSession(authOptions);
        if (!session || !session.user || (session.user as any).role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const message = await Message.findById(messageId);
        if (!message) {
            return NextResponse.json({ error: 'Message not found' }, { status: 404 });
        }

        // Delete the message
        await Message.findByIdAndDelete(messageId);

        // Update latest message in conversation if needed
        const conversation = await Conversation.findById(message.conversation);
        if (conversation) {
            // Check if this was the last message
            const lastMessage = await Message.findOne({ conversation: conversation._id })
                .sort({ createdAt: -1 });

            if (lastMessage) {
                conversation.lastMessageAt = lastMessage.createdAt;
            }
            await conversation.save();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { error: 'Failed to delete message' },
            { status: 500 }
        );
    }
}
