import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
    email: string;
    name?: string;
    subscribedAt: Date;
    isActive: boolean;
    preferences: {
        housingUpdates: boolean;
        localNews: boolean;
        incentives: boolean;
        allUpdates: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        },
        name: {
            type: String,
            trim: true,
        },
        subscribedAt: {
            type: Date,
            default: Date.now,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        preferences: {
            housingUpdates: {
                type: Boolean,
                default: true,
            },
            localNews: {
                type: Boolean,
                default: true,
            },
            incentives: {
                type: Boolean,
                default: true,
            },
            allUpdates: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
