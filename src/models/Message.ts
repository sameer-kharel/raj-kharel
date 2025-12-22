import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
    conversation: Types.ObjectId;
    sender: Types.ObjectId;
    senderRole: 'client' | 'admin';
    content: string;
    isRead: boolean;
    readAt?: Date;
    createdAt: Date;
}

const MessageSchema: Schema = new Schema({
    conversation: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    senderRole: { type: String, enum: ['client', 'admin'], required: true },
    content: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    readAt: { type: Date },
}, { timestamps: true });

// Index for faster queries
MessageSchema.index({ conversation: 1, createdAt: -1 });

export default mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);
