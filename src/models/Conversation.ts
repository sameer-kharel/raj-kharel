import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IConversation extends Document {
    client: Types.ObjectId;
    listing?: Types.ObjectId; // Optional - for property-specific conversations
    lastMessageAt: Date;
    clientUnreadCount: number;
    adminUnreadCount: number;
    status: 'active' | 'archived';
}

const ConversationSchema: Schema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    listing: { type: Schema.Types.ObjectId, ref: 'Listing', required: false }, // Optional listing
    lastMessageAt: { type: Date, default: Date.now },
    clientUnreadCount: { type: Number, default: 0 },
    adminUnreadCount: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'archived'], default: 'active' },
}, { timestamps: true });

// Index for faster queries
ConversationSchema.index({ client: 1, listing: 1 }, { unique: true, sparse: true }); // Sparse index for optional listing
ConversationSchema.index({ client: 1 }, { unique: true, partialFilterExpression: { listing: { $exists: false } } }); // One direct conversation per client
ConversationSchema.index({ lastMessageAt: -1 });

export default mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
